import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validators } from "../utils/validators";
import CamaraCaptura from "../components/CamaraCaptura";
import imgFotoPersonaLicencia from "../assets/registroconductor/fotopersonalicencia.jpg";
import imgFotoLicencia from "../assets/registroconductor/fotolicencia.jpg";
import imgAntecedentesPenales from "../assets/registroconductor/antecedentespenales.jpg";

function DatosConductor() {
  const { getProfile } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    fechaNacimiento: "",
    numeroLicenciaConducir: "",
    fotoPersonaLicencia: null,
    fotoLicencia: null,
    antecedentesPenales: null,
  });

  const [modals, setModals] = useState({
    fotoLicencia: false,
    antecedentesPenales: false,
    camara: false,
  });

  const [uploaded, setUploaded] = useState({
    fotoPersonaLicencia: false,
    fotoLicencia: false,
    antecedentesPenales: false,
  });

  const [errors, setErrors] = useState({});

  const modalInfo = {
    fotoPersonaLicencia: {
      img: imgFotoPersonaLicencia,
      descripcion: "Sube una fotografía tuya sosteniendo tu licencia de conducir. Tu rostro y el documento deben ser claramente visibles.",
    },
    fotoLicencia: {
      img: imgFotoLicencia,
      descripcion: "Sube una imagen clara y legible de tu licencia de conducir.",
    },
    antecedentesPenales: {
      img: imgAntecedentesPenales,
      descripcion: "Adjunta el documento oficial de tus antecedentes penales emitido recientemente.",
    },
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser({ nombres: data.nombres || "", apellidos: data.apellidos || "", dniRuc: data.dniRuc || "" });
        const savedData = JSON.parse(localStorage.getItem("datosConductor"));
        if (savedData) {
          setForm(savedData.form);
          setUploaded(savedData.uploaded);
        }
      } catch {
        toast.error("No se pudo cargar el perfil");
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.warn("Solo se permiten archivos PDF, JPG o PNG");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.warn("El archivo supera los 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, [field]: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSaveFile = (field) => {
    if (form[field]) {
      const updatedUploaded = { ...uploaded, [field]: true };
      setUploaded(updatedUploaded);
      setModals(prev => ({ ...prev, [field]: false }));
      toast.success(`Archivo "${field}" subido correctamente`, { position: "top-right", autoClose: 2000, theme: "colored" });
      localStorage.setItem("datosConductor", JSON.stringify({ form, uploaded: updatedUploaded }));
    } else {
      toast.warn("Selecciona un archivo antes de guardar", { position: "top-right", autoClose: 2000, theme: "colored" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaError = validators.fechaNacimiento(form.fechaNacimiento);
    const licenciaError = validators.numeroLicenciaConducir(form.numeroLicenciaConducir);
    if (fechaError || licenciaError) {
      setErrors({ fechaNacimiento: fechaError, numeroLicenciaConducir: licenciaError });
      toast.error("Corrige los errores antes de continuar", { position: "top-right", autoClose: 2500, theme: "colored" });
      return;
    }
    if (!uploaded.fotoPersonaLicencia || !uploaded.fotoLicencia || !uploaded.antecedentesPenales) {
      toast.warn("Sube todos los documentos requeridos", { position: "top-right", autoClose: 2500, theme: "colored" });
      return;
    }
    localStorage.setItem("datosConductor", JSON.stringify({ form, uploaded, completado: true }));
    toast.success("Datos del conductor guardados correctamente", { position: "top-right", autoClose: 2000, theme: "colored" });
    setTimeout(() => navigate("/Postular-Conductor"), 1500);
  };

  const openCamaraModal = () => setModals(prev => ({ ...prev, camara: true }));

  const fileFields = [
    { key: "fotoPersonaLicencia", label: "Fotografía del conductor" },
    { key: "fotoLicencia", label: "Fotografía de licencia de conducir" },
    { key: "antecedentesPenales", label: "Antecedentes Penales" },
  ];

  if (!user) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-2">Cargando datos...</p>
    </div>
  );

  return (
    <>
      <HeroSection
        title="Postulación a Conductor"
        subtitle={`Bienvenido, ${user?.nombres} ${user?.apellidos}`}
        description="Completa los siguientes pasos para continuar con tu registro."
        background="src/assets/DatosConductor.jpg"
        height="70vh"
        overlay="rgba(0,0,0,0.45)"
        align="center"
        backgroundPosition="top"
      />
      <div className="container py-5">
        <h3 className="fw-bold mb-4 text-primary text-center">Información del Conductor</h3>
        <form className="row g-4" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Nombre(s)</label>
            <input type="text" className="form-control" value={user?.nombres} readOnly />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Apellidos</label>
            <input type="text" className="form-control" value={user?.apellidos} readOnly />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Número de DNI</label>
            <input type="text" className="form-control" value={user?.dniRuc} readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Fecha de nacimiento</label>
            <input
              type="date"
              className={`form-control ${errors.fechaNacimiento ? "is-invalid" : ""}`}
              required
              value={form.fechaNacimiento}
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, fechaNacimiento: value });
                setErrors({ ...errors, fechaNacimiento: validators.fechaNacimiento(value) });
              }}
            />
            {errors.fechaNacimiento && <div style={{ color: "red", fontSize: "0.9rem", marginTop: "4px" }}>{errors.fechaNacimiento}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Número de Licencia de Conducir</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Ejemplo: B12345678"
                className={`form-control ${errors.numeroLicenciaConducir ? "is-invalid" : ""}`}
                required
                value={form.numeroLicenciaConducir}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm({ ...form, numeroLicenciaConducir: value });
                  setErrors({ ...errors, numeroLicenciaConducir: validators.numeroLicenciaConducir(value) });
                }}
              />
              {errors.numeroLicenciaConducir && <i className="bi bi-exclamation-circle-fill" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "red", fontSize: "1.1rem" }}></i>}
            </div>
            {errors.numeroLicenciaConducir && <div style={{ color: "red", fontSize: "0.9rem", marginTop: "4px" }}>{errors.numeroLicenciaConducir}</div>}
          </div>
          <div className="col-md-6">
            <Button className="w-100 d-flex justify-content-between align-items-center" variant={uploaded.fotoPersonaLicencia ? "success" : "outline-primary"} onClick={openCamaraModal}>
              Fotografía del conductor
              {uploaded.fotoPersonaLicencia && <i className="bi bi-check-circle-fill ms-2"></i>}
            </Button>
          </div>
          {fileFields.filter(f => f.key !== "fotoPersonaLicencia").map(({ key, label }) => (
            <div key={key} className="col-md-6">
              <Button className="w-100 d-flex justify-content-between align-items-center" variant={uploaded[key] ? "success" : "outline-primary"} onClick={() => setModals({ ...modals, [key]: true })}>
                {label}
                {uploaded[key] && <i className="bi bi-check-circle-fill ms-2"></i>}
              </Button>
            </div>
          ))}
          <div className="col-12 text-center mt-4 d-flex justify-content-center gap-3">
            <Button variant="secondary" size="lg" onClick={() => navigate("/Postular-Conductor")}>Cancelar</Button>
            <Button type="submit" variant="primary" size="lg">Guardar y continuar</Button>
          </div>
        </form>
      </div>

      <Modal
        show={modals.camara}
        onHide={() => setModals(prev => ({ ...prev, camara: false }))}
        centered
        backdrop="static"
        keyboard={false}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Fotografía del conductor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CamaraCaptura
            onCapture={(foto) => {
              setForm(prev => ({ ...prev, fotoPersonaLicencia: foto }));
              const updatedUploaded = { ...uploaded, fotoPersonaLicencia: true };
              setUploaded(updatedUploaded);
              localStorage.setItem("datosConductor", JSON.stringify({ form: { ...form, fotoPersonaLicencia: foto }, uploaded: updatedUploaded }));
              toast.success("Archivo \"fotoPersonaLicencia\" subido correctamente", { position: "top-right", autoClose: 2000, theme: "colored" });
              setModals(prev => ({ ...prev, camara: false }));
            }}
            onClose={() => setModals(prev => ({ ...prev, camara: false }))}
          />
        </Modal.Body>
      </Modal>

      {fileFields.filter(f => f.key !== "fotoPersonaLicencia").map(({ key, label }) => (
        <Modal
          key={key}
          show={modals[key]}
          onHide={() => setModals(prev => ({ ...prev, [key]: false }))}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{label}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={modalInfo[key].img}
              alt={label}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "220px", objectFit: "cover" }}
            />
            <p className="text-muted mb-3">{modalInfo[key].descripcion}</p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="form-control"
              onChange={(e) => handleFileChange(e, key)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModals(prev => ({ ...prev, [key]: false }))}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => handleSaveFile(key)}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      ))}

      <ToastContainer />
    </>
  );
}

export default DatosConductor;