import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "100%" };

export default function GoogleMapView({ center = { lat: -12.0464, lng: -77.0428 }, zoom = 13, markers = [], directions = null, onDirections = null }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const [directionsResult, setDirectionsResult] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  // When `directions` prop changes, we store it so renderer can use it.
  React.useEffect(() => {
    const fetchDirections = async () => {
      if (!directions || !isLoaded) return;

      // If the prop contains a REST result from our `getDirections` service,
      // the service stored it in `directions.result` (an object with `routes`).
      if (directions.result && (directions.result.routes || directions.result.status)) {
        setDirectionsResult(directions.result);
        // notify parent about distance if callback provided
        if (onDirections && directions.result.routes && directions.result.routes.length > 0) {
          const legs = directions.result.routes[0].legs || []
          const distanceMeters = legs.reduce((sum, leg) => sum + (leg.distance?.value || 0), 0)
          try { onDirections({ directionsResult: directions.result, distanceMeters }) } catch(e) { console.warn(e) }
        }
        return;
      }

      // If prop itself is already a DirectionsResult returned by the Maps JS API
      if (directions.routes) {
        setDirectionsResult(directions);
        return;
      }

      try {
        const directionsService = new window.google.maps.DirectionsService();
        const res = await directionsService.route({
          origin: directions.origin || directions.from,
          destination: directions.destination || directions.to,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirectionsResult(res);
        if (onDirections && res && res.routes && res.routes.length > 0) {
          const legs = res.routes[0].legs || []
          const distanceMeters = legs.reduce((sum, leg) => sum + (leg.distance?.value || 0), 0)
          try { onDirections({ directionsResult: res, distanceMeters }) } catch(e) { console.warn(e) }
        }
      } catch (err) {
        console.error("Error obteniendo directions:", err);
      }
    };
    fetchDirections();
  }, [directions, isLoaded]);

  const onUnmount = useCallback(() => {}, []);

  // When we have a directions result and a map instance, fit the map to the route bounds
  useEffect(() => {
    if (!directionsResult || !mapInstance || typeof window === "undefined") return;

    try {
      const route = directionsResult.routes && directionsResult.routes[0];
      if (!route) return;

      // If route.bounds is a LatLngBounds (client DirectionsService), use it directly
      if (route.bounds && typeof route.bounds.extend === "function") {
        mapInstance.fitBounds(route.bounds);
        return;
      }

      // If REST-style bounds (northeast/southwest) exist, build LatLngBounds
      if (route.bounds && route.bounds.northeast && route.bounds.southwest && window.google && window.google.maps) {
        const ne = route.bounds.northeast;
        const sw = route.bounds.southwest;
        const gb = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(sw.lat, sw.lng),
          new window.google.maps.LatLng(ne.lat, ne.lng)
        );
        mapInstance.fitBounds(gb);
        return;
      }

      // Fallback: extend bounds using leg start/end locations
      if (route.legs && window.google && window.google.maps) {
        const gb = new window.google.maps.LatLngBounds();
        route.legs.forEach((leg) => {
          if (leg.start_location) gb.extend(leg.start_location);
          if (leg.end_location) gb.extend(leg.end_location);
          if (leg.steps) {
            leg.steps.forEach((step) => {
              if (step.start_location) gb.extend(step.start_location);
              if (step.end_location) gb.extend(step.end_location);
            });
          }
        });
        mapInstance.fitBounds(gb);
      }
    } catch (err) {
      console.warn("No se pudo ajustar bounds de la ruta:", err);
    }
  }, [directionsResult, mapInstance]);

  if (loadError) return <div>Error cargando Google Maps</div>;
  if (!isLoaded) return <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Cargando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom} onLoad={(map) => setMapInstance(map)} onUnmount={onUnmount}>
      {markers.map((m, i) => (
        <Marker key={i} position={m.position} />
      ))}

      {directionsResult && <DirectionsRenderer directions={directionsResult} />}
    </GoogleMap>
  );
}
