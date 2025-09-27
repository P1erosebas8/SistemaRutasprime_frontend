import 'bootstrap/dist/css/bootstrap.min.css';
import CargaInic from "../assets/CargaInic.jpg";
import HeroSection from "../components/HeroSection";
import ListaConImagen from "../components/ListadoConImagen";
import CarruselCards from "../components/CaruselConCards";
import { Link } from "react-router-dom";




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
  return (
    <>
      <HeroSection
        title="Bienvenido a Rutas Prime"
        subtitle="Tu seguridad y comodidad en cada viaje"
        background="src/assets/flota_transp.jpg"
        height="80vh"
        align="left"
        backgroundPosition="center 40%"
        botonTexto="Conocenos"
        botonLink="/AcercaDe"
      />
      <ListaConImagen
        features={listaInicio}
        image={CargaInic}
        imageAlt="Camión cargando"
        imagePosition="right"
        title="Por que viajar hoy con RutasPrime"
      />
      <section style={{ backgroundColor: "#303049ff", color: "white", padding: "40px 0" }}>
        <CarruselCards features={carruselInicio} />
      </section>
    </>
  );
}

export default Inicio;