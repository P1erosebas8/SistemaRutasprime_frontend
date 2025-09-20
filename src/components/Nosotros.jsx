import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReuFondo from "../assets/ReuFondo.jpg";
import NosTransPesa from "../assets/NosTransPesa.jpg";
import CargaSegura from "../assets/CargaSegura.jpg";

function Nosotros() {
    return (
        <>
            <section
                className="d-flex flex-column justify-content-center align-items-center text-center text-white"
                style={{
                    backgroundImage: `url(${ReuFondo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100vw",
                    height: "80vh",
                    position: "relative"
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                ></div>
                <div className="position-relative">
                    <h1 className="display-3 fw-bold">RUTAS PRIME</h1>
                    <p className="lead">Tu mejor opción en transporte seguro y confiable</p>
                </div>
            </section>
            <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <img src={NosTransPesa} alt="Descripción" className="img-fluid rounded" />
                        </Col>
                        <Col md={6}>
                            <h1 className="text-white">Sobre Nosotros</h1>
                            <p className="text-white">
                                Sobre RutasPrime - Somos una empresa de transporte de carga formal. 100% peruana y areditada ante la ATU.
                                Tenemos relacioens comerciales con empresas importantesen PEru, contamos con "Cero incidencias" registradas durante mas de 25 años de operaciones
                            </p>
                            <p className="text-white">
                                Contamos con conductores calificados y vehículos modernos para garantizar tu comodidad y seguridad.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="py-5" style={{ backgroundColor: "#1E1F20" }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h1 className="text-white">Haz que que tu carga llegue segura</h1>
                            <p className="text-white">
                                No te estreses mientras viajas por la ciudad en Perú. ¡RutasPrime te ayuda! Nuestra app es tu mejor opción para viajes asequibles y cómodos. Hemos diseñado Rutas Prime pensando 
                                en la facilidad, así que olvídate de regatear y de esperar afuera: reserva tu viaje en minutos, consulta el precio por adelantado y sigue a tu conductor en tiempo real. Leva tu carga y experimenta una nueva forma de desplazarte por Perú con vehículos de calidad y un alto nivel de servicio.</p>
                        </Col>
                        <Col md={6}>
                            <img src={CargaSegura} alt="Descripción" className="img-fluid rounded" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Nosotros;