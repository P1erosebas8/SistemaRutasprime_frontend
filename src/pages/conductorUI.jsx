import { useState, useEffect } from "react";
import { Card, Button, ListGroup, Spinner } from "react-bootstrap";
import GoogleMapView from "../components/GoogleMapView";
import { geocodeAddress } from "../services/maps";

// NOTE: Este archivo ahora usa Google Maps a través de `GoogleMapView`.

function ConductorUI() {
  const [position, setPosition] = useState([-12.0464, -77.0428]); // Lima
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, origen: "Av. Arequipa 1234", destino: "Plaza San Martín", origenCoord: null, destinoCoord: null },
    { id: 2, origen: "Av. Javier Prado 500", destino: "Parque Kennedy", origenCoord: null, destinoCoord: null },
  ]);
  const [ruta, setRuta] = useState([]);
  const [viajeActivo, setViajeActivo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => console.warn("No se pudo obtener la ubicación del conductor")
      );
    }
  }, []);

  const getCoordinates = async (direccion) => {
    try {
      const res = await geocodeAddress(direccion);
      if (res) return [res.lat, res.lng];
      alert(`No se encontró ubicación para "${direccion}"`);
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Usaremos Google Directions en el componente GoogleMapView pasando
  // `directionsRequest` como { origin: {lat,lng}, destination: {lat,lng} }.

  const aceptarViaje = async (solicitud) => {
    setLoading(true);
    const coordOrigen = await getCoordinates(solicitud.origen);
    const coordDestino = await getCoordinates(solicitud.destino);

    if (coordOrigen && coordDestino) {
      solicitud.origenCoord = coordOrigen;
      solicitud.destinoCoord = coordDestino;
      setViajeActivo(solicitud);
      setPosition(coordOrigen);
      setDirectionsRequest({ origin: { lat: coordOrigen[0], lng: coordOrigen[1] }, destination: { lat: coordDestino[0], lng: coordDestino[1] } });
    }
    setLoading(false);
  };

  const [directionsRequest, setDirectionsRequest] = useState(null);

  return (
    <div className="map-container">
      <div className="map-element">
        <GoogleMapView
          center={{ lat: position[0], lng: position[1] }}
          zoom={13}
          markers={
            viajeActivo
              ? [
                  { position: { lat: viajeActivo.origenCoord[0], lng: viajeActivo.origenCoord[1] } },
                  { position: { lat: viajeActivo.destinoCoord[0], lng: viajeActivo.destinoCoord[1] } },
                ]
              : [{ position: { lat: position[0], lng: position[1] } }]
          }
          directions={directionsRequest}
        />
      </div>

      <Card className="floating-card text-light border-0 shadow-lg p-4">
        <h4 className="fw-bold mb-3 text-center">🛻 Solicitudes cercanas</h4>
        <ListGroup variant="flush">
          {solicitudes.map((sol) => (
            <ListGroup.Item
              key={sol.id}
              className="d-flex justify-content-between align-items-center p-3 shadow-sm mb-2 rounded hover-card"
            >
              <div>
                <strong>De:</strong> {sol.origen} <br />
                <strong>A:</strong> {sol.destino}
              </div>
              <Button
                variant="success"
                onClick={() => aceptarViaje(sol)}
                disabled={loading || viajeActivo?.id === sol.id}
              >
                {loading && viajeActivo?.id === sol.id ? (
                  <Spinner animation="border" size="sm" />
                ) : "Aceptar"}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {viajeActivo && (
          <div className="mt-3 text-center">
            <Button variant="primary" onClick={() => { setViajeActivo(null); setRuta([]); }}>
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
          background: linear-gradient(135deg, #1e2a52, #27396d);
          backdrop-filter: blur(12px);
          border-radius: 20px 20px 0 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-3px);
          background-color: rgba(255,255,255,0.05);
        }
        .floating-card button {
          min-width: 90px;
        }
      `}</style>
    </div>
  );
}

export default ConductorUI;