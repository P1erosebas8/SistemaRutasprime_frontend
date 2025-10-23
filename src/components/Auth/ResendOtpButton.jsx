import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/api";

function ResendOtpButton({ email, type }) {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Falta el correo");
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/auth/public/reset-otp", "POST", { email, type });
      toast.success("Nuevo código enviado a tu correo");
      setTimer(60); 
    } catch {
      toast.error("Error al reenviar el OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="link"
      className={`p-0 mt-2 ${timer > 0 ? "text-secondary" : "text-info"}`}
      onClick={handleResend}
      disabled={loading || timer > 0}
      style={{ cursor: timer > 0 ? "not-allowed" : "pointer" }}
    >
      {loading
        ? "Reenviando..."
        : timer > 0
        ? `Reenviar en ${timer}s`
        : "Reenviar código OTP"}
    </Button>
  );
}

export default ResendOtpButton;