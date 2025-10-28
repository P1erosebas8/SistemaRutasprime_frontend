import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiRequest } from "../services/api";
import PasswordInput from "../components/Auth/PasswordInput";
import HeroSection from "../components/HeroSection";
import { validators } from "../utils/validators";

function Profile() {
  const { getProfile, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formUpdate, setFormUpdate] = useState({
    nombres: "",
    apellidos: "",
    direccion: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setFormUpdate({
          nombres: data.nombres,
          apellidos: data.apellidos,
          direccion: data.direccion,
        });
      } catch {
        logout();
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormUpdate({ ...formUpdate, [name]: value });

    if (validators[name]) {
      const errorMsg = validators[name](value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleUpdateProfile = async () => {
    const newErrors = {};
    Object.keys(formUpdate).forEach((field) => {
      if (validators[field]) {
        const errorMsg = validators[field](formUpdate[field]);
        if (errorMsg) newErrors[field] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Por favor corrige los errores antes de guardar");
      return;
    }

    setLoadingUpdate(true);
    try {
      await apiRequest("/user/update", "PUT", formUpdate, true);
      toast.success("Perfil actualizado");
      setUser({ ...user, ...formUpdate });
      setShowUpdate(false);
    } catch {
      toast.error("Error al actualizar perfil");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Completa todos los campos");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoadingPassword(true);
    try {
      await apiRequest(
        "/user/change-password",
        "PUT",
        { oldPassword, newPassword },
        true
      );
      toast.success("Contraseña cambiada, inicia sesión de nuevo");
      logout();
      setShowPassword(false);
      navigate("/login");
    } catch {
      toast.error("Error al cambiar contraseña");
    } finally {
      setLoadingPassword(false);
    }
  };

  if (!user) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection
        title="Mi Perfil"
        subtitle="Gestiona tu información personal y seguridad"
        description="Administra tus datos de manera sencilla, mantén tu información siempre actualizada y controla la seguridad de tu cuenta en un solo lugar."
        background="src/assets/FondosAuth.jpg"
        height="80vh"
        align="center"
        backgroundPosition="center top"
      />

      <section className="py-5 text-white" style={{ backgroundColor: "#141414" }}>
        <div className="container">
          <h2 className="text-center mb-4">Perfil de Usuario</h2>
          <div className="card shadow p-4 text-dark mx-auto" style={{ maxWidth: "700px" }}>
            <p><strong>Nombre:</strong> {user.nombres} {user.apellidos}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Celular:</strong> {user.celular}</p>
            <p><strong>Dirección:</strong> {user.direccion}</p>
            <p><strong>DNI:</strong> {user.dniRuc}</p>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-warning" onClick={() => setShowUpdate(true)}>
                Editar perfil
              </button>
              <button className="btn btn-info" onClick={() => setShowPassword(true)}>
                Cambiar contraseña
              </button>
              <button
                className="btn btn-success ms-auto"
                onClick={() => navigate("/postular-conductor")}
              >
                Postular a Conductor
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Update Profile */}
      <Modal show={showUpdate} onHide={() => setShowUpdate(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                name="nombres"
                value={formUpdate.nombres}
                disabled={loadingUpdate}
                onChange={handleChangeUpdate}
                isInvalid={!!errors.nombres}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombres}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                name="apellidos"
                value={formUpdate.apellidos}
                disabled={loadingUpdate}
                onChange={handleChangeUpdate}
                isInvalid={!!errors.apellidos}
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellidos}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                name="direccion"
                value={formUpdate.direccion}
                disabled={loadingUpdate}
                onChange={handleChangeUpdate}
                isInvalid={!!errors.direccion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.direccion}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.email} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Celular</Form.Label>
              <Form.Control value={user.celular} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control value={user.dniRuc} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdate(false)} disabled={loadingUpdate}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateProfile}
            disabled={loadingUpdate}
            className="d-flex align-items-center justify-content-center"
          >
            {loadingUpdate ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Guardando...
              </>
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Change Password */}
      <Modal show={showPassword} onHide={() => setShowPassword(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña actual</Form.Label>
              <PasswordInput
                value={oldPassword}
                disabled={loadingPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Contraseña actual"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nueva contraseña</Form.Label>
              <PasswordInput
                value={newPassword}
                disabled={loadingPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                withStrength={true}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar nueva contraseña</Form.Label>
              <PasswordInput
                value={confirmPassword}
                disabled={loadingPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPassword(false)} disabled={loadingPassword}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={handleChangePassword}
            disabled={loadingPassword}
            className="d-flex align-items-center justify-content-center"
          >
            {loadingPassword ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Procesando...
              </>
            ) : (
              "Cambiar contraseña"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;