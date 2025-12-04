import { useState } from "react"
import { Spinner, Button } from "react-bootstrap"

export const FormularioConductor = ({ 
  viajeActivo, 
  estadoViaje, 
  buscandoViaje,
  estadisticas,
  onDirigirme,
  onIniciarViaje,
  onFinalizarViaje
}) => {
  const [activeSection, setActiveSection] = useState("buscar")

  const getEstadoTexto = (estado) => {
    const estados = {
      'encontrado': 'Viaje encontrado',
      'esperando': 'En espera del cliente',
      'enCamino': 'Viaje en curso'
    }
    return estados[estado] || estado
  }

  const getEstadoColor = (estado) => {
    const colores = {
      'encontrado': '#2196f3',
      'esperando': '#ff9800',
      'enCamino': '#4caf50'
    }
    return colores[estado] || '#666'
  }

  const getBotonAccion = () => {
    switch(estadoViaje) {
      case "encontrado":
        return (
          <Button 
            className="action-btn primary-btn" 
            onClick={onDirigirme}
          >
            Dirigirme al origen
          </Button>
        )
      case "esperando":
        return (
          <Button 
            className="action-btn warning-btn" 
            onClick={onIniciarViaje}
          >
            Iniciar viaje
          </Button>
        )
      case "enCamino":
        return (
          <Button 
            className="action-btn success-btn" 
            onClick={onFinalizarViaje}
          >
            Finalizar viaje
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header-fixed">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeSection === "buscar" ? "active" : ""}`}
            onClick={() => setActiveSection("buscar")}
          >
            {viajeActivo ? "Viaje en Proceso" : buscandoViaje ? "Buscando..." : "Buscar Viaje"}
          </button>
          <button 
            className={`tab-btn ${activeSection === "ganancias" ? "active" : ""}`}
            onClick={() => setActiveSection("ganancias")}
          >
            Mis Ganancias
          </button>
        </div>
      </div>

      <div className="sidebar-content-scroll">
        {activeSection === "buscar" ? (
          <div className="content-inner">
            {viajeActivo && estadoViaje ? (
              <div className="viaje-activo-container">
                <div className="viaje-header-active">
                  <h2 className="main-title">Viaje Asignado</h2>
                  <div 
                    className="estado-badge-active"
                    style={{ background: getEstadoColor(estadoViaje) }}
                  >
                    {getEstadoTexto(estadoViaje)}
                  </div>
                </div>

                <div className="viaje-details-card">
                  <div className="detail-row">
                    <span className="detail-label">Cliente</span>
                    <span className="detail-value">{viajeActivo.cliente}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Tipo de servicio</span>
                    <span className="detail-value">{viajeActivo.tipo}</span>
                  </div>

                  <div className="detail-separator"></div>

                  <div className="detail-row">
                    <span className="detail-label">Origen</span>
                    <span className="detail-value-address">
                      {viajeActivo.origen.length > 60 
                        ? viajeActivo.origen.substring(0, 60) + "..." 
                        : viajeActivo.origen}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Destino</span>
                    <span className="detail-value-address">
                      {viajeActivo.destino.length > 60 
                        ? viajeActivo.destino.substring(0, 60) + "..." 
                        : viajeActivo.destino}
                    </span>
                  </div>

                  {viajeActivo.comentarios && (
                    <div className="detail-row">
                      <span className="detail-label">Comentarios</span>
                      <span className="detail-value-address">{viajeActivo.comentarios}</span>
                    </div>
                  )}

                  <div className="detail-separator"></div>

                  <div className="detail-row highlight">
                    <span className="detail-label">Distancia</span>
                    <span className="detail-value-highlight">{viajeActivo.distancia} km</span>
                  </div>

                  <div className="detail-row highlight">
                    <span className="detail-label">Tu ganancia</span>
                    <span className="detail-value-highlight price">
                      S/ {(viajeActivo.precio * 0.8).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="action-container">
                  {getBotonAccion()}
                </div>
              </div>
            ) : buscandoViaje ? (
              <div className="buscando-container">
                <div className="buscando-icon">
                  <Spinner animation="border" className="spinner-buscar" />
                </div>
                <h2 className="main-title">Buscando viaje</h2>
                <p className="buscando-text">Consultando cada 3 segundos...</p>
                <div className="searching-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            ) : (
              <div className="empty-container">
                <div className="empty-icon">🚗</div>
                <h2 className="main-title">Sin viajes activos</h2>
                <p className="empty-text">Actualmente no hay viajes disponibles</p>
              </div>
            )}
          </div>
        ) : (
          <div className="content-inner">
            <h2 className="main-title">Tus Ganancias</h2>

            {estadisticas && estadisticas.totalViajes > 0 ? (
              <div className="stats-wrapper">
                <div className="stat-box box-blue">
                  <div className="stat-num">{estadisticas.totalViajes}</div>
                  <div className="stat-desc">Viajes completados</div>
                </div>

                <div className="stat-box box-green">
                  <div className="stat-num">S/ {estadisticas.gananciaTotal.toFixed(2)}</div>
                  <div className="stat-desc">Total ganado</div>
                </div>

                <div className="stat-box box-purple">
                  <div className="stat-num">{estadisticas.distanciaTotal.toFixed(2)} km</div>
                  <div className="stat-desc">Distancia recorrida</div>
                </div>
              </div>
            ) : (
              <div className="empty-box">
                <p className="empty-title">Sin datos</p>
                <p className="empty-text">Aún no has completado ningún viaje</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .sidebar-wrapper {
          width: 100%;
          height: 100%;
          background: white;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sidebar-header-fixed {
          position: sticky;
          top: 0;
          z-index: 100;
          background: white;
          border-bottom: 1px solid #e0e0e0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
        }

        .tabs-container {
          display: flex;
          padding: 0;
        }

        .tab-btn {
          flex: 1;
          padding: 18px 24px;
          background: transparent;
          border: none;
          font-size: 15px;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          transition: all 0.3s;
          border-bottom: 3px solid transparent;
        }

        .tab-btn.active {
          color: #000;
          border-bottom-color: #000;
          background: #fafafa;
        }

        .tab-btn:hover:not(.active) {
          background: #f5f5f5;
          color: #333;
        }

        .sidebar-content-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .sidebar-content-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-content-scroll::-webkit-scrollbar-track {
          background: #f5f5f5;
        }

        .sidebar-content-scroll::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }

        .sidebar-content-scroll::-webkit-scrollbar-thumb:hover {
          background: #999;
        }

        .content-inner {
          padding: 24px;
          max-width: 100%;
        }

        .viaje-activo-container {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .viaje-header-active {
          margin-bottom: 24px;
        }

        .main-title {
          font-size: 26px;
          font-weight: 700;
          color: #000;
          margin: 0 0 12px 0;
        }

        .estado-badge-active {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 20px;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .viaje-details-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 12px 0;
          gap: 16px;
        }

        .detail-row.highlight {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0 -24px;
          padding: 16px 24px;
          color: white;
        }

        .detail-label {
          font-size: 13px;
          font-weight: 600;
          color: #666;
          min-width: 100px;
          flex-shrink: 0;
        }

        .detail-row.highlight .detail-label {
          color: rgba(255, 255, 255, 0.9);
        }

        .detail-value {
          font-size: 14px;
          font-weight: 600;
          color: #000;
          text-align: right;
        }

        .detail-value-address {
          font-size: 13px;
          font-weight: 500;
          color: #333;
          text-align: right;
          line-height: 1.5;
        }

        .detail-value-highlight {
          font-size: 18px;
          font-weight: 800;
          color: white;
        }

        .detail-value-highlight.price {
          font-size: 24px;
        }

        .detail-separator {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #ddd 50%, transparent 100%);
          margin: 8px 0;
        }

        .action-container {
          margin-top: 20px;
        }

        .action-btn {
          width: 100%;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
        }

        .primary-btn {
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          color: white;
        }

        .warning-btn {
          background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
          color: white;
        }

        .success-btn {
          background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
          color: white;
        }

        .buscando-container,
        .empty-container {
          text-align: center;
          padding: 60px 20px;
        }

        .buscando-icon,
        .empty-icon {
          margin: 0 auto 24px;
          font-size: 60px;
        }

        .spinner-buscar {
          width: 60px;
          height: 60px;
          color: #667eea;
        }

        .buscando-text,
        .empty-text {
          font-size: 15px;
          color: #999;
          line-height: 1.6;
          margin-top: 12px;
        }

        .searching-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }

        .searching-dots span {
          width: 12px;
          height: 12px;
          background: #667eea;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .searching-dots span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .searching-dots span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .stats-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
        }

        .stat-box {
          padding: 24px;
          border-radius: 12px;
          border-left: 5px solid;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .stat-box:hover {
          transform: translateX(6px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .stat-box.box-blue {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-left-color: #2196f3;
        }

        .stat-box.box-green {
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
          border-left-color: #4caf50;
        }

        .stat-box.box-purple {
          background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
          border-left-color: #9c27b0;
        }

        .stat-num {
          font-size: 32px;
          font-weight: 800;
          color: #000;
          margin-bottom: 6px;
          line-height: 1;
        }

        .stat-desc {
          font-size: 14px;
          font-weight: 600;
          color: #555;
        }

        .empty-box {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-title {
          font-size: 20px;
          font-weight: 700;
          color: #000;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .content-inner {
            padding: 20px 16px;
          }

          .main-title {
            font-size: 22px;
          }

          .stat-num {
            font-size: 28px;
          }

          .tab-btn {
            padding: 16px 20px;
            font-size: 14px;
          }

          .detail-row {
            flex-direction: column;
            gap: 4px;
          }

          .detail-label {
            min-width: auto;
          }

          .detail-value,
          .detail-value-address {
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}