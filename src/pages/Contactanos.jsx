import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";

function Contactanos() {
  return (
    <>
      <HeroSection
        title="Contáctanos"
        subtitle="Estamos aquí para ayudarte en lo que necesites"
        background="src/assets/contactanos.jpeg"
        height="80vh"
        align="center"
        backgroundPosition="center top"
      />

      <section className="py-5 text-white" style={{ backgroundColor: "#0d2842ff" }}>
        <div className="container">
          <h2 className="text-center mb-4">Envíanos un mensaje</h2>
          <form className="mx-auto" style={{ maxWidth: "600px" }}>
            <div className="mb-3 text-start">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" placeholder="Tu nombre" />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Correo</label>
              <input type="email" className="form-control" placeholder="tuemail@gmail.com" />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Mensaje</label>
              <textarea className="form-control" rows="4" placeholder="Escribe tu mensaje"></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                border: "none",
                fontWeight: "bold"
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contactanos;
