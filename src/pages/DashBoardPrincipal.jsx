import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCarSide, FaUserShield } from "react-icons/fa";
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashBoardPrincipal() {
  const navigate = useNavigate();
  const { isAdminAuthenticated } = useAuthAdmin();

  useEffect(() => {
    if (!isAdminAuthenticated) navigate("/loginadmin");
  }, [isAdminAuthenticated, navigate]);

  const usuarios = [
    { tipo: "Clientes", cantidad: 1452 },
    { tipo: "Conductores", cantidad: 287 },
    { tipo: "Administradores", cantidad: 12 }
  ];

  const gananciasMensuales = [400, 520, 480, 650, 700, 850, 950, 1020, 990, 1100, 1300, 1500];
  const actividadSistema = [20, 32, 40, 35, 50, 45, 60, 72, 80, 95, 100, 130];

  const dataBar = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [{ label: "Ganancias ($)", data: gananciasMensuales, backgroundColor: "#4a90e2" }]
  };

  const dataLine = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [{ label: "Actividad", data: actividadSistema, borderColor: "#00d4ff", tension: 0.4 }]
  };

  const dataDoughnut = {
    labels: usuarios.map((u) => u.tipo),
    datasets: [{ data: usuarios.map((u) => u.cantidad), backgroundColor: ["#007bff", "#28a745", "#ffc107"] }]
  };

  return (
    <div
      className="text-white p-4"
      style={{
        backgroundColor: "#10172a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h1 className="fw-bold mb-5 text-center">Dashboard Administrativo</h1>

      <section className="d-flex justify-content-center gap-4 flex-wrap mb-5">
        {usuarios.map((u, i) => (
          <div
            key={i}
            className="p-4 text-center"
            style={{
              width: "280px",
              backgroundColor: "#1c2541",
              borderRadius: "15px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ color: i === 0 ? "#007bff" : i === 1 ? "#28a745" : "#ffc107" }}>
              {i === 0 && <FaUsers size={40} />}
              {i === 1 && <FaCarSide size={40} />}
              {i === 2 && <FaUserShield size={40} />}
            </div>
            <h3 className="mt-3 fw-bold">{u.cantidad}</h3>
            <p className="text-secondary">{u.tipo}</p>
          </div>
        ))}
      </section>

      <section
        className="d-flex justify-content-center flex-wrap gap-4"
        style={{ marginTop: "40px" }}
      >
        <div
          style={{
            width: "500px",
            backgroundColor: "#1c2541",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
          }}
        >
          <h5 className="mb-3">Ganancias Mensuales</h5>
          <Bar data={dataBar} height={200} />
        </div>

        <div
          style={{
            width: "500px",
            backgroundColor: "#1c2541",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
          }}
        >
          <h5 className="mb-3">Actividad del Sistema</h5>
          <Line data={dataLine} height={200} />
        </div>

        <div
          style={{
            width: "350px",
            backgroundColor: "#1c2541",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
          }}
        >
          <h5 className="mb-3 text-center">Distribución de Usuarios</h5>
          <Doughnut data={dataDoughnut} />
        </div>
      </section>

      <footer
        className="text-center text-secondary mt-auto pt-4"
        style={{ fontSize: "0.85rem" }}
      >
        © {new Date().getFullYear()} Panel Administrativo — Todos los derechos reservados
      </footer>
    </div>
  );
}