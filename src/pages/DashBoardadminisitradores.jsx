import React, { useState } from "react";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaUserShield,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaIdBadge,
} from "react-icons/fa";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

export default function DashBoardAdministradores() {
    const [buscar, setBuscar] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editarAdmin, setEditarAdmin] = useState(null);
    const [verContraseña, setVerContraseña] = useState(false);

    const [administradores, setAdministradores] = useState([
        { codigo: "A001", nombre: "Carlos", correo: "carlos@admin.com", rol: "Admin", contraseña: "1234" },
        { codigo: "A002", nombre: "Lucía", correo: "lucia@admin.com", rol: "Admin", contraseña: "abcd" },
    ]);

    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        rol: "Admin",
        contraseña: "",
    });

    const cerrarModal = () => {
        setMostrarModal(false);
        setEditarAdmin(null);
        setFormData({ nombre: "", correo: "", rol: "Admin", contraseña: "" });
        setVerContraseña(false);
    };

    const mostrar = (admin = null) => {
        if (admin) {
            setEditarAdmin(admin);
            setFormData(admin);
        }
        setMostrarModal(true);
    };

    const actualizarModal = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const guardarModal = () => {
        if (editarAdmin) {
            setAdministradores(
                administradores.map((a) =>
                    a.codigo === editarAdmin.codigo ? { ...editarAdmin, ...formData } : a
                )
            );
        } else {
            const nuevo = {
                ...formData,
                codigo: `A${(administradores.length + 1).toString().padStart(3, "0")}`,
            };
            setAdministradores([...administradores, nuevo]);
        }
        cerrarModal();
    };

    const borrar = (codigo) => {
        if (window.confirm("¿Deseas eliminar este administrador?")) {
            setAdministradores(administradores.filter((a) => a.codigo !== codigo));
        }
    };

    const filteredData = administradores.filter(
        (a) =>
            a.codigo.toLowerCase().includes(buscar.toLowerCase()) ||
            a.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
            a.correo.toLowerCase().includes(buscar.toLowerCase()) ||
            a.rol.toLowerCase().includes(buscar.toLowerCase())
    );

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

            <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
                <FaSearch
                    className="position-absolute text-secondary"
                    style={{ top: "10px", left: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Buscar administrador..."
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

            <div className="table-responsive">
                <table className="table table-dark table-hover align-middle text-white">
                    <thead>
                        <tr style={{ backgroundColor: "#344675" }}>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((a, index) => (
                                <tr key={index}>
                                    <td>{a.codigo}</td>
                                    <td>{a.nombre}</td>
                                    <td>{a.correo}</td>
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
                                            onClick={() => borrar(a.codigo)}
                                        >
                                            <FaTrash /> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-secondary py-4">
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
                Mostrando {filteredData.length} de {administradores.length} administradores
            </div>

            {/* MODAL */}
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
                                Nombre
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={actualizarModal}
                                placeholder="Ingrese el nombre"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FaEnvelope className="me-2" />
                                Correo
                            </Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={actualizarModal}
                                placeholder="Ingrese el correo"
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
                                El rol por defecto es "Admin"
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FaLock className="me-2" />
                                Contraseña
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={verContraseña ? "text" : "password"}
                                    name="contraseña"
                                    value={formData.contraseña}
                                    onChange={actualizarModal}
                                    placeholder="Ingrese la contraseña"
                                />
                                <Button
                                    variant="outline-light"
                                    onClick={() => setVerContraseña(!verContraseña)}
                                >
                                    {verContraseña ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputGroup>
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
