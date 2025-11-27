import React, { useState } from "react";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { FaEye, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSolicitudesEmpresa } from "../../hooks/useSolicitudesEmpresa";


export default function AprobarEmpresas() {
  const { solicitudes, loading, verificarSolicitud, obtenerHistorial } = useSolicitudesEmpresa();
  const [buscar, setBuscar] = useState("");
  const [mostrarModalVerificacion, setMostrarModalVerificacion] = useState(false);
  const [mostrarModalSeguimiento, setMostrarModalSeguimiento] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("APROBADO");
  const [observacion, setObservacion] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [historial, setHistorial] = useState([]);


  const abrirModalVerificacion = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setEstadoSeleccionado("APROBADO");
    setObservacion("");
    setMostrarModalVerificacion(true);
  };


  const cerrarModalVerificacion = () => {
    setMostrarModalVerificacion(false);
    setSolicitudSeleccionada(null);
  };


  const handleEnviar = async () => {
    if (!solicitudSeleccionada) return;
    if (observacion.trim() === "") {
      toast.warn("La observación es obligatoria para enviar la verificación");
      return;
    }
    setEnviando(true);
    await verificarSolicitud(solicitudSeleccionada.id, estadoSeleccionado, observacion);
    setEnviando(false);
    cerrarModalVerificacion();
  };


  const abrirModalSeguimiento = async (empresaId) => {
    const data = await obtenerHistorial(empresaId);
    setHistorial(data);
    setMostrarModalSeguimiento(true);
  };


  const cerrarModalSeguimiento = () => {
    setMostrarModalSeguimiento(false);
    setHistorial([]);
  };


  const filteredData = solicitudes.filter((s) => {
    const query = buscar.trim().toLowerCase();
    return s.rucEmpresa.toLowerCase().includes(query) || s.nombreEmpresa.toLowerCase().includes(query);
  });


  return (
    <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Solicitudes de Empresas</h2>
      </div>


      <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
        <FaSearch className="position-absolute text-secondary" style={{ top: "10px", left: "10px" }} />
        <input
          type="text"
          placeholder="Buscar por RUC o Razón Social"
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
                <th>Representante</th>
                <th>DNI</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Fecha Solicitud</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((s) => (
                  <tr key={s.id}>
                    <td>{s.codigo}</td>
                    <td>{s.rucEmpresa}</td>
                    <td>{s.nombreEmpresa}</td>
                    <td>{s.nombres} {s.apellidos}</td>
                    <td>{s.dni}</td>
                    <td>{s.correoCorporativo}</td>
                    <td>{s.telefono}</td>
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
                    <td>{s.fechaSolicitud}</td>
                    <td className="text-center">
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => abrirModalSeguimiento(s.id)}
                        >
                          Seguimiento
                        </button>
                        {s.estado !== "APROBADO" && (
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
                  <td colSpan="10" className="text-center text-secondary py-4">
                    No se encontraron solicitudes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}


      <Modal show={mostrarModalVerificacion} onHide={cerrarModalVerificacion} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>Actualizar Estado de Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Seleccione el estado:</Form.Label>
              <Form.Select
                value={estadoSeleccionado}
                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                style={{ backgroundColor: "#2d3b6a", color: "white", border: "1px solid #40518b" }}
              >
                <option value="APROBADO">APROBADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Observación (obligatoria):</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                placeholder="Ingrese una observación..."
                style={{
                  backgroundColor: "#2d3b6a",
                  color: "white",
                  border: "1px solid #40518b",
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={cerrarModalVerificacion} disabled={enviando}>
            Cancelar
          </Button>
          <Button
            onClick={handleEnviar}
            disabled={enviando}
            style={{
              backgroundColor: estadoSeleccionado === "APROBADO" ? "#28a745" : "#dc3545",
              borderColor: estadoSeleccionado === "APROBADO" ? "#28a745" : "#dc3545",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {enviando && <Spinner animation="border" size="sm" />}{" "}
            {estadoSeleccionado === "APROBADO" ? "Aprobar" : "Rechazar"}
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={mostrarModalSeguimiento} onHide={cerrarModalSeguimiento} centered size="lg" scrollable>
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>Seguimiento de Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          {historial.length === 0 ? (
            <div className="text-center py-5 text-warning fw-bold">Sin historial disponible</div>
          ) : (
            <div className="timeline">
              {historial
                .sort((a, b) => new Date(b.fechaCambio) - new Date(a.fechaCambio))
                .map((item, index) => (
                  <div
                    key={index}
                    className="timeline-item mb-4 p-3 rounded"
                    style={{
                      backgroundColor:
                        item.estado === "APROBADO"
                          ? "#19875433"
                          : item.estado === "RECHAZADO"
                          ? "#dc354533"
                          : "#ffc10733",
                      borderLeft: `4px solid ${
                        item.estado === "APROBADO"
                          ? "#28a745"
                          : item.estado === "RECHAZADO"
                          ? "#dc3545"
                          : "#ffc107"
                      }`,
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0 fw-bold">{item.estado}</h5>
                      <small className="text-muted">
                        {new Date(item.fechaCambio).toLocaleString()}
                      </small>
                    </div>
                    <p className="mb-1 text-light">{item.observacion}</p>
                    <small className="text-info">Código: {item.codigoSolicitud}</small>
                  </div>
                ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={cerrarModalSeguimiento}>
            Cerrar
          </Button>
        </Modal.Footer>
        <style>
          {`
            .timeline {
              position: relative;
              padding-left: 20px;
            }
            .timeline::before {
              content: '';
              position: absolute;
              left: 8px;
              top: 0;
              bottom: 0;
              width: 2px;
              background-color: #40518b;
            }
            .timeline-item {
              position: relative;
            }
            .timeline-item::before {
              content: '';
              position: absolute;
              left: -12px;
              top: 15px;
              width: 12px;
              height: 12px;
              background-color: #4e8ef7;
              border-radius: 50%;
              box-shadow: 0 0 6px #4e8ef7;
            }
          `}
        </style>
      </Modal>


      <style>
        {`
          input::placeholder { color: white !important; opacity: 1; }
          .modal-content { border: 2px solid #40518b; }
          .form-control, .form-select {
            background-color: #2d3b6a !important;
            color: white !important;
            border: none;
          }
          .form-control:focus, .form-select:focus {
            box-shadow: 0 0 5px #4e8ef7;
          }
        `}
      </style>
    </div>
  );
}