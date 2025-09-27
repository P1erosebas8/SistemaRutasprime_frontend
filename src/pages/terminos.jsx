import HeroSection from "../components/HeroSection";
import { Container } from "react-bootstrap";

function Terminos() {
  return (
    <>
      <HeroSection
        title="TERMINOS Y CONDICIONES"
        subtitle=""
        background="src/assets/FonfoOscuro.jpg"
        height="60vh"
        align="center"
        backgroundPosition="center top"
      />
      <section className="py-5 bg-dark text-white text-start">
        <Container>
          <h1 className="mb-4 text-center">Términos y Condiciones</h1>

          <h4 className="mt-4">1. Generalidades</h4>
          <p>
            RutasPrime gestiona este sitio web. Al acceder o utilizar nuestra
            página, usted acepta los presentes términos y condiciones
            (en adelante, “Términos”). Estos Términos aplican a todos los
            usuarios del sitio, incluyendo navegadores, clientes o
            proveedores de contenido.
          </p>

          <h4 className="mt-4">2. Uso del Servicio</h4>
          <p>
            Usted declara que es mayor de edad en su país de residencia o
            cuenta con autorización para utilizar este sitio. No está
            permitido usar nuestros servicios con fines ilegales o no
            autorizados, ni transmitir virus o código dañino.
          </p>

          <h4 className="mt-4">3. Condiciones Generales</h4>
          <p>
            RutasPrime se reserva el derecho de rechazar el servicio a
            cualquier persona en cualquier momento. El contenido que
            comparta en nuestro sitio no debe infringir derechos de
            terceros ni contener material ofensivo.
          </p>

          <h4 className="mt-4">4. Exactitud de la Información</h4>
          <p>
            La información publicada en este sitio es de carácter general
            y puede no estar siempre actualizada. Nos reservamos el
            derecho de modificar o actualizar el contenido sin previo
            aviso.
          </p>

          <h4 className="mt-4">5. Productos y Servicios</h4>
          <p>
            Algunos productos o servicios pueden estar disponibles de
            forma limitada y sujetos a devolución o cambio de acuerdo con
            nuestras políticas. Nos reservamos el derecho de limitar las
            cantidades o discontinuar productos en cualquier momento.
          </p>

          <h4 className="mt-4">6. Responsabilidad</h4>
          <p>
            RutasPrime no garantiza que el servicio sea ininterrumpido o
            libre de errores. El uso de este sitio es bajo su propia
            responsabilidad. No nos hacemos responsables de daños directos
            o indirectos derivados del uso de nuestros servicios o
            productos.
          </p>

          <h4 className="mt-4">7. Modificaciones</h4>
          <p>
            Podemos actualizar estos Términos en cualquier momento.
            Recomendamos revisarlos periódicamente. El uso continuo de la
            página después de los cambios constituye su aceptación.
          </p>

          <h4 className="mt-4">8. Contacto</h4>
          <p>
            Si tiene preguntas sobre estos Términos y Condiciones, puede
            contactarnos a través de nuestros canales oficiales en RutasPrime.
          </p>
        </Container>
      </section>
    </>
  );
}

export default Terminos;