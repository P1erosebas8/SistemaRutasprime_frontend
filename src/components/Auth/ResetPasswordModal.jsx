import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/api";
import { useNavigate } from "react-router-dom";
import ResendOtpButton from "./ResendOtpButton";
import PasswordInput from "./PasswordInput";

function ResetPasswordModal({ show, onHide }) {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(""); 
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSendEmail = async () => {
    if (!email) {
      setEmailError("Ingresa tu correo");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Por favor ingresa un correo electrónico válido");
      return;
    }

    setEmailError("");
    setLoading(true);
    try {
      await apiRequest("/auth/public/forgot-password", "POST", { email });
      toast.success("Te hemos enviado un código OTP");
      setStep(2);
    } catch {
      toast.error("No se pudo enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!codigo || !newPassword || !confirmPassword) {
      toast.error("Completa todos los campos");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/auth/public/reset-password", "POST", {
        email,
        codigo,
        nuevaPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      toast.success("Contraseña restablecida, inicia sesión");
      onHide();
      navigate("/login");
    } catch {
      toast.error("Código inválido o error al restablecer");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setCodigo("");
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
    setEmailError("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Recuperar contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          <>
            <p>Ingresa tu correo para enviarte un código OTP:</p>
            <Form.Control
              type="email"
              placeholder="tuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError} 
            />
            {/* Mostrar mensaje de error debajo del campo */}
            {emailError && (
              <Form.Text className="text-danger">{emailError}</Form.Text>
            )}
          </>
        ) : (
          <>
            <p>Ingresa el código OTP y tu nueva contraseña:</p>
            <Form.Control
              type="text"
              placeholder="Código OTP"
              className="mb-2"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />

            {/* Botón para reenviar OTP */}
            <ResendOtpButton email={email} type="forgot-password" />

            {/* Contraseña nueva con validador */}
            <PasswordInput
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              withStrength={true}
            />

            {/* Confirmar contraseña */}
            <PasswordInput
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        {step === 1 ? (
          <Button
            variant="primary"
            onClick={handleSendEmail}
            disabled={loading}
            className="d-flex align-items-center justify-content-center"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Enviando...
              </>
            ) : (
              "Enviar código"
            )}
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={handleResetPassword}
            disabled={loading}
            className="d-flex align-items-center justify-content-center"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Procesando...
              </>
            ) : (
              "Restablecer contraseña"
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordModal;