import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import HeroSection from "../components/HeroSection";

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
            <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
                <div className="container">
                    <h2 className="text-white mb-4">Conductores</h2>
                    <Accordion defaultActiveKey={null} className="custom-accordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                ¿Cómo puedo registrarme como conductor en Rutas Prime?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sint maxime libero incidunt quod tenetur aliquam repellat. Magnam molestiae, eligendi at rem perspiciatis cumque molestias suscipit, accusantium, non rerum nam?
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                ¿Qué requisitos necesito para conducir vehículos de carga pesada?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ab placeat excepturi, veritatis, blanditiis nostrum illo alias praesentium temporibus ut vel ullam nesciunt eius necessitatibus officiis perferendis. Quae, hic optio.                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                ¿Cómo recibo las solicitudes de transporte de carga?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque non enim, deleniti quas, explicabo cum doloribus distinctio, voluptas voluptate iure eligendi. Ipsam beatae veritatis, illo officia in facere reprehenderit dolorum.                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                ¿Cómo recibo mis pagos y con qué frecuencia?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus id fugiat, consequuntur ea sint enim officia laudantium excepturi pariatur consectetur ratione, voluptatibus dolor adipisci nostrum doloremque a dignissimos iure expedita.                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                ¿Qué documentos debo mantener actualizados para seguir operando?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus eum sit beatae odio. Eum repellat dicta fugit error accusamus dignissimos similique quis, aliquid perspiciatis debitis. Beatae amet debitis aspernatur fugiat.
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
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia non quibusdam asperiores accusantium ut vel illo? Animi, molestias perspiciatis assumenda deleniti, aliquid natus ullam similique rem fugiat saepe excepturi quaerat.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                ¿Qué tipo de carga puedo enviar mediante la plataforma?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque veritatis iusto, perferendis facilis magnam tempore quaerat. Id cupiditate, repudiandae nesciunt doloribus quia quisquam pariatur voluptate, neque beatae quae rem veritatis.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                ¿Cómo hago para solicitar un transporte de carga?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error veritatis optio enim nostrum, libero provident voluptatibus iure fuga corrupti beatae vel, minus minima adipisci voluptatum deserunt quam repellat rem non.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                ¿Qué pasa si mi carga llega tarde o se pierde?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, similique. Sit mollitia vero aliquid. Facilis ea itaque beatae ipsa soluta iure animi, hic dolorem corporis explicabo eveniet nam ab assumenda.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                ¿Rutas Prime ofrece seguro para la carga transportada?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos adipisci, provident porro doloremque repellendus nihil quos harum consectetur iusto enim reprehenderit repellat quibusdam aspernatur, assumenda ipsam. Autem dolores facere dolorem?
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
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sint voluptate voluptatibus consequuntur, atque nobis itaque! Dolores quibusdam deleniti, ad quo laudantium ducimus aspernatur vero iusto minima distinctio quae quas!
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                ¿Cuánto tiempo tarda en procesarse un pago?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non excepturi ut tempora veniam voluptas commodi deleniti quidem? Accusamus magni dicta odio rerum. Facere eum provident est sint excepturi voluptatem veritatis.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                ¿Puedo pagar en efectivo o solo con tarjeta/billetera digital?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id maxime consequuntur modi illo ipsam quasi voluptas error quia reiciendis exercitationem temporibus, labore neque illum, dolore similique nemo voluptatem ut rem!
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                ¿Qué pasa si hay un error en el cobro?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione quae, distinctio numquam excepturi cum labore aspernatur saepe deserunt alias expedita at? Obcaecati minima minus iste totam delectus suscipit ad atque!
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                ¿Cómo cambio mi método de pago en la aplicación?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quia ullam atque. Ab assumenda explicabo perferendis totam eius nemo exercitationem, dolore consequuntur iusto numquam maxime omnis itaque nostrum quia distinctio.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </section>
            <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
                <div className="container">
                    <h2 className="text-white mb-4">Problemas con la aplicacion</h2>
                    <Accordion defaultActiveKey={null} className="custom-accordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                ¿Por qué mi aplicación se bloquea con frecuencia o tarda mucho en cargar?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quae est consequatur quidem, exercitationem similique ipsum id! Dolor dolorem, libero animi neque debitis, ipsam, id sint ex magnam unde qui.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                ¿Por qué no puedo iniciar sesión en la plataforma?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore aperiam dolor possimus modi consectetur, consequuntur voluptates fugiat mollitia laudantium dicta eligendi ratione qui fugit dolore omnis nihil officiis! Dolorem, praesentium?
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                ¿Cómo recupero mi contraseña?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit accusamus a dolor, illum odio inventore qui? Dolore at, odio amet ratione maiores veritatis molestias suscipit odit eum sed tempore cum?
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                ¿Cómo reporto errores o problemas técnicos en la plataforma?
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod illum culpa consequuntur aliquid porro. Temporibus explicabo suscipit dicta odio exercitationem doloribus perspiciatis. Obcaecati, accusamus repellendus commodi molestiae nisi vel? Ipsum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </section>
        </>
    );
}

export default PreguntasFrec;