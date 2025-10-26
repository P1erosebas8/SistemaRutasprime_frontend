import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCity, FaMapMarkedAlt } from "react-icons/fa"; // Iconos para decoración
import CardDescrip from "../components/CardConDescripcion"; // Componente externo
import HeroSection from "../components/HeroSection";
import React from "react";

// --- Definición de Estilos ---
const colorFondoPrincipal = "white";
const colorCelesteAcento = "#64B5F6"; // Celeste vibrante
const colorTextoPrincipal = "#333333"; // Gris oscuro

// Estilo para el título principal
const h2Style = {
  color: colorTextoPrincipal,
  fontSize: "2.8em",
  fontWeight: "bold",
  borderBottom: `3px solid ${colorCelesteAcento}`,
  paddingBottom: "15px",
  marginBottom: "40px",
};

// Estilo para el mensaje de cierre (pronto nuevas provincias)
const footerMessageStyle = {
  color: colorTextoPrincipal,
  backgroundColor: "#f8f9fa", // Fondo gris muy claro
  border: `2px dashed ${colorCelesteAcento}`, // Borde celeste discontinuo
  borderRadius: "10px",
  padding: "20px",
  marginTop: "50px",
  fontWeight: "600",
};

// --- Componente Principal ---
function Ciudades() {
  const ciudades = [
    // Agrego una descripción por defecto, ya que el componente CardDescrip la espera.
    { titulo: "Lima", descripcion: "Capital y centro logístico del Perú. Conectamos toda la región central.", imagen: "src/assets/Lima.jpg", botonLink: null },
    { titulo: "Trujillo", descripcion: "Punto clave en la costa norte. Ideal para rutas mineras y agrícolas.", imagen: "src/assets/trujillo.jpg", botonLink: null },
    { titulo: "Arequipa", descripcion: "Corazón del sur. Acceso a importantes centros de producción.", imagen: "src/assets/Arequipa.jpeg", botonLink: null },
    { titulo: "Cusco", descripcion: "Centro del eje surandino. Rutas desafiantes con gran demanda.", imagen: "src/assets/Cusco.jpeg", botonLink: null },
    { titulo: "Junin", descripcion: "Región de la sierra central. Enlace vital para el transporte de mercancías.", imagen: "src/assets/Junin.jpeg", botonLink: null },
    { titulo: "Ica", descripcion: "Conocida por su agroindustria. Rutas rápidas y de alto volumen.", imagen: "src/assets/ICa.jpeg", botonLink: null },
  ];

  return (
    <>
      <HeroSection
        title="Ciudades Clave"
        subtitle="Estamos expandiendo nuestra red a los principales centros de negocio del país."
        background="src/assets/contactanos.jpeg"
        height="50vh"
        align="center"
        backgroundPosition="center top"
      />
      
      {/* Sección principal con fondo BLANCO */}
      <section className="py-5" style={{ backgroundColor: colorFondoPrincipal }}>
        <Container>
          {/* Título principal estilizado con icono */}
          <h2 className="text-center" style={h2Style}>
            <FaCity style={{ marginRight: "15px", color: colorCelesteAcento }} />
            Ciudades Disponibles
          </h2>
          
          <Row>
            {ciudades.map((req, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                {/* Aplicamos una sombra directamente a la columna para simular la elevación
                  sin modificar el componente CardDescrip
                */}
                <div 
                    className="shadow-lg rounded-3 h-100" 
                    style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                    // Opcional: Agregar efecto de hover si es posible, aunque esto es más fácil en un componente custom.
                >
                    <CardDescrip
                        titulo={req.titulo}
                        descripcion={req.descripcion}
                        imagen={req.imagen}
                        botonLink={req.botonLink}
                    />
                </div>
              </Col>
            ))}
          </Row>
          
          {/* Mensaje de cierre estilizado */}
          <h3 className="text-center" style={footerMessageStyle}>
            <FaMapMarkedAlt style={{ marginRight: "10px", color: colorCelesteAcento }} />
            ¡Pronto nuevas provincias para cubrir toda la geografía del país!
          </h3>
        </Container>
      </section>
    </>
  );
}

export default Ciudades;