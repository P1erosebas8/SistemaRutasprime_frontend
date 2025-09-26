import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SeccionConImagen = ({
  title,
  text,
  image,
  imageAlt,
  imagePosition = "left",
  bgColor = "#ffffff",
  textColor = "#000000",
}) => {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <section className="py-5" style={{ backgroundColor: bgColor }}>
      <Container>
        <Row
          className={`align-items-center text-${textColor} ${
            imagePosition === "right" ? "flex-md-row-reverse" : ""
          }`}
        >
          <Col md={6}>
            <img src={image} alt={imageAlt} className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            <h1 style={{ color: textColor }}>{title}</h1>
            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ color: textColor }}>
                {p}
              </p>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionConImagen;
