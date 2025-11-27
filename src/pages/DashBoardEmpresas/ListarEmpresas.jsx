import React, { useState, useEffect } from "react";
import { FaEdit, FaSearch, FaUser, FaEnvelope, FaPhone, FaBuilding, FaEye } from "react-icons/fa";
import { Modal, Button, Form, Spinner, Row, Col, Badge } from "react-bootstrap";
import { apiRequest } from "../../services/api";
import { toast } from "react-toastify";


export default function ListarEmpresas() {
  const [buscar, setBuscar] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalSunat, setMostrarModalSunat] = useState(false);
  const [editarEmpresa, setEditarEmpresa] = useState(null);
  const [datosSunat, setDatosSunat] = useState(null);
  const [cargandoActualizar, setCargandoActualizar] = useState(false);
  const [cargandoSunat, setCargandoSunat] = useState(false);
  const [empresasAprobadas, setEmpresasAprobadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);


  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correoCorporativo: "",
    telefono: "",
    nombreEmpresa: "",
  });


  const [errors, setErrors] = useState({
    nombres: "",
    apellidos: "",
    correoCorporativo: "",
    telefono: "",
    nombreEmpresa: "",
  });


  const getEmpresasAprobadas = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/empresa/list/approved", "GET", null, true, true);
      const empresasData = response.data.data;


      const empresasFormateadas = empresasData.map((e) => ({
        id: e.id,
        codigo: e.codigoSolicitud,
        nombres: e.nombres,
        apellidos: e.apellidos,
        correoCorporativo: e.correoCorporativo,
        telefono: e.telefono,
        nombreEmpresa: e.nombreEmpresa,
        rucEmpresa: e.rucEmpresa,
      }));


      setEmpresasAprobadas(empresasFormateadas);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cargar las empresas");
    } finally {
      setLoading(false);
    }
  };


  const obtenerDatosSunat = async (empresaId) => {
    setCargandoSunat(true);
    try {
      const response = await apiRequest(`/empresa/${empresaId}/datos-sunat`, "GET", null, true, true);
      if (response.data.success) {
        setDatosSunat(response.data.data);
        setMostrarModalSunat(true);
      } else {
        toast.error(response.data.message || "No se pudieron obtener los datos");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error al obtener datos de SUNAT");
    } finally {
      setCargandoSunat(false);
    }
  };


  useEffect(() => {
    getEmpresasAprobadas();
  }, []);


  const CerrarModal = () => {
    setMostrarModal(false);
    setEditarEmpresa(null);
    setValidated(false);
    setFormData({
      nombres: "",
      apellidos: "",
      correoCorporativo: "",
      telefono: "",
      nombreEmpresa: "",
    });
    setErrors({
      nombres: "",
      apellidos: "",
      correoCorporativo: "",
      telefono: "",
      nombreEmpresa: "",
    });
  };


  const CerrarModalSunat = () => {
    setMostrarModalSunat(false);
    setDatosSunat(null);
  };


  const MostrarEditar = (empresa) => {
    setEditarEmpresa(empresa);
    setFormData({
      nombres: empresa.nombres,
      apellidos: empresa.apellidos,
      correoCorporativo: empresa.correoCorporativo,
      telefono: empresa.telefono,
      nombreEmpresa: empresa.nombreEmpresa,
    });
    setMostrarModal(true);
  };


  const ActualizarModal = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };


  const validateField = (name, value) => {
    let error = "";


    switch (name) {
      case "nombres":
      case "apellidos":
        if (!value.trim()) {
          error = `${name === "nombres" ? "Los nombres" : "Los apellidos"} son obligatorios`;
        } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/.test(value)) {
          error = "Solo letras y mínimo 3 caracteres";
        }
        break;


      case "correoCorporativo":
        if (!value.trim()) {
          error = "El correo corporativo es obligatorio";
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|net|edu|pe|es|gov)$/.test(value)) {
          error = "Formato de correo inválido o dominio no permitido";
        }
        break;


      case "telefono":
        if (!value.trim()) {
          error = "El teléfono es obligatorio";
        } else if (!/^[0-9]{9}$/.test(value)) {
          error = "El teléfono debe tener exactamente 9 dígitos";
        }
        break;


      case "nombreEmpresa":
        if (!value.trim()) {
          error = "El nombre de la empresa es obligatorio";
        } else if (value.length < 3 || value.length > 255) {
          error = "Debe tener entre 3 y 255 caracteres";
        }
        break;


      default:
        break;
    }


    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;


    Object.keys(formData).forEach((key) => {
      const valid = validateField(key, formData[key]);
      if (!valid) {
        isValid = false;
      }
    });


    return isValid;
  };


  const GuardarModal = async (e) => {
    e.preventDefault();
    e.stopPropagation();


    setValidated(true);


    if (!validateForm()) {
      toast.warn("Por favor corrige los errores en el formulario");
      return;
    }


    if (!editarEmpresa) return;


    setCargandoActualizar(true);
    try {
      const response = await apiRequest(`/empresa/${editarEmpresa.id}`, "PUT", formData, true, true);
      toast.success(response.data.message || "Empresa actualizada correctamente");
      await getEmpresasAprobadas();
      CerrarModal();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "No se pudo actualizar la empresa");
    } finally {
      setCargandoActualizar(false);
    }
  };


  const filteredData = empresasAprobadas.filter((e) => {
    const query = buscar.trim().toLowerCase();
    return e.rucEmpresa && e.rucEmpresa.toLowerCase().includes(query);
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
                <th>Representante</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((e) => (
                  <tr key={e.id}>
                    <td>{e.codigo}</td>
                    <td>{e.nombreEmpresa}</td>
                    <td>{e.rucEmpresa}</td>
                    <td>{e.nombres} {e.apellidos}</td>
                    <td>{e.correoCorporativo}</td>
                    <td>{e.telefono}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-info me-2"
                        onClick={() => obtenerDatosSunat(e.id)}
                        disabled={cargandoSunat}
                      >
                        <FaEye /> Ver detalles empresa
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => MostrarEditar(e)}
                      >
                        <FaEdit /> Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-secondary py-4">
                    No se encontraron empresas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}


      <div className="text-end text-secondary mt-3" style={{ fontSize: "0.85rem" }}>
        Mostrando {filteredData.length} de {empresasAprobadas.length} empresas
      </div>


      {/* Modal Editar Empresa */}
      <Modal show={mostrarModal} onHide={CerrarModal} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>Actualizar Empresa</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={GuardarModal}>
          <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" />Nombres
              </Form.Label>
              <Form.Control
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={ActualizarModal}
                placeholder="Ingrese los nombres"
                isInvalid={validated && errors.nombres}
                pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombres || "Los nombres son obligatorios"}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" />Apellidos
              </Form.Label>
              <Form.Control
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={ActualizarModal}
                placeholder="Ingrese los apellidos"
                isInvalid={validated && errors.apellidos}
                pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellidos || "Los apellidos son obligatorios"}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope className="me-2" />Correo Corporativo
              </Form.Label>
              <Form.Control
                type="email"
                name="correoCorporativo"
                value={formData.correoCorporativo}
                onChange={ActualizarModal}
                placeholder="correo@empresa.com"
                isInvalid={validated && errors.correoCorporativo}
                pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|net|edu|pe|es|gov)$"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.correoCorporativo || "Formato de correo inválido"}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>
                <FaPhone className="me-2" />Teléfono
              </Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={ActualizarModal}
                placeholder="987654321"
                isInvalid={validated && errors.telefono}
                pattern="^[0-9]{9}$"
                maxLength={9}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.telefono || "El teléfono debe tener 9 dígitos"}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>
                <FaBuilding className="me-2" />Nombre de la Empresa
              </Form.Label>
              <Form.Control
                type="text"
                name="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={ActualizarModal}
                placeholder="Ingrese el nombre de la empresa"
                isInvalid={validated && errors.nombreEmpresa}
                minLength={3}
                maxLength={255}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreEmpresa || "El nombre de la empresa es obligatorio"}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
            <Button variant="secondary" onClick={CerrarModal} disabled={cargandoActualizar}>
              Cancelar
            </Button>
            <Button 
              variant="success" 
              type="submit" 
              disabled={cargandoActualizar}
              style={{ minWidth: "120px" }}
            >
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
        </Form>
      </Modal>


      {/* Modal Detalles SUNAT */}
      <Modal 
        show={mostrarModalSunat} 
        onHide={CerrarModalSunat} 
        centered 
        size="lg"
        scrollable
      >
        <Modal.Header closeButton style={{ backgroundColor: "#2d3b6a", color: "white" }}>
          <Modal.Title>
            <FaBuilding className="me-2" />
            Datos de SUNAT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1e2a52", color: "white" }}>
          {cargandoSunat ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="light" />
              <p className="mt-3">Cargando datos de SUNAT...</p>
            </div>
          ) : datosSunat ? (
            <>
              {/* Información Principal */}
              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3" style={{ color: "#4e8ef7" }}>
                  Información General
                </h5>
                <Row>
                  <Col md={6} className="mb-3">
                    <strong>Razón Social:</strong>
                    <p className="mb-0">{datosSunat.razonSocial || "-"}</p>
                  </Col>
                  <Col md={3} className="mb-3">
                    <strong>RUC:</strong>
                    <p className="mb-0">{datosSunat.numeroDocumento || "-"}</p>
                  </Col>
                  <Col md={3} className="mb-3">
                    <strong>Tipo Doc:</strong>
                    <p className="mb-0">{datosSunat.tipoDocumento || "-"}</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <strong>Estado:</strong>
                    <p className="mb-0">
                      <Badge bg={datosSunat.estado === "ACTIVO" ? "success" : "danger"}>
                        {datosSunat.estado || "-"}
                      </Badge>
                    </p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <strong>Condición:</strong>
                    <p className="mb-0">
                      <Badge bg={datosSunat.condicion === "HABIDO" ? "success" : "warning"}>
                        {datosSunat.condicion || "-"}
                      </Badge>
                    </p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <strong>Tipo:</strong>
                    <p className="mb-0">{datosSunat.tipo || "-"}</p>
                  </Col>
                </Row>
              </div>


              {/* Dirección */}
              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3" style={{ color: "#4e8ef7" }}>
                  Ubicación
                </h5>
                <Row>
                  <Col md={12} className="mb-3">
                    <strong>Dirección Completa:</strong>
                    <p className="mb-0">{datosSunat.direccion || "-"}</p>
                  </Col>
                  <Col md={3} className="mb-3">
                    <strong>Vía Tipo:</strong>
                    <p className="mb-0">{datosSunat.viaTipo || "-"}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Vía Nombre:</strong>
                    <p className="mb-0">{datosSunat.viaNombre || "-"}</p>
                  </Col>
                  <Col md={3} className="mb-3">
                    <strong>Número:</strong>
                    <p className="mb-0">{datosSunat.numero || "-"}</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <strong>Distrito:</strong>
                    <p className="mb-0">{datosSunat.distrito || "-"}</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <strong>Provincia:</strong>
                    <p className="mb-0">{datosSunat.provincia || "-"}</p>
                  </Col>
                  <Col md={4} className="mb-3">
                    <strong>Departamento:</strong>
                    <p className="mb-0">{datosSunat.departamento || "-"}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Ubigeo:</strong>
                    <p className="mb-0">{datosSunat.ubigeo || "-"}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Interior:</strong>
                    <p className="mb-0">{datosSunat.interior || "-"}</p>
                  </Col>
                </Row>
              </div>


              {/* Información Tributaria */}
              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3" style={{ color: "#4e8ef7" }}>
                  Información Tributaria
                </h5>
                <Row>
                  <Col md={6} className="mb-3">
                    <strong>Agente de Retención:</strong>
                    <p className="mb-0">
                      <Badge bg={datosSunat.esAgenteRetencion ? "info" : "secondary"}>
                        {datosSunat.esAgenteRetencion ? "Sí" : "No"}
                      </Badge>
                    </p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Buen Contribuyente:</strong>
                    <p className="mb-0">
                      <Badge bg={datosSunat.esBuenContribuyente ? "info" : "secondary"}>
                        {datosSunat.esBuenContribuyente ? "Sí" : "No"}
                      </Badge>
                    </p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Tipo Facturación:</strong>
                    <p className="mb-0">{datosSunat.tipoFacturacion || "-"}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Tipo Contabilidad:</strong>
                    <p className="mb-0">{datosSunat.tipoContabilidad || "-"}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Comercio Exterior:</strong>
                    <p className="mb-0">{datosSunat.comercioExterior || "-"}</p>
                  </Col>
                </Row>
              </div>


              {/* Actividad Económica */}
              <div className="mb-3">
                <h5 className="border-bottom pb-2 mb-3" style={{ color: "#4e8ef7" }}>
                  Actividad Económica
                </h5>
                <Row>
                  <Col md={12} className="mb-3">
                    <strong>Actividad:</strong>
                    <p className="mb-0">{datosSunat.actividadEconomica || "-"}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Número de Trabajadores:</strong>
                    <p className="mb-0">{datosSunat.numeroTrabajadores || "-"}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>Locales Anexos:</strong>
                    <p className="mb-0">{datosSunat.localesAnexos || "-"}</p>
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            <p className="text-center text-muted">No hay datos disponibles</p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2d3b6a" }}>
          <Button variant="secondary" onClick={CerrarModalSunat}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


      <style>
        {`
          input::placeholder { color: white !important; opacity: 1; }
          .modal-content { border: 2px solid #40518b; }
          .form-control { 
            background-color: #2d3b6a !important; 
            color: white !important; 
            border: 1px solid #40518b !important;
          }
          .form-control:focus { 
            box-shadow: 0 0 5px #4e8ef7; 
            background-color: #2d3b6a !important;
            color: white !important;
          }
          .form-control.is-invalid {
            border-color: #dc3545 !important;
          }
          .invalid-feedback {
            color: #ff6b6b !important;
            font-size: 0.875rem;
          }
          .modal-body h5 {
            font-weight: 600;
            font-size: 1.1rem;
          }
          .modal-body strong {
            color: #adb5bd;
            font-size: 0.9rem;
          }
          .modal-body p {
            color: white;
            font-size: 1rem;
          }
        `}
      </style>
    </div>
  );
}