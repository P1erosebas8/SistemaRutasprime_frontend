import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../assets/logo.png";

function MyNavbar() {
  const loggedIn = false;
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    <Navbar expand="lg" fixed="top" className={`py-3 navbar-custom ${scrolled ? "bg-dark" : "bg-transparent"}`} expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <Container fluid>
        <Navbar.Brand className='d-flex align-items-center fs-3' as={Link} to="/Inicio" onClick={() => setExpanded(false)}><img
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
            <NavDropdown title="Viajes" className='fs-5' id="basic-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/Viajes1" onClick={() => setExpanded(false)}>Rutas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Viajes2" onClick={() => setExpanded(false)}>Ciudades</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Socios" id="basic-nav-dropdown" className='fs-5' menuVariant="dark">
              <NavDropdown.Item as={Link} to="/Socios1" onClick={() => setExpanded(false)}>¿Como me puedo registrar?</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Socios2" onClick={() => setExpanded(false)}>Requisitos para conductores</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Socios3" onClick={() => setExpanded(false)}>Soporte</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/Contactanos" className='fs-5' onClick={() => setExpanded(false)}>Contactanos</Nav.Link>
            <Nav.Link as={Link} to="/AcercaDe" className='fs-5' onClick={() => setExpanded(false)}>Acerca De</Nav.Link>
            <Nav.Link as={Link} to="/PreguntasFrec" className='fs-5' onClick={() => setExpanded(false)}>Preguntas Frecuentes</Nav.Link>
            <Nav.Link
              as={Link}
              to="/LogIn"
              onClick={() => setExpanded(false)}
              className="d-flex align-items-center"
            >
              <img
                src="src/assets/user.png"
                alt="Usuario"
                width="35"
                height="35"
                className="rounded-circle border border-light"
              />
            </Nav.Link>
            {loggedIn && <Nav.Link href="/perfil">Perfil</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;