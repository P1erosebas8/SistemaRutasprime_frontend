import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Valores from "../assets/Valoress.jpg"; // 👈 Asegúrate de que esta ruta sea correcta

// --- Definición de Colores ---
const colorFondoPrincipal = "white";
const colorTurquesaAcento = "#20A8A8";
const colorTextoPrincipal = "#333333";
const colorTextoSecundario = "#6c757d";
const colorBordeClaro = "#e0e0e0";
const colorFondoSeccion = "white";

// --- Estilos ---
const h2Style = {
  color: colorTextoPrincipal,
  fontSize: "3em",
  fontWeight: "bold",
  marginBottom: "15px",
};

const subtitleStyle = {
  color: colorTextoSecundario,
  fontSize: "1.2em",
  marginBottom: "80px",
};

// --- Componente Imagen Principal ---
const MainImageBlock = ({ imageUrl, altText }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageBlockStyle = {
    height: "500px",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: isHovered
      ? "0 15px 30px rgba(0, 0, 0, 0.3)"
      : "0 10px 20px rgba(0, 0, 0, 0.2)",
    transform: isHovered ? "scale(1.01)" : "scale(1)",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  };

  return (
    <div
      style={imageBlockStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageUrl || Valores}
        alt={altText}
        style={imgStyle}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://via.placeholder.com/600x500/20A8A8/FFFFFF?text=Valores+Rutas+Prime";
          e.target.style.objectFit = "contain";
        }}
      />
    </div>
  );
};

// --- Iconos en SVG ---
const IconShield = ({ color }) => (
  <svg fill={color} viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
    <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm0 18c-3.87 0-7.32-2.18-8.81-5.5H20.81c-1.49 3.32-4.94 5.5-8.81 5.5z" />
  </svg>
);
const IconHandshake = ({ color }) => (
  <svg fill={color} viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
    <path d="M18.8 6.4c-.4.4-.9.6-1.4.6h-3.8c-.6 0-1.1-.3-1.4-.7l-4.2-4.2c-.3-.3-.4-.7-.4-1.2s.1-.9.4-1.2l.6-.6c.3-.3.8-.4 1.2-.4s.9.1 1.2.4l4.2 4.2c.4.4.7.9.7 1.4v3.8c0 .6-.3 1.1-.7 1.4l-3.3 3.3c-.4.4-.9.7-1.4.7h-1.8v-3.3c0-.6-.3-1.1-.7-1.4L4.8 9.3c-.4-.4-.9-.6-1.4-.6H.8c-.6 0-1.1.3-1.4.7l-.6.6c-.3.3-.4.7-.4 1.2s.1.9.4 1.2l4.2 4.2c.4.4.9.7 1.4.7h3.8c.6 0 1.1-.3 1.4-.7l3.3-3.3c.4-.4.7-.9.7-1.4V11.8h1.8c.6 0 1.1-.3 1.4-.7l4.2-4.2c.3-.3.4-.7.4-1.2s-.1-.9-.4-1.2l-.6-.6z" />
  </svg>
);
const IconLightbulb = ({ color }) => (
  <svg fill={color} viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
    <path d="M10 20c0 1.1.9 2 2 2s2-.9 2-2h-4zm2-18c-3.86 0-7 3.14-7 7 0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
  </svg>
);
const IconTruck = ({ color }) => (
  <svg fill={color} viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
    <path d="M22 8h-4v-2c0-1.1-.9-2-2-2h-3.17c-.57-1.16-1.76-2-3.08-2-1.32 0-2.51.84-3.08 2H4c-1.1 0-2 .9-2 2v10h2c0 1.1.9 2 2 2s2-.9 2-2h8c0 1.1.9 2 2 2s2-.9 2-2h2c1.1 0 2-.9 2-2V9c0-.55-.45-1-1-1zm-6 0H4V6h12v2z" />
  </svg>
);

// --- Valor Individual ---
const ValorItem = ({ icon: Icon, title, text }) => (
  <div
    className="d-flex align-items-start mb-4 p-4 rounded-3"
    style={{
      border: `1px solid ${colorBordeClaro}`,
      backgroundColor: colorFondoPrincipal,
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    }}
  >
    <span
      className="p-3 me-3 rounded-circle"
      style={{
        width: "4rem",
        height: "4rem",
        color: colorTurquesaAcento,
        border: `2px solid ${colorTurquesaAcento}`,
        flexShrink: 0,
      }}
    >
      <Icon color={colorTurquesaAcento} />
    </span>
    <div>
      <h4
        style={{
          color: colorTextoPrincipal,
          fontWeight: "bold",
          fontSize: "1.4em",
          marginBottom: "8px",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          color: colorTextoSecundario,
          lineHeight: "1.6",
          marginBottom: "0",
        }}
      >
        {text}
      </p>
    </div>
  </div>
);

// --- Sección Principal ---
function ValoresPrime({ imagenValores }) {
  return (
    <section
      className="py-5"
      style={{
        backgroundColor: colorFondoSeccion,
        paddingTop: "150px",
      }}
    >
      <Container>
        <div className="text-center">
          <h2 style={h2Style}>Nuestros Valores Prime</h2>
          <p style={subtitleStyle}>
            Los pilares que nos guían para brindar un servicio de excelencia.
          </p>
        </div>

        <Row className="align-items-center">
          <Col md={6} className="mb-5 mb-md-0">
            <MainImageBlock
              imageUrl={imagenValores || Valores}
              altText="Valores Corporativos de Rutas Prime"
            />
          </Col>

          <Col md={6} className="ps-md-5">
            <ValorItem
              icon={IconShield}
              title="Seguridad"
              text="Cuidamos cada carga. Monitoreo 24/7 y protocolos rigurosos para garantizar que tu mercancía viaje protegida."
            />
            <ValorItem
              icon={IconHandshake}
              title="Responsabilidad"
              text="Cumplimos con cada compromiso. Garantizamos la entrega a tiempo y ofrecemos total transparencia en cada proceso logístico."
            />
            <ValorItem
              icon={IconLightbulb}
              title="Innovación"
              text="Usamos tecnología de última generación para optimizar cada ruta y proceso. Siempre buscando la mejor solución para tu carga."
            />
            <ValorItem
              icon={IconTruck}
              title="Flota y Confiabilidad"
              text="Contamos con una moderna flota de camiones de diferentes capacidades, diseñados para adaptarse a tus necesidades de envío."
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ValoresPrime;
