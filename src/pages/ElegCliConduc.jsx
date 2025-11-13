import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ElegCliConduc() {
    const navigate = useNavigate();

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient position-relative">
            <Container className="text-center text-light py-5">
                <h1 className="mb-5 fw-bold display-5 text-shadow">
                    ¿Cómo deseas usar la aplicación?
                </h1>
                <Row className="g-5 justify-content-center align-items-center position-relative">
                    <Col md={5} className="d-flex justify-content-center">
                        <Card
                            className="option-card text-center p-4 bg-transparent text-light shadow-lg border-0"
                            onClick={() => navigate("/clienteUI")}
                        >
                            <Card.Img
                                variant="top"
                                src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                                className="option-icon mx-auto"
                            />
                            <Card.Body>
                                <Card.Title className="fw-bold fs-3">Cliente</Card.Title>
                                <Card.Text className="text-white-50 fs-5">
                                    Usa la aplicación para solicitar servicios fácilmente.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col
                        xs={12}
                        md="auto"
                        className="d-none d-md-block text-center"
                        style={{ width: "50px" }}
                    >
                        <div className="divider"></div>
                    </Col>

                    <Col md={5} className="d-flex justify-content-center">
                        <Card
                            className="option-card text-center p-4 bg-transparent text-light shadow-lg border-0"
                            onClick={() => navigate("/conductorUI")}
                        >
                            <Card.Img
                                variant="top"
                                src="https://cdn-icons-png.flaticon.com/128/870/870130.png"
                                className="option-icon mx-auto"
                            />
                            <Card.Body>
                                <Card.Title className="fw-bold fs-3">Conductor</Card.Title>
                                <Card.Text className="text-white-50 fs-5">
                                    Recibe solicitudes de encargos en tu rango de busqueda
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* 🔹 Estilos internos */}
            <style>{`
        .bg-gradient {
          background: #1E2A52 !important;
          overflow: hidden;
        }

        .text-shadow {
          text-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);
        }

        .option-card {
          transition: all 0.35s ease;
          cursor: pointer;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.08) !important;
          border-radius: 20px;
        }

        .option-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.15) !important;
        }

        .option-icon {
          width: 130px;
          height: 130px;
          margin-bottom: 1rem;
          filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.4));
          transition: transform 0.3s ease;
        }

        .option-card:hover .option-icon {
          transform: scale(1.1);
        }

        .divider {
          height: 300px;
          margin: 0 auto;
          background: #000;
          border-radius: 1px;
        }

        @media (max-width: 767px) {
          .divider {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}

export default ElegCliConduc;
