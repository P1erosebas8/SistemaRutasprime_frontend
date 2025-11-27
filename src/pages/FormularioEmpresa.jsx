import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { useRegistroEmpresa } from "../hooks/useEmpresas";
import { useNavigate } from "react-router-dom";

function FormularioEmpresa() {
  const navigate = useNavigate();
  const { registrarEmpresa, loading } = useRegistroEmpresa();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    correoCorporativo: "",
    telefono: "",
    nombreEmpresa: "",
    rucEmpresa: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombres.trim()) {
      newErrors.nombres = "El nombre es obligatorio";
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "Los apellidos son obligatorios";
    }

    if (!formData.dni.trim()) {
      newErrors.dni = "El DNI es obligatorio";
    } else if (!/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = "El DNI debe tener 8 dígitos";
    }

    if (!formData.correoCorporativo.trim()) {
      newErrors.correoCorporativo = "El correo corporativo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoCorporativo)) {
      newErrors.correoCorporativo = "Correo electrónico inválido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^\d{9}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener 9 dígitos";
    }

    if (!formData.nombreEmpresa.trim()) {
      newErrors.nombreEmpresa = "El nombre de la empresa es obligatorio";
    }

    if (!formData.rucEmpresa.trim()) {
      newErrors.rucEmpresa = "El RUC es obligatorio";
    } else if (!/^\d{11}$/.test(formData.rucEmpresa)) {
      newErrors.rucEmpresa = "El RUC debe tener 11 dígitos";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await registrarEmpresa(formData);

    if (result.success) {
      setFormData({
        nombres: "",
        apellidos: "",
        dni: "",
        correoCorporativo: "",
        telefono: "",
        nombreEmpresa: "",
        rucEmpresa: "",
        password: "",
      });
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center position-relative animated-bg overflow-hidden">
      <Container className="py-5 fade-in-up pt-mobile-fix">
        <Row className="align-items-center justify-content-center g-5">

          <Col xs={12} md={6} className="text-center text-md-start slide-left">
            <h1 className="fw-bold display-5 text-accent">
              Soluciones de traslado para tu empresa
            </h1>
            <p className="fs-5 mt-3 text-light-opacity">
              Planes personalizados de transporte y encargos con camiones,
              optimizados para tus operaciones logísticas.
            </p>
          </Col>

          <Col xs={12} md={5} className="slide-right">
            <Card className="p-4 shadow-lg rounded-4 form-card scale-in">
              <h4 className="fw-bold mb-2 text-accent">Conviértete en cliente</h4>

              <p className="text-white small mb-4">
                Completa tus datos y un asesor logístico te contactará pronto.
              </p>

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3 g-3">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Control 
                        type="text" 
                        placeholder="Nombre"
                        value={formData.nombres}
                        onChange={(e) => handleChange("nombres", e.target.value)}
                        isInvalid={!!errors.nombres}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombres}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Control 
                        type="text" 
                        placeholder="Apellidos"
                        value={formData.apellidos}
                        onChange={(e) => handleChange("apellidos", e.target.value)}
                        isInvalid={!!errors.apellidos}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.apellidos}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="DNI"
                    value={formData.dni}
                    onChange={(e) => handleChange("dni", e.target.value)}
                    isInvalid={!!errors.dni}
                    maxLength={8}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dni}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control 
                    type="email" 
                    placeholder="Correo corporativo"
                    value={formData.correoCorporativo}
                    onChange={(e) => handleChange("correoCorporativo", e.target.value)}
                    isInvalid={!!errors.correoCorporativo}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.correoCorporativo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    isInvalid={!!errors.telefono}
                    maxLength={9}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telefono}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Nombre de empresa"
                    value={formData.nombreEmpresa}
                    onChange={(e) => handleChange("nombreEmpresa", e.target.value)}
                    isInvalid={!!errors.nombreEmpresa}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombreEmpresa}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="RUC de la empresa"
                    value={formData.rucEmpresa}
                    onChange={(e) => handleChange("rucEmpresa", e.target.value)}
                    isInvalid={!!errors.rucEmpresa}
                    maxLength={11}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rucEmpresa}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control 
                    type="password" 
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    isInvalid={!!errors.password}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button 
                  type="submit" 
                  className="w-100 fw-bold py-2 submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner 
                        as="span" 
                        animation="border" 
                        size="sm" 
                        className="me-2"
                      />
                      Enviando...
                    </>
                  ) : (
                    "Enviar solicitud"
                  )}
                </Button>
              </Form>
            </Card>
          </Col>

        </Row>
      </Container>

      <style>{`
        .animated-bg {
          background: linear-gradient(120deg, #0A3D3F, #0F5B4E, #1C7A50, #0F5B4E, #0A3D3F);
          background-size: 300% 300%;
          animation: moveGradient 14s ease infinite;
          color: #E9F2FF;
        }

        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .text-accent {
          color: #00F0FF;
        }

        .text-light-opacity {
          color: rgba(255, 255, 255, 0.85);
        }

        .text-white {
          color: #ffffff !important;
        }

        .form-card {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform .4s ease, box-shadow .4s ease;
          position: relative;
          z-index: 1;
        }

        .form-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.3);
        }

        .submit-btn {
          background: #FF6F3C;
          border: none;
          font-size: 1.1rem;
          transition: background .3s ease, transform .3s ease;
          color: #fff;
        }

        .submit-btn:hover:not(:disabled) {
          background: #FF4A1C;
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .invalid-feedback {
          color: #ffcccc;
          font-size: 0.875rem;
        }

        .fade-in-up {
          animation: fadeInUp 0.9s ease forwards;
          opacity: 0;
        }

        .slide-left {
          animation: slideLeft 0.9s ease forwards;
          opacity: 0;
        }

        .slide-right {
          animation: slideRight 0.9s ease forwards;
          opacity: 0;
        }

        .scale-in {
          animation: scaleIn 0.9s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .form-card {
            padding: 2rem 1.5rem;
          }
          .pt-mobile-fix {
            padding-top: 6rem !important;
          }
          h1.display-5 {
            font-size: 2rem;
            line-height: 2.4rem;
          }
        }
      `}</style>
    </div>
  );
}

export default FormularioEmpresa;