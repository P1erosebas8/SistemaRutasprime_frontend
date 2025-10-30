import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUserShield,
  FaEnvelope,
  FaIdCard,
  FaPhoneAlt,
  FaIdBadge,
} from "react-icons/fa";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useAdminUsers } from "../hooks/useAdminUsers";

export default function DashBoardAdministradores() {
  const { admins, loading, setAdmins } = useAdminUsers();

  const [buscar, setBuscar] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editarAdmin, setEditarAdmin] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    nombres: "",
    apellidos: "",
    celular: "",
    email: "",
    dniRuc: "",
    rol: "ADMIN",
    fechaRegistro: "",
  });

  const cerrarModal = () => {
    setMostrarModal(false);
    setEditarAdmin(null);
    setFormData({
      id: null,
      nombres: "",
      apellidos: "",
      celular: "",
      email: "",
      dniRuc: "",
      rol: "ADMIN",
      fechaRegistro: "",
    });
  };

  const mostrar = (admin = null) => {
    if (admin) {
      setEditarAdmin(admin);
      setFormData({
        id: admin.id,
        nombres: admin.nombres,
        apellidos: admin.apellidos,
        celular: admin.celular,
        email: admin.email,
        dniRuc: admin.dniRuc,
        rol: admin.rol || "ADMIN",
        fechaRegistro: admin.fechaRegistro || "",
      });
    }
    setMostrarModal(true);
  };

  const actualizarModal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarModal = () => {
    if (editarAdmin) {
      setAdmins((prev) =>
        prev.map((a) => (a.id === editarAdmin.id ? { ...a, ...formData } : a))
      );
    } else {
      const nuevo = {
        id: formData.id ?? Date.now(),
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        celular: formData.celular,
        email: formData.email,
        dniRuc: formData.dniRuc,
        rol: formData.rol || "ADMIN",
        fechaRegistro: new Date().toLocaleDateString(),
      };
      setAdmins((prev) => [nuevo, ...prev]);
    }
    cerrarModal();
  };

  const borrar = (id) => {
    if (window.confirm("¿Deseas eliminar este administrador?")) {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const query = buscar.trim().toLowerCase();
  const filteredData = admins.filter((a) => {
    if (!query) return true;
    return a.dniRuc?.toLowerCase().includes(query);
  });

  return (
    <div
      className="text-white p-4 min-vh-100"
      style={{ backgroundColor: "#1e2a52" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Gestión de Administradores</h2>
        <button className="btn btn-success" onClick={() => mostrar()}>
          <FaPlus className="me-2" />
          Agregar Administrador
        </button>
      </div>

      <div className="mb-3 position-relative" style={{ maxWidth: "420px" }}>
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
          <p className="mt-3">Cargando administradores...</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle text-white">
              <thead>
                <tr style={{ backgroundColor: "#344675" }}>
                  <th>ID</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Celular</th>
                  <th>Email</th>
                  <th>DNI</th>
                  <th>Fecha Registro</th>
                  <th>Rol</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((a, index) => (
                    <tr key={a.id ?? index}>
                      <td>{a.id}</td>
                      <td>{a.nombres}</td>
                      <td>{a.apellidos}</td>
                      <td>{a.celular || "—"}</td>
                      <td>{a.email}</td>
                      <td>{a.dniRuc || "—"}</td>
                      <td>{a.fechaRegistro}</td>
                      <td>{a.rol}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-warning me-2"
                          onClick={() => mostrar(a)}
                        >
                          <FaEdit /> Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => borrar(a.id)}
                        >
                          <FaTrash /> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-secondary py-4">
                      No se encontraron administradores
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            className="text-end text-secondary mt-3"
            style={{ fontSize: "0.85rem" }}
          >
            Mostrando {filteredData.length} de {admins.length} administradores
          </div>
        </>
      )}

      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#2d3b6a", color: "white" }}
        >
          <Modal.Title>
            {editarAdmin ? "Actualizar Administrador" : "Agregar Administrador"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaUserShield className="me-2" />
                Nombres
              </Form.Label>
              <Form.Control
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={actualizarModal}
                placeholder="Ingrese los nombres"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaUserShield className="me-2" />
                Apellidos
              </Form.Label>
              <Form.Control
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={actualizarModal}
                placeholder="Ingrese los apellidos"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope className="me-2" />
                Correo
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={actualizarModal}
                placeholder="Ingrese el correo"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaPhoneAlt className="me-2" />
                Celular
              </Form.Label>
              <Form.Control
                type="text"
                name="celular"
                value={formData.celular}
                onChange={actualizarModal}
                placeholder="Ingrese el celular"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaIdCard className="me-2" />
                DNI / RUC
              </Form.Label>
              <Form.Control
                type="text"
                name="dniRuc"
                value={formData.dniRuc}
                onChange={actualizarModal}
                placeholder="Ingrese DNI o RUC"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaIdBadge className="me-2" />
                Rol
              </Form.Label>
              <Form.Control
                type="text"
                name="rol"
                value={formData.rol}
                disabled
                readOnly
              />
              <Form.Text className="text-info">
                El rol por defecto es "ADMIN"
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={guardarModal}>
            {editarAdmin ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
          input::placeholder { color: white !important; opacity: 1; }
          .modal-content { border: 2px solid #40518b; }
          .form-control { background-color: #2d3b6a; color: white; border: none; }
          .form-control:focus { box-shadow: 0 0 5px #4e8ef7; }
          .btn-outline-light { border: none; background-color: #40518b; color: white; }
          .btn-outline-light:hover { background-color: #4e8ef7; }
        `}
      </style>
    </div>
  );
}