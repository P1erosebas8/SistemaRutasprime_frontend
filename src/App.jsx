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

function App() {
  return (
    <>
      <Router>
        <MyNavbar />
         <ScrollToTop />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/PreguntasFrec" element={<PreguntasFrec />} />
          <Route path="/Contactanos" element={<Contactanos />} />
          <Route path="/AcercaDe" element={<AcercaDe />} />
          <Route path="/LogIn" element={<LogIN />} />
          <Route path="/Socios1" element={<ComoRegistroCon />} />
          <Route path="/Socios2" element={<RequisitosConductor/>}/>
          <Route path="/Socios3" element={<Soporte/>}/>
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/reclamaciones" element={<Reclamaciones />} />
          <Route path="/terminos" element={<Terminos />} />
        </Routes>
        <WhatsappBoton />
        <MyFooter />
      </Router>
    </>
  )
}

export default App
