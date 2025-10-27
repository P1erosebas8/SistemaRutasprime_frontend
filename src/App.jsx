import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ScrollToTop from "./components/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🌐 Layouts y componentes globales
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// 🏠 Páginas principales
import Inicio from "./pages/Inicio";
import PreguntasFrec from "./pages/PreguntasFrec";
import Contactanos from "./pages/Contactanos";
import AcercaDe from "./pages/AcercaDe";
import Privacidad from "./pages/privacidad";
import Reclamaciones from "./pages/reclamaciones";
import Terminos from "./pages/terminos";
import ComoRegistroCon from "./pages/Socios1";
import RequisitosConductor from "./pages/Socios2";
import Soporte from "./pages/Socios3";
import Rutas from "./pages/Viajes1";
import Ciudades from "./pages/Viajes2";
import Profile from "./pages/Profile";

// 🧑‍💼 Admin
import LogInAdmin from "./pages/LogInAdmin";
import DashBoardPrincipal from "./pages/DashBoardPrincipal";
import DashBoardUsuarios from "./pages/DashBoardUsuarios";
import DashBoardConductores from "./pages/DashBoardConductores";

// 👥 Clientes
import ClienteLogin from "./Clientes/login";
import ClienteRegister from "./Clientes/register";

// 🚛 Transportistas
import RegistroTransportista from "./Transportistas/RegistroTransportista";
import LoginTransportista from "./Transportistas/LoginTransportista";


function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          {/* 🌍 Layout público */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/PreguntasFrec" element={<PreguntasFrec />} />
            <Route path="/Contactanos" element={<Contactanos />} />
            <Route path="/AcercaDe" element={<AcercaDe />} />
            <Route path="/Socios1" element={<ComoRegistroCon />} />
            <Route path="/Socios2" element={<RequisitosConductor />} />
            <Route path="/Socios3" element={<Soporte />} />
            <Route path="/Viajes1" element={<Rutas />} />
            <Route path="/Viajes2" element={<Ciudades />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/reclamaciones" element={<Reclamaciones />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/LogInAdmin" element={<LogInAdmin />} />
          </Route>

          {/* 👤 CLIENTES */}
          <Route path="/clientes/login" element={<ClienteLogin />} />
          <Route path="/register" element={<ClienteRegister />} />

          {/* 🚛 TRANSPORTISTAS */}
          <Route path="/Transportistas/LoginTransportista" element={<LoginTransportista />} />
          <Route path="/RegistroTransportista" element={<RegistroTransportista />} />


          {/* 🧑‍💼 ADMIN */}
          <Route element={<AdminLayout />}>
            <Route path="/DashBoardPrincipal" element={<DashBoardPrincipal />} />
            <Route path="/DashBoardUsuarios" element={<DashBoardUsuarios />} />
            <Route path="/DashBoardConductores" element={<DashBoardConductores />} />
          </Route>

        </Routes>
      </Router>

      {/* ✅ Notificaciones globales */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
