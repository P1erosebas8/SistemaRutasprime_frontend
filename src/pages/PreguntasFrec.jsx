import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import HeroSection from "../components/HeroSection";
import PregFrecImg from "../assets/PregFrec.png";

function PreguntasFrec() {
    return (
        <>
            <HeroSection
                title="Preguntas Frecuentes"
                subtitle="¿Tienes alguna pregunta? A continuación, consulta la sección de preguntas frecuentes"
                background={PregFrecImg}
                height="80vh"
                align="right"
                backgroundPosition="center"
            />
            <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
                <div className="container">
                    <h2 className="text-white mb-4">Conductores</h2>
                    <Accordion defaultActiveKey={null} className="custom-accordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                ¿Cómo puedo registrarme como conductor en Rutas Prime?
                            </Accordion.Header>
                            <Accordion.Body>
                                Debes crear una cuenta en la app, subir tus documentos y esperar la validación de nuestro equipo.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                ¿Qué requisitos necesito para conducir vehículos de carga pesada?
                            </Accordion.Header>
                            <Accordion.Body>
                                Licencia de conducir vigente para transporte de carga y los documentos del vehículo en regla.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                ¿Cómo recibo las solicitudes de transporte de carga?
                            </Accordion.Header>
                            <Accordion.Body>
                                A través de la aplicación móvil, donde podrás aceptar o rechazar viajes.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                ¿Cómo recibo mis pagos y con qué frecuencia?
                            </Accordion.Header>
                            <Accordion.Body>
                                Los pagos se realizan de manera semanal a la cuenta bancaria registrada.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                ¿Qué documentos debo mantener actualizados para seguir operando?
                            </Accordion.Header>
                            <Accordion.Body>
                                Licencia de conducir, SOAT, revisión técnica y tarjeta de propiedad.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </section>

            <section className="py-3" style={{ backgroundColor: "#2C2C2C" }}>
                <div className="container">
                    <h2 className="text-white mb-4">Clientes</h2>
                    <Accordion defaultActiveKey={null} className="custom-accordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                ¿Cómo puedo registrarme en Rutas Prime?
                            </Accordion.Header>
                            <Accordion.Body>
                                Descarga la app, crea tu cuenta y comienza a solicitar envíos de carga.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                ¿Qué tipo de carga puedo enviar mediante la plataforma?
                            </Accordion.Header>
                            <Accordion.Body>
                                Cargas medianas y pesadas que puedan transportarse en camiones.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                ¿Cómo hago para solicitar un transporte de carga?
                            </Accordion.Header>
                            <Accordion.Body>
                                Solo debes ingresar origen, destino y tipo de carga en la aplicación.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                ¿Qué pasa si mi carga llega tarde o se pierde?
                            </Accordion.Header>
                            <Accordion.Body>
                                Puedes reportarlo en la app y nuestro equipo dará solución inmediata.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                ¿Rutas Prime ofrece seguro para la carga transportada?
                            </Accordion.Header>
                            <Accordion.Body>
                                Sí, todas las cargas viajan con cobertura básica y puedes solicitar seguros adicionales.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </section>

            <section className="py-3" style={{ backgroundColor: "#2C2C2C" }}>
                <div className="container">
                    <h2 className="text-white mb-4">Pagos</h2>
                    <Accordion defaultActiveKey={null} className="custom-accordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                ¿Qué métodos de pago acepta Rutas Prime?
                            </Accordion.Header>
                            <Accordion.Body>
                                Tarjeta de débito, crédito y billeteras digitales.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                ¿Cuánto tiempo tarda en procesarse un pago?
                            </Accordion.Header>
                            <Accordion.Body>
                                Generalmente en minutos, pero puede tomar hasta 24 horas.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                ¿Puedo pagar en efectivo o solo con tarjeta/billetera digital?
                            </Accordion.Header>
                            <Accordion.Body>
                                Actualmente solo aceptamos pagos digitales para mayor seguridad.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                ¿Qué pasa si hay un error en el cobro?
                            </Accordion.Header>
                            <Accordion.Body>
                                Puedes reportarlo en la app y el área de soporte revisará tu caso.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                ¿Cómo cambio mi método de pago en la aplicación?
                            </Accordion.Header>
                            <Accordion.Body>
                                En tu perfil, en la sección de métodos de pago, puedes actualizar la información.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </section>

            <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
                <div className="container">
                    <h2 className="text-white mb-4">Problemas con la aplicación</h2>
                    <Accordion defaultActiveKey={null} className="custom-accordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                ¿Por qué mi aplicación se bloquea con frecuencia o tarda mucho en cargar?
                            </Accordion.Header>
                            <Accordion.Body>
                                Asegúrate de tener la última versión de la app y buena conexión a internet.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                ¿Por qué no puedo iniciar sesión en la plataforma?
                            </Accordion.Header>
                            <Accordion.Body>
                                Verifica tu usuario, contraseña y conexión a internet.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                ¿Cómo recupero mi contraseña?
                            </Accordion.Header>
                            <Accordion.Body>
                                Usa la opción “Olvidé mi contraseña” y sigue los pasos en tu correo.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                ¿Cómo reporto errores o problemas técnicos en la plataforma?
                            </Accordion.Header>
                            <Accordion.Body>
                                Desde la sección de Ayuda en la app o escribiendo a soporte técnico.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </section>
        </>
    );
}

export default PreguntasFrec;