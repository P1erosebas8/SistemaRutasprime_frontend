import { Container, Row, Col, Card } from "react-bootstrap";
import React from 'react';
import FlotaTransp from "../assets/flota_transp.jpg"; // 👈 Importa la imagen real del hero

// --- Componente HeroSection Local ---
const HeroSection = ({ title, subtitle, background, height = '50vh', align = 'center', backgroundPosition = 'center' }) => {
    const textAlignment = align === 'center' ? 'text-center' : 'text-left';

    const heroStyle = {
        height: height,
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: backgroundPosition,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: 'white',
        paddingTop: '64px', // evita que se tape con navbar fijo
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1,
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 2,
        textShadow: '0 2px 4px rgba(0,0,0,0.6)',
    };

    return (
        <div style={heroStyle}>
            <div style={overlayStyle} />
            <Container style={contentStyle} className={textAlignment}>
                <h1 className="display-3 fw-bold mb-3">{title}</h1>
                <p className="lead fs-4">{subtitle}</p>
            </Container>
        </div>
    );
};

// --- Iconos SVG personalizados ---
const IconCar = ({ color, size = '1.5em', className = '' }) => (
  <svg fill={color} viewBox="0 0 24 24" className={className}
    style={{ width: size, height: size, transition: 'transform 0.3s ease' }}>
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 13v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1
      c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-6.99zM6.5 18c-.83 0-1.5-.67-1.5-1.5S5.67 15 6.5 15s1.5.67 1.5 1.5
      S7.33 18 6.5 18zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5
      1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 13l1.09-4.32C6.35 8.23 6.88 8 7.5 8h9
      c.62 0 1.15.23 1.41.68L19 13H5z"/>
  </svg>
);

const IconUser = ({ color, size = '1.5em', className = '' }) => (
  <svg fill={color} viewBox="0 0 24 24" className={className}
    style={{ width: size, height: size, transition: 'transform 0.3s ease' }}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4
      1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2
      c0-2.66-5.33-4-8-4z"/>
  </svg>
);

// --- Punto de acento ---
const AccentDot = ({ color }) => (
    <span style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: color,
        marginTop: '8px',
        flexShrink: 0
    }} />
);

// --- Paso individual ---
const StepItem = ({ text, color }) => (
    <Card.Text className="d-flex align-items-start mb-3 fs-5" style={{ color: '#333333' }}>
        <AccentDot color={color} />
        <span className="ms-3">{text}</span>
    </Card.Text>
);

function ComoRegistroCon() {
    const colorTurquesaAcento = "#20A8A8";
    const colorFondoClaro = "#f8f9fa";
    const colorTextoOscuro = "#333333";
    const colorTurquesaClaro = "#E0F7F7";

    const cardTitleStyle = {
        fontWeight: 'bold',
        backgroundColor: colorTurquesaClaro,
        padding: '15px 25px',
        margin: '-25px -25px 20px -25px',
        color: colorTurquesaAcento,
        borderBottom: `2px solid ${colorTurquesaAcento}`,
    };

    const cardBodyStyle = {
        borderLeft: `5px solid ${colorTurquesaAcento}`,
        padding: '25px',
    };

    const cardHoverStyle = `
        .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(32, 168, 168, 0.2);
        }
        .hover-card:hover svg {
            transform: scale(1.1);
        }
    `;

    return (
        <>
            <style>{cardHoverStyle}</style>

            {/* Hero con imagen local */}
            <HeroSection
                title="Rutas Prime"
                subtitle="Tu seguridad y comodidad en cada viaje"
                background={FlotaTransp} // 👈 usa la imagen importada
                height="50vh"
                align="center"
                backgroundPosition="center 40%"
            />

            <section className="py-5" style={{ backgroundColor: colorFondoClaro }}>
                <Container>
                    <h2 className="text-center mb-5 display-4" style={{ fontWeight: '700', color: colorTextoOscuro }}>
                        ¿Cómo registrarse?
                    </h2>
                    
                    <Row className="justify-content-center">
                        {/* Tarjeta Conductor */}
                        <Col md={6} lg={5} className="mb-4">
                            <Card className="shadow-lg border-0 h-100 hover-card"
                                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                                <Card.Body style={cardBodyStyle}>
                                    <h4 className="d-flex align-items-center mb-4" style={cardTitleStyle}>
                                        <IconCar color={colorTurquesaAcento} size="2em" className="me-3" />
                                        Registrarse como Conductor
                                    </h4>
                                    <div>
                                        <StepItem text="Completa el formulario con tus datos personales, número de contacto y la información de tu vehículo." color={colorTurquesaAcento} />
                                        <StepItem text="Agrega los datos de tu vehículo." color={colorTurquesaAcento} />
                                        <StepItem text="Adjunta los documentos solicitados (licencia, SOAT, tarjeta de propiedad, etc.)." color={colorTurquesaAcento} />
                                        <StepItem text="Espera la verificación por parte del equipo de seguridad." color={colorTurquesaAcento} />
                                        <StepItem text="Una vez verificados tus datos, podrás empezar a recibir solicitudes de viaje." color={colorTurquesaAcento} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Tarjeta Cliente */}
                        <Col md={6} lg={5} className="mb-4">
                            <Card className="shadow-lg border-0 h-100 hover-card"
                                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                                <Card.Body style={cardBodyStyle}>
                                    <h4 className="d-flex align-items-center mb-4" style={cardTitleStyle}>
                                        <IconUser color={colorTurquesaAcento} size="2em" className="me-3" />
                                        Registrarse como Cliente
                                    </h4>
                                    <div>
                                        <StepItem text="Accede a nuestra web o descarga la app móvil." color={colorTurquesaAcento} />
                                        <StepItem text="Completa el formulario con tu nombre, correo y número de contacto." color={colorTurquesaAcento} />
                                        <StepItem text="Confirma tu cuenta mediante correo o SMS." color={colorTurquesaAcento} />
                                        <StepItem text="Busca conductores disponibles en tu zona." color={colorTurquesaAcento} />
                                        <StepItem text="Selecciona el tipo de vehículo y reserva tu viaje." color={colorTurquesaAcento} />
                                        <StepItem text="¡Listo! Disfruta de un servicio rápido y seguro." color={colorTurquesaAcento} />
                                    </div>
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
