import Container from "react-bootstrap/Container";
import HeroSection from "../components/HeroSection";
import FondoOscuro from "../assets/FonfoOscuro.jpg";

function Privacidad() {
  return (
    <>
      <HeroSection
        title="POLÍTICA DE PRIVACIDAD"
        subtitle=""
        background={FondoOscuro}
        height="60vh"
        align="center"
        backgroundPosition="center top"
      />

      <section className="py-5 bg-dark text-white">
        <Container>
          <h1 className="fw-bold mb-4 text-center">POLÍTICA DE PRIVACIDAD</h1>

          <p>
            El presente Política de Privacidad establece los términos en que <strong>RutasPrime</strong> usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.
          </p>

          <h3 className="mt-4">Información que es recogida</h3>
          <p>
            Nuestro sitio web podrá recoger información personal por ejemplo: Nombre, información de contacto como su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.
          </p>

          <h3 className="mt-4">Uso de la información recogida</h3>
          <p>
            Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios. Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.
          </p>

          <p>
            <strong>RutasPrime</strong> está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.
          </p>

          <h3 className="mt-4">Cookies</h3>
          <p>
            Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador. Al aceptar dicho fichero se crea y la cookie sirve para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que permiten reconocerle individualmente y brindarle un mejor servicio personalizado.
          </p>

          <p>
            Nuestro sitio web emplea las cookies para identificar las páginas que son visitadas y su frecuencia. Esta información se emplea únicamente para análisis estadístico y después se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo, las cookies ayudan a proporcionar un mejor servicio de los sitios web y no dan acceso a información de su ordenador ni de usted, salvo que usted así lo quiera y la proporcione directamente.
          </p>

          <h3 className="mt-4">Enlaces a Terceros</h3>
          <p>
            Este sitio web pudiera contener enlaces a otros sitios de interés. Una vez que usted hace clic en estos enlaces y abandona nuestra página, ya no tenemos control sobre el sitio al que es redirigido y no somos responsables de los{" "}
            <a
              href="https://plantillaterminosycondicionestiendaonline.com/"
              target="_blank"
              rel="noreferrer"
            >
              términos o privacidad
            </a>{" "}
            ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad.
          </p>

          <h3 className="mt-4">Control de su información personal</h3>
          <p>
            En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web. Cada vez que se le solicite rellenar un formulario, puede marcar o desmarcar la opción de recibir información por correo electrónico. En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.
          </p>

          <p>
            Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con orden judicial.
          </p>

          <p>
            <strong>RutasPrime</strong> se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.
          </p>
        </Container>
      </section>
    </>
  );
}

export default Privacidad;