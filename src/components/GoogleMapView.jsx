import React, { useMemo, useState, useCallback } from "react";
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "100%" };

export default function GoogleMapView({ center = { lat: -12.0464, lng: -77.0428 }, zoom = 13, markers = [], directions = null }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const [directionsResult, setDirectionsResult] = useState(null);

  // When `directions` prop changes, we store it so renderer can use it.
  React.useEffect(() => {
    const fetchDirections = async () => {
      if (!directions || !isLoaded) return;

      // If the prop contains a REST result from our `getDirections` service,
      // the service stored it in `directions.result` (an object with `routes`).
      if (directions.result && (directions.result.routes || directions.result.status)) {
        setDirectionsResult(directions.result);
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
      } catch (err) {
        console.error("Error obteniendo directions:", err);
      }
    };
    fetchDirections();
  }, [directions, isLoaded]);

  const onUnmount = useCallback(() => {}, []);

  if (loadError) return <div>Error cargando Google Maps</div>;
  if (!isLoaded) return <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Cargando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom} onUnmount={onUnmount}>
      {markers.map((m, i) => (
        <Marker key={i} position={m.position} />
      ))}

      {directionsResult && <DirectionsRenderer directions={directionsResult} />}
    </GoogleMap>
  );
}
