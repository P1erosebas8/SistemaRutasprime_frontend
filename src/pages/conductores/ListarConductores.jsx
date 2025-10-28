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
    FaEye,
} from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import { useDrivers } from "../../contexts/DriversContext";

export default function ListarConductores() {
    const [buscar, setBuscar] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editarDriver, setEditarDriver] = useState(null);

    const { approved: drivers, addDriver, updateDriver, deleteDriver } = useDrivers();

    const [formData, setFormData] = useState({ nombre: "", dni: "", correo: "", telefono: "", licencia: "", placa: "" });

    const CerrarModal = () => {
        setMostrarModal(false);
        setEditarDriver(null);
        setFormData({ nombre: "", dni: "", correo: "", telefono: "", licencia: "", placa: "" });
    };

    const Mostar = (driver = null) => {
        if (driver) {
            setEditarDriver(driver);
            setFormData(driver);
        }
        setMostrarModal(true);
    };

    const ActualizarModal = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const GuardarModal = () => {
        if (editarDriver) {
            updateDriver(editarDriver.codigo, formData);
        } else {
            addDriver({ ...formData });
        }
        CerrarModal();
    };

    const Borrar = (codigo) => {
        if (window.confirm("¿Deseas eliminar este conductor?")) {
            deleteDriver(codigo);
        }
    };

    const filteredData = drivers.filter(
        (d) =>
            d.codigo.toLowerCase().includes(buscar.toLowerCase()) ||
            d.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
            d.dni.toLowerCase().includes(buscar.toLowerCase()) ||
            d.correo.toLowerCase().includes(buscar.toLowerCase()) ||
            d.licencia.toLowerCase().includes(buscar.toLowerCase()) ||
            d.placa.toLowerCase().includes(buscar.toLowerCase())
    );

    return (
        <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Conductores</h2>
                <button className="btn btn-success" onClick={() => Mostar()}>
                    <FaPlus className="me-2" />
                    Agregar Conductor
                </button>
            </div>

            <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
                <FaSearch className="position-absolute text-secondary" style={{ top: "10px", left: "10px" }} />
                <input
                    type="text"
                    placeholder="Buscar conductor..."
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
                            <th>DNI</th>
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
                                    <td>{d.dni}</td>
                                    <td>{d.correo}</td>
                                    <td>{d.telefono}</td>
                                    <td>{d.licencia}</td>
                                    <td>{d.placa}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-info me-2" onClick={() => Mostar(d)}>
                                            <FaEye /> Ver
                                        </button>
                                        <button className="btn btn-sm btn-outline-warning me-2" onClick={() => Mostar(d)}>
                                            <FaEdit /> Editar
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => Borrar(d.codigo)}>
                                            <FaTrash /> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center text-secondary py-4">
                                    No se encontraron conductores
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="text-end text-secondary mt-3" style={{ fontSize: "0.85rem" }}>
                Mostrando {filteredData.length} de {drivers.length} conductores
            </div>

            <Modal show={mostrarModal} onHide={CerrarModal} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
                    <Modal.Title>{editarDriver ? "Actualizar Conductor" : "Agregar Conductor"}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label><FaUser className="me-2" />Nombre</Form.Label>
                            <Form.Control type="text" name="nombre" value={formData.nombre} onChange={ActualizarModal} placeholder="Ingrese el nombre" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><FaIdCard className="me-2" />DNI</Form.Label>
                            <Form.Control type="text" name="dni" value={formData.dni} onChange={ActualizarModal} placeholder="Ingrese el DNI" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><FaEnvelope className="me-2" />Correo</Form.Label>
                            <Form.Control type="email" name="correo" value={formData.correo} onChange={ActualizarModal} placeholder="Ingrese el correo" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><FaPhone className="me-2" />Teléfono</Form.Label>
                            <Form.Control type="text" name="telefono" value={formData.telefono} onChange={ActualizarModal} placeholder="Ingrese el teléfono" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><FaIdCard className="me-2" />Licencia</Form.Label>
                            <Form.Control type="text" name="licencia" value={formData.licencia} onChange={ActualizarModal} placeholder="Ingrese la licencia" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><FaCar className="me-2" />Placa del vehículo</Form.Label>
                            <Form.Control type="text" name="placa" value={formData.placa} onChange={ActualizarModal} placeholder="Ingrese la placa" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
                    <Button variant="secondary" onClick={CerrarModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={GuardarModal}>
                        {editarDriver ? "Actualizar" : "Guardar"}
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
