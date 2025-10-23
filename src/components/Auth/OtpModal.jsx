import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/api";
import ResendOtpButton from "./ResendOtpButton";

function OtpModal({ show, onHide, email, onSuccess }) {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!codigo) {
      toast.error("Ingresa el código OTP");
      return;
    }
    setLoading(true);
    try {
      await apiRequest("/auth/public/verify-otp", "POST", { email, codigo });
      toast.success("Verificación exitosa");

      if (onSuccess) {
        onSuccess();
      } else {
        onHide();
      }
    } catch {
      toast.error("Código inválido o expirado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Verificar OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Hemos enviado un código a <strong>{email}</strong>. Ingresa el código
          para activar tu cuenta:
        </p>
        <Form.Control
          type="text"
          placeholder="123456"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          maxLength={6}
          className="mb-2"
        />

        {/* Botón Reenviar OTP */}
        <ResendOtpButton email={email} type="register" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleVerify}
          disabled={loading}
          className="d-flex align-items-center justify-content-center"
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Verificando...
            </>
          ) : (
            "Verificar"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OtpModal;