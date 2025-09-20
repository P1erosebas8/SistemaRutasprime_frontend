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

      {/* HISTORIA */}
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

      {/* MISIÓN Y VISIÓN  */}
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
                <strong>Misión:</strong> Brindar un servicio de transporte de carga ágil,
                seguro y transparente, conectando a empresas y usuarios con
                camioneros disponibles en todo el Perú.
              </p>
              <p>
                <strong>Visión:</strong> Ser la empresa líder en transporte en
                Perú, reconocida por la innovación, sostenibilidad y servicio
                de excelencia.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VALORES */}
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
              <ul>
                <li><strong>Seguridad:</strong> Cuidamos cada carga.</li>
                <li><strong>Responsabilidad:</strong> Cumplimos con cada compromiso.</li>
                <li><strong>Innovación:</strong> Usamos tecnología de última generación.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FLOTA */}
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