import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import PreguntasFrec from "./pages/PreguntasFrec";
import Contactanos from "./pages/Contactanos";
import AcercaDe from "./pages/AcercaDe";
import MyFooter from "./components/MyFooter";
import Inicio from "./pages/Inicio";
import Privacidad from "./pages/privacidad";
import Reclamaciones from "./pages/reclamaciones";
import Terminos from "./pages/terminos";
import WhatsappBoton from "./components/WhatsappBoton";
import ComoRegistroCon from "./pages/Socios1";
import RequisitosConductor from "./pages/Socios2";
import Soporte from "./pages/Socios3";
import ScrollToTop from "./components/ScrollTop";
import Rutas from "./pages/Viajes1";
import Ciudades from "./pages/Viajes2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

// 👇 CLIENTES
import ClienteLogin from "./Clientes/login";
import ClienteRegister from "./Clientes/register";




// ==========================================================
//  LAYOUTS
// ==========================================================
const DefaultLayout = ({ children }) => (
  <>
    <MyNavbar />
    {children}
    <WhatsappBoton />
    <MyFooter />
  </>
);

const MinimalLayout = ({ children }) => <>{children}</>;

// ==========================================================
//  APLICACIÓN PRINCIPAL
// ==========================================================
function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* === RUTAS CON NAVEGACIÓN COMPLETA === */}
          <Route path="/" element={<DefaultLayout><Inicio /></DefaultLayout>} />
          <Route path="/Inicio" element={<DefaultLayout><Inicio /></DefaultLayout>} />
          <Route path="/PreguntasFrec" element={<DefaultLayout><PreguntasFrec /></DefaultLayout>} />
          <Route path="/Contactanos" element={<DefaultLayout><Contactanos /></DefaultLayout>} />
          <Route path="/AcercaDe" element={<DefaultLayout><AcercaDe /></DefaultLayout>} />
          <Route path="/Socios1" element={<DefaultLayout><ComoRegistroCon /></DefaultLayout>} />
          <Route path="/Socios2" element={<DefaultLayout><RequisitosConductor /></DefaultLayout>} />
          <Route path="/Socios3" element={<DefaultLayout><Soporte /></DefaultLayout>} />
          <Route path="/Viajes1" element={<DefaultLayout><Rutas /></DefaultLayout>} />
          <Route path="/Viajes2" element={<DefaultLayout><Ciudades /></DefaultLayout>} />
          <Route path="/privacidad" element={<DefaultLayout><Privacidad /></DefaultLayout>} />
          <Route path="/reclamaciones" element={<DefaultLayout><Reclamaciones /></DefaultLayout>} />
          <Route path="/terminos" element={<DefaultLayout><Terminos /></DefaultLayout>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DefaultLayout>
                  <Profile />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />


          {/* CLIENTES */}
          <Route path="/clientes/login" element={<MinimalLayout><ClienteLogin /></MinimalLayout>} />
          <Route path="/register" element={<MinimalLayout><ClienteRegister /></MinimalLayout>} />
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
