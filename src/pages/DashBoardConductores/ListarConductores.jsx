import React, { useState } from "react";
import {
  FaEdit,
  FaSearch,
  FaMapMarkerAlt,
  FaHashtag
} from "react-icons/fa";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useConductoresClientes } from "../../hooks/useConductoresClientes";

export default function ListarConductores() {
  const [buscar, setBuscar] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState(null);
  const [cargandoActualizar, setCargandoActualizar] = useState(false);

  const [formData, setFormData] = useState({
    direccion: "",
    numero: ""
  });

  const { usuarios, loading, actualizarUsuario } = useConductoresClientes();

  const CerrarModal = () => {
    setMostrarModal(false);
    setEditarUsuario(null);
    setFormData({
      direccion: "",
      numero: ""
    });
  };

  const MostrarEditar = (usuario) => {
    setEditarUsuario(usuario);
    setFormData({
      direccion: usuario.direccion || "",
      numero: usuario.numero || ""
    });
    setMostrarModal(true);
  };

  const ActualizarModal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GuardarModal = async () => {
    if (!editarUsuario) return;
    
    const datosActualizar = {
      nombres: editarUsuario.nombre,
      apellidos: editarUsuario.apellido,
      email: editarUsuario.correo,
      celular: editarUsuario.telefono,
      dniRuc: editarUsuario.dni,
      direccion: formData.direccion,
      numero: formData.numero
    };
    
    setCargandoActualizar(true);
    const resultado = await actualizarUsuario(editarUsuario.id, datosActualizar);
    setCargandoActualizar(false);
    
    if (resultado.success) {
      CerrarModal();
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
            border: "1px solid #40518b"
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
                filteredData.map((u) => (
                  <tr key={u.id}>
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
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => MostrarEditar(u)}
                      >
                        <FaEdit /> Editar
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
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label><FaMapMarkerAlt className="me-2" />Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={ActualizarModal}
                placeholder="Ingrese la dirección"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><FaHashtag className="me-2" />Número</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={formData.numero}
                onChange={ActualizarModal}
                placeholder="Ingrese el número"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={CerrarModal} disabled={cargandoActualizar}>
            Cancelar
          </Button>
          <Button variant="success" onClick={GuardarModal} disabled={cargandoActualizar}>
            {cargandoActualizar ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Actualizando...
              </>
            ) : (
              "Actualizar"
            )}
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