import { Nav } from "react-bootstrap";
import {
  FaUser,
  FaCar,
  FaRoute,
  FaSignOutAlt,
  FaBars,
  FaHome,
  FaVoteYea,
  FaUserShield, // 👈 nuevo ícono para "Administradores"
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthAdmin } from "../hooks/useAuthAdmin";

function SidebarAdmin({ isOpen, setIsOpen }) {
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { logoutAdmin } = useAuthAdmin();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/loginadmin");
  };

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
          className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"
            } mb-4`}
        >
          {isOpen && <h5 className="m-0 fw-bold">Panel Admin</h5>}

          <FaBars
            role="button"
            onClick={toggleSidebar}
            className="text-white fs-5"
            style={{
              cursor: "pointer",
              minWidth: "24px",
              textAlign: "center",
            }}
          />
        </div>

        <Nav
          className={`flex-column mt-3 ${isOpen ? "align-items-start" : "align-items-center"
            }`}
        >
          {[
            { to: "/", icon: <FaHome />, label: "Inicio" },
            { to: "/DashBoardPrincipal", icon: <FaVoteYea />, label: "Principal" },
            { to: "/DashBoardUsuarios", icon: <FaUser />, label: "Usuarios" },
            { to: "/DashBoardAdministradores", icon: <FaUserShield />, label: "Administradores" },
            { to: "/DashBoardConductores", icon: <FaCar />, label: "Conductores" },
            { to: "/admin/registro-viajes", icon: <FaRoute />, label: "Registro de Viajes" },

          ].map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center text-white mb-2 ${isActive ? "fw-bold text-info" : ""
                }`
              }
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
                fontSize: isOpen ? "1rem" : "1.4rem",
                transition: "all 0.2s ease",
              }}
            >
              <span
                className="d-flex align-items-center"
                style={{
                  justifyContent: "center",
                  width: isOpen ? "auto" : "100%",
                }}
              >
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
        </Nav>
      </div>

      <div style={{ borderTop: "1px solid #444", paddingTop: "10px" }}>
        <Nav.Link
          onClick={handleLogout}
          className={`text-danger d-flex align-items-center ${isOpen ? "justify-content-start" : "justify-content-center"
            }`}
          style={{
            cursor: "pointer",
            fontSize: isOpen ? "1rem" : "1.3rem",
          }}
        >
          <FaSignOutAlt className="me-2" /> {isOpen && "Cerrar sesión"}
        </Nav.Link>
      </div>

      <style>
        {`
        .nav-link {
          transition: background-color 0.2s ease, transform 0.2s ease;
          border-radius: 8px;
          padding: 8px 12px;
          width: 100%;
        }
        .nav-link:hover {
          background-color: rgba(255,255,255,0.1);
          transform: translateX(4px);
        }
      `}
      </style>
    </div>
  );
}

export default SidebarAdmin;
