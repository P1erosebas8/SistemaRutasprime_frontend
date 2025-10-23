import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function DashBoardConductores() {
    const [search, setSearch] = useState("");

    const data = [
        { codigo: "C001", nombre: "Juan Pérez", correo: "juanperez@example.com" },
        { codigo: "C002", nombre: "María García", correo: "maria@example.com" },
        { codigo: "C003", nombre: "Carlos López", correo: "carlos@example.com" },
        { codigo: "C004", nombre: "Lucía Ramírez", correo: "lucia@example.com" },
    ];

    const filteredData = data.filter(
        (user) =>
            user.codigo.toLowerCase().includes(search.toLowerCase()) ||
            user.nombre.toLowerCase().includes(search.toLowerCase()) ||
            user.correo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className="text-white p-4 min-vh-100"
            style={{ backgroundColor: "#1e2a52" }}
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Conductor</h2>
                <button className="btn btn-success">
                    <FaPlus className="me-2" />
                    Agregar Conductor
                </button>
            </div>

            <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
                <FaSearch
                    className="position-absolute text-secondary"
                    style={{ top: "10px", left: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Buscar Conductor"
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
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.codigo}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.correo}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-warning me-2">
                                            <FaEdit /> Editar
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger">
                                            <FaTrash /> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-secondary py-4">
                                    No se encontraron usuarios 😕
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="text-end text-secondary mt-3" style={{ fontSize: "0.85rem" }}>
                Mostrando {filteredData.length} de {data.length} usuarios
            </div>
            <style>
                {`
                input::placeholder {
                color: white !important;
                opacity: 1;
                }
                `}
            </style>
        </div>
    );
}
