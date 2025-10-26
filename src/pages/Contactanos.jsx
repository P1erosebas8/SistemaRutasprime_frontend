import "bootstrap/dist/css/bootstrap.min.css";
// Se mantiene la importación de HeroSection, asumiendo que el componente existe
import HeroSection from "../components/HeroSection";
import { useState } from "react";
import { useContact } from "../hooks/useContact";
// Asegúrate de que este archivo 'contactValidators' NO exporte 'subject'
import { contactValidators } from "../utils/validators";
import { BsPinMapFill, BsEnvelopeOpen, BsTelephoneFill, BsClockHistory, BsFacebook, BsTwitterX, BsInstagram, BsLinkedin, BsYoutube, BsSendFill } from 'react-icons/bs';

function Contactanos() {
  const { sendMessage, loading, errors, setErrors } = useContact();

  // 1. ESTADO: 'subject' ELIMINADO
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submissionMessage, setSubmissionMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmissionMessage(null);
    setFormData({ ...formData, [name]: value });

    const validator = contactValidators[name];
    // Se asegura de que el validador exista antes de llamarlo
    if (validator) {
      const error = validator(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Función de validación de formulario
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    for (const key in formData) {
      const validator = contactValidators[key];

      // SOLO valida si existe un validador para ese campo
      if (validator) {
        const error = validator(formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage(null);

    // 1. Validar todos los campos restantes
    if (!validateForm()) {
      setSubmissionMessage({ type: 'error', text: 'Por favor, corrija los errores en el formulario antes de enviar.' });
      return;
    }

    // 2. Enviar mensaje (formData ya no contiene 'subject')
    const response = await sendMessage(formData);

    // 3. Mostrar feedback
    if (response?.success) {
      setSubmissionMessage({ type: 'success', text: '¡Su mensaje ha sido enviado con éxito! Nos pondremos en contacto pronto.' });
      // Limpieza del estado sin 'subject'
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } else {
      setSubmissionMessage({ type: 'error', text: 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.' });
    }

    setTimeout(() => setSubmissionMessage(null), 8000);
  };

  const renderError = (field) =>
    errors[field] && (
      <div className="text-danger mt-1" style={{ fontSize: "0.9rem", paddingLeft: "2px" }}>
        {errors[field]}
      </div>
    );

  // Datos de contacto (Sin cambios)
  const contactInfo = [
    {
      icon: <BsPinMapFill className="me-3 fs-4 text-primary" />,
      title: "Nuestra Ubicación",
      content: "Panamericana Norte, Av. Alfredo Mendiola 6377, Los Olivos 15306",
    },
    {
      icon: <BsEnvelopeOpen className="me-3 fs-4 text-primary" />,
      title: "Contáctenos por Correo",
      content: "Informes@gmail.com",
    },
    {
      icon: <BsTelephoneFill className="me-3 fs-4 text-primary" />,
      title: "Llámenos",
      content: "+51 902 817 279",
    },
    {
      icon: <BsClockHistory className="me-3 fs-4 text-primary" />,
      title: "Horario de Atención",
      content: "Lunes a Sábado: 9AM - 7PM",
    },
  ];

  const socialLinks = [
    { icon: <BsFacebook className="fs-5" />, href: "#" },
    { icon: <BsTwitterX className="fs-5" />, href: "#" },
    { icon: <BsInstagram className="fs-5" />, href: "#" },
    { icon: <BsLinkedin className="fs-5" />, href: "#" },
    { icon: <BsYoutube className="fs-5" />, href: "#" },
  ];

  return (
    <>
      <HeroSection
        title="Contacto"
        subtitle="Estamos aquí para ayudarle. Contáctenos para consultas, citas o cualquier pregunta que pueda tener."
        background="src/assets/contactanos.jpeg"
        height="70vh"
        align="center"
        backgroundPosition="center top"
      />

      <section id="contact" className="py-5 section">
        <div className="container">
          <div className="row g-4">

            {/* PANEL DE INFORMACIÓN DE CONTACTO (Sin cambios) */}
            <div className="col-lg-6">
              <div className="p-4 h-100" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

                <h3 className="fw-bold mb-2">Información de Contacto</h3>
                <p className="mb-4 text-muted">Comuníquese con nuestro equipo de atención al cliente para obtener asistencia inmediata.</p>

                <div className="contact-info-cards mb-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="d-flex align-items-start mb-3 p-3 rounded-3" style={{ border: '1px solid #eee' }}>
                      <div className="icon-container me-3 d-flex align-items-center">
                        {item.icon}
                      </div>
                      <div className="card-content text-start">
                        <h4 className="fw-semibold fs-6 mb-0">{item.title}</h4>
                        <p className="text-muted mb-0">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enlaces de Redes Sociales (Sin cambios) */}
                <div className="social-links-panel mt-4 pt-3 border-top text-center">
                  <h5 className="fw-bold mb-3">Síganos</h5>
                  <div className="social-icons d-flex justify-content-center">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-decoration-none mx-2 p-2 d-flex align-items-center justify-content-center rounded-circle"
                        style={{ width: '40px', height: '40px', backgroundColor: '#e9ecef', color: '#0d6efd' }}
                        aria-label={`Link a ${link.icon.type.name}`}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* FORMULARIO DE CONTACTO */}
            <div className="col-lg-6">
              <div className="p-4 h-100 text-dark" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h3 className="fw-bold mb-2">Envíenos un Mensaje</h3>
                <p className="mb-4 text-muted">Utilice el siguiente formulario para enviarnos una consulta. Nuestro equipo responderá lo antes posible.</p>

                <form onSubmit={handleSubmit}>

                  {/* Mensaje de Feedback de Envío */}
                  {submissionMessage && (
                    <div className={`alert alert-${submissionMessage.type === 'success' ? 'success' : 'danger'} mb-4`} role="alert">
                      {submissionMessage.text}
                    </div>
                  )}

                  {/* Nombre */}
                  <div className="mb-3 text-start">
                    <label htmlFor="nameInput" className="form-label fw-semibold">Nombre Completo</label>
                    <input
                      type="text"
                      id="nameInput"
                      name="name"
                      placeholder="Tu nombre completo"
                      className={`form-control ${errors.name ? "is-invalid" : formData.name ? "is-valid" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {renderError("name")}
                  </div>

                  {/* Correo */}
                  <div className="mb-3 text-start">
                    <label htmlFor="emailInput" className="form-label fw-semibold">Correo Electrónico</label>
                    <input
                      type="email"
                      id="emailInput"
                      name="email"
                      placeholder="tuemail@gmail.com"
                      className={`form-control ${errors.email ? "is-invalid" : formData.email ? "is-valid" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {renderError("email")}
                  </div>

                  {/* El campo Asunto ha sido eliminado de aquí. */}

                  {/* Mensaje */}
                  <div className="mb-3 text-start">
                    <label htmlFor="messageInput" className="form-label fw-semibold">Su Mensaje</label>
                    <textarea
                      id="messageInput"
                      name="message"
                      rows="5"
                      placeholder="Escribe tu mensaje"
                      className={`form-control ${errors.message ? "is-invalid" : formData.message ? "is-valid" : ""}`}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    {renderError("message")}
                  </div>

                  {/* Botón de Envío */}
                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary fw-bold py-2"
                      disabled={loading}
                      style={{
                        background:
                          "linear-gradient(90deg, #0d6efd 0%, #0099ff 100%)",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Cargando...
                        </>
                      ) : (
                        <>
                          Enviar Mensaje <BsSendFill className="ms-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Contactanos;