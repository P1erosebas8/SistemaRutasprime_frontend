import { Container, Row, Col, Card } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
import { FaTruck, FaMapMarkerAlt, FaRoute, FaClock } from "react-icons/fa"; // Iconos para decoración
import "bootstrap/dist/css/bootstrap.min.css"; // Aseguramos el import de Bootstrap CSS
import React from "react";

// Estilos y Colores
const colorFondoPrincipal = "white";
const colorCelesteAcento = "#64B5F6"; // Celeste vibrante para acentos
const colorTextoPrincipal = "#333333"; // Gris oscuro
const colorGrisClaro = "#f8f9fa"; // Gris muy claro

// Estilo para el título principal
const h2Style = {
  color: colorTextoPrincipal,
  fontSize: "2.8em",
  fontWeight: "bold",
  borderBottom: `3px solid ${colorCelesteAcento}`,
  paddingBottom: "15px",
  marginBottom: "40px",
};

// Componente para la Tarjeta de Ruta con hover effect
const RutaCard = ({ ruta, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Estilos dinámicos para el efecto hover
  const cardStyle = {
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
    boxShadow: isHovered
      ? `0 10px 20px rgba(0, 0, 0, 0.2)`
      : `0 4px 8px rgba(0, 0, 0, 0.1)`,
    border: `1px solid ${colorGrisClaro}`,
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: colorFondoPrincipal,
  };

  return (
    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card
        className="h-100"
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="text-center mb-3">
            <FaRoute size={40} style={{ color: colorCelesteAcento }} />
          </div>
          <Card.Title
            className="text-center"
            style={{ fontWeight: "bold", color: colorCelesteAcento, fontSize: "1.3em" }}
          >
            {ruta.origen} <span style={{ color: colorTextoPrincipal }}>→</span> {ruta.destino}
          </Card.Title>
          <Card.Text className="text-center mt-3" style={{ color: colorTextoPrincipal }}>
            <span style={{ fontWeight: "bold" }}>
              <FaClock style={{ marginRight: "8px", color: colorCelesteAcento }} />
              Duración Estimada:
            </span>
            <br />
            {ruta.duracion}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

function Rutas() {
  const rutas = [
    { origen: "Lima", destino: "Trujillo", duracion: "10h - 12h" },
    { origen: "Lima", destino: "Arequipa", duracion: "17h - 24h" },
    { origen: "Lima", destino: "Cusco", duracion: "25h - 30h" },
    { origen: "Arequipa", destino: "Trujillo", duracion: "22h - 24h" },
    { origen: "Arequipa", destino: "Cusco", duracion: "10h - 12h" },
    { origen: "Arequipa", destino: "Junin", duracion: "18h - 20h" },
    { origen: "Ica", destino: "Lima", duracion: "4h - 5h" },
    { origen: "Ayacucho", destino: "Lima", duracion: "10h - 12h" },
    { origen: "Puno", destino: "Ica", duracion: "17h - 18h" },
  ];

  return (
    <>
      <HeroSection
        title="Rutas Disponibles"
        subtitle="Conecta tu negocio con los principales destinos del país."
        background="src/assets/contactanos.jpeg"
        height="50vh"
        align="center"
        backgroundPosition="center top"
        // Aseguramos que el texto del Hero sea visible (ej. blanco)
        // Aunque esto depende del componente HeroSection, asumimos buen contraste.
      />
      
      {/* Sección principal con fondo blanco */}
      <section className="py-5" style={{ backgroundColor: colorFondoPrincipal }}>
        <Container>
          {/* Título principal estilizado */}
          <h2 className="text-center" style={h2Style}>
            <FaMapMarkerAlt style={{ marginRight: "15px", color: colorCelesteAcento }} />
            Nuestras Rutas Habituales
          </h2>
          
          <Row className="justify-content-center">
            {rutas.map((ruta, index) => (
              <RutaCard key={index} ruta={ruta} index={index} />
            ))}
          </Row>
          
          <h3 
            className="text-center mt-5 p-4" 
            style={{ 
              color: colorTextoPrincipal, 
              backgroundColor: colorGrisClaro, 
              borderRadius: "10px",
              border: `2px dashed ${colorCelesteAcento}` // Borde decorativo
            }}
          >
            <FaTruck style={{ marginRight: "10px", color: colorCelesteAcento }} />
            ¡Viaja por todo el País con RutasPrime! Solicita tu cotización personalizada.
          </h3>
        </Container>
      </section>
    </>
  );
}

export default Rutas;