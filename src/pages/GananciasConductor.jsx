import { useEffect, useState } from "react";
//import api from "../services/api"; Esto mejor en hooks no?
import { Table, Card, Button } from "react-bootstrap";

function Ganancias() {
  const [viajes, setViajes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const viajesPorPagina = 10;

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await api.get("/conductor/historial"); // El endpoint o capaz crearlo en hooks
        setViajes(res.data);
      } catch (error) {
        console.error("Error al obtener viajes:", error);
      }
    };

    fetchHistorial();
  }, []);

  const gananciasTotales = viajes.reduce((acc, v) => acc + v.costo, 0);

  const indexFinal = paginaActual * viajesPorPagina;
  const indexInicio = indexFinal - viajesPorPagina;
  const viajesPagina = viajes.slice(indexInicio, indexFinal);
  const totalPaginas = Math.ceil(viajes.length / viajesPorPagina);

  const formatearFecha = (iso) =>
    new Date(iso).toLocaleString("es-PE", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <section style={{ paddingTop: "110px", minHeight: "100vh", background: "#141414" }}>
      <div className="container pb-5 text-white">

        <h1 className="text-start mb-5">Panel de Ganancias</h1>

        <div className="row g-4">

          <div className="col-lg-8">
            <Card className="shadow bg-light text-dark">
              <Card.Header className="fw-bold fs-5">Historial de Viajes</Card.Header>
              <Card.Body>
                <Table bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>Fecha y Hora</th>
                      <th>Cliente</th>
                      <th>Origen</th>
                      <th>Destino</th>
                      <th>Movilidad</th>
                      <th>Costo (S/.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viajesPagina.map((v) => (
                      <tr key={v.id}>
                        <td>{formatearFecha(v.fechaHora)}</td>
                        <td>{v.clienteNombre}</td>
                        <td>{v.origen}</td>
                        <td>{v.destino}</td>
                        <td>{v.tipoMovilidad}</td>
                        <td>S/ {v.costo.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    disabled={paginaActual === 1}
                    onClick={() => setPaginaActual(paginaActual - 1)}
                  >
                    Anterior
                  </Button>

                  <span className="fw-bold">
                    Página {paginaActual} de {totalPaginas}
                  </span>

                  <Button
                    variant="secondary"
                    disabled={paginaActual === totalPaginas}
                    onClick={() => setPaginaActual(paginaActual + 1)}
                  >
                    Siguiente
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-4">
            <Card className="shadow bg-success text-white text-center p-4">
              <h4 className="fw-bold mb-2">Ganancias Totales</h4>
              <h1 className="display-4 fw-bold">S/ {gananciasTotales.toFixed(2)}</h1>
              <p>Basado en viajes completados</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ganancias;
