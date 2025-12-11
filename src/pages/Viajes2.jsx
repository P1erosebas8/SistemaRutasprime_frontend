import { Container, Row, Col } from "react-bootstrap";
import CardDescrip from "../components/CardConDescripcion";
import HeroSection from "../components/HeroSection";
import LimaImg from "../assets/Lima.jpg";
import TrujilloImg from "../assets/trujillo.jpg";
import ArequipaImg from "../assets/Arequipa.jpeg";
import CuscoImg from "../assets/Cusco.jpeg";
import JuninImg from "../assets/Junin.jpeg";
import IcaImg from "../assets/ICa.jpeg";
import ContactanosImg from "../assets/contactanos.jpeg";

function Ciudades() {
  const ciudades = [
    { titulo: "Lima", imagen: LimaImg, botonLink: null },
    { titulo: "Trujillo", imagen: TrujilloImg, botonLink: null },
    { titulo: "Arequipa", imagen: ArequipaImg, botonLink: null },
    { titulo: "Cusco", imagen: CuscoImg, botonLink: null },
    { titulo: "Junin", imagen: JuninImg, botonLink: null },
    { titulo: "Ica", imagen: IcaImg, botonLink: null },
  ];

  return (
    <>
      <HeroSection
        title="Ciudades"
        subtitle="Estamos en estas ciudades"
        background={ContactanosImg}
        height="50vh"
        align="center"
        backgroundPosition="center top"
      />
      <section className="py-5" style={{ backgroundColor: "#0d2842ff" }}>
        <Container>
          <h2 className="text-center mb-5 text-white">Ciudades Disponibles</h2>
          <Row>
            {ciudades.map((ciudad, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <CardDescrip
                  titulo={ciudad.titulo}
                  descripcion={ciudad.descripcion}
                  imagen={ciudad.imagen}
                  botonLink={ciudad.botonLink}
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