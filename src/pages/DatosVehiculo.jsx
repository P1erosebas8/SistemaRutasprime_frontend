import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DatosVehiculo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    placa: "",
    marca: "",
    color: "",
    anioFabricacion: "",
    tarjetaPropiedad: null,
    tarjetaCirculacion: null,
    soat: null,
    revisionTecnica: null,
  });

  const [modals, setModals] = useState({
    tarjetaPropiedad: false,
    tarjetaCirculacion: false,
    soat: false,
    revisionTecnica: false,
  });

  const [uploaded, setUploaded] = useState({
    tarjetaPropiedad: false,
    tarjetaCirculacion: false,
    soat: false,
    revisionTecnica: false,
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("datosVehiculo"));
    if (savedData) {
      setForm(savedData.form);
      setUploaded(savedData.uploaded);
    }
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo excede el tamaño máximo de 5MB", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, [field]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveFile = (field) => {
    if (form[field]) {
      setUploaded({ ...uploaded, [field]: true });
      setModals({ ...modals, [field]: false });
      toast.success(`Archivo "${field}" subido correctamente`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
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

    if (!form.placa || !form.marca || !form.color || !form.anioFabricacion) {
      toast.warn("Completa todos los campos del vehículo", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    if (
      !uploaded.tarjetaPropiedad ||
      !uploaded.tarjetaCirculacion ||
      !uploaded.soat ||
      !uploaded.revisionTecnica
    ) {
      toast.warn("Sube todos los documentos requeridos", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    localStorage.setItem(
      "datosVehiculo",
      JSON.stringify({ form, uploaded, completado: true })
    );

    toast.success("Datos del vehículo guardados correctamente", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/Postular-Conductor");
    }, 1500);
  };

  return (
    <>
      <HeroSection
        title="Datos del Vehículo"
        subtitle="¡Ya casi terminamos!"
        description="Solo necesitamos que llenes los datos del vehículo para continuar."
        background="src/assets/Datosvehiculo.jpg"
        height="70vh"
        overlay="rgba(0,0,0,0.45)"
        align="center"
        backgroundPosition="top"
      />

      <div className="container py-5">
        <h3 className="fw-bold mb-4 text-primary text-center">
          Información del vehículo
        </h3>

        <form className="row g-4" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Placa:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Introduce la placa"
              value={form.placa}
              onChange={(e) => setForm({ ...form, placa: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Marca:</label>
            <select
              className="form-select"
              value={form.marca}
              onChange={(e) => setForm({ ...form, marca: e.target.value })}
              required
            >
              <option value="">Marca</option>
              <option value="Toyota">Toyota</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Nissan">Nissan</option>
              <option value="Kia">Kia</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Suzuki">Suzuki</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Color:</label>
            <select
              className="form-select"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              required
            >
              <option value="">Selecciona color del vehículo</option>
              <option value="Negro">Negro</option>
              <option value="Blanco">Blanco</option>
              <option value="Plata">Plata</option>
              <option value="Rojo">Rojo</option>
              <option value="Azul">Azul</option>
              <option value="Gris">Gris</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Año de fabricación:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ejemplo: 2019"
              value={form.anioFabricacion}
              onChange={(e) =>
                setForm({ ...form, anioFabricacion: e.target.value })
              }
              required
            />
          </div>

          {[
            { key: "tarjetaPropiedad", label: "Tarjeta de propiedad" },
            { key: "tarjetaCirculacion", label: "Tarjeta de circulación" },
            { key: "soat", label: "Soat" },
            { key: "revisionTecnica", label: "Revisión técnica" },
          ].map(({ key, label }) => (
            <div key={key} className="col-md-6">
              <Button
                className="w-100 d-flex justify-content-between align-items-center"
                variant={uploaded[key] ? "success" : "outline-primary"}
                onClick={() => setModals({ ...modals, [key]: true })}
              >
                {label}
                {uploaded[key] && (
                  <i className="bi bi-check-circle-fill ms-2"></i>
                )}
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

      {[
        { key: "tarjetaPropiedad", title: "Tarjeta de propiedad" },
        { key: "tarjetaCirculacion", title: "Tarjeta de circulación" },
        { key: "soat", title: "Soat" },
        { key: "revisionTecnica", title: "Revisión técnica" },
      ].map(({ key, title }) => (
        <Modal
          key={key}
          show={modals[key]}
          onHide={() => setModals({ ...modals, [key]: false })}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">
              Sube un archivo PDF o imagen (JPG/PNG) correspondiente a tu{" "}
              {title.toLowerCase()}.
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

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default DatosVehiculo;