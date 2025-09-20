import React from "react";
import contactanos from "../assets/contactanos.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

function Contactanos() {
  return (
    <>
      <section
        className="d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          backgroundImage: "url(" + contactanos + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          width: "100vw",
          height: "70vh",
          position: "relative"
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        ></div>

        <div className="position-relative">
          <h1 className="display-4 fw-bold">Contáctanos</h1>
          <p className="lead">Estamos aquí para ayudarte en lo que necesites</p>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="text-center mb-4">Envíanos un mensaje</h2>
          <form className="mx-auto" style={{ maxWidth: "600px" }}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" placeholder="Tu nombre" />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input type="email" className="form-control" placeholder="tuemail@gmail.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea className="form-control" rows="4" placeholder="Escribe tu mensaje"></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "#2C2C2C",
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
