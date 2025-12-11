import { Container, Row, Col, Card } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
import FlotaTransp from "../assets/flota_transp.jpg";
import { Link } from "react-router-dom";

function Soporte() {
  return (
    <>
      <HeroSection
        title="Rutas Prime"
        subtitle="Tu seguridad y comodidad en cada viaje"
        background={FlotaTransp}
        height="50vh"
        align="center"
        backgroundPosition="center 40%"
      />
      <section className="py-5 text-white" style={{ backgroundColor: "#0d2842ff" }}>
        <Container>
          <h2 className="text-center mb-4">Soporte y Ayuda</h2>
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm text-center">
                <Card.Body>
                  <Card.Title>📞 Teléfono</Card.Title>
                  <Card.Text>+51 999 888 777</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm text-center">
                <Card.Body>
                  <Card.Title>📧 Correo</Card.Title>
                  <Card.Text>soporte@rutasprime.com</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm text-center">
                <Card.Body>
                  <Card.Title>💬 WhatsApp</Card.Title>
                  <Card.Text>+51 911 222 333</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <h4 className="text-center mb-3">Envíanos tu consulta</h4>
          <Link
            to="/Contactanos"
            className="btn btn-primary"
            style={{ padding: "6px 16px", fontSize: "1rem" }}
          >
            Contáctanos
          </Link>
        </Container>
      </section>
    </>
  );
}

export default Soporte;