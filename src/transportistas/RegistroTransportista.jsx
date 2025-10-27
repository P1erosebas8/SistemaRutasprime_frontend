import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthTransportista } from "../hooks/useAuthTransportista";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../components/Auth/PasswordInput";
import { validators } from "../utils/validators";

import LogoImage from "../assets/logoooooooo.png";
import RegistroImage from "../assets/registrotrans.png"; // 🔹 Usa una imagen de camión o flota

const colors = {
    primaryCeleste: '#00bcd4',
    darkAccent: '#00838f',
    textColor: '#333333',
    whiteBackground: '#ffffff',
};

function RegistroTransportista() {
    const { register, loading } = useAuthTransportista();
    const navigate = useNavigate();

    // --- ESTADO INICIAL SIMPLIFICADO: SOLO EMAIL Y PASSWORD ---
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

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

        // VALIDACIÓN SOLO PARA EMAIL Y PASSWORD
        const fieldsToValidate = ['email', 'password'];

        fieldsToValidate.forEach(field => {
            if (validators[field]) {
                const error = validators[field](form[field]);
                if (error) {
                    newErrors[field] = error;
                    hasError = true;
                }
            }
        });

        if (hasError) {
            setErrors(newErrors);
            Object.values(newErrors).forEach((msg) => toast.error(msg));
            return;
        }

        try {
            const res = await register(form);
            if (res.success) {
                toast.success("Acceso exitoso. Redirigiendo..."); // Mensaje ajustado para 'Acceso'
                navigate("/transportistas/Dashboard"); // Navegación de ejemplo
            }
        } catch {
            toast.error("Error de credenciales. Intenta nuevamente."); // Mensaje ajustado para 'Acceso'
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
                {/* Columna izquierda */}
                <div className="col-lg-5 p-4 p-md-5 d-flex flex-column justify-content-center"> {/* Centrado verticalmente */}
                    <Link
                        to="/"
                        className="btn btn-outline-secondary d-inline-flex align-items-center mb-5"
                        style={{
                            borderColor: '#e9ecef',
                            color: '#666',
                            textDecoration: 'none',
                        }}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Volver a Inicio
                    </Link>

                    <div className="mb-4 d-flex flex-column align-items-center">
                        <img src={LogoImage} alt="Logo RutasPrime" style={{ height: '80px' }} />
                        <h1 className="fw-bold mb-2" style={{ color: colors.textColor }}>RUTAS PRIME</h1>
                        <h2 className="fw-normal mb-3" style={{ color: colors.darkAccent }}>Registro Transportista</h2> {/* Título ajustado a "Acceso" */}
                        <p className="text-muted text-center">
                            Ingresa tus datos para continuar.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="row g-3">
                            {/* INPUT: Correo electrónico */}
                            <div className="col-12">
                                <input
                                    name="email"
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Correo electrónico"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* INPUT: Contraseña */}
                            <div className="col-12">
                                <PasswordInput
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Contraseña"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-lg w-100 mt-4"
                            disabled={loading}
                            style={{
                                background: 'linear-gradient(90deg, #00bcd4, #00838f)',
                                border: 'none',
                                color: '#fff',
                                borderRadius: '10px',
                                fontWeight: '600',
                            }}
                        >
                            {/* TEXTO CAMBIADO A "Continuar" */}
                            {loading ? "Cargando..." : "Continuar"}
                        </button>

                        {/* Opción de registro/acceso eliminada para el formulario de acceso puro */}
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
                        backgroundColor: '#ffffffff',
                    }}
                />
            </div>
        </div>
    );
}

export default RegistroTransportista;
