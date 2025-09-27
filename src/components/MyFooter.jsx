import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyFooter() {
  return (
    <footer>
      <div style={{ backgroundColor: "#263885", color: "#fff", padding: "40px 0" }}>
        <Container>
          <Row>
            <Col md={3}>
              <h3 className="fw-bold">RUTASPRIME</h3>
              <p>Av. Tomás Marsano 3846<br />Santiago de Surco, Lima - Perú</p>
              <p><strong>243528 👍</strong></p>
            </Col>
            <Col md={3}>
              <h5 className="fw-bold">INFORMACIÓN</h5>
              <ul className="list-unstyled">
                <li><Link to="/privacidad" className="text-white text-decoration-none">Políticas de Privacidad</Link></li>
                <li><Link to="/reclamaciones" className="text-white text-decoration-none">Libro de Reclamaciones</Link></li>
                <li><Link to="/terminos" className="text-white text-decoration-none">Términos y Condiciones</Link></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5 className="fw-bold">CONTACTO</h5>
              <p>Central: +01 217 7777</p>
              <p>Afiliaciones: 201 217 7785</p>
              <p>Flota: +01 217 7790</p>
              <p>Email: RutasPrime@gmail.com</p>
            </Col>
            <Col md={3}>
              <h5 className="fw-bold">PLATAFORMAS</h5>
              <p>Búscanos en:</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                width="150"
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-center">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook text-white fs-4 mx-2"></i></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter text-white fs-4 mx-2"></i></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram text-white fs-4 mx-2"></i></a>
              <a href="https://pe.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin text-white fs-4 mx-2"></i></a>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#182E8F", color: "#fff", padding: "10px 0" }}>
        <Container className="text-center">
          <small>© Copyright RutasPrime. Todos los Derechos Reservados 2025</small>
        </Container>
      </div>
    </footer>
  );
}

export default MyFooter;
