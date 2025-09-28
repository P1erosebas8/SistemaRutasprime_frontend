import { Container, Row, Col, Card } from "react-bootstrap";
import CardDescrip from "../components/CardConDescripcion";
import HeroSection from "../components/HeroSection";


function Ciudades() {
    const ciudades = [
        { titulo: "Lima", imagen: "src/assets/Lima.jpg", botonLink: null },
        { titulo: "Trujillo", imagen: "src/assets/trujillo.jpg", botonLink: null },
        { titulo: "Arequipa", imagen: "src/assets/Arequipa.jpeg", botonLink: null },
        { titulo: "Cusco", imagen: "src/assets/Cusco.jpeg", botonLink: null },
        { titulo: "Junin", imagen: "src/assets/Junin.jpeg", botonLink: null },
        { titulo: "Ica", imagen: "src/assets/ICa.jpeg", botonLink: null },
    ];

    return (
        <>
            <HeroSection
                title="Ciudades"
                subtitle="Estamos en estas ciudades"
                background="src/assets/contactanos.jpeg"
                height="50vh"
                align="center"
                backgroundPosition="center top"
            />
            <section className="py-5" style={{ backgroundColor: "#0d2842ff" }}>
                <Container>
                    <h2 className="text-center mb-5 text-white">Ciudades Disponibles</h2>
                    <Row>
                        {ciudades.map((req, index) => (
                            <Col md={6} lg={4} key={index} className="mb-4">
                                <CardDescrip
                                    titulo={req.titulo}
                                    descripcion={req.descripcion}
                                    imagen={req.imagen}
                                    botonLink={req.botonLink}
                                />
                            </Col>
                        ))}
                    </Row>
                    <h2 className="text-center mb-5 text-white">Pronto nuevas provincias!</h2>
                </Container>
            </section>
        </>
    );
}

export default Ciudades;
