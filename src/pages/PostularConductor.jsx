import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PostularConductor() {
  const { getProfile, logout, applyConductor, getSolicitudStatus } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [datosConductorGuardados, setDatosConductorGuardados] = useState(false);
  const [datosVehiculoGuardados, setDatosVehiculoGuardados] = useState(false);
  const [sending, setSending] = useState(false);

  const solicitudHabilitada = datosConductorGuardados && datosVehiculoGuardados;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);

        const estadoResponse = await getSolicitudStatus();
        const params = new URLSearchParams(window.location.search);
        const isRetry = params.get("retry") === "true";
        
        if (estadoResponse.success && estadoResponse.data?.estado) {
          const estado = estadoResponse.data.estado.toUpperCase();
        
          if (["PENDIENTE", "APROBADO"].includes(estado)) {
            navigate("/solicitud-estado");
            return;
          }
        
          if (estado === "RECHAZADO" && !isRetry) {
            navigate("/solicitud-estado");
            return;
          }
        }                   

        const datosConductor = JSON.parse(localStorage.getItem("datosConductor"));
        if (datosConductor?.form && datosConductor?.uploaded) {
          const completos =
            datosConductor.form.fechaNacimiento &&
            datosConductor.form.numeroLicenciaConducir &&
            datosConductor.form.fotoPersonaLicencia &&
            datosConductor.form.fotoLicencia &&
            datosConductor.form.antecedentesPenales &&
            datosConductor.uploaded.fotoPersonaLicencia &&
            datosConductor.uploaded.fotoLicencia &&
            datosConductor.uploaded.antecedentesPenales;

          if (completos) setDatosConductorGuardados(true);
        }

        const datosVehiculo = JSON.parse(localStorage.getItem("datosVehiculo"));
        if (datosVehiculo?.form && datosVehiculo?.uploaded) {
          const completos =
            datosVehiculo.form.placa &&
            datosVehiculo.form.marca &&
            datosVehiculo.form.color &&
            datosVehiculo.form.anioFabricacion &&
            datosVehiculo.form.tarjetaPropiedad &&
            datosVehiculo.form.soat &&
            datosVehiculo.form.tarjetaCirculacion &&
            datosVehiculo.form.revisionTecnica &&
            datosVehiculo.uploaded.tarjetaPropiedad &&
            datosVehiculo.uploaded.tarjetaCirculacion &&
            datosVehiculo.uploaded.soat &&
            datosVehiculo.uploaded.revisionTecnica;

          if (completos) setDatosVehiculoGuardados(true);
        }

      } catch {
        logout();
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando información...</p>
      </div>
    );
  }

  const toFile = (item, name) => {
    if (item instanceof File) return item;
    if (typeof item === "string" && item.startsWith("data:")) {
      const arr = item.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);
      return new File([u8arr], name, { type: mime });
    }
    return null;
  };

  const handleEnviarSolicitud = async () => {
    setSending(true);
    try {
      const conductorData = JSON.parse(localStorage.getItem("datosConductor"));
      const vehiculoData = JSON.parse(localStorage.getItem("datosVehiculo"));

      if (!conductorData || !vehiculoData) {
        toast.warn("Faltan datos por completar antes de postularte");
        setSending(false);
        return;
      }

      const formData = new FormData();

      formData.append("fechaNacimiento", conductorData.form.fechaNacimiento);
      formData.append("numeroLicenciaConducir", conductorData.form.numeroLicenciaConducir);
      formData.append("idUsuario", user.idUsuario);

      formData.append("fotoPersonaLicencia", toFile(conductorData.form.fotoPersonaLicencia, "fotoPersonaLicencia.jpg"));
      formData.append("fotoLicencia", toFile(conductorData.form.fotoLicencia, "fotoLicencia.jpg"));
      formData.append("antecedentesPenales", toFile(conductorData.form.antecedentesPenales, "antecedentesPenales.jpg"));

      formData.append("placa", vehiculoData.form.placa);
      formData.append("marca", vehiculoData.form.marca);
      formData.append("color", vehiculoData.form.color);
      formData.append("anioFabricacion", vehiculoData.form.anioFabricacion);
      formData.append("tarjetaPropiedad", toFile(vehiculoData.form.tarjetaPropiedad, "tarjetaPropiedad.jpg"));
      formData.append("tarjetaCirculacion", toFile(vehiculoData.form.tarjetaCirculacion, "tarjetaCirculacion.jpg"));
      formData.append("soat", toFile(vehiculoData.form.soat, "soat.jpg"));
      formData.append("revisionTecnica", toFile(vehiculoData.form.revisionTecnica, "revisionTecnica.jpg"));

      await applyConductor(formData);

      toast.success("¡Solicitud enviada correctamente!");
      localStorage.removeItem("datosConductor");
      localStorage.removeItem("datosVehiculo");

      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al enviar la solicitud");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        title="Postulación a Conductor"
        subtitle={`Bienvenido, ${user?.nombres || ""} ${user?.apellidos || ""}`}
        description="Completa los siguientes pasos para comenzar a generar ganancias con tu vehículo."
        background="src/assets/FondoPostulación.jpg"
        height="65vh"
        overlay="rgba(0,0,0,0.45)"
        align="center"
      />

      {/* CONTENIDO */}
      <section className="py-5 text-dark" style={{ backgroundColor: "#f3f4f6" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3" style={{ color: "#2563eb" }}>
            Te damos la bienvenida, {user?.nombres || ""} {user?.apellidos || ""}
          </h2>
          <p className="text-muted mb-5">
            Completa los pasos para empezar a generar ganancias.
          </p>

          <div className="row justify-content-center g-4 mb-4">
            {/* Tarjeta 1: Datos del Conductor */}
            <div className="col-10 col-sm-6 col-md-4">
              <div
                className={`card h-100 border-0 shadow-sm hover-card ${datosConductorGuardados ? "datos-guardados" : ""
                  }`}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#ffffff",
                  borderRadius: "1rem",
                  border: "1px solid #d1d5db",
                  position: "relative",
                }}
                onClick={() => navigate("/DatosConductor")}
              >
                {datosConductorGuardados && (
                  <>
                    <i
                      className="bi bi-check-circle-fill"
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        color: "#16a34a",
                        fontSize: "1.8rem",
                      }}
                    ></i>
                    <span
                      className="badge bg-success position-absolute top-0 start-0"
                      style={{
                        borderTopLeftRadius: "1rem",
                        borderBottomRightRadius: "1rem",
                        fontSize: "0.85rem",
                        padding: "6px 12px",
                      }}
                    >
                      COMPLETADO
                    </span>
                  </>
                )}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Conductor"
                  className="img-fluid mx-auto mt-4"
                  style={{ width: "140px", height: "140px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-dark">Datos del conductor</h5>
                  {datosConductorGuardados && (
                    <p className="text-success fw-semibold mb-0">✔ Datos completados</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Datos del Vehículo */}
            <div className="col-10 col-sm-6 col-md-4">
              <div
                className={`card h-100 border-0 shadow-sm hover-card ${datosVehiculoGuardados ? "datos-guardados" : ""
                  }`}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#ffffff",
                  borderRadius: "1rem",
                  border: "1px solid #d1d5db",
                  position: "relative",
                }}
                onClick={() => navigate("/DatosVehiculo")}
              >
                {datosVehiculoGuardados && (
                  <>
                    <i
                      className="bi bi-check-circle-fill"
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        color: "#16a34a",
                        fontSize: "1.8rem",
                      }}
                    ></i>
                    <span
                      className="badge bg-success position-absolute top-0 start-0"
                      style={{
                        borderTopLeftRadius: "1rem",
                        borderBottomRightRadius: "1rem",
                        fontSize: "0.85rem",
                        padding: "6px 12px",
                      }}
                    >
                      COMPLETADO
                    </span>
                  </>
                )}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/713/713311.png"
                  alt="Vehículo"
                  className="img-fluid mx-auto mt-4"
                  style={{ width: "140px", height: "140px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-dark">Datos del vehículo</h5>
                  {datosVehiculoGuardados && (
                    <p className="text-success fw-semibold mb-0">✔ Datos completados</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
            <button
              className="btn btn-lg fw-semibold back-btn"
              onClick={() => navigate("/profile")}
            >
              ← Volver a mi perfil
            </button>

            <button
              className="btn btn-lg fw-semibold send-btn"
              onClick={handleEnviarSolicitud}
              disabled={!solicitudHabilitada || sending}
            >
              {sending ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Enviando...
                </>
              ) : (
                "Enviar mi solicitud"
              )}
            </button>
          </div>
        </div>

        {/* Estilos */}
        <style>{`
          .hover-card {
            transition: all 0.3s ease;
          }
          .hover-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 28px rgba(59, 130, 246, 0.15);
            border-color: #93c5fd;
            background-color: #f0f9ff;
          }
          .datos-guardados {
            border-color: #16a34a !important;
            box-shadow: 0 0 15px rgba(22, 163, 74, 0.3);
          }
          .back-btn {
            background-color: #e0f2fe;
            color: #2563eb;
            border: 2px solid #93c5fd;
            border-radius: 30px;
            padding: 10px 24px;
            transition: all 0.3s ease;
          }
          .back-btn:hover {
            background-color: #2563eb;
            color: white;
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
            transform: translateY(-3px);
          }
          .send-btn {
            background-color: #2563eb;
            color: white;
            border-radius: 30px;
            padding: 10px 24px;
            border: none;
            transition: all 0.3s ease;
          }
          .send-btn:disabled {
            background-color: #93c5fd;
            cursor: not-allowed;
          }
          .send-btn:hover:enabled {
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
            transform: translateY(-3px);
          }
        `}</style>
      </section>
    </>
  );
}

export default PostularConductor;