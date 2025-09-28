import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CardDescrip({ titulo, descripcion, imagen, botonLink }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imagen}
        alt={titulo}
        className="p-3"
      />
      <Card.Body>
        <Card.Title className="fw-bold">{titulo}</Card.Title>
        <Card.Text className="text-muted">{descripcion}</Card.Text>
        
        {botonLink && (
          botonLink?.startsWith("http") ? (
            <a
              href={botonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark w-100"
            >
              Más información
            </a>
          ) : (
            <Link to={botonLink} className="btn btn-dark w-100">
              Más información
            </Link>
          )
        )}
      </Card.Body>
    </Card>
  );
}
