import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCar, FaRoute, FaChartBar } from "react-icons/fa";

export default function DashBoardPrincipal() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Gestión de Usuarios",
      description:
        "Administra las cuentas de usuarios del sistema: creación, edición y eliminación de registros.",
      icon: <FaUser size={40} className="text-info" />,
      path: "/DashBoardUsuarios",
      color: "#243b6b",
    },
    {
      title: "Gestión de Conductores",
      description:
        "Controla la información de los conductores, sus rutas y disponibilidad dentro del sistema.",
      icon: <FaCar size={40} className="text-success" />,
      path: "/DashBoardConductores",
      color: "#244b3b",
    },
    {
      title: "Registro de Viajes",
      description:
        "Consulta y gestiona los viajes registrados, visualiza historial y genera reportes.",
      icon: <FaRoute size={40} className="text-warning" />,
      path: "/admin/registro-viajes",
      color: "#5c3b24",
    },
  ];

  return (
    <div
      className="text-white p-4 min-vh-100"
      style={{ backgroundColor: "#1e2a52" }}
    >
      <h1 className="fw-bold mb-4 text-center">Panel de Administración</h1>

      <section className="text-center mb-5">
        <FaChartBar size={50} className="text-primary mb-3" />
        <h4>Bienvenido al módulo administrador</h4>
        <p className="text-white">
          Desde este panel puedes gestionar los principales módulos del sistema:
          usuarios, conductores y registros de viajes. Utiliza las secciones
          siguientes para acceder rápidamente a cada área de gestión.
        </p>
      </section>

      <section className="d-flex flex-wrap justify-content-center gap-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="card text-white"
            style={{
              backgroundColor: section.color,
              width: "320px",
              minHeight: "220px",
              borderRadius: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => navigate(section.path)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
              {section.icon}
              <h5 className="fw-bold mt-3">{section.title}</h5>
              <p className="text-light small mt-2">{section.description}</p>
              <button
                className="btn btn-outline-light mt-2"
                onClick={() => navigate(section.path)}
              >
                Ir al módulo
              </button>
            </div>
          </div>
        ))}
      </section>

      <footer className="text-center text-secondary mt-5" style={{ fontSize: "0.85rem" }}>
        © {new Date().getFullYear()} Panel Administrativo — Todos los derechos reservados
      </footer>
    </div>
  );
}
