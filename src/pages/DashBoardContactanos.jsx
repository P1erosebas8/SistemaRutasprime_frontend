import React, { useState, useMemo, useRef, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FaSearch, FaReply, FaUser, FaComments } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContactAdmin } from "../hooks/useContactAdmin";

export default function DashBoardContactanos() {
  const [buscar, setBuscar] = useState("");
  const [modalMensaje, setModalMensaje] = useState(false);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [modalResponder, setModalResponder] = useState(false);
  const [modalRespuestas, setModalRespuestas] = useState(false);
  const [respuestas, setRespuestas] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [cargandoRespuestas, setCargandoRespuestas] = useState(false);

  const respuestasRef = useRef(null);

  const { mensajes, loading, responderMensaje, getRespuestasPorCodigo } = useContactAdmin();

  const abrirModalMensaje = (mensaje) => {
    setMensajeSeleccionado(mensaje);
    setModalMensaje(true);
  };

  const abrirResponder = (mensaje) => {
    setMensajeSeleccionado(mensaje);
    setModalResponder(true);
  };

  const abrirVerRespuestas = async (mensaje) => {
    setMensajeSeleccionado(mensaje);
    setModalRespuestas(true);
    setCargandoRespuestas(true);
    const data = await getRespuestasPorCodigo(mensaje.codigo);
    setRespuestas(data?.replies || []);
    setCargandoRespuestas(false);
  };

  useEffect(() => {
    if (respuestasRef.current) {
      respuestasRef.current.scrollTop = respuestasRef.current.scrollHeight;
    }
  }, [respuestas, modalRespuestas]);

  const cerrarModal = () => {
    setModalMensaje(false);
    setModalResponder(false);
    setModalRespuestas(false);
    setMensajeSeleccionado(null);
    setRespuesta("");
    setRespuestas([]);
  };

  const handleEnviarRespuesta = async () => {
    if (!respuesta.trim()) {
      toast.warn("El mensaje no puede estar vacío", { position: "top-right", autoClose: 3000 });
      return;
    }

    setEnviando(true);
    await responderMensaje(
      mensajeSeleccionado.nombre,
      mensajeSeleccionado.correo,
      respuesta
    );

    const nuevaRespuesta = {
      replyCode: `R-${Date.now()}`,
      replyMessage: respuesta,
      repliedAt: new Date().toISOString()
    };
    setRespuestas((prev) => [...prev, nuevaRespuesta]);
    setRespuesta("");
    setEnviando(false);
    setModalResponder(false);
    setModalRespuestas(true);
  };

  const filteredData = useMemo(() => {
    const query = buscar.trim().toLowerCase();
    if (!query) return mensajes;
    return mensajes.filter((m) => m.codigo.toLowerCase().includes(query));
  }, [buscar, mensajes]);

  return (
    <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Mensajes de Contacto</h2>
      </div>

      <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
        <FaSearch className="position-absolute text-secondary" style={{ top: "10px", left: "10px" }} />
        <input
          type="text"
          placeholder="Buscar por código"
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
          <p className="mt-3">Cargando mensajes...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle text-white">
            <thead>
              <tr style={{ backgroundColor: "#344675" }}>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Mensaje</th>
                <th>Fecha / Hora</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((m) => (
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.codigo}</td>
                    <td>{m.nombre}</td>
                    <td>{m.correo}</td>
                    <td>
                      <Button size="sm" variant="outline-info" onClick={() => abrirModalMensaje(m)}>
                        Ver Mensaje
                      </Button>
                    </td>
                    <td>{m.fecha}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Button size="sm" variant="outline-success" onClick={() => abrirResponder(m)}>
                          <FaReply /> Responder
                        </Button>
                        <Button size="sm" variant="outline-warning" onClick={() => abrirVerRespuestas(m)}>
                          <FaComments /> Ver Respuestas
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-secondary py-4">
                    No se encontraron mensajes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-end text-secondary mt-3" style={{ fontSize: "0.85rem" }}>
        Mostrando {filteredData.length} de {mensajes.length} mensajes
      </div>

      <Modal show={modalMensaje} onHide={cerrarModal} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>
            <FaUser className="me-2" />
            {mensajeSeleccionado?.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          <p><strong>Código:</strong> {mensajeSeleccionado?.codigo}</p>
          <p><strong>Correo:</strong> {mensajeSeleccionado?.correo}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <div style={{ whiteSpace: "pre-wrap" }}>{mensajeSeleccionado?.mensaje}</div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={cerrarModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalRespuestas} onHide={cerrarModal} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>Respuestas de {mensajeSeleccionado?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ backgroundColor: "#1e2a52", color: "white", maxHeight: "60vh", overflowY: "auto" }}
          ref={respuestasRef}
        >
          {cargandoRespuestas ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="light" />
              <p className="mt-2">Cargando respuestas...</p>
            </div>
          ) : respuestas.length > 0 ? (
            respuestas.map((r, index) => (
              <div
                key={r.replyCode || index}
                className="p-3 mb-3 rounded"
                style={{ backgroundColor: "#2d3b6a", borderLeft: "4px solid #4e8ef7" }}
              >
                <p><strong>Código:</strong> {r.replyCode}</p>
                <p><strong>Mensaje:</strong> {r.replyMessage}</p>
                <p className="text-secondary mb-0">
                  <small>{new Date(r.repliedAt).toLocaleString("es-PE", { dateStyle: "short", timeStyle: "short" })}</small>
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary py-3">No hay respuestas registradas</p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={cerrarModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalResponder} onHide={cerrarModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>Responder Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          <p><strong>Para:</strong> {mensajeSeleccionado?.correo}</p>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Escribe tu respuesta..."
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            style={{ backgroundColor: "#2d3b6a", color: "white", border: "none" }}
          ></textarea>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={cerrarModal} disabled={enviando}>Cancelar</Button>
          <Button variant="success" onClick={handleEnviarRespuesta} disabled={enviando}>
            {enviando ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Enviando...
              </>
            ) : (
              "Enviar Respuesta"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
          input::placeholder { color: white !important; opacity: 1; }
          .modal-content { border: 2px solid #40518b; }
          .form-control:focus { box-shadow: 0 0 5px #4e8ef7; }
        `}
      </style>
    </div>
  );
}