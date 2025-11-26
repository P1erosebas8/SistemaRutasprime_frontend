import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import ResetPasswordModal from "../components/Auth/ResetPasswordModal";
import PasswordInput from "../components/Auth/PasswordInput";

function LogIn() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const roles = response?.data?.roles || [];

      if (roles.includes("ROLE_CLIENTE") && roles.includes("ROLE_CONDUCTOR")) {
        navigate("/ElegCliConduc");
      } else if (roles.includes("ROLE_CLIENTE")) {
        navigate("/clienteUI");
      } else {
        console.warn("Usuario no tiene roles reconocidos");
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <>
      <HeroSection
        title="Iniciar Sesión"
        subtitle="Accede a tu cuenta para continuar"
        description="Disfruta de viajes exclusivos, gestiona tus reservas y obtén beneficios únicos al iniciar sesión."
        background="src/assets/FondosAuth2.jpg"
        height="80vh"
        align="center"
        backgroundPosition="center top"
      />

      <section
        className="py-5 text-white"
        style={{ backgroundColor: "#0a1e33" }}
      >
        <div className="container">
          <h2 className="text-center mb-4">Bienvenido de nuevo</h2>
          <form
            className="mx-auto"
            style={{ maxWidth: "500px" }}
            onSubmit={handleSubmit}
          >
            <div className="row g-3">
              {/* Email */}
              <div className="col-12">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password con ojito */}
              <div className="col-12">
                <PasswordInput
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                />
              </div>
            </div>

            {/* Botón con loader */}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3 d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Procesando...
                </>
              ) : (
                "Entrar"
              )}
            </button>

            {/* Link: recuperar contraseña */}
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-info p-0"
                onClick={() => setShowReset(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Link al registro */}
            <div className="text-center mt-3">
              <small>
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-decoration-none text-info">
                  Regístrate aquí
                </Link>
              </small>
            </div>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-info p-0"
              >
                <Link to="/LogInAdmin" className="text-decoration-none text-info">
                  Iniciar como Administrador
                </Link>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Modal Reset Password */}
      <ResetPasswordModal show={showReset} onHide={() => setShowReset(false)} />
    </>
  );
}

export default LogIn;