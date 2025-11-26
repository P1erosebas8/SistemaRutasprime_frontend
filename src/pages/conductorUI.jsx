import { useState, useEffect } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ChangeView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 13);
  }, [coords, map]);
  return null;
}

function ConductorUI() {
  const [position, setPosition] = useState([-12.0464, -77.0428]); // Lima
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, origen: "Av. Arequipa 1234", destino: "Plaza San Martín", origenCoord: null, destinoCoord: null },
    { id: 2, origen: "Av. Javier Prado 500", destino: "Parque Kennedy", origenCoord: null, destinoCoord: null },
  ]);
  const [ruta, setRuta] = useState([]);
  const [viajeActivo, setViajeActivo] = useState(null);

  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    iconSize: [40, 40],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => console.warn("No se pudo obtener la ubicación del conductor")
      );
    }
  }, []);

  const getCoordinates = async (direccion) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      alert(`No se encontró ubicación para "${direccion}"`);
      return null;
    }
  };

  const getRuta = async (origen, destino) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${origen[1]},${origen[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.routes && data.routes.length > 0) {
      const coords = data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
      setRuta(coords);
    } else {
      alert("No se pudo obtener la ruta.");
    }
  };

  const aceptarViaje = async (solicitud) => {
    const coordOrigen = await getCoordinates(solicitud.origen);
    const coordDestino = await getCoordinates(solicitud.destino);

    if (coordOrigen && coordDestino) {
      solicitud.origenCoord = coordOrigen;
      solicitud.destinoCoord = coordDestino;
      setViajeActivo(solicitud);
      setPosition(coordOrigen);
      await getRuta(coordOrigen, coordDestino);
    }
  };

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} className="map-element">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView coords={position} />
        {viajeActivo && (
          <>
            <Marker position={viajeActivo.origenCoord} icon={markerIcon}>
              <Popup>Origen</Popup>
            </Marker>
            <Marker position={viajeActivo.destinoCoord} icon={markerIcon}>
              <Popup>Destino</Popup>
            </Marker>
          </>
        )}
        {ruta.length > 0 && <Polyline positions={ruta} color="blue" />}
      </MapContainer>

      <Card className="floating-card text-light border-0 shadow-lg p-4">
        <h4 className="fw-bold mb-3">🛻 Solicitudes cercanas</h4>
        <ListGroup variant="flush">
          {solicitudes.map((sol) => (
            <ListGroup.Item
              key={sol.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>De:</strong> {sol.origen} <br />
                <strong>A:</strong> {sol.destino}
              </div>
              <Button
                variant="success"
                onClick={() => aceptarViaje(sol)}
              >
                Aceptar
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {viajeActivo && (
          <div className="mt-3 text-center">
            <Button variant="primary" onClick={() => setViajeActivo(null)}>
              Terminar viaje
            </Button>
          </div>
        )}
      </Card>

      <style>{`
        .map-container {
          position: relative;
          width: 100%;
          height: 100vh;
        }
        .map-element {
          width: 100%;
          height: 100%;
        }
        .floating-card {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 95%;
          max-width: 500px;
          background: #1e2a52;
          backdrop-filter: blur(12px);
          border-radius: 20px 20px 0 0;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}

export default ConductorUI;