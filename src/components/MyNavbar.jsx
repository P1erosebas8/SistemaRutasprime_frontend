import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../assets/logo.png";

function MyNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Navbar expand="lg" fixed="top" className={`py-3 navbar-custom ${scrolled ? "bg-dark" : "bg-transparent"}`}
    >      <Container fluid>
        <Navbar.Brand className='d-flex align-items-center fs-3' as={Link} to="/Inicio"><img
          src={Logo}
          alt="Logo"
          width="50"
          height="55"
          className="d-inline-block align-top me-2"
        />
          RUTAS PRIME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Viajes" className='fs-5' id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/action/1.1">Viajes de empresa asociada</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/1.2">Viajes de empresa independiente</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/1.3">Rutas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/1.4">Ciudades</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Socios" id="basic-nav-dropdown" className='fs-5'>
              <NavDropdown.Item as={Link} to="/action/2.1">Registrate como conductor</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/2.2">Registrate como pasajero</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/2.3">Requisitos para conductores</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/2.4">Soporte</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/2.5">Preguntas Frecuentes</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/Contactanos" className='fs-5'>Contactanos</Nav.Link>
            <Nav.Link as={Link} to="/AcercaDe" className='fs-5'>Acerca De</Nav.Link>
            <Nav.Link as={Link} to="/PreguntasFrec" className='fs-5'>Preguntas Frecuentes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;