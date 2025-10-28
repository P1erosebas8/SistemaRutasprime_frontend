import HeroSection from "../../components/HeroSection";
import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

function SolicitudEstado() {
  const { getSolicitudStatus } = useAuth();
  const [solicitud, setSolicitud] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await getSolicitudStatus();
        setSolicitud(response?.data || {});
      } catch {
        setSolicitud(null);
      }
    };
    fetchStatus();
  }, []);

  const estadoConfig = {
    APROBADO: {
      title: "¡Tu solicitud fue aprobada!",
      subtitle: "Felicitaciones, ahora eres parte de nuestra red de conductores.",
      color: "#2e7d32",
      bgCard: "#e8f5e9",
      iconBg: "#c8e6c9",
      icon: <CheckCircle color="#2e7d32" size={30} />,
      button: { variant: "success", text: "Ir al perfil", href: "/profile" },
      label: "Observación del administrador",
      emptyMsg: "Sin observaciones adicionales.",
    },
    PENDIENTE: {
      title: "Tu solicitud está pendiente",
      subtitle: "Estamos revisando tu información. Te notificaremos pronto.",
      color: "#f9a825",
      bgCard: "#fffde7",
      iconBg: "#fff8e1",
      icon: <Clock color="#f9a825" size={30} />,
      button: { variant: "dark", text: "Volver al perfil", href: "/profile" },
      label: "Observación",
      emptyMsg: "Tu solicitud se encuentra en evaluación.",
    },
    RECHAZADO: {
      title: "Tu solicitud fue rechazada",
      subtitle: "Puedes revisar tus datos y volver a postularte.",
      color: "#d32f2f",
      bgCard: "#fff9e6",
      iconBg: "#fff3cd",
      icon: <AlertTriangle color="#b71c1c" size={30} />,
      button: [
        { variant: "warning", text: "Volver a postularme", href: "/postular-conductor?retry=true" },
        { variant: "dark", text: "Volver al perfil", href: "/profile" },
      ],
      label: "Motivo del rechazo",
      emptyMsg: "Sin observación del administrador.",
    },
  };

  const estado = solicitud?.estado?.toUpperCase() || "PENDIENTE";
  const config = estadoConfig[estado] || estadoConfig.PENDIENTE;

  return (
    <>
      <HeroSection
        title="Postulación a Conductor"
        background="src/assets/FondoPostulación.jpg"
        height="65vh"
        overlay="rgba(0,0,0,0.45)"
        align="center"
      />

      <motion.div
        className="text-center py-5 px-3"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h3
          className="fw-bold mb-3"
          style={{ color: config.color }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {config.title}
        </motion.h3>

        <motion.p
          className="text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {config.subtitle}
        </motion.p>

        {solicitud && (
          <motion.div
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
          >
            <Card
              className="mx-auto mt-4 shadow-sm border-0"
              style={{
                maxWidth: "650px",
                background: config.bgCard,
                borderRadius: "15px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
              }}
            >
              <Card.Body className="p-4 text-start">
                <motion.div
                  className="d-flex align-items-center mb-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      backgroundColor: config.iconBg,
                      width: "55px",
                      height: "55px",
                    }}
                  >
                    {config.icon}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: config.color }}>
                      Detalles de tu solicitud
                    </h5>
                    <small className="text-muted">
                      {estado === "PENDIENTE"
                        ? "En proceso de revisión"
                        : estado === "APROBADA"
                        ? "Información de aprobación"
                        : "Verifica la información"}
                    </small>
                  </div>
                </motion.div>

                <hr />

                <p><strong>Código de solicitud:</strong> {solicitud.codigoSolicitud}</p>
                <p><strong>Estado:</strong> <span style={{ color: config.color }}>{solicitud.estado}</span></p>
                <p>
                  <strong>{config.label}:</strong><br />
                  <motion.span
                    className="fst-italic"
                    style={{ color: config.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {solicitud.observacionAdmin || config.emptyMsg}
                  </motion.span>
                </p>
              </Card.Body>
            </Card>
          </motion.div>
        )}

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {Array.isArray(config.button)
            ? config.button.map((btn, i) => (
                <Button
                  key={i}
                  variant={btn.variant}
                  href={btn.href}
                  className={`fw-bold px-4 ${i > 0 ? "ms-3" : ""}`}
                >
                  {btn.text}
                </Button>
              ))
            : (
                <Button
                  variant={config.button.variant}
                  href={config.button.href}
                  className="fw-bold px-4"
                >
                  {config.button.text}
                </Button>
              )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default SolicitudEstado;