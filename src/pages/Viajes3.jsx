import { Container, Row, Col, Card } from "react-bootstrap";
import HeroSection from "../components/HeroSection";

function Rutas() {
  const rutas = [
    { origen: "Lima", destino: "Trujillo", duracion: "10h-12h" },
    { origen: "Lima", destino: "Arequipa", duracion: "17h-24h" },
    { origen: "Lima", destino: "Cusco", duracion: "25h-30h" },
    { origen: "Arequipa", destino: "Trujillo", duracion: "22h-24h" },
    { origen: "Arequipa", destino: "Cusco", duracion: "10h-12h" },
    { origen: "Arequipa", destino: "Junin", duracion: "18h-20h" },
    { origen: "Ica", destino: "Lima", duracion: "4h-5h" },
    { origen: "Ayacucho", destino: "Lima", duracion: "10h-12h" },
    { origen: "Puno", destino: "Ica", duracion: "17h-18h" },
  ];

  return (
    <>
      <HeroSection
        title="Rutas"
        subtitle="Nuestras rutas habituales"
        background="src/assets/contactanos.jpeg"
        height="50vh"
        align="center"
        backgroundPosition="center top"
      />
      <section className="py-5 text-white" style={{ backgroundColor: "#2c4a77ff" }}>
        <Container>
          <h2 className="text-center mb-4">Nuestras Rutas</h2>
          <Row>
            {rutas.map((ruta, index) => (
              <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>
                      {ruta.origen} → {ruta.destino}
                    </Card.Title>
                    <Card.Text>
                      ⏱ {ruta.duracion} <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h2 className="text-center mb-4">Viaja por todo el Pais con RutasPrime!</h2>
        </Container>
      </section>
    </>
  );
}

export default Rutas;
