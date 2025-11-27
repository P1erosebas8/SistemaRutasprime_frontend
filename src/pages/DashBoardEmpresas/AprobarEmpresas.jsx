import React, { useState } from "react";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { FaEye, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSolicitudesEmpresas } from "../../hooks/useSolicitudesEmpresas";

export default function AprobarEmpresas() {
  const { solicitudes, loading, actualizarSolicitud, obtenerHistorial } =
    useSolicitudesEmpresas();

  const [buscar, setBuscar] = useState("");
  const [mostrarModalArchivos, setMostrarModalArchivos] = useState(false);
  const [mostrarModalVerificacion, setMostrarModalVerificacion] = useState(false);
  const [mostrarModalSeguimiento, setMostrarModalSeguimiento] = useState(false);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState({});
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("APROBADO");
  const [observacion, setObservacion] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [historial, setHistorial] = useState([]);

  const abrirModalArchivos = (archivos) => {
    setArchivosSeleccionados(archivos);
    setMostrarModalArchivos(true);
  };

  const abrirModalVerificacion = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setEstadoSeleccionado("APROBADO");
    setObservacion("");
    setMostrarModalVerificacion(true);
  };

  const abrirModalSeguimiento = async (empresaId) => {
    const data = await obtenerHistorial(empresaId);
    setHistorial(data);
    setMostrarModalSeguimiento(true);
  };

  const handleEnviar = async () => {
    if (!solicitudSeleccionada) return;

    if (observacion.trim() === "") {
      toast.warn("La observación es obligatoria");
      return;
    }

    setEnviando(true);
    await actualizarSolicitud(
      solicitudSeleccionada.id,
      estadoSeleccionado,
      observacion
    );
    setEnviando(false);
    setMostrarModalVerificacion(false);
  };

  const filteredData = solicitudes.filter((s) => {
    const query = buscar.trim().toLowerCase();
    return s.ruc.toLowerCase().includes(query);
  });

  return (
    <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Solicitudes de Empresas</h2>
      </div>

      <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
        <FaSearch
          className="position-absolute text-secondary"
          style={{ top: "10px", left: "10px" }}
        />
        <input
          type="text"
          placeholder="Buscar por RUC"
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className="form-control ps-5"
          style={{
            backgroundColor: "#2d3b6a",
            color: "white",
            border: "1px solid #40518b",
          }}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="light" />
          <p className="mt-3">Cargando solicitudes...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle text-white">
            <thead>
              <tr style={{ backgroundColor: "#344675" }}>
                <th>Código</th>
                <th>RUC</th>
                <th>Razón Social</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Fecha Registro</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((s, index) => (
                  <tr key={index}>
                    <td>{s.codigo}</td>
                    <td>{s.ruc}</td>
                    <td>{s.razonSocial}</td>
                    <td>{s.correo}</td>
                    <td>
                      <span
                        className={`badge ${
                          s.estado === "PENDIENTE"
                            ? "bg-warning"
                            : s.estado === "APROBADO"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {s.estado}
                      </span>
                    </td>
                    <td>{s.fechaRegistro}</td>
                    <td className="text-center">
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => abrirModalArchivos(s.archivos)}
                        >
                          <FaEye className="me-1" /> Ver Archivos
                        </button>

                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => abrirModalSeguimiento(s.empresa)}
                        >
                          Seguimiento
                        </button>

                        {s.estado === "PENDIENTE" && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => abrirModalVerificacion(s)}
                          >
                            Verificar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-secondary py-4">
                    No se encontraron solicitudes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ——— Modales quedan idénticos a los del conductor ——— */}
    </div>
  );
}
