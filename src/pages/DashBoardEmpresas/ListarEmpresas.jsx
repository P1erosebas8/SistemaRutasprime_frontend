import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useEmpresas } from "../../hooks/useEmpresas";

export default function ListarEmpresas() {
  const [buscar, setBuscar] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [empresaAEliminar, setEmpresaAEliminar] = useState(null);
  const [editarEmpresa, setEditarEmpresa] = useState(null);

  const [formData, setFormData] = useState({
    razonSocial: "",
    ruc: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  const { empresas, loading } = useEmpresas();

  const CerrarModal = () => {
    setMostrarModal(false);
    setEditarEmpresa(null);
    setFormData({
      razonSocial: "",
      ruc: "",
      correo: "",
      telefono: "",
      direccion: "",
    });
  };

  const MostrarEditar = (empresa) => {
    setEditarEmpresa(empresa);
    setFormData(empresa);
    setMostrarModal(true);
  };

  const MostrarEliminar = (empresa) => {
    setEmpresaAEliminar(empresa);
    setMostrarModalEliminar(true);
  };

  const CerrarModalEliminar = () => {
    setEmpresaAEliminar(null);
    setMostrarModalEliminar(false);
  };

  const ActualizarModal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GuardarModal = () => {
    CerrarModal();
  };

  const ConfirmarEliminar = () => {
    CerrarModalEliminar();
  };

  const filteredData = empresas.filter((e) => {
    const query = buscar.trim().toLowerCase();
    return e.ruc && e.ruc.toLowerCase().includes(query);
  });

  return (
    <div className="text-white p-4 min-vh-100" style={{ backgroundColor: "#1e2a52" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Empresas Registradas</h2>
      </div>

      <div className="mb-3 position-relative" style={{ maxWidth: "350px" }}>
        <FaSearch
          className="position-absolute text-secondary"
          style={{ top: "10px", left: "10px" }}
        />
        <input
          type="text"
          placeholder="Buscar por RUC"
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
          <p className="mt-3">Cargando empresas...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle text-white">
            <thead>
              <tr style={{ backgroundColor: "#344675" }}>
                <th>Código</th>
                <th>Razón Social</th>
                <th>RUC</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((e, index) => (
                  <tr key={index}>
                    <td>{e.codigo}</td>
                    <td>{e.razonSocial}</td>
                    <td>{e.ruc}</td>
                    <td>{e.correo}</td>
                    <td>{e.telefono}</td>
                    <td>{e.direccion}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => MostrarEditar(e)}
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => MostrarEliminar(e)}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-secondary py-4">
                    No se encontraron empresas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
