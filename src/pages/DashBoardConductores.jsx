import React, { useState } from "react";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaIdCard,
    FaCar,
    FaPhone,
    FaUser,
    FaEnvelope,
} from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

export default function DashBoardConductores() {
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editDriver, setEditDriver] = useState(null);

    const [drivers, setDrivers] = useState([
        { codigo: "C001", nombre: "Juan Pérez", correo: "juanperez@example.com", telefono: "987654321", licencia: "L-12345", placa: "ABC-123" },
        { codigo: "C002", nombre: "María García", correo: "maria@example.com", telefono: "912345678", licencia: "L-67890", placa: "XYZ-987" },
    ]);

    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        licencia: "",
        placa: "",
    });

    const closeModal = () => {
        setShowModal(false);
        setEditDriver(null);
        setFormData({ nombre: "", correo: "", telefono: "", licencia: "", placa: "" });
    };

    const openModal = (driver = null) => {
        if (driver) {
            setEditDriver(driver);
            setFormData(driver);
        }
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveDriver = () => {
        if (editDriver) {
            setDrivers(drivers.map((d) => (d.codigo === editDriver.codigo ? { ...editDriver, ...formData } : d)));
        } else {
            const newDriver = { ...formData, codigo: `C${(drivers.length + 1).toString().padStart(3, "0")}` };
            setDrivers([...drivers, newDriver]);
        }
        closeModal();
    };

    const deleteDriver = (codigo) => {
        if (window.confirm("¿Deseas eliminar este conductor?")) {
            setDrivers(drivers.filter((d) => d.codigo !== codigo));
        }
    };

    const filteredData = drivers.filter(
        (d) =>
            d.codigo.toLowerCase().includes(search.toLowerCase()) ||
            d.nombre.toLowerCase().includes(search.toLowerCase()) ||
            d.correo.toLowerCase().includes(search.toLowerCase()) ||
            d.licencia.toLowerCase().includes(search.toLowerCase()) ||
            d.placa.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Conductores</h2>
                <button className="btn btn-success" onClick={() => openModal()}>
                    <FaPlus className="me-2" />
                    Agregar Conductor
                </button>
            </div>

            <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
                <FaSearch className="position-absolute text-secondary" style={{ top: "10px", left: "10px" }} />
                <input
                    type="text"
                    placeholder="Buscar Conductor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                            <th>Teléfono</th>
                            <th>Licencia</th>
                            <th>Placa</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((d, index) => (
                                <tr key={index}>
                                    <td>{d.codigo}</td>
                                    <td>{d.nombre}</td>
                                    <td>{d.correo}</td>
                                    <td>{d.telefono}</td>
                                    <td>{d.licencia}</td>
                                    <td>{d.placa}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-warning me-2" onClick={() => openModal(d)}>
                                            <FaEdit /> Editar
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteDriver(d.codigo)}>
                                            <FaTrash /> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-secondary py-4">
                                    No se encontraron conductores 😕
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="text-end text-secondary mt-3" style={{ fontSize: "0.85rem" }}>
                Mostrando {filteredData.length} de {drivers.length} conductores
            </div>

            {/* Modal para agregar/editar */}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
                    <Modal.Title>{editDriver ? "Actualizar Conductor" : "Agregar Conductor"}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label><FaUser className="me-2" />Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ingrese el nombre"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaEnvelope className="me-2" />Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                placeholder="Ingrese el correo"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaPhone className="me-2" />Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="Ingrese el teléfono"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaIdCard className="me-2" />Licencia</Form.Label>
                            <Form.Control
                                type="text"
                                name="licencia"
                                value={formData.licencia}
                                onChange={handleChange}
                                placeholder="Ingrese la licencia"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaCar className="me-2" />Placa del vehículo</Form.Label>
                            <Form.Control
                                type="text"
                                name="placa"
                                value={formData.placa}
                                onChange={handleChange}
                                placeholder="Ingrese la placa"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={saveDriver}>
                        {editDriver ? "Actualizar" : "Guardar"}
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
