import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCar, FaUser } from "react-icons/fa";
import HeroSection from "../components/HeroSection";

function ComoRegistroCon() {
    return (
        <>
            <HeroSection
                title="Rutas Prime"
                subtitle="Tu seguridad y comodidad en cada viaje"
                background="src/assets/flota_transp.jpg"
                height="50vh"
                align="center"
                backgroundPosition="center 40%"
            />

            <section className="py-5"style={{ backgroundColor: "#0d2842ff" }}>
                <Container>
                    <h2 className="text-center mb-4 text-white">¿Cómo registrarse?</h2>
                    <Row>
                        <Col md={6}>
                            <Card className="mb-4 shadow-sm border-0">
                                <Card.Body>
                                    <h4 className="d-flex align-items-center mb-3">
                                        <FaCar className="me-2 text-primary" />
                                        Registrarse como Conductor
                                    </h4>
                                    <ul className="list-unstyled text-start">
                                        <li>📝 Completa el formulario con tus datos personales, número de contacto y la información de tu vehículo.</li>
                                        <li>🚘 Agrega los datos de tu vehículo</li>
                                        <li>📄 Adjunta los documentos solicitados (licencia de conducir, SOAT, tarjeta de propiedad, etc.).</li>
                                        <li>✅ Espera la verificación</li>
                                        <li>🎯 Una vez verificados tus datos, recibirás la confirmación y podrás empezar a recibir solicitudes de viaje.</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="mb-4 shadow-sm border-0">
                                <Card.Body>
                                    <h4 className="d-flex align-items-center mb-3">
                                        <FaUser className="me-2 text-success" />
                                        Registrarse como Cliente
                                    </h4>
                                    <ul className="list-unstyled text-start">
                                        <li>🎯 Accede a nuestra página o aplicación.</li>
                                        <li>📝 Completa el formulario con tu nombre, correo electrónico y número de contacto.</li>
                                        <li>📧 Confirma tu cuenta a través del correo o SMS que recibirás.</li>
                                        <li>🔍 Busca conductores disponibles</li>
                                        <li>📍 Elige tu destino y reserva tu viaje</li>
                                        <li>🚀 ¡Listo! Ahora puedes buscar conductores disponibles y reservar tu viaje de manera rápida y segura.</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
export default ComoRegistroCon;
