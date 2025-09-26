import seguridad from "../assets/seguridad.jpg";
import misionyvision from "../assets/mision y vision.jpg";
import historia from "../assets/historia.jpg";
import flota from "../assets/flota.webp";
import valores from "../assets/valores.jpg";
import ReuFondo from "../assets/ReuFondo.jpg";
import NosTransPesa from "../assets/NosTransPesa.jpg";
import CargaSegura from "../assets/CargaSegura.jpg";
import HeroSection from "../components/HeroSection";
import SeccionConImagen from "../components/SeccionConImagen";

function AcercaDe() {
  return (
    <>
      <HeroSection
        title="Acerca de Rutas Prime"
        subtitle="Llevando tu carga con seguridad"
        background={ReuFondo}
        align="center"
        height="80vh"
        backgroundPosition="center"
      />
      <SeccionConImagen
        title="Sobre Nosotros"
        text={[
          "Sobre RutasPrime - Somos una empresa de transporte de carga formal. 100% peruana y acreditada ante la ATU.",
          "Tenemos relacioens comerciales con empresas importantesen Peru, contamos con Cero incidencias registradas durante mas de 25 años de operaciones."
        ]}
        image={NosTransPesa}
        imageAlt=""
        imagePosition="right"
        bgColor="#2C2C2C"
        textColor="#ffffff"
      />
      <SeccionConImagen
        title="Nuestra Historia"
        text={[
          "Rutas Prime nació con la visión de transformar el transporte de carga en el país.Inspirados en la eficiencia de las apps de movilidad, creamos una plataforma queconecta empresas y clientes con camiones de manera rápida, confiable y transparente."
        ]}
        image={historia}
        imageAlt=""
        imagePosition="left"
        bgColor="#2C2C2C"
        textColor="#ffffff"
      />
      <SeccionConImagen
        title="Haz que que tu carga llegue segura"
        text={[
          "No te estreses mientras viajas por la ciudad en Perú. ¡RutasPrime te ayuda! Nuestra app es tu mejor opción para viajes asequibles y cómodos. Hemos diseñado Rutas Prime pensandoen la facilidad, así que olvídate de regatear y de esperar afuera: reserva tu viaje en minutos, consulta el precio por adelantado y sigue a tu conductor en tiempo real. Leva tu carga y experimenta una nueva forma de desplazarte por Perú con vehículos de calidad y un alto nivel de servicio."
        ]}
        image={CargaSegura}
        imageAlt=""
        imagePosition="right"
        bgColor="#1E1F20"
        textColor="#ffffff"
      />
      <SeccionConImagen
        title="Misión y Visión"
        text={[
          "Misión - Brindar un servicio de transporte de carga ágil,seguro y transparente, conectando a empresas y usuarios concamioneros disponibles en todo el Perú",
          "Visión - Ser la empresa líder en transporte enPerú, reconocida por la innovación, sostenibilidad y serviciode excelencia."
        ]}
        image={misionyvision}
        imageAlt="Descrición"
        imagePosition="left"
        bgColor="#1E1F20"
        textColor="#ffffff"
      />
      <SeccionConImagen
        title="Nuestros valores"
        text={[
          "Seguridad - Cuidamos cada carga.",
          "Responsabilidad - Cumplimos con cada compromiso.",
          "Innovación - Usamos tecnología de última generación."
        ]}
        image={valores}
        imageAlt=""
        imagePosition="right"
        bgColor="#2C2C2C"
        textColor="#ffffff"
      />
      <SeccionConImagen
        title="Nuestra flota"
        text={[
          "Contamos con una moderna flota de camiones de diferentes capacidades, diseñados para adaptarse a las necesidades de cada cliente, desde envíos pequeños hasta grandes cargas logísticas."
        ]}
        image={flota}
        imageAlt=""
        imagePosition="left"
        bgColor="#2C2C2C"
        textColor="#ffffff"
      />
      <SeccionConImagen
        title="Compromiso con la Seguridad"
        text={[
          "La seguridad está en el centro de nuestro servicio. Cada viaje es monitoreado en tiempo real y nuestros conductores cumplen altos estándares para garantizar que la carga llegue en perfectas condiciones."
        ]}
        image={seguridad}
        imageAlt=""
        imagePosition="right"
        bgColor="#1E1F20"
        textColor="#ffffff"
      />
    </>
  );
}

export default AcercaDe;