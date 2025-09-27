import HeroSection from "../components/HeroSection";
import { Container, Button } from "react-bootstrap";

function Reclamaciones() {
  return (
    <>
      <HeroSection
        title="LIBRO DE RECLAMACIONES"
        subtitle=""
        background="src/assets/FonfoOscuro.jpg"
        height="60vh"
        align="center"
        backgroundPosition="center top"
      />
      <section className="py-5 bg-dark text-white">
        <Container className="text-center">
          <h2 className="mb-4">Libro de Reclamaciones</h2>
          <p>
            Conforme a lo dispuesto por el Decreto Supremo N.° 101-2022-PCM,
            ponemos a disposición de nuestros usuarios el Libro de Reclamaciones
            en formato digital. Descárguelo y complételo para enviarlo a nuestro
            correo oficial o entregarlo en nuestras oficinas.
          </p>
          <Button
            variant="danger"
            href="/Libro de Reclamaciones (generico).pdf"
            download="Libro-de-Reclamaciones.pdf"
          >
            Descargar PDF
          </Button>
        </Container>
      </section>
    </>
  );
}

export default Reclamaciones;