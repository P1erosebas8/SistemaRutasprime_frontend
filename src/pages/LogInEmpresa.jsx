import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiRequest } from "../services/api";


function LogInEmpresa() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("empresaToken");
    const nombreEmpresa = localStorage.getItem("empresaNombre");
    if (token && nombreEmpresa) {
      navigate("/profile-empresa");
    }
  }, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await apiRequest("/empresa/login", "POST", { email, password });
      if (data?.success) {
        localStorage.setItem("empresaToken", data.data.token);
        localStorage.setItem("empresaRUC", data.data.ruc);
        localStorage.setItem("empresaNombre", data.data.nombreEmpresa);
        localStorage.setItem("empresaTipo", data.data.tipo);
        navigate("/profile-empresa");
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('src/assets/bg-loginadmin.png')",
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
            style={{ background: "#1e2a52" }}
          >
            <img
              src="src/assets/Logo.png"
              alt="Logo"
              style={{ width: "140px", marginBottom: "15px" }}
            />
            <h3 className="fw-bold text-center">Panel Empresas</h3>
            <p className="text-center text-light mt-2">
              Acceso para empresas afiliadas. Gestiona órdenes y tu perfil empresarial.
            </p>
          </div>
          <div className="col-lg-7 d-flex align-items-center justify-content-center p-4 bg-light">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <h4 className="text-center mb-4 fw-semibold text-dark">Iniciar Sesión</h4>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="empresa@rutasprime.com"
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
                <button type="submit" className="btn btn-dark w-100 mb-3" disabled={loading}>
                  {loading ? "Ingresando..." : "Ingresar"}
                </button>
                <p className="text-center text-muted" style={{ fontSize: "0.9rem" }}>
                  Acceso exclusivo para empresas afiliadas
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default LogInEmpresa;