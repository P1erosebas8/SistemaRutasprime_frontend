import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
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


function App() {
  return (
    <>
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/PreguntasFrec" element={<PreguntasFrec />} />
          <Route path="/Contactanos" element={<Contactanos />} />
          <Route path="/AcercaDe" element={<AcercaDe />} />
        </Routes>
        <Routes>
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/reclamaciones" element={<Reclamaciones />} />
          <Route path="/terminos" element={<Terminos />} />
        </Routes>
        <MyFooter />
      </Router>
    </>
  )
}

export default App
