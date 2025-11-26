import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import PasswordInput from "../components/Auth/PasswordInput";
import HeroSection from "../components/HeroSection";
import { validateProfileUpdate } from "../utils/validators";

function Profile() {
  const { getProfile, logout, updateProfile, changePassword } = useAuth();
  const [user, setUser] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formUpdate, setFormUpdate] = useState({
    direccion: "",
    celular: "",
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
          direccion: data.direccion,
          celular: data.celular,
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
    const validationError = validateProfileUpdate({ ...formUpdate, [name]: value });
    setErrors(validationError || {});
  };

  const handleUpdateProfile = async () => {
    const validationErrors = validateProfileUpdate(formUpdate);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    setLoadingUpdate(true);
    try {
      await updateProfile(formUpdate);
      setUser({ ...user, ...formUpdate });
      setShowUpdate(false);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return;
    }
    if (newPassword !== confirmPassword) {
      return;
    }

    setLoadingPassword(true);
    try {
      await changePassword(oldPassword, newPassword);
      logout();
      setShowPassword(false);
      navigate("/login");
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
            <p><strong>Nombre:</strong> {user.nombres}</p>
            <p><strong>Apellidos:</strong> {user.apellidos}</p>
            <p><strong>DNI:</strong> {user.dniRuc}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Dirección:</strong> {user.direccion}</p>
            <p><strong>Celular:</strong> {user.celular}</p>

            <div className="mt-4">

              <h5 className="text-center fw-bold mb-3">Configuración de Cuenta</h5>
              <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
                <div className="col">
                  <button className="btn btn-warning w-100" onClick={() => setShowUpdate(true)}>
                    Editar perfil
                  </button>
                </div>

                <div className="col">
                  <button className="btn btn-info w-100" onClick={() => setShowPassword(true)}>
                    Cambiar contraseña
                  </button>
                </div>
              </div>

              {(user.roles.includes("ROLE_CONDUCTOR") || user.roles.length > 1) && (
                <>
                  <h5 className="text-center fw-bold mb-3">Panel Financiero</h5>
                  <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
                    <div className="col">
                      <button
                        className="btn btn-dark w-100"
                        onClick={() => navigate("/ganancias")}
                      >
                        Panel de Ganancias
                      </button>
                    </div>

                    <div className="col">
                      <button
                        className="btn btn-secondary w-100"
                        onClick={() => navigate("/mis-gastos")}
                      >
                        Mis Gastos
                      </button>
                    </div>
                  </div>
                </>
              )}

              {user.roles.length === 1 && user.roles[0] === "ROLE_CLIENTE" && (
                <>
                  <h5 className="text-center fw-bold mb-3">Panel de Gastos</h5>
                  <div className="row g-3 mb-4">
                    <div className="col">
                      <button
                        className="btn btn-secondary w-100"
                        onClick={() => navigate("/mis-gastos")}
                      >
                        Mis Gastos
                      </button>
                    </div>
                  </div>
                </>
              )}

              <h5 className="text-center fw-bold mb-3">Accesos</h5>
              <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
                <div className="col">
                  {user.roles.length > 1 ? (
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => navigate("/ElegCliConduc")}
                    >
                      Elegir Cliente | Conductor
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => navigate("/clienteUI")}
                    >
                      Ir al Panel Cliente
                    </button>
                  )}
                </div>

                {user.roles.length === 1 && user.roles[0] === "ROLE_CLIENTE" && (
                  <div className="col">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => navigate("/postular-conductor")}
                    >
                      Postular a Conductor
                    </button>
                  </div>
                )}
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-danger w-50" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={showUpdate} onHide={() => setShowUpdate(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={user.nombres} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control value={user.apellidos} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control value={user.dniRuc} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.email} readOnly />
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
              <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                name="celular"
                value={formUpdate.celular}
                disabled={loadingUpdate}
                onChange={handleChangeUpdate}
                isInvalid={!!errors.celular}
              />
              <Form.Control.Feedback type="invalid">{errors.celular}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdate(false)} disabled={loadingUpdate}>Cancelar</Button>
          <Button variant="primary" onClick={handleUpdateProfile} disabled={loadingUpdate} className="d-flex align-items-center justify-content-center">
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
          <Button variant="secondary" onClick={() => setShowPassword(false)} disabled={loadingPassword}>Cancelar</Button>
          <Button variant="success" onClick={handleChangePassword} disabled={loadingPassword} className="d-flex align-items-center justify-content-center">
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