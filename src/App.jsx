import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MyNavbar from './components/MyNavbar'
import PreguntasFrec from "./components/PreguntasFrec";
import Contactanos from "./components/Contactanos";
import AcercaDe from "./components/AcercaDe";
import MyFooter from "./components/MyFooter";
import Inicio from "./components/Inicio";
import Privacidad from "./components/privacidad";
import Reclamaciones from "./components/reclamaciones";
import Terminos from "./components/terminos";
import LogIN from "./components/LogIn";
import WhatsappBoton from "./components/WhatsappBoton";

function App() {
  return (
    <>
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/PreguntasFrec" element={<PreguntasFrec />} />
          <Route path="/Contactanos" element={<Contactanos />} />
          <Route path="/AcercaDe" element={<AcercaDe />} />
          <Route path="/LogIn" element={<LogIN />} />
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
