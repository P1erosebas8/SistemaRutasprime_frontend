import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import ResetPasswordModal from "../components/Auth/ResetPasswordModal";
import PasswordInput from "../components/Auth/PasswordInput";

// 💡 IMPORTACIÓN DE IMÁGENES
// Asegúrate de que las rutas sean correctas para tu proyecto (e.g., ../assets/logo.png)
import LogoImage from "../assets/logoooooooo.png";
import CamionImage from "../assets/clientelogin.png";

// Paleta de colores basada en el diseño
const colors = {
    primaryCeleste: '#00bcd4', // Celeste vibrante
    darkAccent: '#00838f',     // Celeste oscuro para hover
    textColor: '#333333',     // Texto oscuro para contraste
    lightTextColor: '#666666', // Texto secundario
    whiteBackground: '#ffffff',
    darkBackground: '#0b1c2b', // Fondo muy oscuro para el panel derecho (similar al de la imagen)
    buttonDark: '#1a2a3a',     // Color para el botón "Continuar" (similar al de la imagen)
    buttonHover: '#2a3b4c',    // Color de hover para el botón
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
        } catch (error) {
            // Manejo de error (puedes usar un toast o un estado de error local)
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        // Contenedor principal: centra la tarjeta en la pantalla
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
                fontFamily: "'Roboto', sans-serif"
            }}
        >
            {/* Contenedor de la Tarjeta de Login (Diseño de dos columnas) */}
            <div
                className="row g-0 overflow-hidden shadow-lg"
                style={{
                    maxWidth: "1000px",
                    width: '95%',
                    minHeight: '600px',
                    backgroundColor: colors.whiteBackground,
                    borderRadius: '8px',
                }}
            >
                {/* 1. Columna del Formulario (Izquierda) */}
                <div className="col-lg-5 p-4 p-md-5 d-flex flex-column justify-content-start">

                    {/* Botón Volver a Inicio */}
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

                    {/* Logo y Título */}
                    <div className="mb-4 d-flex flex-column align-items-center">

                        {/* 💡 USO DE LOGO.PNG */}
                        <img
                            src={LogoImage}
                            alt="Rutas Prime Logo"
                            style={{
                                height: '80px',
                                width: 'auto',
                                marginBottom: '20px',
                                borderRadius: '4px',
                                /* Removed background/padding as requested previously */
                            }}
                            className="d-block"
                        />

                        <h1
                            className="fw-bold mb-4"
                            style={{ color: colors.darkBackground, fontSize: '2rem', textAlign: 'center' }}
                        /* ⬅️ Added textAlign: 'center' for good measure */
                        >
                            RUTAS PRIME
                        </h1>

                        <h2
                            className="fw-normal mb-1"
                            style={{ color: colors.textColor, fontSize: '1.75rem', textAlign: 'center' }}
                        /* ⬅️ Added textAlign: 'center' to center this heading too */
                        >
                            Iniciar Sesión
                        </h2>

                        {/* Texto y Link de Registro */}
                        <p className="text-muted text-center">
                            {/* ⬅️ Added text-center to center the paragraph content */}
                            ¿No tienes una cuenta?{" "}
                            <Link
                                to="/register"
                                style={{
                                    color: colors.primaryCeleste,
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = colors.darkAccent}
                                onMouseOut={(e) => e.currentTarget.style.color = colors.primaryCeleste}
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>

                    {/* Formulario de Login */}
                    <form onSubmit={handleSubmit} className="mt-4">

                        {/* Input de Correo */}
                        <div className="mb-4 position-relative">
                            <label htmlFor="emailInput" className="form-label fw-semibold text-secondary">
                                Correo electrónico
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-envelope text-secondary"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control form-control-lg border-start-0 shadow-sm"
                                    id="emailInput"
                                    placeholder="ejemplo@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        borderRadius: '0 10px 10px 0',
                                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                                    }}
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 8px rgba(184, 237, 245, 0.4)'}
                                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                                />
                            </div>
                        </div>

                        {/* Input de Contraseña */}
                        <div className="mb-3 position-relative">
                            <label htmlFor="passwordInput" className="form-label fw-semibold text-secondary">
                                Contraseña
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-lock text-secondary"></i>
                                </span>
                                <PasswordInput
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    inputStyle={{
                                        borderRadius: '0 10px 10px 0',
                                        width: '100%',
                                        padding: '12px 15px',
                                        border: '1px solid #c6def7ff',
                                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Link Olvidé mi contraseña */}
                        <div className="text-end mb-4">
                            <button
                                type="button"
                                className="btn btn-link p-0 fw-semibold"
                                onClick={() => setShowReset(true)}
                                style={{
                                    color: '#00bcd4',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = '#00838f'}
                                onMouseOut={(e) => e.currentTarget.style.color = '#00bcd4'}
                            >
                                Olvidé mi contraseña
                            </button>
                        </div>

                        {/* Botón Continuar */}
                        <button
                            type="submit"
                            className="btn btn-lg w-100 shadow-sm"
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
                                    Accediendo...
                                </>
                            ) : (
                                "Continuar"
                            )}
                        </button>
                    </form>
                </div>

                {/* 2. Columna de Promoción (Derecha) */}
                <div
                    className="col-lg-7 d-none d-lg-flex flex-column align-items-center justify-content-center p-5"
                    style={{
                        backgroundImage: `url(${CamionImage})`,
                        backgroundSize: 'contain', // ⬅️ Change 'cover' to 'contain'
                        backgroundRepeat: 'no-repeat', // ⬅️ Recommended to prevent repetition
                        backgroundPosition: 'center',
                        color: colors.whiteBackground,
                        position: 'relative',
                    }}
                >
                </div>
            </div>

            {/* Modal para restablecer contraseña */}
            <ResetPasswordModal show={showReset} onHide={() => setShowReset(false)} />
        </div>
    );
}

export default LogIn;