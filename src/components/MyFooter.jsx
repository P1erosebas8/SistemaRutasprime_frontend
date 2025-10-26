import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyFooter() {
    // Colores definidos
    const ACCENT_COLOR = "#FFC107"; // Amarillo vibrante y limpio para el acento
    
    // Degradado: Azul Apagado ARRIBA a Azul Oscuro/Morado (#303049) ABAJO
    const GRADIENT_START = "#283E6D";   // Un azul apagado para la parte superior
    const GRADIENT_END = "#303049";     // El color específico que pediste para la parte inferior

    return (
        <footer style={{ marginTop: "50px", fontFamily: "Poppins, sans-serif" }}>
            
            {/* Main Section con el nuevo Degradado */}
            <div
                style={{
                    // Degradado: Azul Apagado (GRADIENT_START) en la parte superior (0%) a Azul Oscuro/Morado (GRADIENT_END) en la parte inferior (100%)
                    background: `linear-gradient(180deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                    color: "#ffffffff", // Texto blanco sobre fondo oscuro
                    padding: "70px 0 50px", 
                    boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.15)', 
                }}
            >
                <Container>
                    <Row className="gy-5 text-center text-md-start">
                        
                        {/* Col 1: Logo & Info */}
                        <Col lg={3} md={6}>
                            <h3
                                className="fw-bolder mb-3"
                                style={{ color: "white", letterSpacing: "2px", fontSize: "1.8rem" }}
                            >
                                RUTAS<span style={{ color: ACCENT_COLOR }}>PRIME</span>
                            </h3>
                            <p className="small mb-3">
                                Av. Tomás Marsano 3846<br />Santiago de Surco, Lima - Perú
                            </p>
                            <p className="small mb-0 fw-semibold">
                                <i className="bi bi-hand-thumbs-up-fill me-2 fs-5" style={{ color: ACCENT_COLOR }}></i>
                                <strong>243,528</strong> clientes confían en nosotros
                            </p>
                        </Col>

                        {/* Col 2: Enlaces Rápidos */}
                        <Col lg={3} md={6}>
                            <h5
                                className="fw-bold mb-4 text-uppercase"
                                style={{ color: ACCENT_COLOR }}
                            >
                                Enlaces Rápidos
                            </h5>
                            <ul className="list-unstyled small">
                                <li className="mb-2">
                                    <Link to="/acercade" className="text-white text-decoration-none hover-link">
                                        Acerca De Nosotros
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/preguntasfrec" className="text-white text-decoration-none hover-link">
                                        Preguntas Frecuentes
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/privacidad" className="text-white text-decoration-none hover-link">
                                        Políticas de Privacidad
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terminos" className="text-white text-decoration-none hover-link">
                                        Términos y Condiciones
                                    </Link>
                                </li>
                            </ul>
                        </Col>

                        {/* Col 3: Contacto */}
                        <Col lg={3} md={6}>
                            <h5 className="fw-bold mb-4 text-uppercase" style={{ color: ACCENT_COLOR }}>
                                Contáctanos
                            </h5>
                            <p className="small mb-1">
                                <i className="bi bi-telephone-fill me-2" style={{ color: ACCENT_COLOR }}></i>
                                Central: <strong>+01 217 7777</strong>
                            </p>
                            <p className="small mb-1">
                                <i className="bi bi-headset me-2" style={{ color: ACCENT_COLOR }}></i>
                                Soporte 24/7: <strong>201 217 7785</strong>
                            </p>
                            <p className="small mb-1">
                                <i className="bi bi-truck me-2" style={{ color: ACCENT_COLOR }}></i>
                                Flota: <strong>+01 217 7790</strong>
                            </p>
                            <p className="small mb-0">
                                <i className="bi bi-envelope-fill me-2" style={{ color: ACCENT_COLOR }}></i>
                                <a href="mailto:RutasPrime@gmail.com" className="text-white text-decoration-none hover-link">
                                    RutasPrime@gmail.com
                                </a>
                            </p>
                        </Col>

                        {/* Col 4: Plataformas */}
                        <Col lg={3} md={6}>
                            <h5 className="fw-bold mb-4 text-uppercase" style={{ color: ACCENT_COLOR }}>
                                Plataformas
                            </h5>
                            <p className="small mb-3">Descarga nuestra app móvil:</p>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Google Play"
                                    width="140"
                                    className="img-fluid hover-scale"
                                    style={{ filter: 'grayscale(0.1)' }}
                                />
                            </a>
                        </Col>
                    </Row>

                    {/* Íconos Sociales */}
                    <Row className="mt-5 pt-4 border-top border-light-subtle">
                        <Col className="text-center">
                            {[
                                { icon: "facebook", link: "https://www.facebook.com" },
                                { icon: "twitter-x", link: "https://x.com" },
                                { icon: "instagram", link: "https://www.instagram.com" },
                                { icon: "linkedin", link: "https://pe.linkedin.com" },
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mx-3 text-white social-icon"
                                    style={{ fontSize: "1.7rem" }}
                                >
                                    <i className={`bi bi-${item.icon}`}></i>
                                </a>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Copyright Section - Fondo sólido del color final del degradado */}
            <div style={{ backgroundColor: GRADIENT_END, color: "#B0B0B0", padding: "15px 0" }}>
                <Container className="text-center small">
                    © {new Date().getFullYear()} RutasPrime. Todos los derechos reservados.
                </Container>
            </div>

            {/* Styles for hover effects */}
            <style jsx="true">{`
                .hover-link:hover {
                    color: ${ACCENT_COLOR} !important;
                    transition: color 0.3s ease;
                }
                .hover-scale:hover {
                    transform: scale(1.05);
                    transition: transform 0.3s ease;
                }
                .social-icon:hover {
                    color: ${ACCENT_COLOR} !important;
                    transform: translateY(-4px);
                    transition: transform 0.3s ease, color 0.3s ease;
                }
            `}</style>
        </footer>
    );
}

export default MyFooter;