import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";
import { useState } from "react";
import { useContact } from "../hooks/useContact";
import { contactValidators } from "../utils/validators";
import { BiErrorCircle } from "react-icons/bi";

function Contactanos() {
  const { sendMessage, loading, errors, setErrors } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const validator = contactValidators[name];
    if (validator) {
      const error = validator(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendMessage(formData);
    if (response?.success) {
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const renderError = (field) =>
    errors[field] && (
      <div className="text-danger mt-1" style={{ fontSize: "0.9rem", paddingLeft: "2px" }}>
        {errors[field]}
      </div>
    );

  return (
    <>
      {/* SECCIÓN HERO */}
      <HeroSection
        title="Contáctanos"
        subtitle="Estamos aquí para ayudarte en lo que necesites"
        background="src/assets/contactanos.jpeg"
        height="70vh"
        align="center"
        backgroundPosition="center top"
      />

      {/* FORMULARIO */}
      <section className="py-5 text-white" style={{ backgroundColor: "#0d2842ff" }}>
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Envíanos un mensaje</h2>

          <form
            className="mx-auto p-4 rounded-4 shadow-sm"
            style={{ maxWidth: "600px", backgroundColor: "#0d2842ff" }}
            onSubmit={handleSubmit}
          >
            {/* Nombre */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                className={`form-control ${errors.name
                    ? "is-invalid border-danger"
                    : formData.name
                      ? "is-valid border-success"
                      : ""
                  }`}
                value={formData.name}
                onChange={handleChange}
              />
              {renderError("name")}
            </div>

            {/* Correo */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Correo</label>
              <input
                type="email"
                name="email"
                placeholder="tuemail@gmail.com"
                className={`form-control ${errors.email
                    ? "is-invalid border-danger"
                    : formData.email
                      ? "is-valid border-success"
                      : ""
                  }`}
                value={formData.email}
                onChange={handleChange}
              />
              {renderError("email")}
            </div>

            {/* Mensaje */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Mensaje</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Escribe tu mensaje"
                className={`form-control ${errors.message
                    ? "is-invalid border-danger"
                    : formData.message
                      ? "is-valid border-success"
                      : ""
                  }`}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {renderError("message")}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold py-2 mt-2"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,102,255,1) 0%, rgba(0,153,255,1) 100%)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contactanos;
