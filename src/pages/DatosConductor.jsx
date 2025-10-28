import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    fotoPersonaLicencia: false,
    fotoLicencia: false,
    antecedentesPenales: false,
  });

  const [uploaded, setUploaded] = useState({
    fotoPersonaLicencia: false,
    fotoLicencia: false,
    antecedentesPenales: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser({
          nombres: data.nombres || "",
          apellidos: data.apellidos || "",
          dniRuc: data.dniRuc || "",
        });

        const savedData = JSON.parse(localStorage.getItem("datosConductor"));
        if (savedData) {
          setForm(savedData.form);
          setUploaded(savedData.uploaded);
        }
      } catch (err) {
        toast.error("No se pudo cargar el perfil");
      }
    };
    fetchUser();
  }, []);

  if (!user)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando datos...</p>
      </div>
    );

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
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveFile = (field) => {
    if (form[field]) {
      const updatedUploaded = { ...uploaded, [field]: true };
      setUploaded(updatedUploaded);
      setModals((prev) => ({ ...prev, [field]: false }));

      toast.success(`Archivo "${field}" subido correctamente`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      localStorage.setItem(
        "datosConductor",
        JSON.stringify({ form, uploaded: updatedUploaded })
      );
    } else {
      toast.warn("Selecciona un archivo antes de guardar", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fechaNacimiento || !form.numeroLicenciaConducir) {
      toast.warn("Completa todos los campos obligatorios", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    if (
      !uploaded.fotoPersonaLicencia ||
      !uploaded.fotoLicencia ||
      !uploaded.antecedentesPenales
    ) {
      toast.warn("Sube todos los documentos requeridos", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    localStorage.setItem(
      "datosConductor",
      JSON.stringify({ form, uploaded, completado: true })
    );

    toast.success("Datos del conductor guardados correctamente", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/Postular-Conductor");
    }, 1500);
  };

  const fileFields = [
    { key: "fotoPersonaLicencia", label: "Fotografía del conductor" },
    { key: "fotoLicencia", label: "Fotografía de licencia de conducir" },
    { key: "antecedentesPenales", label: "Antecedentes Penales" },
  ];

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
        <h3 className="fw-bold mb-4 text-primary text-center">
          Información del Conductor
        </h3>

        <form className="row g-4" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Nombre(s)</label>
            <input
              type="text"
              className="form-control"
              value={user?.nombres}
              readOnly
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Apellidos</label>
            <input
              type="text"
              className="form-control"
              value={user?.apellidos}
              readOnly
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Número de DNI</label>
            <input
              type="text"
              className="form-control"
              value={user?.dniRuc}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              className="form-control"
              required
              value={form.fechaNacimiento}
              onChange={(e) =>
                setForm({ ...form, fechaNacimiento: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Número de Licencia de Conducir
            </label>
            <input
              type="text"
              className="form-control"
              required
              value={form.numeroLicenciaConducir}
              onChange={(e) =>
                setForm({ ...form, numeroLicenciaConducir: e.target.value })
              }
            />
          </div>

          {fileFields.map(({ key, label }) => (
            <div key={key} className="col-md-6">
              <Button
                className="w-100 d-flex justify-content-between align-items-center"
                variant={uploaded[key] ? "success" : "outline-primary"}
                onClick={() => setModals({ ...modals, [key]: true })}
              >
                {label}
                {uploaded[key] && <i className="bi bi-check-circle-fill ms-2"></i>}
              </Button>
            </div>
          ))}

          <div className="col-12 text-center mt-4 d-flex justify-content-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/Postular-Conductor")}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="lg">
              Guardar y continuar
            </Button>
          </div>
        </form>
      </div>

      {fileFields.map(({ key, label }) => (
        <Modal
          key={key}
          show={modals[key]}
          onHide={() => setModals({ ...modals, [key]: false })}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">
              Sube un archivo PDF o imagen (JPG/PNG) para tu {label.toLowerCase()}.
            </p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="form-control"
              onChange={(e) => handleFileChange(e, key)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setModals({ ...modals, [key]: false })}
            >
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