import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card"; 
import { FaQuestionCircle, FaTruck, FaMoneyBillWave, FaBug, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Usaremos react-icons
import HeroSection from "../components/HeroSection";
import React, { useState } from 'react';


// Colores y estilos base
const colorFondoPrincipal = "white";
const colorCelesteAcento = "#64B5F6"; // Celeste medio vibrante
const colorTextoPrincipal = "#333333"; // Gris oscuro para texto
const colorGrisClaro = "#f8f9fa"; // Gris muy claro para fondos sutiles


// Componente para el encabezado del acordeón con iconos y estilos dinámicos
function CustomAccordionToggle({ children, eventKey, categoryIcon }) {
    // Hook de React-Bootstrap para manejar el clic del acordeón
    const decoratedOnClick = useAccordionButton(eventKey);
    // Estado local para saber si está abierto o cerrado (se usará para el color)
    const [isOpen, setIsOpen] = useState(false);

    // Usa un efecto para detectar el estado actual de apertura, 
    // aunque un componente externo controlará el estado real del acordeón
    const handleClick = () => {
        setIsOpen(!isOpen);
        decoratedOnClick();
    };

    // Estilos dinámicos y hover con CSS transition (Bootstrap lo maneja por defecto)
    const buttonStyle = {
        backgroundColor: isOpen ? colorCelesteAcento : colorFondoPrincipal, 
        color: isOpen ? "white" : colorTextoPrincipal,
        border: `1px solid ${colorCelesteAcento}`,
        borderRadius: "8px",
        padding: "15px 20px",
        width: "100%",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: "1.1em",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out", // Transición para el cambio de color
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
        // Eliminamos whileHover y whileTap de framer-motion
    };

    // La rotación del icono ahora es solo un estilo estático que se define con CSS
    const iconStyle = {
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease-in-out',
    };
    
    // NOTA: Para un efecto de hover más profesional sin framer-motion, 
    // se recomienda usar una clase CSS externa o Sass/Styled-Components.
    // Aquí usamos el colorCelesteAcento para que se note el cambio al hacer clic.

    return (
        <button
            onClick={handleClick}
            style={buttonStyle}
            // Agregamos clases para manejar el hover de manera nativa (si el CSS lo permite)
            className="border-0 shadow-sm" 
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                {categoryIcon && <span style={{ marginRight: "10px", fontSize: "1.3em" }}>{categoryIcon}</span>}
                {children}
            </div>
            <span style={iconStyle}>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
        </button>
    );
}

// Componente para el cuerpo del acordeón (sin animación de framer-motion, usando la de Bootstrap)
const AccordionBodyContent = ({ children, eventKey }) => {
    return (
        <Accordion.Collapse eventKey={eventKey}>
            <div
                style={{ 
                    backgroundColor: colorGrisClaro, // Fondo muy claro para el cuerpo
                    color: colorTextoPrincipal,
                    padding: "20px",
                    borderRadius: "0 0 8px 8px",
                    border: `1px solid ${colorCelesteAcento}`,
                    borderTop: "none",
                    marginTop: "-1px" 
                }}
            >
                {children}
            </div>
        </Accordion.Collapse>
    );
};


function PreguntasFrec() {
    return (
        <>
            <HeroSection
                title="Preguntas Frecuentes"
                subtitle="¿Tienes alguna pregunta? A continuación, consulta la sección de preguntas frecuentes"
                background="src/assets/PregFrec.png"
                height="80vh"
                align="right"
                backgroundPosition="center"
            />
            
            <section className="py-5" style={{ backgroundColor: colorFondoPrincipal }}>
                <div className="container">
                    <h2 className="text-center mb-5" style={{ color: colorTextoPrincipal, fontSize: "2.5em", fontWeight: "bold" }}>
                        <FaTruck style={{ marginRight: "15px", color: colorCelesteAcento }} />
                        Preguntas para Conductores
                    </h2>
                    <Accordion defaultActiveKey={null}>
                        {[
                            { q: "¿Cómo puedo registrarme como conductor en Rutas Prime?", a: "Debes crear una cuenta en la app, subir tus documentos y esperar la validación de nuestro equipo." },
                            { q: "¿Qué requisitos necesito para conducir vehículos de carga pesada?", a: "Licencia de conducir vigente para transporte de carga y los documentos del vehículo en regla." },
                            { q: "¿Cómo recibo las solicitudes de transporte de carga?", a: "A través de la aplicación móvil, donde podrás aceptar o rechazar viajes." },
                            { q: "¿Cómo recibo mis pagos y con qué frecuencia?", a: "Los pagos se realizan de manera semanal a la cuenta bancaria registrada." },
                            { q: "¿Qué documentos debo mantener actualizados para seguir operando?", a: "Licencia de conducir, SOAT, revisión técnica y tarjeta de propiedad." },
                        ].map((item, index) => (
                            <Card key={index} className="mb-3 border-0 rounded-lg shadow-sm">
                                <Card.Header className="p-0 border-0">
                                    <CustomAccordionToggle eventKey={String(index)} categoryIcon={<FaQuestionCircle style={{ color: colorCelesteAcento }} />}>
                                        {item.q}
                                    </CustomAccordionToggle>
                                </Card.Header>
                                {/* Usamos el componente sin framer-motion */}
                                <AccordionBodyContent eventKey={String(index)}>
                                    {item.a}
                                </AccordionBodyContent>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </section>
            
            <section className="py-5" style={{ backgroundColor: colorFondoPrincipal }}>
                <div className="container">
                    <h2 className="text-center mb-5" style={{ color: colorTextoPrincipal, fontSize: "2.5em", fontWeight: "bold" }}>
                        <FaQuestionCircle style={{ marginRight: "15px", color: colorCelesteAcento }} />
                        Preguntas para Clientes
                    </h2>
                    <Accordion defaultActiveKey={null}>
                        {[
                            { q: "¿Cómo puedo registrarme en Rutas Prime?", a: "Descarga la app, crea tu cuenta y comienza a solicitar envíos de carga." },
                            { q: "¿Qué tipo de carga puedo enviar mediante la plataforma?", a: "Cargas medianas y pesadas que puedan transportarse en camiones." },
                            { q: "¿Cómo hago para solicitar un transporte de carga?", a: "Solo debes ingresar origen, destino y tipo de carga en la aplicación." },
                            { q: "¿Qué pasa si mi carga llega tarde o se pierde?", a: "Puedes reportarlo en la app y nuestro equipo dará solución inmediata." },
                            { q: "¿Rutas Prime ofrece seguro para la carga transportada?", a: "Sí, todas las cargas viajan con cobertura básica y puedes solicitar seguros adicionales." },
                        ].map((item, index) => (
                            <Card key={index} className="mb-3 border-0 rounded-lg shadow-sm">
                                <Card.Header className="p-0 border-0">
                                    <CustomAccordionToggle eventKey={String(index)} categoryIcon={<FaQuestionCircle style={{ color: colorCelesteAcento }} />}>
                                        {item.q}
                                    </CustomAccordionToggle>
                                </Card.Header>
                                <AccordionBodyContent eventKey={String(index)}>
                                    {item.a}
                                </AccordionBodyContent>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </section>
            
            <section className="py-5" style={{ backgroundColor: colorFondoPrincipal }}>
                <div className="container">
                    <h2 className="text-center mb-5" style={{ color: colorTextoPrincipal, fontSize: "2.5em", fontWeight: "bold" }}>
                        <FaMoneyBillWave style={{ marginRight: "15px", color: colorCelesteAcento }} />
                        Preguntas sobre Pagos
                    </h2>
                    <Accordion defaultActiveKey={null}>
                        {[
                            { q: "¿Qué métodos de pago acepta Rutas Prime?", a: "Tarjeta de débito, crédito y billeteras digitales." },
                            { q: "¿Cuánto tiempo tarda en procesarse un pago?", a: "Generalmente en minutos, pero puede tomar hasta 24 horas." },
                            { q: "¿Puedo pagar en efectivo o solo con tarjeta/billetera digital?", a: "Actualmente solo aceptamos pagos digitales para mayor seguridad." },
                            { q: "¿Qué pasa si hay un error en el cobro?", a: "Puedes reportarlo en la app y el área de soporte revisará tu caso." },
                            { q: "¿Cómo cambio mi método de pago en la aplicación?", a: "En tu perfil, en la sección de métodos de pago, puedes actualizar la información." },
                        ].map((item, index) => (
                            <Card key={index} className="mb-3 border-0 rounded-lg shadow-sm">
                                <Card.Header className="p-0 border-0">
                                    <CustomAccordionToggle eventKey={String(index)} categoryIcon={<FaQuestionCircle style={{ color: colorCelesteAcento }} />}>
                                        {item.q}
                                    </CustomAccordionToggle>
                                </Card.Header>
                                <AccordionBodyContent eventKey={String(index)}>
                                    {item.a}
                                </AccordionBodyContent>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </section>
            
            <section className="py-5" style={{ backgroundColor: colorFondoPrincipal }}>
                <div className="container">
                    <h2 className="text-center mb-5" style={{ color: colorTextoPrincipal, fontSize: "2.5em", fontWeight: "bold" }}>
                        <FaBug style={{ marginRight: "15px", color: colorCelesteAcento }} />
                        Problemas con la Aplicación
                    </h2>
                    <Accordion defaultActiveKey={null}>
                        {[
                            { q: "¿Por qué mi aplicación se bloquea con frecuencia o tarda mucho en cargar?", a: "Asegúrate de tener la última versión de la app y buena conexión a internet." },
                            { q: "¿Por qué no puedo iniciar sesión en la plataforma?", a: "Verifica tu usuario, contraseña y conexión a internet." },
                            { q: "¿Cómo recupero mi contraseña?", a: "Usa la opción “Olvidé mi contraseña” y sigue los pasos en tu correo." },
                            { q: "¿Cómo reporto errores o problemas técnicos en la plataforma?", a: "Desde la sección de “Ayuda” en la app o escribiendo a soporte técnico." },
                        ].map((item, index) => (
                            <Card key={index} className="mb-3 border-0 rounded-lg shadow-sm">
                                <Card.Header className="p-0 border-0">
                                    <CustomAccordionToggle eventKey={String(index)} categoryIcon={<FaQuestionCircle style={{ color: colorCelesteAcento }} />}>
                                        {item.q}
                                    </CustomAccordionToggle>
                                </Card.Header>
                                <AccordionBodyContent eventKey={String(index)}>
                                    {item.a}
                                </AccordionBodyContent>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </section>
        </>
    );
}

export default PreguntasFrec;