import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

// Importa una imagen adecuada para la sección (usaremos CargaInic como placeholder)
// Idealmente, reemplazarías esto con una imagen de alguien usando la app en un carro o un dashboard de administración.
import ControlImage from "../assets/Inico.jpg"; 

function TomaElControl() {
    
    const titleColor = "#000000"; // Negro para los títulos principales
    const primaryColor = "#17a2b8"; // Un color primario para el acento
    const textColor = "#343a40"; // Gris oscuro para los párrafos

    // Datos basados en la referencia visual (Toma el control y Ahorro de costos)
    const features = [
        {
            icon: "bi-speedometer", 
            title: "Toma el control",
            text: "Genera informes en el tiempo real a través de un simple panel de administración." 
        },
        { 
            icon: "bi-piggy-bank", 
            title: "Ahorro de costos",
            text: "Maneja centros de costos y proyectos, tienes el control de cuándo y dónde viajan los usuarios."
        },
    ];

    return (
        // Sección principal en blanco con padding superior para separar de la Navbar o de secciones anteriores
        <section className="py-5 mt-5" style={{ backgroundColor: "#ffffffff" }}>
            <Container>
                
                {/* Título de la Página/Sección */}
                <Row className="mb-5">
                    <Col className="text-center">
                        <h1 className="display-4 fw-bold" style={{ color: titleColor }}>
                            Beneficios Corporativos
                        </h1>
                        <p className="lead" style={{ color: textColor }}>
                            Optimiza la gestión y reduce los gastos de transporte de tu empresa.
                        </p>
                    </Col>
                </Row>

                {/* Contenido: Imagen (Izquierda) y Texto (Derecha) */}
                <Row className="align-items-center">
                    
                    {/* Columna de Imagen */}
                    <Col md={6} className="d-flex justify-content-center mb-4 mb-md-0">
                        <img 
                            src={ControlImage} // Placeholder
                            alt="Hombre usando app de administración en el carro" 
                            className="img-fluid rounded shadow-lg"
                            style={{ maxHeight: "450px", objectFit: 'cover' }}
                        />
                    </Col>

                    {/* Columna de Texto - Contenido de Toma el Control y Ahorro de costos */}
                    <Col md={6} className="px-lg-5">
                        
                        {features.map((feature, index) => (
                            <div key={index} className="mb-4">
                                <h2 className="fw-bold mb-2" style={{ color: titleColor }}>
                                    <i className={`bi ${feature.icon} me-3`} style={{ color: primaryColor }}></i>
                                    {feature.title}
                                </h2>
                                <p style={{ color: textColor, fontSize: "1.1rem" }}>
                                    {feature.text}
                                </p>
                            </div>
                        ))}

                    </Col>
                    
                </Row>
            </Container>
        </section>
    );
}

export default TomaElControl;