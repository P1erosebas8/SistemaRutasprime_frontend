import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

// Importa una imagen adecuada para la sección (usaremos CargaInic como placeholder)
import LaptopImage from "../assets/ServiciosEmpresariales.jpg"; 

function Facturacion() {
    
    const titleColor = "#000000"; // Negro para los títulos principales
    const textColor = "#343a40"; // Gris oscuro para los párrafos

    return (
        // Sección principal en blanco con padding superior para separar de la Navbar
        <section className="py-5 mt-5" style={{ backgroundColor: "#ffffffff" }}>
            <Container>
                
                {/* Título de la Página */}
                <Row className="mb-5">
                    <Col className="text-center">
                        <h1 className="display-4 fw-bold" style={{ color: titleColor }}>
                            Servicios Empresariales
                        </h1>
                        <p className="lead" style={{ color: textColor }}>
                            Optimiza la gestión de tu empresa y el control de tus envíos.
                        </p>
                    </Col>
                </Row>

                {/* Contenido: Texto (Izquierda) e Imagen (Derecha) */}
                <Row className="align-items-center">
                    
                    {/* Columna de Texto - Contenido de Facturación y Asesores */}
                    <Col md={6} className="px-lg-5 mb-4 mb-md-0">
                        
                        {/* 1. Facturación Electrónica */}
                        <div className="mb-5">
                            <h2 className="fw-bold mb-3" style={{ color: titleColor }}>
                                <i className="bi bi-file-earmark-text me-3" style={{ color: "#00bcd4" }}></i>
                                Facturación Electrónica.
                            </h2>
                            <p style={{ color: textColor, fontSize: "1.1rem" }}>
                                Factura todos los viajes de tu empresa de manera electrónica y olvídate de los recibos de papel.
                            </p>
                        </div>
                        
                        {/* 2. Asesores de Atención */}
                        <div>
                            <h2 className="fw-bold mb-3" style={{ color: titleColor }}>
                                <i className="bi bi-headset me-3" style={{ color: "#00bcd4" }}></i>
                                Asesores de Atención
                            </h2>
                            <p style={{ color: textColor, fontSize: "1.1rem" }}>
                                Contamos con asesores de las 24/7 del año, para apoyarte cuando lo necesites.
                            </p>
                        </div>

                    </Col>

                    {/* Columna de Imagen */}
                    <Col md={6} className="d-flex justify-content-center">
                        <img 
                            src={LaptopImage} // Usado como placeholder para la imagen de la laptop con gráficos
                            alt="Gestión y Facturación" 
                            className="img-fluid rounded shadow-lg"
                            style={{ maxHeight: "400px", objectFit: 'cover' }}
                        />
                    </Col>
                    
                </Row>
            </Container>
        </section>
    );
}

export default Facturacion;