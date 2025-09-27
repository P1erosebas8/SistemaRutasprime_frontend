import { Card, Button } from "react-bootstrap";

export default function RequisitoCard({ titulo, descripcion, imagen }) {
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
        <Button variant="dark" className="w-100">
          Subir documento
        </Button>
      </Card.Body>
    </Card>
  );
}
