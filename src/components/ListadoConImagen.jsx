import { Container, Row, Col } from "react-bootstrap";

function ListaConImagen({ features, image, imageAlt = "", imagePosition = "right", title="" }) {
  return (
    <section className="py-5" style={{ backgroundColor: "#2C2C2C" }}>
      <Container>
        <Row className="align-items-center text-white flex-md-row">
          {image && imagePosition === "left" && (
            <Col md={6}>
              <img src={image} alt={imageAlt} className="img-fluid rounded" />
            </Col>
          )}

          {/* Features */}
          <Col md={6}>
          <h1 className="white">{title}</h1>
          <br />
            <ul className="list-unstyled text-start">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="d-flex align-items-start mb-2"
                >
                  <i
                    className={`bi ${feature.icon} text-success me-2`}
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </Col>
          {image && imagePosition === "right" && (
            <Col md={6}>
              <img src={image} alt={imageAlt} className="img-fluid rounded" />
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default ListaConImagen;
