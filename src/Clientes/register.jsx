import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import OtpModal from "../components/Auth/OtpModal";
import PasswordInput from "../components/Auth/PasswordInput";
import { validators } from "../utils/validators";

// 💡 IMPORTACIÓN DE IMÁGENES
import LogoImage from "../assets/logoooooooo.png";
import RegistroImage from "../assets/registroooooooooooooooooo.png"; // Usa una imagen parecida al login (camión o fondo atractivo)

const colors = {
  primaryCeleste: '#00bcd4',
  darkAccent: '#00838f',
  textColor: '#333333',
  lightTextColor: '#666666',
  whiteBackground: '#ffffff',
  darkBackground: '#ffffffff',
};

function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    celular: "",
    email: "",
    direccion: "",
    dniRuc: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const error = validators[name] ? validators[name](value) : null;
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = {};
    for (const field in form) {
      if (validators[field]) {
        const error = validators[field](form[field]);
        if (error) {
          newErrors[field] = error;
          hasError = true;
        }
      }
    }

    if (hasError) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((msg) => toast.error(msg));
      return;
    }

    try {
      await register(form);
      setShowOtp(true);
    } catch {
      toast.error("Ocurrió un error al registrarte. Intenta nuevamente.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div
        className="row g-0 overflow-hidden shadow-lg"
        style={{
          maxWidth: "1000px",
          width: '95%',
          minHeight: '650px',
          backgroundColor: colors.whiteBackground,
          borderRadius: '8px',
        }}
      >
        {/* Columna izquierda: formulario */}
        <div className="col-lg-5 p-4 p-md-5 d-flex flex-column justify-content-start">
          <Link
            to="/"
            className="btn btn-outline-secondary d-inline-flex align-items-center mb-5"
            style={{
              width: 'fit-content',
              borderColor: '#e9ecef',
              color: colors.lightTextColor,
              textDecoration: 'none',
              backgroundColor: 'transparent'
            }}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Volver a Inicio
          </Link>

          <div className="mb-4 d-flex flex-column align-items-center">
            <img
              src={LogoImage}
              alt="Rutas Prime Logo"
              style={{ height: '80px', width: 'auto', marginBottom: '20px' }}
              className="d-block"
            />
            <h1
              className="fw-bold mb-4"
              style={{ color: colors.darkBackground, fontSize: '2rem', textAlign: 'center' }}
            >
              RUTAS PRIME
            </h1>
            <h2
              className="fw-normal mb-1"
              style={{ color: colors.textColor, fontSize: '1.75rem', textAlign: 'center' }}
            >
              Registro de Cliente
            </h2>
            <p className="text-muted text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/Clientes/login"
                style={{
                  color: colors.primaryCeleste,
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = colors.darkAccent}
                onMouseOut={(e) => e.currentTarget.style.color = colors.primaryCeleste}
              >
                Inicia sesión
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  name="nombres"
                  className={`form-control ${errors.nombres ? "is-invalid" : ""}`}
                  placeholder="Nombres"
                  value={form.nombres}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  name="apellidos"
                  className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
                  placeholder="Apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  name="celular"
                  className={`form-control ${errors.celular ? "is-invalid" : ""}`}
                  placeholder="Celular"
                  value={form.celular}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Correo electrónico"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  name="direccion"
                  className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
                  placeholder="Dirección"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  name="dniRuc"
                  className={`form-control ${errors.dniRuc ? "is-invalid" : ""}`}
                  placeholder="DNI o RUC"
                  value={form.dniRuc}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <PasswordInput
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  withStrength={true}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-lg w-100 shadow-sm mt-4"
              disabled={loading}
              style={{
                background: 'linear-gradient(90deg, #00bcd4, #00838f)',
                border: 'none',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '10px',
                fontSize: '1.1rem',
                padding: '12px 15px',
                transition: 'transform 0.2s ease, background 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Procesando...
                </>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>
        </div>

        {/* Columna derecha: imagen */}
        <div
          className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${RegistroImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: colors.darkBackground,
          }}
        />
      </div>

      <OtpModal
        show={showOtp}
        onHide={() => setShowOtp(false)}
        email={form.email}
        onSuccess={() => {
          setShowOtp(false);
          navigate("/login");
        }}
      />
    </div>
  );
}

export default Register;
