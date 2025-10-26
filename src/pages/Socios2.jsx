import { Container, Row, Col } from "react-bootstrap";
import CardDescrip from "../components/CardConDescripcion"; 
import HeroSection from "../components/HeroSection";

// --- Paleta de Colores Mejorada con Celeste ---
const PRIMARY_COLOR = "#0d2842"; // Azul oscuro corporativo
const ACCENT_COLOR = "#00bfff"; // Celeste brillante (Deep Sky Blue)
const LIGHT_BACKGROUND = "#f0f8ff"; // Fondo Azul muy claro (Alice Blue)

// Array de requisitos (sin cambios, ya que son datos)
const requisitos = [
  {
    titulo: "Tarjeta de Sanidad",
    descripcion:
      "Debes subir la tarjeta de sanidad vigente en formato digital, asegurándote que el documento sea legible y válido.",
    imagen: "src/assets/tarjeta-sanidad.png",
    botonLink: "https://www.gob.pe",
  },
  {
    titulo: "Antecedentes Penales",
    descripcion:
      "Adjunta tu certificado de antecedentes penales. Solo se aceptan documentos emitidos en los últimos 90 días.",
    imagen: "src/assets/antecedentes-penales.png",
    botonLink: "https://www.gob.pe",
  },
  {
    titulo: "Licencia de Conducir",
    descripcion:
      "Sube tu licencia de conducir vigente. Debe visualizarse claramente tu nombre completo, número de licencia, categoría y fecha de vencimiento.",
    imagen: "src/assets/licencia-conducir.jpg",
    botonLink: "https://www.gob.pe",
  },
  {
    titulo: "Foto del Transportista",
    descripcion:
      "Carga una foto actual y a color del conductor. Fondo claro, sin gafas oscuras ni gorros.",
    imagen: "src/assets/foto-conductor.png",
    botonLink: "https://www.gob.pe",
  },
  {
    titulo: "Tarjeta de Propiedad",
    descripcion:
      "Sube la tarjeta de propiedad del vehículo. El documento debe mostrar el número de placa, nombre del propietario, fecha de emisión y códigos de registro.",
    imagen: "src/assets/tarjeta-propiedad.png",
    botonLink: "https://www.gob.pe",
  },
  {
    titulo: "Tarjeta de Circulación",
    descripcion:
      "Adjunta la tarjeta de circulación vigente, asegurándote que la información sea visible y sin partes borrosas.",
    imagen: "src/assets/tarjeta-circulacion.png",
    botonLink: "https://www.gob.pe",
  },
  {
    titulo: "SOAT",
    descripcion:
      "Sube el documento del SOAT vigente. Debe visualizarse el número de póliza, la vigencia y la placa del vehículo asegurado.",
    imagen: "src/assets/soat.png",
    botonLink: "https://www.gob.pe",
  },
];

// --- Estilos Dinámicos Mejorados con Celeste ---
const cardContainerStyle = {
  transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out, border 0.4s ease-out',
  cursor: 'pointer',
  border: '1px solid #dcdcdc', // Borde gris más claro y sutil
  borderRadius: '0.75rem', // Bordes más redondeados
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', // Sombra inicial muy ligera
  height: '100%',
  backgroundColor: 'white', // Aseguramos que el fondo de la columna sea blanco
  overflow: 'hidden' // Esconde cualquier desborde de la tarjeta interna
};

const handleMouseEnter = (e) => {
  e.currentTarget.style.transform = 'translateY(-8px)'; // Subir más para un mejor efecto
  e.currentTarget.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 4px ${ACCENT_COLOR}`; // Sombra y un "glow" celeste
  e.currentTarget.style.borderColor = ACCENT_COLOR; // Borde celeste
};

const handleMouseLeave = (e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)'; // Vuelve a la sombra sutil
  e.currentTarget.style.borderColor = '#dcdcdc'; // Vuelve al borde gris
};

function RequisitosConductor() {
  return (
    <>
      {/* 1. HeroSection Mejorado: Aseguramos el texto blanco para contraste */}
      <HeroSection
        title="¡Únete a Rutas Prime!"
        subtitle="Conviértete en un transportista de élite. Cumple con los siguientes requisitos para iniciar tu postulación."
        background="src/assets/flota_transp.jpg"
        height="60vh" 
        align="start" 
        backgroundPosition="center 40%"
        // Nota: Asumiendo que HeroSection aplica texto blanco automáticamente.
      />

      {/* 2. Sección Principal de Requisitos: Fondo Celeste Muy Claro (LIGHT_BACKGROUND) */}
      <section className="py-5 py-lg-6" style={{ backgroundColor: LIGHT_BACKGROUND }}>
        <Container>
          {/* Título: Usa color primario (azul oscuro) */}
          <h2 className="text-center mb-5 mb-lg-6 fw-bold display-5" style={{ color: PRIMARY_COLOR }}>
            <span role="img" aria-label="Portapapeles" style={{ color: ACCENT_COLOR }}>📋</span> Requisitos del Transportista
          </h2>
          
          {/* Fila de Tarjetas */}
          <Row className="justify-content-center">
            {requisitos.map((req, index) => (
              // Contenedor que aplica el borde y la animación
              <Col
                md={6}
                lg={4}
                key={index}
                className="mb-4 d-flex align-items-stretch p-0 p-sm-2" // Añadimos padding interno para que la sombra no choque con el borde de la columna vecina.
              >
                <div
                    style={{ ...cardContainerStyle, flexGrow: 1 }} // Usamos un <div> interno para aplicar estilos de tarjeta y dejar Col para el layout
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <CardDescrip
                        titulo={req.titulo}
                        descripcion={req.descripcion}
                        imagen={req.imagen}
                        botonLink={req.botonLink}
                        // NOTA: CardDescrip DEBE tener fondo blanco y CERO bordes/sombras internos.
                    />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 3. Sección de Llamada a la Acción (CTA): Fondo blanco (alternando) */}
      <section className="py-5" style={{ backgroundColor: "white" }}>
        <Container className="text-center">
          <h3 className="mb-3" style={{ color: PRIMARY_COLOR }}>¿Listo para unirte a la mejor flota?</h3>
          <p className="lead mb-4" style={{ color: "#343a40" }}>
            Si cumples con todos los requisitos, haz clic para acceder al formulario de postulación y comienza a ganar más hoy mismo.
          </p>
          <a 
            href="https://www.gob.pe" 
            className="btn btn-lg shadow-lg fw-bold"
            // Botón con el color celeste de acento
            style={{ backgroundColor: ACCENT_COLOR, color: PRIMARY_COLOR, borderColor: ACCENT_COLOR }} 
          >
            Postular Ahora <span aria-hidden="true">&rarr;</span>
          </a>
        </Container>
      </section>
    </>
  );
}
export default RequisitosConductor;