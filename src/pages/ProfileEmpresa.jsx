import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { apiRequest } from "../services/api";
import FondosAuth from "../assets/FondosAuth.jpg";

function ProfileEmpresa() {
  const [empresa, setEmpresa] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiRequest("/empresa/profile", "GET", null, true, false, false, false, true);
        if (data?.success) {
          setEmpresa(data.data);
        }
      } catch (error) {
        localStorage.removeItem("empresaToken");
        localStorage.removeItem("empresaRUC");
        localStorage.removeItem("empresaNombre");
        localStorage.removeItem("empresaTipo");
        navigate("/LogInEmpresa");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("empresaToken");
    localStorage.removeItem("empresaRUC");
    localStorage.removeItem("empresaNombre");
    localStorage.removeItem("empresaTipo");
    navigate("/LogInEmpresa");
  };

  if (!empresa) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection
        title="Perfil Empresa"
        subtitle="Información corporativa y accesos"
        description="Consulta la información de tu empresa y accede a las herramientas disponibles para gestionar tus servicios."
        background={FondosAuth}
        height="80vh"
        align="center"
        backgroundPosition="center top"
      />

      <section className="py-5 text-white" style={{ backgroundColor: "#141414" }}>
        <div className="container">
          <h2 className="text-center mb-4">Perfil Empresarial</h2>
          <div className="card shadow p-4 text-dark mx-auto" style={{ maxWidth: "700px" }}>
            <p><strong>Nombre de Empresa:</strong> {empresa.nombreEmpresa}</p>
            <p><strong>RUC:</strong> {empresa.rucEmpresa}</p>
            <p><strong>Correo Corporativo:</strong> {empresa.correoCorporativo}</p>
            <p><strong>Teléfono:</strong> {empresa.telefono}</p>
            <p><strong>Representante:</strong> {empresa.nombres} {empresa.apellidos}</p>
            <p><strong>DNI Representante:</strong> {empresa.dni}</p>

            <div className="mt-4">
              <h5 className="text-center fw-bold mb-3">Servicios</h5>
              <div className="row g-3 mb-4">
                <div className="col">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate("/clienteUI")}
                  >
                    Solicitar Servicio
                  </button>
                </div>
              </div>

              <h5 className="text-center fw-bold mb-3">Panel Financiero</h5>
              <div className="row g-3 mb-4">
                <div className="col">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => navigate("/mis-gastos")}
                  >
                    Mis Gastos
                  </button>
                </div>
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-danger w-50" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfileEmpresa;