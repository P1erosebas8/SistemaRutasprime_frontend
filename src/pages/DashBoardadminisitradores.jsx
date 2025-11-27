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
  FaFileExcel,
  FaLock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { validators } from "../utils/validators";

export default function DashBoardAdministradores() {
  const { admins, loading, setAdmins, exportarExcel, crearAdmin, actualizarUsuario, eliminarUsuario } = useAdminUsers();

  const [buscar, setBuscar] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [adminEliminar, setAdminEliminar] = useState(null);
  const [editarAdmin, setEditarAdmin] = useState(null);
  const [errorServidor, setErrorServidor] = useState("");
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    nombres: "",
    apellidos: "",
    celular: "",
    email: "",
    dniRuc: "",
    password: "",
    direccion: "",
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
      password: "",
      direccion: "",
      rol: "ADMIN",
      fechaRegistro: "",
    });
    setErrores({});
    setErrorServidor("");
  };

  const mostrar = (admin = null) => {
    setErrorServidor("");
    if (admin) {
      setEditarAdmin(admin);
      setFormData({
        id: admin.id,
        nombres: admin.nombres,
        apellidos: admin.apellidos,
        celular: admin.celular,
        email: admin.email,
        dniRuc: admin.dniRuc,
        password: "",
        direccion: admin.direccion || "",
        rol: admin.rol || "ADMIN",
        fechaRegistro: admin.fechaRegistro || "",
      });
    }
    setMostrarModal(true);
  };

  const actualizarModal = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validators[name]) {
      const error = validators[name](value);
      setErrores((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
    setErrorServidor("");
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    
    if (editarAdmin) {
      const camposEditar = ['celular', 'direccion'];
      camposEditar.forEach((campo) => {
        if (validators[campo]) {
          const error = validators[campo](formData[campo]);
          if (error) nuevosErrores[campo] = error;
        }
      });
    } else {
      Object.keys(formData).forEach((campo) => {
        if (validators[campo]) {
          const error = validators[campo](formData[campo]);
          if (error) nuevosErrores[campo] = error;
        }
      });
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarModal = async () => {
    setErrorServidor("");
    if (!validarCampos()) {
      toast.warning("Corrige los errores antes de continuar");
      return;
    }

    setGuardando(true);

    try {
      if (editarAdmin) {
        const result = await actualizarUsuario(editarAdmin.id, {
          direccion: formData.direccion,
          celular: formData.celular,
        });
        if (!result.success) {
          setErrorServidor(result.message);
          return;
        }
        cerrarModal();
        return;
      }

      const result = await crearAdmin({
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        celular: formData.celular,
        email: formData.email,
        direccion: formData.direccion || "No especificada",
        dniRuc: formData.dniRuc,
        password: formData.password,
      });
      if (!result.success) {
        setErrorServidor(result.message);
        return;
      }
      cerrarModal();
    } finally {
      setGuardando(false);
    }
  };

  const confirmarEliminar = async () => {
    const result = await eliminarUsuario(adminEliminar.id);
    if (result.success) {
      setMostrarEliminar(false);
      setAdminEliminar(null);
    }
  };

  const borrar = (admin) => {
    setAdminEliminar(admin);
    setMostrarEliminar(true);
  };

  const query = buscar.trim().toLowerCase();
  const filteredData = admins.filter((a) =>
    query ? a.dniRuc?.toLowerCase().includes(query) : true
  );

  return (
    <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Gestión de Administradores</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => mostrar()}>
            <FaPlus className="me-2" />
            Agregar Administrador
          </button>
          <button className="btn btn-outline-light" onClick={exportarExcel}>
            <FaFileExcel className="me-2" />
            Descargar tabla de usuarios para Excel
          </button>
        </div>
      </div>

      <div className="mb-3 position-relative" style={{ maxWidth: "420px" }}>
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
                  filteredData.map((a) => (
                    <tr key={a.id}>
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
                          disabled={a.rol === "SUPERADMIN"}
                          onClick={() => borrar(a)}
                          style={{
                            opacity: a.rol === "SUPERADMIN" ? 0.4 : 1,
                            cursor: a.rol === "SUPERADMIN" ? "not-allowed" : "pointer",
                          }}
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

          <div className="text-end text-secondary mt-3" style={{ fontSize: "0.85rem" }}>
            Mostrando {filteredData.length} de {admins.length} administradores
          </div>
        </>
      )}

      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>{editarAdmin ? "Actualizar Administrador" : "Agregar Administrador"}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          {errorServidor && (
            <div className="alert alert-danger text-center py-2">{errorServidor}</div>
          )}

          <Form>
            {editarAdmin ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMapMarkerAlt className="me-2" />
                    Dirección
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={actualizarModal}
                    className={errores.direccion ? "border-danger" : ""}
                    placeholder="Ingrese dirección"
                  />
                  {errores.direccion && (
                    <Form.Text className="text-danger fw-bold">{errores.direccion}</Form.Text>
                  )}
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
                    className={errores.celular ? "border-danger" : ""}
                    placeholder="Ingrese celular"
                  />
                  {errores.celular && (
                    <Form.Text className="text-danger fw-bold">{errores.celular}</Form.Text>
                  )}
                </Form.Group>
              </>
            ) : (
              <>
                {[
                  { label: "Nombres", name: "nombres", icon: <FaUserShield /> },
                  { label: "Apellidos", name: "apellidos", icon: <FaUserShield /> },
                  { label: "Correo", name: "email", icon: <FaEnvelope /> },
                  { label: "Celular", name: "celular", icon: <FaPhoneAlt /> },
                  { label: "DNI / RUC", name: "dniRuc", icon: <FaIdCard /> },
                  { label: "Dirección", name: "direccion", icon: <FaMapMarkerAlt /> },
                ].map(({ label, name, icon }) => (
                  <Form.Group className="mb-3" key={name}>
                    <Form.Label>
                      {icon} {label}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={actualizarModal}
                      className={errores[name] ? "border-danger" : ""}
                      placeholder={`Ingrese ${label.toLowerCase()}`}
                    />
                    {errores[name] && (
                      <Form.Text className="text-danger fw-bold">{errores[name]}</Form.Text>
                    )}
                  </Form.Group>
                ))}

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaLock className="me-2" />
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={actualizarModal}
                    className={errores.password ? "border-danger" : ""}
                    placeholder="Ingrese la contraseña"
                  />
                  {errores.password && (
                    <Form.Text className="text-danger fw-bold">{errores.password}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaIdBadge className="me-2" /> Rol
                  </Form.Label>
                  <Form.Control type="text" name="rol" value={formData.rol} disabled readOnly />
                  <Form.Text className="text-info">El rol por defecto es "ADMIN"</Form.Text>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={cerrarModal} disabled={guardando}>
            Cancelar
          </Button>
          <Button variant="success" onClick={guardarModal} disabled={guardando}>
            {guardando ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Procesando...
              </>
            ) : (
              editarAdmin ? "Actualizar" : "Guardar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={mostrarEliminar} onHide={() => setMostrarEliminar(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          ¿Seguro que deseas eliminar al administrador:
          <br />
          <strong>{adminEliminar?.nombres} {adminEliminar?.apellidos}</strong>?
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={() => setMostrarEliminar(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminar}>
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
          .border-danger { border: 2px solid #ff4d4d !important; }
          .btn-outline-light { border: none; background-color: #40518b; color: white; }
          .btn-outline-light:hover { background-color: #4e8ef7; }
        `}
      </style>
    </div>
  );
}