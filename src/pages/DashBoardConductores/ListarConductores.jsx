import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaUserTag,
} from "react-icons/fa";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useConductoresClientes } from "../../hooks/useConductoresClientes";

export default function ListarConductores() {
  const [buscar, setBuscar] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    dni: "",
    roles: "",
  });

  const { usuarios, loading } = useConductoresClientes();

  const CerrarModal = () => {
    setMostrarModal(false);
    setEditarUsuario(null);
    setFormData({
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      dni: "",
      roles: "",
    });
  };

  const Mostar = (usuario = null) => {
    if (usuario) {
      setEditarUsuario(usuario);
      setFormData(usuario);
    }
    setMostrarModal(true);
  };

  const ActualizarModal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GuardarModal = () => {
    CerrarModal();
  };

  const Borrar = (codigo) => {
    if (window.confirm("¿Deseas eliminar este usuario?")) {
      console.log("Eliminar", codigo);
    }
  };

  const filteredData = usuarios.filter((u) => {
    const query = buscar.trim().toLowerCase();
    return u.dni && u.dni.toLowerCase().includes(query);
  });

  return (
    <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Conductores y Clientes</h2>
        <button className="btn btn-success" onClick={() => Mostar()}>
          <FaPlus className="me-2" />
          Agregar Usuario
        </button>
      </div>

      <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
        <FaSearch
          className="position-absolute text-secondary"
          style={{ top: "10px", left: "10px" }}
        />
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
          <p className="mt-3">Cargando usuarios...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle text-white">
            <thead>
              <tr style={{ backgroundColor: "#344675" }}>
                <th>Código</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>DNI</th>
                <th>Roles</th>
                <th>Registro</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((u, index) => (
                  <tr key={index}>
                    <td>{u.codigo}</td>
                    <td>{u.nombre}</td>
                    <td>{u.apellido}</td>
                    <td>{u.correo}</td>
                    <td>{u.telefono}</td>
                    <td>{u.dni}</td>
                    <td>{u.roles}</td>
                    <td>{u.fechaRegistro}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => Mostar(u)}
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => Borrar(u.codigo)}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-secondary py-4">
                    No se encontraron usuarios con ese DNI
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
          <Modal.Title>{editarUsuario ? "Actualizar Usuario" : "Agregar Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label><FaUser className="me-2" />Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={ActualizarModal}
                placeholder="Ingrese el nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FaUser className="me-2" />Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={ActualizarModal}
                placeholder="Ingrese el apellido"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FaEnvelope className="me-2" />Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={ActualizarModal}
                placeholder="Ingrese el correo"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FaPhone className="me-2" />Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={ActualizarModal}
                placeholder="Ingrese el teléfono"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FaIdCard className="me-2" />DNI o RUC</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                value={formData.dni}
                onChange={ActualizarModal}
                placeholder="Ingrese el DNI o RUC"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FaUserTag className="me-2" />Roles</Form.Label>
              <Form.Control type="text" name="roles" value={formData.roles} disabled />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={CerrarModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={GuardarModal}>
            {editarUsuario ? "Actualizar" : "Guardar"}
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