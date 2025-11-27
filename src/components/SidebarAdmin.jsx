import { Nav } from "react-bootstrap";
import {
  FaUser,
  FaCar,
  FaRoute,
  FaSignOutAlt,
  FaBars,
  FaHome,
  FaVoteYea,
  FaUserShield,
  FaClock,
  FaEnvelope,
  FaTh
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SidebarAdmin({ isOpen, setIsOpen }) {
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { logoutAdmin, getAdminProfile } = useAuthAdmin();

  const [adminData, setAdminData] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showSubmenuE, setShowSubmenuE] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile();
        setAdminData(data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/loginadmin");
  };

  const dni = adminData?.dniRuc || "----";
  const role =
    (Array.isArray(adminData?.roles) ? adminData.roles[0] : "ROLE_SUPERADMIN").replace(
      "ROLE_",
      ""
    );

  return (
    <div
      className="text-white d-flex flex-column p-3"
      style={{
        height: "100vh",
        backgroundColor: "#1e1e2f",
        transition: "width 0.3s ease",
        width: isOpen ? "240px" : "80px",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"} mb-4`}
        >
          {isOpen && <h5 className="m-0 fw-bold">Panel Admin</h5>}
          <FaBars
            role="button"
            onClick={toggleSidebar}
            className="text-white fs-5"
            style={{ cursor: "pointer", minWidth: "24px", textAlign: "center" }}
          />
        </div>

        <Nav className={`flex-column mt-3 ${isOpen ? "align-items-start" : "align-items-center"}`}>
          {[
            { to: "/", icon: <FaHome />, label: "Inicio" },
            { to: "/DashBoardPrincipal", icon: <FaVoteYea />, label: "Principal" },
            { to: "/DashBoardUsuarios", icon: <FaUser />, label: "Clientes" },
            { to: "/DashBoardAdministradores", icon: <FaUserShield />, label: "Administradores" },
          ].map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center text-white mb-2 ${isActive ? "fw-bold text-info" : ""}`
              }
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
                fontSize: isOpen ? "1rem" : "1.4rem",
                transition: "all 0.2s ease",
              }}
            >
              <span className="d-flex align-items-center" style={{ justifyContent: "center", width: isOpen ? "auto" : "100%" }}>
                <span
                  style={{
                    fontSize: isOpen ? "1.1rem" : "1.6rem",
                    marginRight: isOpen ? "10px" : "0px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.icon}
                </span>
                {isOpen && item.label}
              </span>
            </NavLink>
          ))}

          <div>
            <div
              className="nav-link d-flex align-items-center text-white mb-2"
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
                cursor: "pointer",
                fontSize: isOpen ? "1rem" : "1.4rem",
              }}
              onClick={() => setShowSubmenu(!showSubmenu)}
            >
              <span
                style={{
                  fontSize: isOpen ? "1.1rem" : "1.6rem",
                  marginRight: isOpen ? "10px" : "0px",
                  transition: "all 0.2s ease",
                }}
              >
                <FaCar />
              </span>
              {isOpen && "Conductores"}
            </div>

            <AnimatePresence>
              {isOpen && showSubmenu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ms-4 mt-2"
                >
                  <NavLink
                    to="/DashBoardConductores/listar"
                    className={({ isActive }) =>
                      `nav-link text-white mb-2 d-flex align-items-center ${isActive ? "fw-bold text-info" : ""}`
                    }
                    style={{ fontSize: "0.95rem" }}
                  >
                    <FaUser className="me-2" style={{ minWidth: "18px", textAlign: "center" }} />
                    <span>Listar usuarios</span>
                  </NavLink>

                  <NavLink
                    to="/DashBoardConductores/aprobar"
                    className={({ isActive }) =>
                      `nav-link text-white mb-2 d-flex align-items-center ${isActive ? "fw-bold text-info" : ""}`
                    }
                    style={{ fontSize: "0.95rem" }}
                  >
                    <FaVoteYea className="me-2" style={{ minWidth: "18px", textAlign: "center" }} />
                    <span>Aprobar usuarios</span>
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <div
              className="nav-link d-flex align-items-center text-white mb-2"
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
                cursor: "pointer",
                fontSize: isOpen ? "1rem" : "1.4rem",
              }}
              onClick={() => setShowSubmenuE(!showSubmenuE)}
            >
              <span
                style={{
                  fontSize: isOpen ? "1.1rem" : "1.6rem",
                  marginRight: isOpen ? "10px" : "0px",
                  transition: "all 0.2s ease",
                }}
              >
                <FaTh  />
              </span>
              {isOpen && "Empresas"}
            </div>

            <AnimatePresence>
              {isOpen && showSubmenuE && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ms-4 mt-2"
                >
                  <NavLink
                    to="/DashBoardEmpresas/listar"
                    className={({ isActive }) =>
                      `nav-link text-white mb-2 d-flex align-items-center ${isActive ? "fw-bold text-info" : ""}`
                    }
                    style={{ fontSize: "0.95rem" }}
                  >
                    <FaUser className="me-2" style={{ minWidth: "18px", textAlign: "center" }} />
                    <span>Listar empresas</span>
                  </NavLink>

                  <NavLink
                    to="/DashBoardEmpresas/aprobar"
                    className={({ isActive }) =>
                      `nav-link text-white mb-2 d-flex align-items-center ${isActive ? "fw-bold text-info" : ""}`
                    }
                    style={{ fontSize: "0.95rem" }}
                  >
                    <FaVoteYea className="me-2" style={{ minWidth: "18px", textAlign: "center" }} />
                    <span>Aprobar empresas</span>
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/DashBoardRegistroViajes"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center text-white mb-2 ${isActive ? "fw-bold text-info" : ""}`
            }
            style={{
              justifyContent: isOpen ? "flex-start" : "center",
              fontSize: isOpen ? "1rem" : "1.4rem",
              transition: "all 0.2s ease",
            }}
          >
            <FaRoute className="me-2" />
            {isOpen && "Registro de Viajes"}
          </NavLink>

          <NavLink
            to="/DashBoardContactanos"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center text-white mb-2 ${isActive ? "fw-bold text-info" : ""}`
            }
            style={{
              justifyContent: isOpen ? "flex-start" : "center",
              fontSize: isOpen ? "1rem" : "1.4rem",
              transition: "all 0.2s ease",
            }}
          >
            <FaEnvelope className="me-2" />
            {isOpen && "Contáctanos"}
          </NavLink>

        </Nav>
      </div>

      <div
        style={{
          borderTop: "1px solid #444",
          paddingTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {isOpen && (
          <div className="mb-3" style={{ lineHeight: "1.3" }}>
            <div className="mb-2">
              <FaUser className="me-2 text-info" />
              <span>{dni}</span>
            </div>

            <div className="mb-2">
              <FaUserShield className="me-2 text-warning" />
              <span>{role}</span>
            </div>

            <div className="mb-2">
              <FaClock className="me-2 text-secondary" />
              <span style={{ color: "white" }}>
                {dateTime.toLocaleTimeString("es-PE", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          </div>
        )}

        <Nav.Link
          onClick={handleLogout}
          className="text-danger d-flex align-items-center justify-content-center"
          style={{ cursor: "pointer", fontSize: isOpen ? "1rem" : "1.3rem" }}
        >
          <FaSignOutAlt className="me-2" /> {isOpen && "Cerrar sesión"}
        </Nav.Link>
      </div>
    </div>
  );
}

export default SidebarAdmin;