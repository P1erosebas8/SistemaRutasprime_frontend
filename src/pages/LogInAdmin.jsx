import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function LogInAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    {/* Puse esta condicional para verificar que me redireccionaba al panel administrador despeus pondre los mensjaes de error en modales*/}
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "asd@asd.com" && password === "123456") {
      navigate("/DashBoardPrincipal");
    } else {
      alert("Credenciales incorrectas (usa admin@example.com / 123456)");
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          "url('src/assets/bg-loginadmin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container bg-white rounded-4 shadow-lg overflow-hidden"
        style={{
          maxWidth: "900px",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <div className="row g-5">
              <div
            className="col-lg-5 d-flex flex-column justify-content-center align-items-center text-white p-4"
            style={{
              background: "#1e2a52",
            }}
          >
            <img
              src="src/assets/Logo.png"
              alt="Logo"
              style={{ width: "140px", marginBottom: "15px" }}
            />
            <h3 className="fw-bold text-center">Panel Administrativo</h3>
            <p className="text-center text-light mt-2">
              Gestiona usuarios, conductores y registros de viajes fácilmente.
            </p>
          </div>

          <div className="col-lg-7 d-flex align-items-center justify-content-center p-4 bg-light">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <h4 className="text-center mb-4 fw-semibold text-dark">
                Iniciar Sesión
              </h4>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-dark w-100 mb-3">
                  Ingresar
                </button>
                <p className="text-center text-muted" style={{ fontSize: "0.9rem" }}>
                  Acceso exclusivo para administradores
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInAdmin;
