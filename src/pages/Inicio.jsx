import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'; // Importado para usarlo explícitamente en el Hero
import { Link } from "react-router-dom";

// Importaciones de componentes y assets
import CargaInic from "../assets/Inico.jpg";
import ListaConImagen from "../components/ListadoConImagen";
import CarruselCards from "../components/CaruselConCards";
import Facturacion from "../components/Facturacion.jsx";
// Se asume que ListadoConImagen y SeccionConImagen son el mismo componente y se usa solo ListadoConImagen (ListaConImagen)


// Paleta de colores para el diseño mejorado
const PRIMARY_COLOR = "#0d2842"; // Azul oscuro corporativo
const ACCENT_COLOR = "#ffc107"; // Amarillo/Dorado para acentos
const LIGHT_BACKGROUND = "#f8f9fa"; // Gris claro

function Inicio() {
  const listaInicio = [
    {
      icon: "bi-check-circle-fill",
      text: "Verificación de seguridad de todos los conductores que incluye verificación de antecedentes criminales negativos",
    },
    {
      icon: "bi-check-circle-fill",
      text: "Centro de emergencia 24/7 para reporte de incidentes.",
    },
    {
      icon: "bi-check-circle-fill",
      text: "Página centrada en el transporte de carga pesada.",
    },
  ];
  const carruselInicio = [
    { icon: "bi-shield-lock", title: "Seguridad", text: "Tu seguridad es nuestro principal objetivo. Por ello, continuamente desarrollamos nuevas funciones en la aplicación que te harán sentir más protegido en cada viaje." },
    { icon: "bi-cash-coin", title: "Precios Accesibles", text: "Solicita viajes a precios del mercado." },
    { icon: "bi-building", title: "Sedes", text: "Estamos ubicados en Av. Tomás Marsano 3846, Surco, Lima – Perú. Con el objetivo de expandirnos a más provincias." },
    { icon: "bi-telephone", title: "Soporte 24/7", text: "Para asistirte con cualquier inconveniente o pregunta, tenemos una central telefónica disponible las 24 horas del día, los siete días de la semana: +51-xxx xxx xxx." },
    { icon: "bi-calendar-event", title: "Disponibilidad", text: "Viajes cuando los necesites." },
    { icon: "bi-geo-alt", title: "Cobertura", text: "Llegamos a más lugares para ti." }
  ];

  const facturacionAsesores = [
    {
      title: "Facturación Electrónica",
      text: "Factura todos los viajes de tu empresa de manera electrónica y olvídate de los recibos de papel."
    },
    {
      title: "Asesores de Atención",
      text: "Contamos con asesores de las 24/7 del año, para apoyarte cuando lo necesites."
    },
  ];


  return (
    <>
      {/* 1. HERO PRINCIPAL: Diseño más limpio y destacado. */}
      <section
        className="d-flex align-items-center py-5 py-lg-0" // Mayor padding en desktop
        style={{
          backgroundColor: "white", // Fondo blanco
          minHeight: "90vh", // Más alto para dominar la vista
          marginTop: "0", // Eliminar el mt-5 para que el hero toque el navbar
        }}
      >
        <Container>
          <Row className="align-items-center flex-row-reverse"> {/* Imagen a la derecha en móvil/tablet, Imagen a la izquierda en desktop */}
            
            {/* Imagen: Movida a la primera columna en el código para aparecer a la derecha en desktop con 'flex-row-reverse' */}
            <Col lg={6} className="d-flex justify-content-center mb-5 mb-lg-0">
              <img
                src={CargaInic}
                alt="Transporte de carga pesada RutasPrime"
                className="img-fluid rounded-4" // Bordes redondeados más suaves
                style={{
                  maxHeight: "550px",
                  objectFit: 'cover',
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)", // Sombra más pronunciada
                  border: `5px solid ${PRIMARY_COLOR}` // Borde sutil del color primario
                }}
              />
            </Col>

            {/* Texto y Botones */}
            <Col lg={6} className="text-center text-lg-start">
              {/* Título en color primario para impacto */}
              <h1 className="display-3 fw-bolder mb-3" style={{ color: PRIMARY_COLOR }}>
                RUTASPRIME: <br/> La Logística que Mueve tu Carga
              </h1>

              {/* Párrafo con texto principal */}
              <p className="lead fs-5 mb-5" style={{ color: "#495057" }}>
                Tu plataforma confiable para el <span className="fw-bold">TRANSPORTE DE CARGA PESADA.</span> Conéctate con conductores verificados y asegura tus envíos a nivel nacional.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start">
                {/* Botón Principal (Clientes) con color de acento */}
                <Link to="/Clientes/login" className="btn btn-lg me-3 mb-3 mb-sm-0 fw-bold" 
                  style={{ backgroundColor: PRIMARY_COLOR, color: 'white', borderColor: PRIMARY_COLOR }}>
                  Acceso Clientes
                </Link>
                {/* Botón Secundario (Transportistas) con el color primario como contorno */}
                <Link to="/transportistas/LoginTransportista" className="btn btn-lg fw-bold"
                  style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}>
                  Acceso Transportistas
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 2. SECCIÓN DE CARACTERÍSTICAS (LISTA) */}
      <ListaConImagen
        features={listaInicio}
        image={CargaInic} // Usando URL Placeholder
        imageAlt="Camión cargando"
        imagePosition="right"
        title="Por qué elegir RutasPrime hoy"
        // Estilos para el componente: se recomienda que ListaConImagen tenga un fondo claro (LIGHT_BACKGROUND)
        className="py-6"
      />

      {/* 3. SECCIÓN DE CAROUSEL DE BENEFICIOS: Fondo de color claro (LIGHT_BACKGROUND) */}
      <section className="py-5 py-lg-6" style={{ backgroundColor: LIGHT_BACKGROUND }}>
        <Container>
          {/* Título más grande y enfocado */}
          <h2 className="text-center mb-5 fw-bold display-6" style={{ color: PRIMARY_COLOR }}>
            Nuestros Compromisos
          </h2>
          <CarruselCards features={carruselInicio} />
        </Container>
      </section>

      {/* 4. SECCIÓN DE FACTURACIÓN Y ASESORES (Facturacion) */}
      <Facturacion
        features={facturacionAsesores}
        image={CargaInic}
        imageAlt="Facturación y Asesores de Atención"
        imagePosition="left" // Cambiado a izquierda para alternar el diseño
        title="Beneficios exclusivos para tu empresa"
        // Se recomienda que este componente 'Facturacion' tenga un fondo blanco
        className="py-5"
      />



    </>
  );
}

export default Inicio;
