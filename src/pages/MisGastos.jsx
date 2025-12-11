import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Table, Badge, Button } from "react-bootstrap"
import HeroSection from "../components/HeroSection"
import { obtenerViajesCliente, obtenerEstadisticasCliente } from "../services/storageService"
import FondoAuth from "../assets/FondosAuth.jpg"

function Gastos() {
  const [viajes, setViajes] = useState([])
  const [estadisticas, setEstadisticas] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const viajesData = obtenerViajesCliente()
    const statsData = obtenerEstadisticasCliente()
    setViajes(viajesData)
    setEstadisticas(statsData)
  }, [])

  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <HeroSection
        title="Mis Gastos"
        subtitle="Historial completo de tus viajes"
        description="Revisa todos tus viajes realizados, gastos totales y estadísticas detalladas"
        background={FondoAuth}
        height="60vh"
        align="center"
        backgroundPosition="center top"
      />

      <section className="py-5" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
        <div className="container">
          <Button variant="outline-light" className="mb-4" onClick={() => navigate("/profile")}>
            ← Volver al Perfil
          </Button>

          {estadisticas && (
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <Card className="text-center shadow-lg border-0" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                  <Card.Body className="text-white">
                    <h5 className="mb-2">Total de Viajes</h5>
                    <h2 className="fw-bold display-4">{estadisticas.totalViajes}</h2>
                    <p className="mb-0">viajes realizados</p>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-4">
                <Card className="text-center shadow-lg border-0" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
                  <Card.Body className="text-white">
                    <h5 className="mb-2">Gasto Total</h5>
                    <h2 className="fw-bold display-4">S/ {estadisticas.gastoTotal.toFixed(2)}</h2>
                    <p className="mb-0">invertidos en viajes</p>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-4">
                <Card className="text-center shadow-lg border-0" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
                  <Card.Body className="text-white">
                    <h5 className="mb-2">Distancia Total</h5>
                    <h2 className="fw-bold display-4">{estadisticas.distanciaTotal.toFixed(1)}</h2>
                    <p className="mb-0">kilómetros recorridos</p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}

          <Card className="shadow-lg border-0">
            <Card.Header className="bg-dark text-white">
              <h4 className="mb-0 py-2">
                <i className="bi bi-receipt me-2"></i>
                Historial de Gastos
              </h4>
            </Card.Header>
            <Card.Body className="p-0">
              {viajes.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox display-1 text-muted"></i>
                  <h5 className="mt-3 text-muted">No tienes viajes registrados</h5>
                  <p className="text-muted">Tus viajes aparecerán aquí una vez que realices tu primer pedido</p>
                  <Button variant="primary" className="mt-3" onClick={() => navigate("/clienteUI")}>
                    Solicitar un Viaje
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Fecha</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Tipo</th>
                        <th>Distancia</th>
                        <th>Gasto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viajes.map((viaje) => (
                        <tr key={viaje.id}>
                          <td>
                            <small className="text-muted">{formatearFecha(viaje.fecha)}</small>
                          </td>
                          <td>
                            <div style={{ maxWidth: "200px" }}>
                              <small>{viaje.origen.substring(0, 50)}...</small>
                            </div>
                          </td>
                          <td>
                            <div style={{ maxWidth: "200px" }}>
                              <small>{viaje.destino.substring(0, 50)}...</small>
                            </div>
                          </td>
                          <td>
                            <Badge bg="info" text="dark">{viaje.tipo}</Badge>
                          </td>
                          <td>
                            <strong>{viaje.distancia}</strong> km
                          </td>
                          <td>
                            <strong className="text-danger">S/ {viaje.gasto.toFixed(2)}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>

          {viajes.length > 0 && (
            <div className="mt-4 text-center">
              <Card className="bg-dark text-white border-0 shadow">
                <Card.Body>
                  <div className="row">
                    <div className="col-md-4">
                      <h6 className="text-muted mb-2">Promedio por Viaje</h6>
                      <h4 className="fw-bold">S/ {(estadisticas.gastoTotal / estadisticas.totalViajes).toFixed(2)}</h4>
                    </div>
                    <div className="col-md-4">
                      <h6 className="text-muted mb-2">Distancia Promedio</h6>
                      <h4 className="fw-bold">{(estadisticas.distanciaTotal / estadisticas.totalViajes).toFixed(2)} km</h4>
                    </div>
                    <div className="col-md-4">
                      <h6 className="text-muted mb-2">Último Viaje</h6>
                      <h6 className="fw-bold">
                        {estadisticas.ultimoViaje
                          ? new Date(estadisticas.ultimoViaje).toLocaleDateString("es-PE")
                          : "N/A"}
                      </h6>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Gastos