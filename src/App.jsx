import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import WhatsappBoton from "./components/WhatsappBoton";
import ScrollToTop from "./components/ScrollTop";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Páginas públicas
import Inicio from "./pages/Inicio";
import PreguntasFrec from "./pages/PreguntasFrec";
import Contactanos from "./pages/Contactanos";
import AcercaDe from "./pages/AcercaDe";
import Privacidad from "./pages/privacidad";
import Reclamaciones from "./pages/reclamaciones";
import Terminos from "./pages/terminos";
import LogIN from "./pages/LogIn";
import Register from "./pages/Register";

// Páginas de socios
import ComoRegistroCon from "./pages/Socios1";
import RequisitosConductor from "./pages/Socios2";
import Soporte from "./pages/Socios3";

// Páginas de viajes
import Rutas from "./pages/Viajes1";
import Ciudades from "./pages/Viajes2";

// Perfil
import Profile from "./pages/Profile";

// Administración
import DashboardAdmin from "./pages/DashboardAdmin";
import LogInAdmin from "./pages/LogInAdmin";
import DashBoardUsuarios from "./pages/DashBoardUsuarios";
import DashBoardConductores from "./pages/DashBoardConductores";
import DashBoardPrincipal from "./pages/DashBoardPrincipal";

// Transportistas - Formularios principales
import RutasPrimeForm from "./transportistas/RutasPrimeForm";
import RutasPrimeVehiculo from "./transportistas/RutasPrimeVehiculo";

// Transportistas - Documentos de persona
import TomarFotoPerfil from "./transportistas/TomarFotoPerfil";
import TomarFotoLicencia from "./transportistas/TomarFotoLicencia";
import SubirAntecedentesPenales from "./transportistas/SubirAntecedentesPenales";

// Transportistas - Documentos de vehículo
import SubirTarjetaPropiedad from "./transportistas/SubirTarjetaPropiedad";
import SubirTarjetaCirculacion from "./transportistas/SubirTarjetaCirculacion";
import SubirDocumentoSoat from "./transportistas/SubirDocumentoSoat";
import SubirRevisionTecnica from "./transportistas/SubirRevisionTecnica";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* BLOQUE DE RUTAS PÚBLICAS */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/PreguntasFrec" element={<PreguntasFrec />} />
            <Route path="/Contactanos" element={<Contactanos />} />
            <Route path="/AcercaDe" element={<AcercaDe />} />
            <Route path="/LogIn" element={<LogIN />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Socios1" element={<ComoRegistroCon />} />
            <Route path="/Socios2" element={<RequisitosConductor />} />
            <Route path="/Socios3" element={<Soporte />} />
            <Route path="/Viajes1" element={<Rutas />} />
            <Route path="/Viajes2" element={<Ciudades />} />
            <Route path="/Privacidad" element={<Privacidad />} />
            <Route path="/Reclamaciones" element={<Reclamaciones />} />
            <Route path="/Terminos" element={<Terminos />} />
            <Route
              path="/Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/LogInAdmin" element={<LogInAdmin />} />
            {/* Ruta del formulario principal de transportistas */}
            <Route
              path="/Transportista/RutasPrimeForm"
              element={<RutasPrimeForm />}
            />
          </Route>

          {/* BLOQUE DE RUTAS DE ADMINISTRADOR */}
          <Route element={<AdminLayout />}>
            <Route path="/DashBoardPrincipal" element={<DashBoardPrincipal />} />
            <Route path="/DashBoardUsuarios" element={<DashBoardUsuarios />} />
            <Route
              path="/DashBoardConductores"
              element={<DashBoardConductores />}
            />
          </Route>

          {/* BLOQUE DE RUTAS DE TRANSPORTISTAS */}
          {/* Formularios secundarios */}
          <Route
            path="/Transportista/RutasPrimeVehiculo"
            element={<RutasPrimeVehiculo />}
          />

          {/* Documentos de Persona */}
          <Route
            path="/Transportista/foto-perfil"
            element={<TomarFotoPerfil />}
          />
          <Route
            path="/Transportista/foto-licencia"
            element={<TomarFotoLicencia />}
          />
          <Route
            path="/Transportista/antecedentes-penales"
            element={<SubirAntecedentesPenales />}
          />

          {/* Documentos de Vehículo */}
          <Route
            path="/Transportista/subir-tarjeta-propiedad"
            element={<SubirTarjetaPropiedad />}
          />
          <Route
            path="/Transportista/subir-tarjeta-circulacion"
            element={<SubirTarjetaCirculacion />}
          />
          <Route
            path="/Transportista/subir-soat"
            element={<SubirDocumentoSoat />}
          />
          <Route
            path="/Transportista/subir-revision-tecnica"
            element={<SubirRevisionTecnica />}
          />
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
