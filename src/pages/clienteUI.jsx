import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
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

function ClienteUI() {
  const [formData, setFormData] = useState({
    origen: "",
    destino: "",
    tipo: "",
    comentarios: ""
  });

  const [origenCoord, setOrigenCoord] = useState(null);
  const [destinoCoord, setDestinoCoord] = useState(null);
  const [ruta, setRuta] = useState([]);
  const [position, setPosition] = useState([-12.0464, -77.0428]); // Lima
  const [mostrarForm, setMostrarForm] = useState(true);

  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    iconSize: [40, 40],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => console.warn("No se pudo obtener la ubicación del usuario")
      );
    }
  }, []);

  const getCoordinates = async (direccion) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      direccion
    )}`;
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
      alert("No se pudo obtener la ruta entre los puntos.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { origen, destino } = formData;
    if (!origen || !destino) {
      alert("Por favor ingresa origen y destino.");
      return;
    }

    const coordOrigen = await getCoordinates(origen);
    const coordDestino = await getCoordinates(destino);

    if (coordOrigen && coordDestino) {
      setOrigenCoord(coordOrigen);
      setDestinoCoord(coordDestino);
      setPosition(coordOrigen);
      await getRuta(coordOrigen, coordDestino);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={position}
        zoom={13}
        className="map-element"
        whenReady={(map) => {
          map.target.on("click", () => setMostrarForm(false));
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView coords={position} />

        {origenCoord && (
          <Marker position={origenCoord} icon={markerIcon}>
            <Popup>Origen</Popup>
          </Marker>
        )}
        {destinoCoord && (
          <Marker position={destinoCoord} icon={markerIcon}>
            <Popup>Destino</Popup>
          </Marker>
        )}

        {ruta.length > 0 && <Polyline positions={ruta} color="red" />}
      </MapContainer>

      {!mostrarForm && (
        <Button
          className="btn-flotante fw-bold"
          onClick={() => setMostrarForm(true)}
        >
          ^
        </Button>
      )}

      {mostrarForm && (
        <Card className="floating-card text-light border-0 shadow-lg p-4">
          <h4 className="fw-bold mb-3">🚚 Solicitar un servicio</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Punto de inicio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej. Av. Arequipa 1234, Lima"
                    name="origen"
                    value={formData.origen}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Destino</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej. Plaza San Martín, Lima"
                    name="destino"
                    value={formData.destino}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Tipo de carga</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar...</option>
                    <option>Mudanza</option>
                    <option>Productos grandes</option>
                    <option>Industrial</option>
                    <option>Comercial</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Comentarios adicionales</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Ej. Cuidado con los vidrios..."
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mt-3">
              <Button type="submit" className="fw-bold px-4 py-2" variant="info">
                Buscar conductor
              </Button>
            </div>
          </Form>
        </Card>
      )}

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
          max-width: 950px;
          background: #1e2a52;
          backdrop-filter: blur(12px);
          border-radius: 20px 20px 0 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .btn-flotante {
          position: absolute;
          bottom: 50px;
          right: 20px;
          z-index: 1500;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(45deg, #344675, #3e5899ff);
          border: none;
          font-size: 32px;
          color: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          transition: 0.3s;
        }

        .btn-flotante:hover {
          background: linear-gradient(45deg, #1e2a52, #2f4280ff);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default ClienteUI;
