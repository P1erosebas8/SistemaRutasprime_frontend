import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MyNavbar from './components/MyNavbar'
import PreguntasFrec from "./pages/PreguntasFrec";
import Contactanos from "./pages/Contactanos";
import AcercaDe from "./pages/AcercaDe";
import MyFooter from "./components/MyFooter";
import Inicio from "./pages/Inicio";
import Privacidad from "./pages/privacidad";
import Reclamaciones from "./pages/reclamaciones";
import Terminos from "./pages/terminos";
import LogIN from "./pages/LogIn";
import WhatsappBoton from "./components/WhatsappBoton";
import ComoRegistroCon from "./pages/Socios1";
import RequisitosConductor from "./pages/Socios2";
import Soporte from "./pages/Socios3";
import ScrollToTop from "./components/ScrollTop";
import Rutas from "./pages/Viajes1";
import Ciudades from "./pages/Viajes2";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardAdmin from "./pages/DashboardAdmin";
import LogInAdmin from "./pages/LogInAdmin"
import DashBoardUsuarios from "./pages/DashBoardUsuarios"
import DashBoardConductores from "./pages/DashBoardConductores"
import DashBoardPrincipal from "./pages/DashBoardPrincipal"
import DashBoardAdministradores from "./pages/DashBoardadminisitradores";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/PreguntasFrec" element={<PreguntasFrec />} />
            <Route path="/Contactanos" element={<Contactanos />} />
            <Route path="/AcercaDe" element={<AcercaDe />} />
            <Route path="/LogIn" element={<LogIN />} />
            <Route path="/register" element={<Register />} />
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
          <Route element={<AdminLayout />}>
            <Route path="/DashBoardPrincipal" element={<DashBoardPrincipal />} />
            <Route path="/DashBoardUsuarios" element={<DashBoardUsuarios />} />
            <Route path="/DashBoardConductores" element={<DashBoardConductores />} />
            <Route path="/DashBoardAdministradores" element={<DashBoardAdministradores/>} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  )
}

export default App
