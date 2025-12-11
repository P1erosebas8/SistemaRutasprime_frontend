import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Badge, Button, ProgressBar } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
import { obtenerViajesConductor, obtenerEstadisticasConductor } from "../services/storageService";
import FondoAuth from "../assets/FondosAuth.jpg";

function Ganancias() {
  const [viajes, setViajes] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const viajesData = obtenerViajesConductor();
    const statsData = obtenerEstadisticasConductor();
    
    setViajes(viajesData);
    setEstadisticas(statsData);
  }, []);

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const metaMensual = 5000;
  const progresoMeta = estadisticas ? (estadisticas.gananciaTotal / metaMensual) * 100 : 0;

  return (
    <>
      <HeroSection
        title="Mis Ganancias"
        subtitle="Panel de control de ingresos"
        description="Revisa tus ganancias, viajes completados y estadísticas de rendimiento"
        background={FondoAuth}
        height="60vh"
        align="center"
        backgroundPosition="center top"
      />

      <section className="py-5" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
        <div className="container">
          <Button 
            variant="outline-light" 
            className="mb-4"
            onClick={() => navigate("/profile")}
          >
            ← Volver al Perfil
          </Button>

          {estadisticas && (
            <>
              <div className="row g-4 mb-5">
                <div className="col-md-3">
                  <Card className="text-center shadow-lg border-0" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                    <Card.Body className="text-white">
                      <h6 className="mb-2">Total de Viajes</h6>
                      <h2 className="fw-bold display-4">{estadisticas.totalViajes}</h2>
                      <p className="mb-0 small">viajes completados</p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-3">
                  <Card className="text-center shadow-lg border-0" style={{ background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" }}>
                    <Card.Body className="text-white">
                      <h6 className="mb-2">Ganancia Total</h6>
                      <h2 className="fw-bold display-4">S/ {estadisticas.gananciaTotal.toFixed(2)}</h2>
                      <p className="mb-0 small">acumulado</p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-3">
                  <Card className="text-center shadow-lg border-0" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
                    <Card.Body className="text-white">
                      <h6 className="mb-2">Distancia Total</h6>
                      <h2 className="fw-bold display-4">{estadisticas.distanciaTotal.toFixed(1)}</h2>
                      <p className="mb-0 small">kilómetros</p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-3">
                  <Card className="text-center shadow-lg border-0" style={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}>
                    <Card.Body className="text-white">
                      <h6 className="mb-2">Promedio/Viaje</h6>
                      <h2 className="fw-bold display-4">
                        S/ {estadisticas.totalViajes > 0 ? 
                          (estadisticas.gananciaTotal / estadisticas.totalViajes).toFixed(2) : 
                          '0.00'
                        }
                      </h2>
                      <p className="mb-0 small">por servicio</p>
                    </Card.Body>
                  </Card>
                </div>
              </div>

              <Card className="shadow-lg border-0 mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Meta Mensual</h5>
                    <Badge bg={progresoMeta >= 100 ? "success" : "primary"} className="fs-6">
                      {progresoMeta.toFixed(1)}%
                    </Badge>
                  </div>
                  <ProgressBar 
                    now={progresoMeta > 100 ? 100 : progresoMeta} 
                    variant={progresoMeta >= 100 ? "success" : "info"}
                    style={{ height: '30px' }}
                    label={`S/ ${estadisticas.gananciaTotal.toFixed(2)} / S/ ${metaMensual}`}
                  />
                  <small className="text-muted mt-2 d-block">
                    {progresoMeta >= 100 ? 
                      '¡Felicidades! Has superado tu meta mensual' : 
                      `Te faltan S/ ${(metaMensual - estadisticas.gananciaTotal).toFixed(2)} para alcanzar tu meta`
                    }
                  </small>
                </Card.Body>
              </Card>
            </>
          )}

          <Card className="shadow-lg border-0">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0 py-2">
                <i className="bi bi-cash-stack me-2"></i>
                Historial de Ganancias
              </h4>
            </Card.Header>
            <Card.Body className="p-0">
              {viajes.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-clipboard-data display-1 text-muted"></i>
                  <h5 className="mt-3 text-muted">No tienes viajes registrados</h5>
                  <p className="text-muted">Tus ganancias aparecerán aquí una vez completes tu primer viaje</p>
                  <Button 
                    variant="success" 
                    className="mt-3"
                    onClick={() => navigate("/conductorUI")}
                  >
                    Buscar Viajes
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Ruta</th>
                        <th>Tipo</th>
                        <th>Distancia</th>
                        <th>Precio Total</th>
                        <th>Ganancia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viajes.map((viaje) => (
                        <tr key={viaje.id}>
                          <td>
                            <small className="text-muted">
                              {formatearFecha(viaje.fecha)}
                            </small>
                          </td>
                          <td>
                            <strong>{viaje.cliente}</strong>
                          </td>
                          <td>
                            <div style={{ maxWidth: '250px' }}>
                              <small className="text-muted">
                                <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                                {viaje.origen.substring(0, 30)}...
                              </small>
                              <br />
                              <small className="text-muted">
                                <i className="bi bi-geo-fill text-danger me-1"></i>
                                {viaje.destino.substring(0, 30)}...
                              </small>
                            </div>
                          </td>
                          <td>
                            <Badge bg="info" text="dark">{viaje.tipo}</Badge>
                          </td>
                          <td>
                            <strong>{viaje.distancia}</strong> km
                          </td>
                          <td>
                            <span className="text-muted">
                              S/ {viaje.precioTotal.toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <strong className="text-success">
                              S/ {viaje.ganancia.toFixed(2)}
                            </strong>
                            <br />
                            <small className="text-muted">
                              (80%)
                            </small>
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
            <div className="mt-4">
              <Card className="bg-dark text-white border-0 shadow">
                <Card.Body>
                  <h5 className="mb-4 text-center">
                    <i className="bi bi-graph-up me-2"></i>
                    Resumen de Rendimiento
                  </h5>
                  <div className="row text-center">
                    <div className="col-md-3">
                      <h6 className="text-muted mb-2">Ganancia por KM</h6>
                      <h4 className="fw-bold text-success">
                        S/ {(estadisticas.gananciaTotal / estadisticas.distanciaTotal).toFixed(2)}
                      </h4>
                    </div>
                    <div className="col-md-3">
                      <h6 className="text-muted mb-2">Distancia Promedio</h6>
                      <h4 className="fw-bold text-info">
                        {(estadisticas.distanciaTotal / estadisticas.totalViajes).toFixed(2)} km
                      </h4>
                    </div>
                    <div className="col-md-3">
                      <h6 className="text-muted mb-2">Último Viaje</h6>
                      <h5 className="fw-bold text-warning">
                        {estadisticas.ultimoViaje ? 
                          new Date(estadisticas.ultimoViaje).toLocaleDateString('es-PE') : 
                          'N/A'
                        }
                      </h5>
                    </div>
                    <div className="col-md-3">
                      <h6 className="text-muted mb-2">Comisión Plataforma</h6>
                      <h4 className="fw-bold text-danger">
                        S/ {(estadisticas.gananciaTotal * 0.25).toFixed(2)}
                      </h4>
                      <small className="text-muted">(20% del total)</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Ganancias;