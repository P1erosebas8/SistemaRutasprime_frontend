import flota_transp from "../assets/flota_transp.jpg"
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import CargaInic from "../assets/CargaInic.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Inicio() {
  return (
    <>
      <section
        className="d-flex flex-column justify-content-center text-white"
        style={{
          backgroundImage: "url(" + flota_transp + ")",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          width: "100vw",
          height: "80vh",
          position: "relative"
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        ></div>

        <div className="position-relative text-start ms-5">
          <h1 className="display-1 fw-bold">Envia por todo el pais con Rutas Prime</h1>
          <p className="lead">El sitio preferidos de los transportistas y </p>
          <Link as={Link} to="/AcercaDe" class="btn btn-primary" style={{ padding: "6px 16px", fontSize: "1rem" }}
          >Conocenos</Link>
        </div>
      </section>
      <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
        <Container>
          <Row className="align-items-center text-white flex-md-row-reverse">
            <Col md={6}>
              <img
                src={CargaInic}
                alt="Descripción"
                className="img-fluid rounded rounded"
              />
            </Col>
            <Col md={6} className="text-start">
              <h1 className="text-white">Por qué viajar hoy con RutasPrime</h1>
              <ul className="list-unstyled text-white">
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2" style={{ fontSize: "1.2rem" }}></i>
                  <span>Verificación de seguridad de todos los conductores que incluye verificación de antecedentes criminales negativos</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2" style={{ fontSize: "1.2rem" }}></i>
                  <span>Centro de emergencia 24/7 para reporte de incidentes.</span>
                </li>
                <li className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-2" style={{ fontSize: "1.2rem" }}></i>
                  <span>Página centrada en el transporte de carga pesada.</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      <section
        style={{ backgroundColor: "#303049ff", color: "white", padding: "40px 0" }}
      >
        <div className="d-none d-md-block">
          <Carousel interval={3000} indicators={false}>
            <Carousel.Item>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <Card className="h-100 text-center bg-dark text-white">
                      <i className="bi bi-shield-lock" style={{ fontSize: "2.5rem" }}></i>
                      <Card.Body>
                        <Card.Title>Seguridad</Card.Title>
                        <Card.Text>
                          Tu seguridad es nuestro principal objetivo. Por ello, continuamente desarrollamos nuevas funciones en la aplicación que te harán sentir más protegido en cada viaje
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-md-4">
                    <Card className="h-100 text-center bg-dark text-white">
                      <i className="bi bi-cash-coin" style={{ fontSize: "2.5rem" }}></i>
                      <Card.Body>
                        <Card.Title>Precios Accesibles</Card.Title>
                        <Card.Text>
                          Solicita viajes a los precios del mercado.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-md-4">
                    <Card className="h-100 text-center bg-dark text-white">
                      <i className="bi bi-building" style={{ fontSize: "2.5rem" }}></i>
                      <Card.Body>
                        <Card.Title>Sedes</Card.Title>
                        <Card.Text>
                          Estamos ubicados en Av. Tomás Marsano 3846, Surco, Lima – Perú. Con el objetivo de expandirnos a más provincias.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <Card className="h-100 text-center bg-dark text-white">
                      <i className="bi bi-telephone" style={{ fontSize: "2.5rem" }}></i>
                      <Card.Body>
                        <Card.Title>Soporte 24/7</Card.Title>
                        <Card.Text>
                          Para asistirte con cualquier inconveniente o pregunta, tenemos una central telefónica disponible las 24 horas del día, los siete días de la semana: +51-xxx xxx xxx.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-md-4">
                    <Card className="h-100 text-center bg-dark text-white">
                      <i className="bi bi-calendar-event" style={{ fontSize: "2.5rem" }}></i>
                      <Card.Body>
                        <Card.Title>Disponibilidad</Card.Title>
                        <Card.Text>
                          Viajes cuando los necesites.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-md-4">
                    <Card className="h-100 text-center bg-dark text-white">
                      <i className="bi bi-geo-alt" style={{ fontSize: "2.5rem" }}></i>
                      <Card.Body>
                        <Card.Title>Cobertura</Card.Title>
                        <Card.Text>
                          Llegamos a más lugares para ti.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="d-block d-md-none">
          <Carousel interval={3000} indicators={false}>
            <Carousel.Item>
              <Card className="h-100 text-center bg-dark text-white card-custom">
                <i className="bi bi-shield-lock" style={{ fontSize: "2.5rem" }}></i>
                <Card.Body>
                  <Card.Title>Seguridad</Card.Title>
                  <Card.Text>
                    Tu seguridad es nuestro principal objetivo. Por ello, continuamente desarrollamos nuevas funciones en la aplicación que te harán sentir más protegido en cada viaje
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card className="h-100 text-center bg-dark text-white card-custom">
                <i className="bi bi-cash-coin" style={{ fontSize: "2.5rem" }}></i>
                <Card.Body>
                  <Card.Title>Precios Accesibles</Card.Title>
                  <Card.Text>Solicita viajes a los precios del mercado.</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card className="h-100 text-center bg-dark text-white card-custom">
                <i className="bi bi-building" style={{ fontSize: "2.5rem" }}></i>
                <Card.Body>
                  <Card.Title>Sedes</Card.Title>
                  <Card.Text>Estamos ubicados en Av. Tomás Marsano 3846 Santiago de Surco, Lima - Perú. Con el objetivo de expandirnos a más provincias
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            <Carousel.Item>
              <Card className="h-100 text-center bg-dark text-white card-custom">
                <i className="bi bi-telephone" style={{ fontSize: "2.5rem" }}></i>
                <Card.Body>
                  <Card.Title>Soporte 24/7</Card.Title>
                  <Card.Text>Para asistirte con cualquier inconveniente o pregunta, tenemos una central telefónica disponible las 24 horas del día, los siete días de la semana: +51-xxx xxx xxx.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card className="h-100 text-center bg-dark text-white card-custom">
                <i className="bi bi-calendar-event" style={{ fontSize: "2.5rem" }}></i>
                <Card.Body>
                  <Card.Title>Disponibilidad</Card.Title>
                  <Card.Text>Viajes cuando los necesites.</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card className="h-100 text-center bg-dark text-white card-custom">
                <i className="bi bi-geo-alt" style={{ fontSize: "2.5rem" }}></i>
                <Card.Body>
                  <Card.Title>Cobertura</Card.Title>
                  <Card.Text>Llegamos a más lugares para ti.</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default Inicio;