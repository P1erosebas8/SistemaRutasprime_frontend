import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import ResetPasswordModal from "../components/Auth/ResetPasswordModal";
import PasswordInput from "../components/Auth/PasswordInput";

// Define la misma paleta de colores para mantener la coherencia
const colors = {
  primaryCeleste: '#00bcd4', // Celeste vibrante
  darkAccent: '#00838f',     // Celeste oscuro para hover
  textColor: '#333333',     // Texto oscuro para contraste
  lightTextColor: '#666666', // Texto secundario
  whiteBackground: '#ffffff',
  formBackground: '#f0faff', // Fondo muy claro para la tarjeta del formulario
  borderColor: '#b2ebf2',    // Borde celeste sutil
};

function LogIn() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/profile");
    } catch {
      // Manejo de error asumido en useAuth o toast global
    }
  };

  return (
    <div style={{ backgroundColor: colors.whiteBackground, minHeight: '100vh', fontFamily: "'Roboto', sans-serif" }}>
      <HeroSection
        title="Iniciar Sesión"
        subtitle="Accede a tu cuenta de viajero"
        description="Disfruta de viajes exclusivos, gestiona tus reservas y obtén beneficios únicos al iniciar sesión."
        background="src/assets/FondosAuth2.jpg"
        height="65vh"
        align="center"
        backgroundPosition="center bottom"
        overlayColor="rgba(0, 0, 0, 0.4)"
        titleStyle={{ fontSize: '3.8rem', fontWeight: 700, color: colors.whiteBackground }}
        subtitleStyle={{ fontSize: '1.8rem', fontWeight: 300, color: colors.whiteBackground }}
      />

      {/* Sección del Formulario con Imagen a la Izquierda */}
      <section
        className="py-5"
        style={{
          backgroundColor: colors.whiteBackground,
          position: 'relative',
          zIndex: 1,
          marginTop: '-50px',
          paddingTop: 'calc(50px + 3rem)',
        }}
      >
        <div className="container">
          <h2
            className="text-center mb-5"
            style={{
              color: colors.textColor,
              fontWeight: 700,
              fontSize: '2.5rem',
              textShadow: `1px 1px 2px ${colors.borderColor}`
            }}
          >
            Bienvenido de nuevo
          </h2>

          {/* Contenedor principal de la imagen y el formulario */}
          <div
            className="row justify-content-center align-items-stretch g-0 rounded-3 shadow-lg overflow-hidden" // Usamos g-0 para quitar el gutter
            style={{
              maxWidth: "1000px", // Aumentar el ancho máximo del contenedor
              margin: "0 auto",
              backgroundColor: colors.formBackground,
              border: `2px solid ${colors.borderColor}`,
            }}
          >
            {/* Columna de la Imagen */}
            <div className="col-lg-6 d-none d-lg-flex p-0"> {/* Ocultar en pantallas pequeñas, visible en lg+ */}
              <img
                src="https://via.placeholder.com/500x700/b2ebf2/00838f?text=Bienvenido+de+vuelta" // URL de imagen de ejemplo. ¡Reemplaza con tu imagen real!
                alt="Welcome Back"
                className="img-fluid h-100 w-100 object-fit-cover rounded-start-3" // Asegura que la imagen ocupe todo el espacio y cubra
                style={{
                  // Puedes ajustar la imagen aquí
                }}
              />
            </div>

            {/* Columna del Formulario */}
            <div className="col-lg-6 p-5"> {/* Aquí se ajusta el padding interno del formulario */}
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  {/* Email */}
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        borderColor: colors.borderColor,
                        color: colors.textColor,
                        padding: '0.85rem 1rem',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.primaryCeleste}
                      onBlur={(e) => e.target.style.borderColor = colors.borderColor}
                    />
                  </div>

                  {/* Password con ojito */}
                  <div className="col-12">
                    <PasswordInput
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      inputStyle={{
                        borderColor: colors.borderColor,
                        color: colors.textColor,
                        padding: '0.85rem 1rem',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocusInput={(e) => e.target.style.borderColor = colors.primaryCeleste}
                      onBlurInput={(e) => e.target.style.borderColor = colors.borderColor}
                    />
                  </div>
                </div>

                {/* Botón con loader */}
                <button
                  type="submit"
                  className="btn btn-lg w-100 mt-5 d-flex align-items-center justify-content-center"
                  disabled={loading}
                  style={{
                    backgroundColor: colors.primaryCeleste,
                    borderColor: colors.primaryCeleste,
                    color: colors.whiteBackground,
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    fontSize: '1.2rem',
                    padding: '0.9rem 1.5rem',
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.darkAccent;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryCeleste;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Accediendo...
                    </>
                  ) : (
                    "Entrar a mi Cuenta"
                  )}
                </button>

                {/* Link: recuperar contraseña */}
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => setShowReset(true)}
                    style={{
                      color: colors.primaryCeleste,
                      fontWeight: '600',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = colors.darkAccent}
                    onMouseOut={(e) => e.currentTarget.style.color = colors.primaryCeleste}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Link al registro */}
                <div className="text-center mt-3" style={{ color: colors.lightTextColor }}>
                  <small style={{ fontSize: '1rem' }}>
                    ¿No tienes cuenta?{" "}
                    <Link
                      to="/register"
                      style={{
                        color: colors.primaryCeleste,
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = colors.darkAccent}
                      onMouseOut={(e) => e.currentTarget.style.color = colors.primaryCeleste}
                    >
                      Regístrate aquí
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Reset Password */}
      <ResetPasswordModal show={showReset} onHide={() => setShowReset(false)} />
    </div>
  );
}

export default LogIn;