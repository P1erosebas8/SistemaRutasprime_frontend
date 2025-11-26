import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import imgFotoPersonaLicencia from "../assets/registroconductor/fotopersonalicencia.jpg";

function CamaraCaptura({ onClose, onCapture }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [fotoTomada, setFotoTomada] = useState(null);
  const [mostrarIndicaciones, setMostrarIndicaciones] = useState(true);
  const [toastMostrado, setToastMostrado] = useState(false);

  const iniciarCamara = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      if (!toastMostrado) {
        toast.success("Permisos concedidos para la cámara", { position: "top-right", autoClose: 2000, theme: "colored" });
        setToastMostrado(true);
      }
    } catch {
      toast.error("Permisos no otorgados. Por favor concede acceso a la cámara.", { position: "top-right", autoClose: 3000, theme: "colored" });
    }
  };

  useEffect(() => {
    return () => {
      stream && stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const irACamara = () => {
    setMostrarIndicaciones(false);
    setTimeout(iniciarCamara, 100);
  };

  const tomarFoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const fotoBase64 = canvas.toDataURL("image/jpeg");
    setFotoTomada(fotoBase64);
    stream && stream.getTracks().forEach((t) => t.stop());
  };

  const guardarFoto = () => {
    onCapture(fotoTomada);
    onClose();
  };

  const reintentarFoto = () => {
    setFotoTomada(null);
    setMostrarIndicaciones(false);
    setTimeout(iniciarCamara, 100);
  };

  return (
    <div style={{ textAlign: "center", padding: 10 }}>
      {mostrarIndicaciones && !fotoTomada && (
        <>
          <p>Sostén tu licencia frente a tu rostro. Asegúrate que ambos sean visibles.</p>
          <img src={imgFotoPersonaLicencia} alt="Referencia" style={{ width: "150px", borderRadius: 8, marginBottom: 10 }} />
          <br />
          <button onClick={irACamara} className="btn btn-primary">Ir a cámara</button>
        </>
      )}

      {!mostrarIndicaciones && !fotoTomada && (
        <div style={{ marginTop: 10 }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "100%", borderRadius: 8 }} />
          <div className="d-flex justify-content-center gap-2 mt-2">
            <button onClick={tomarFoto} className="btn btn-primary">Tomar Foto</button>
          </div>
        </div>
      )}

      {fotoTomada && (
        <>
          <img src={fotoTomada} alt="Previsualización" style={{ width: "100%", maxWidth: "100%", borderRadius: 8, marginBottom: 10 }} />
          <div className="d-flex justify-content-center gap-2">
            <button onClick={guardarFoto} className="btn btn-success">Guardar</button>
            <button onClick={reintentarFoto} className="btn btn-secondary">Reintentar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CamaraCaptura;