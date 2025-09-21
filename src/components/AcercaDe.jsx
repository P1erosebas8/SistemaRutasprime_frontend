import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import seguridad from "../assets/seguridad.jpg";
import misionyvision from "../assets/mision y vision.jpg";
import historia from "../assets/historia.jpg";
import flota from "../assets/flota.webp";
import valores from "../assets/valores.jpg";
import ReuFondo from "../assets/ReuFondo.jpg";
import NosTransPesa from "../assets/NosTransPesa.jpg";
import CargaSegura from "../assets/CargaSegura.jpg";

function AcercaDe() {
  return (
    <>
      <section
        className="d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          backgroundImage: `url(${ReuFondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "80vh",
          position: "relative",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>
        <div className="position-relative">
          <h1 className="display-3 fw-bold">Acerca de Rutas Prime</h1>
          <p className="lead">Llevando tu carga con seguridad</p>
        </div>
      </section>
      <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
        <Container>
          <Row className="align-items-center text-white flex-md-row-reverse">
            <Col md={6}>
              <img
                src={NosTransPesa}
                alt="Descripción"
                className="img-fluid rounded rounded"
              />
            </Col>
            <Col md={6}>
              <h1 className="text-white">Sobre Nosotros</h1>
              <p className="text-white">
                Sobre RutasPrime - Somos una empresa de transporte de carga formal. 100% peruana y areditada ante la ATU.
                Tenemos relacioens comerciales con empresas importantesen PEru, contamos con "Cero incidencias" registradas durante mas de 25 años de operaciones
              </p>
              <p className="text-white">
                Contamos con conductores calificados y vehículos modernos para garantizar tu comodidad y seguridad.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5" style={{ backgroundColor: "#1E1F20" }}>
        <Container>
          <Row className="align-items-center text-white">
            <Col md={6}>
              <img
                src={historia}
                alt="Nuestra historia"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>Nuestra Historia</h2>
              <p>
                Rutas Prime nació con la visión de transformar el transporte de carga en el país.
                Inspirados en la eficiencia de las apps de movilidad, creamos una plataforma que
                conecta empresas y clientes con camiones de manera rápida, confiable y transparente.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5" style={{ backgroundColor: "#1E1F20" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="text-white">Haz que que tu carga llegue segura</h1>
              <p className="text-white">
                No te estreses mientras viajas por la ciudad en Perú. ¡RutasPrime te ayuda! Nuestra app es tu mejor opción para viajes asequibles y cómodos. Hemos diseñado Rutas Prime pensando
                en la facilidad, así que olvídate de regatear y de esperar afuera: reserva tu viaje en minutos, consulta el precio por adelantado y sigue a tu conductor en tiempo real. Leva tu carga y experimenta una nueva forma de desplazarte por Perú con vehículos de calidad y un alto nivel de servicio.</p>
            </Col>
            <Col md={6}>
              <img src={CargaSegura} alt="Descripción" className="img-fluid rounded" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
        <Container>
          <Row className="align-items-center text-white flex-md-row-reverse">
            <Col md={6}>
              <img
                src={misionyvision}
                alt="Misión y visión"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>Misión y Visión</h2>
              <p>
                <strong>Misión</strong> - Brindar un servicio de transporte de carga ágil,
                seguro y transparente, conectando a empresas y usuarios con
                camioneros disponibles en todo el Perú.
              </p>
              <p>
                <strong>Visión</strong> - Ser la empresa líder en transporte en
                Perú, reconocida por la innovación, sostenibilidad y servicio
                de excelencia.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5" style={{ backgroundColor: "#1E1F20" }}>
        <Container>
          <Row className="align-items-center text-white">
            <Col md={6}>
              <img
                src={valores}
                alt="Nuestros valores"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>Nuestros Valores</h2>
              <ul className="list-unstyled">
                <li><strong>Seguridad:</strong> Cuidamos cada carga.</li>
                <li><strong>Responsabilidad:</strong> Cumplimos con cada compromiso.</li>
                <li><strong>Innovación:</strong> Usamos tecnología de última generación.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
        <Container>
          <Row className="align-items-center text-white flex-md-row-reverse">
            <Col md={6}>
              <img
                src={flota}
                alt="Nuestra flota"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>Nuestra Flota</h2>
              <p>
                Contamos con una moderna flota de camiones de diferentes capacidades,
                diseñados para adaptarse a las necesidades de cada cliente,
                desde envíos pequeños hasta grandes cargas logísticas.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SEGURIDAD */}
      <section className="py-5" style={{ backgroundColor: "#1E1F20" }}>
        <Container>
          <Row className="align-items-center text-white">
            <Col md={6}>
              <img
                src={seguridad}
                alt="Seguridad en el transporte"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2>Compromiso con la Seguridad</h2>
              <p>
                La seguridad está en el centro de nuestro servicio. Cada viaje es
                monitoreado en tiempo real y nuestros conductores cumplen altos
                estándares para garantizar que la carga llegue en perfectas condiciones.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AcercaDe;