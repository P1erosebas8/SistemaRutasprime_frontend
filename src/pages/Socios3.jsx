import { Container, Row, Col, Card, Button } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";

// Paleta de Colores
const PRIMARY_COLOR = "#0d2842"; // Azul oscuro corporativo
const ACCENT_COLOR = "#00bfff"; // Celeste
const LIGHT_BACKGROUND = "#f0f8ff"; // Fondo Azul muy claro

// --- Estilos Dinámicos y Animación para Tarjetas ---

// Estilo base para las tarjetas para la transición inicial y el borde superior
const cardBaseStyle = (accentColor) => ({
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    cursor: 'pointer',
    borderTop: `5px solid ${accentColor}`,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', // Sombra inicial muy ligera
    height: '100%',
});

const handleMouseEnter = (e) => {
    // Aplicar animación de subida y sombra más prominente
    e.currentTarget.style.transform = 'translateY(-8px)';
    e.currentTarget.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.15), 0 0 0 2px ${ACCENT_COLOR}`; // Sombra y un ligero "glow"
};

const handleMouseLeave = (e) => {
    // Volver al estado inicial
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
};

// --- Componente Soporte ---

function Soporte() {
    return (
        <>
            {/* 1. HeroSection */}
            <HeroSection
                title="Centro de Soporte 24/7"
                subtitle="Estamos aquí para ayudarte. Elige tu canal de contacto preferido."
                background="src/assets/flota_transp.jpg"
                height="50vh"
                align="center"
                backgroundPosition="center 30%"
            />
            
            {/* 2. Sección Principal de Soporte */}
            <section className="py-5 py-lg-6 bg-white">
                <Container>
                    <h2 
                        className="text-center mb-5 fw-bold display-5" 
                        style={{ color: PRIMARY_COLOR }}
                    >
                        Canales de Atención Directa
                    </h2>
                    
                    {/* Tarjetas de Contacto Rediseñadas con Hover */}
                    <Row className="justify-content-center mb-5">
                        {[
                            { icon: "📞", title: "Teléfono", text: "+51 999 888 777" },
                            { icon: "📧", title: "Correo Electrónico", text: "soporte@rutasprime.com" },
                            { icon: "💬", title: "WhatsApp", text: "+51 911 222 333" },
                        ].map((item, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <Card 
                                    className="h-100 border-0 rounded-3" 
                                    style={cardBaseStyle(ACCENT_COLOR)} // Aplicamos el estilo base con transición
                                    onMouseEnter={handleMouseEnter} // Evento al entrar
                                    onMouseLeave={handleMouseLeave} // Evento al salir
                                >
                                    <Card.Body className="p-4 text-center">
                                        <div className="mb-3" style={{ fontSize: '2.5rem', color: ACCENT_COLOR }}>
                                            {item.icon}
                                        </div>
                                        <Card.Title className="fw-bold mb-2 h4" style={{ color: PRIMARY_COLOR }}>
                                            {item.title}
                                        </Card.Title>
                                        <Card.Text className="lead text-secondary">
                                            {item.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* 3. Llamada a la Acción (CTA) */}
                    <div 
                        className="p-5 text-center rounded-3 shadow-sm" 
                        style={{ backgroundColor: LIGHT_BACKGROUND }}
                    >
                        <h4 className="mb-3 fw-bold" style={{ color: PRIMARY_COLOR }}>
                            ¿Necesitas ayuda específica o tienes una consulta compleja?
                        </h4>
                        <p className="lead mb-4 text-muted">
                            Nuestro equipo está listo para recibir tu solicitud detallada a través de nuestro formulario.
                        </p>
                        
                        <Button 
                            as={Link} 
                            to="/Contactanos" 
                            className="btn-lg fw-bold shadow-lg"
                            style={{ backgroundColor: ACCENT_COLOR, color: PRIMARY_COLOR, borderColor: ACCENT_COLOR }}
                        >
                            Ir al Formulario de Contacto &rarr;
                        </Button>
                    </div>
                </Container>
            </section>
        </>
    );
}

export default Soporte;