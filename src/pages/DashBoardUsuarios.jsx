import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaPhone, FaIdCard } from "react-icons/fa";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useClientes } from "../hooks/useClientes";
import { useAdminUsers } from "../hooks/useAdminUsers";

export default function DashBoardUsuarios() {
  const [buscar, setBuscar] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [editarUsuario, setEditarUsuario] = useState(null);
  const [formData, setFormData] = useState({
    direccion: "",
    celular: "",
  });
  const [loadingActualizar, setLoadingActualizar] = useState(false);

  const { clientes, loading, getClientes } = useClientes();
  const { actualizarUsuario, eliminarUsuario } = useAdminUsers();
  const usuarios = clientes;

  const CerrarModal = () => {
    setMostrarModal(false);
    setEditarUsuario(null);
    setFormData({
      direccion: "",
      celular: "",
    });
  };

  const MostrarEditar = (usuario) => {
    setEditarUsuario(usuario);
    setFormData({
      direccion: usuario.direccion || "",
      celular: usuario.celular || "",
    });
    setMostrarModal(true);
  };

  const MostrarEliminar = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarModalEliminar(true);
  };

  const CerrarModalEliminar = () => {
    setUsuarioAEliminar(null);
    setMostrarModalEliminar(false);
  };

  const ActualizarModal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GuardarModal = async () => {
    if (!editarUsuario || !editarUsuario.id) {
      toast.error("Error: ID de usuario no válido");
      return;
    }
    setLoadingActualizar(true);
    const result = await actualizarUsuario(editarUsuario.id, formData);
    if (result.success) {
      await getClientes();
      CerrarModal();
    }
    setLoadingActualizar(false);
  };

  const ConfirmarEliminar = async () => {
    if (!usuarioAEliminar || !usuarioAEliminar.id) {
      toast.error("Error: ID de usuario no válido");
      return;
    }
    const result = await eliminarUsuario(usuarioAEliminar.id);
    if (result.success) {
      await getClientes();
      CerrarModalEliminar();
    }
  };

  const filteredData = usuarios.filter((u) => {
    const query = buscar.trim().toLowerCase();
    return (
      (u.id && u.id.toString().includes(query)) ||
      u.nombre.toLowerCase().includes(query) ||
      u.apellido.toLowerCase().includes(query) ||
      u.correo.toLowerCase().includes(query) ||
      (u.dni && u.dni.toLowerCase().includes(query))
    );
  });

  return (
    <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Gestión de Clientes</h2>
      </div>
      <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
        <FaSearch className="position-absolute text-secondary" style={{ top: "10px", left: "10px" }} />
        <input
          type="text"
          placeholder="Buscar por DNI"
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
          <p className="mt-3">Cargando clientes...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle text-white">
            <thead>
              <tr style={{ backgroundColor: "#344675" }}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>DNI</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.apellido}</td>
                    <td>{u.correo}</td>
                    <td>{u.telefono}</td>
                    <td>{u.dni}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => MostrarEditar(u)}>
                        <FaEdit /> Editar
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => MostrarEliminar(u)}>
                        <FaTrash /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-secondary py-4">
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-end text-secondary mt-3" style={{ fontSize: "0.85rem" }}>
        Mostrando {filteredData.length} de {usuarios.length} usuarios
      </div>
      <Modal show={mostrarModal} onHide={CerrarModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaPhone className="me-2" />
                Celular
              </Form.Label>
              <Form.Control
                type="text"
                name="celular"
                value={formData.celular}
                onChange={ActualizarModal}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaIdCard className="me-2" />
                Dirección
              </Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={ActualizarModal}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={CerrarModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={GuardarModal} disabled={loadingActualizar}>
            {loadingActualizar ? <Spinner animation="border" size="sm" /> : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={mostrarModalEliminar} onHide={CerrarModalEliminar} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#812d2d", color: "white" }}>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          {usuarioAEliminar && (
            <p className="mb-0 fs-5 text-center">
              ¿Estás seguro que deseas eliminar al usuario:
              <br />
              <strong>
                {usuarioAEliminar.nombre} {usuarioAEliminar.apellido}
              </strong>
              ?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={CerrarModalEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={ConfirmarEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <style>
        {`
        input::placeholder { color: white !important; opacity: 1; }
        .modal-content { border: 2px solid #40518b; }
        .form-control { background-color: #2d3b6a; color: white; border: none; }
        .form-control:focus { box-shadow: 0 0 5px #4e8ef7; }
        `}
      </style>
    </div>
  );
}