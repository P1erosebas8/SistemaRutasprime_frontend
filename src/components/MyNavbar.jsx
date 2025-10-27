import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

// Definición de estilos fijos y variables
const customStyles = {
    navbarContainer: {
        padding: '0 15px',
    },
    navbarWrapper: {
        borderRadius: '50px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '0.5rem 1rem',
        backgroundColor: 'white',
        transition: 'all 0.3s ease-in-out',
    },
    primaryColor: '#00bcd4', // Color principal turquesa (para el botón)
    navLinkColor: '#00bcd4', // Color celeste/turquesa para los enlaces
    // Estilo para aplicar MAYÚSCULAS y asegurar el color
    navLinkStyle: {
        color: '#00bcd4',
        textTransform: 'uppercase', // Hace las letras MAYÚSCULAS
        fontSize: '1rem', // Usamos 1rem para que sea equivalente a fs-5
    },
};

function MyNavbar() {
    const { isAuthenticated } = useAuth(); 
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navbarClasses = `py-3 ${scrolled ? "mt-0" : "mt-4"}`;
    
    return (
        <Navbar 
            expand="lg" 
            fixed="top" 
            className={navbarClasses} 
            expanded={expanded} 
            onToggle={() => setExpanded(!expanded)}
            style={customStyles.navbarContainer}
        >
            <Container fluid style={customStyles.navbarWrapper} className="mx-auto"> 
                
                {/* Logo y Marca: Se mantiene color oscuro para contraste con el fondo blanco */}
                <Navbar.Brand className='d-flex align-items-center fs-5 fw-bold' as={Link} to="/Inicio" onClick={() => setExpanded(false)} style={{color: '#343a40'}}>
                    <img
                        src={Logo}
                        alt="Logo"
                        width="35"
                        height="35"
                        className="d-inline-block align-top me-2"
                    />
                    RUTAS PRIME
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Enlaces y Dropdowns */}
                    <Nav className="ms-auto me-3 align-items-lg-center">
                        
                        {/* Dropdown Viajes */}
                        <NavDropdown 
                            title={<span style={customStyles.navLinkStyle}>Viajes</span>} // MAYÚSCULAS y Celeste
                            className='fw-bold mx-2' // fs-5 se reemplaza por estilo en línea
                            id="nav-viajes" 
                            menuVariant="light"
                        >
                            <NavDropdown.Item as={Link} to="/Viajes1" onClick={() => setExpanded(false)}>Rutas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Viajes2" onClick={() => setExpanded(false)}>Ciudades</NavDropdown.Item>
                        </NavDropdown>
                        
                        {/* Dropdown Socios */}
                        <NavDropdown 
                            title={<span style={customStyles.navLinkStyle}>Socios</span>} // MAYÚSCULAS y Celeste
                            id="nav-socios" 
                            className='fw-bold mx-2' // fs-5 se reemplaza por estilo en línea
                            menuVariant="light"
                        >
                            <NavDropdown.Item as={Link} to="/Socios1" onClick={() => setExpanded(false)}>¿Cómo me puedo registrar?</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Socios2" onClick={() => setExpanded(false)}>Requisitos para conductores</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Socios3" onClick={() => setExpanded(false)}>Soporte</NavDropdown.Item>
                        </NavDropdown>
                        
                        {/* Enlaces directos */}
                        <Nav.Link as={Link} to="/Contactanos" className='fw-bold mx-2' onClick={() => setExpanded(false)} style={customStyles.navLinkStyle}>Contáctanos</Nav.Link> {/* MAYÚSCULAS y Celeste */}
                        <Nav.Link as={Link} to="/AcercaDe" className='fw-bold mx-2' onClick={() => setExpanded(false)} style={customStyles.navLinkStyle}>Acerca De</Nav.Link> {/* MAYÚSCULAS y Celeste */}
                        <Nav.Link as={Link} to="/PreguntasFrec" className='fw-bold mx-2' onClick={() => setExpanded(false)} style={customStyles.navLinkStyle}>Preguntas Frecuentes</Nav.Link> {/* MAYÚSCULAS y Celeste */}

                        {/* Ícono de Usuario (color del borde celeste) */}
                        <Nav.Link
                            as={Link}
                            to={isAuthenticated ? "/profile" : "/login"} 
                            onClick={() => setExpanded(false)}
                            className="d-flex align-items-center mx-2"
                        >

                        </Nav.Link>

                        {/* Botón de Acción Principal (fondo celeste, texto blanco y MAYÚSCULAS) */}
                        <Nav.Link>
                            <Link
                                to="/clientes/login"
                                onClick={() => setExpanded(false)}
                                className="btn text-white px-4 py-2 fw-bold"
                                style={{ 
                                    backgroundColor: customStyles.primaryColor, 
                                    borderColor: customStyles.primaryColor,
                                    borderRadius: '25px', 
                                    transition: 'background-color 0.3s',
                                    textTransform: 'uppercase' // MAYÚSCULAS para el botón
                                }}
                            >
                                Solicitar Servicio
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;