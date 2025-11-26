import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";
import { useAuth } from "../hooks/useAuth";
import OtpModal from "../components/Auth/OtpModal";
import { toast } from "react-toastify";
import PasswordInput from "../components/Auth/PasswordInput";
import { validators } from "../utils/validators";
import { Link, useNavigate } from "react-router-dom";

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
    } catch {}
  };

  return (
    <>
      <HeroSection
        title="Registro"
        subtitle="Crea tu cuenta en segundos"
        description="Únete a nuestra comunidad y accede a viajes exclusivos, gestiona tus reservas de manera sencilla y aprovecha beneficios pensados para ti."
        background="src/assets/FondosAuth2.jpg"
        height="80vh"
        align="center"
        backgroundPosition="center top"
      />

      <section className="py-5 text-white" style={{ backgroundColor: "#0a1e33" }}>
        <div className="container">
          <h2 className="text-center mb-4">Crea tu cuenta</h2>

          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div
                className="p-4 rounded-3 shadow-sm text-center"
                style={{ backgroundColor: "#102b4a" }}
              >
                <img
                  src="/src/assets/dniejemplo.jpg"
                  alt="Ejemplo de DNI"
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "250px", objectFit: "contain" }}
                />
                <p className="text-light small text-start">
                  <strong>Importante:</strong> Escribe tus <strong>nombres</strong> y{" "}
                  <strong>apellidos</strong> exactamente como aparecen en tu DNI.
                  <br />
                  Se recomienda ingresar tu{" "}
                  <strong>dirección tal cual figura en el documento</strong>, ya que el
                  sistema valida tus datos con <strong>RENIEC</strong>.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <form className="mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
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
                    {errors.nombres && <div className="invalid-feedback">{errors.nombres}</div>}
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
                    {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
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
                    {errors.celular && <div className="invalid-feedback">{errors.celular}</div>}
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Correo"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                    {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                  </div>

                  <div className="col-md-6">
                    <input
                      name="dniRuc"
                      className={`form-control ${errors.dniRuc ? "is-invalid" : ""}`}
                      placeholder="DNI"
                      value={form.dniRuc}
                      onChange={handleChange}
                      required
                    />
                    {errors.dniRuc && <div className="invalid-feedback">{errors.dniRuc}</div>}
                  </div>

                  <div className="col-12">
                    <PasswordInput
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Contraseña"
                      withStrength={true}
                    />
                    {errors.password && <div className="text-danger small">{errors.password}</div>}
                  </div>
                </div>

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
                    "Registrarse"
                  )}
                </button>

                <div className="text-center mt-3">
                  <small>
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-decoration-none text-info">
                      Inicia sesión
                    </Link>
                  </small>

                  <br />

                  <small className="mt-2 d-block">
                    ¿Eres empresa?{" "}
                    <Link to="/FormularioEmpresa" className="text-decoration-none text-warning">
                      Regístrate aquí
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <OtpModal
        show={showOtp}
        onHide={() => setShowOtp(false)}
        email={form.email}
        onSuccess={() => {
          setShowOtp(false);
          navigate("/LogIn");
        }}
      />
    </>
  );
}

export default Register;