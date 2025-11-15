import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const ConductorUI = () => {
    const [position, setPosition] = useState([-12.0464, -77.0428])
    const [expandedOrder, setExpandedOrder] = useState(null)
    const [showStats, setShowStats] = useState(false)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
                () => console.warn('No se pudo obtener la ubicación del usuario')
            )
        }
    }, [])

    const [orders, setOrders] = useState([
        {
            id: 1,
            persona: 'Juan Pérez',
            inicio: 'Av. Arequipa 1234, Lima',
            destino: 'Av. Central 45',
            tipo: 'Mudanza',
            comentarios: 'Cuidado con los muebles grandes',
            distance: '3.2 km',
            eta: '10 min',
            price: '$4.50',
            status: 'disponible',
        },
        {
            id: 2,
            persona: 'María Gómez',
            inicio: 'Plaza Mayor',
            destino: 'Calle Luna 7',
            tipo: 'Productos grandes',
            comentarios: 'Necesita plataforma elevadora',
            distance: '5.6 km',
            eta: '18 min',
            price: '$7.20',
            status: 'disponible',
        },
        {
            id: 3,
            persona: 'Carlos Ruiz',
            inicio: 'Estación Norte',
            destino: 'Parque Sur',
            tipo: 'Comercial',
            comentarios: 'Carga frágil, embalaje especial',
            distance: '2.1 km',
            eta: '7 min',
            price: '$3.10',
            status: 'disponible',
        },
    ])

    const stats = {
        ganancias: '$342.50',
        viajes: 28,
        viajesToday: 3,
        calificacion: '4.8',
        vehiculo: 'Toyota Hiace 2020'
    }

    const acceptOrder = (id) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'aceptado' } : o)))
    }

    const rejectOrder = (id) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'rechazado' } : o)))
    }

    const toggleOrderExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id)
    }
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <MapContainer center={position} zoom={13} className="conductor-map">
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>

            <aside className="orders-sidebar">
                <div className="sidebar-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>🚚 Pedidos</h3>
                        <button 
                            className="btn-stats"
                            onClick={() => setShowStats(!showStats)}
                            title="Ver estadísticas"
                        >
                            📊
                        </button>
                    </div>
                    <small>Selecciona y acepta un pedido</small>
                </div>

                {showStats && (
                    <div className="stats-panel">
                        <div className="stat-item">
                            <span className="stat-label">💰 Ganancias hoy:</span>
                            <span className="stat-value">{stats.ganancias}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">🚗 Viajes totales:</span>
                            <span className="stat-value">{stats.viajes}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">⏱️ Viajes hoy:</span>
                            <span className="stat-value">{stats.viajesToday}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">⭐ Calificación:</span>
                            <span className="stat-value">{stats.calificacion}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">🚙 Vehículo:</span>
                            <span className="stat-value">{stats.vehiculo}</span>
                        </div>
                    </div>
                )}

                <div className="orders-list">
                    {orders.map((o) => (
                        <div key={o.id} className={`order-card ${o.status} ${expandedOrder === o.id ? 'expanded' : ''}`}>
                            <div 
                                className="order-header"
                                onClick={() => toggleOrderExpand(o.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="order-top">
                                    <div>
                                        <div className="person">{o.persona}</div>
                                        <div className="meta">{o.distance} • {o.eta}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <div className="badge">{o.status}</div>
                                        <span className="expand-icon">{expandedOrder === o.id ? '▼' : '▶'}</span>
                                    </div>
                                </div>
                            </div>

                            {expandedOrder === o.id && (
                                <>
                                    <div className="order-body">
                                        <div><strong>Inicio:</strong> {o.inicio}</div>
                                        <div><strong>Destino:</strong> {o.destino}</div>
                                        <div><strong>Tipo:</strong> {o.tipo}</div>
                                        <div><strong>Comentarios:</strong> {o.comentarios}</div>
                                    </div>

                                    <div className="order-actions">
                                        <button onClick={() => acceptOrder(o.id)} disabled={o.status !== 'disponible'} className="btn-accept">Aceptar • {o.price}</button>
                                        <button onClick={() => rejectOrder(o.id)} disabled={o.status !== 'disponible'} className="btn-reject">Rechazar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </aside>

            <style>{`
        .conductor-map {
          width: 100%;
          height: 100vh;
          filter: saturate(0.95) contrast(0.95);
        }

        .orders-sidebar {
          position: absolute;
          right: 18px;
          top: 110px;
          bottom: 40px;
          width: 360px;
          background: rgba(14,24,44,0.82);
          border-radius: 12px;
          padding: 14px;
          box-shadow: 0 20px 60px rgba(6,16,35,0.6);
          color: #e9f0fb;
          display: flex;
          flex-direction: column;
          z-index: 1200;
        }

        .sidebar-header { margin-bottom: 12px }
        .sidebar-header h3 { margin: 0; font-size: 18px }
        .sidebar-header small { color: rgba(233,240,251,0.5) }

        .btn-stats {
          background: linear-gradient(90deg, #667eea, #764ba2);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-stats:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .stats-panel {
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 12px;
          font-size: 13px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(102, 126, 234, 0.2);
        }

        .stat-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .stat-label {
          color: rgba(233, 240, 251, 0.7);
          font-weight: 500;
        }

        .stat-value {
          color: #667eea;
          font-weight: 700;
        }

        .orders-list {
          margin-top: 12px;
          overflow: auto;
          padding-right: 6px;
          flex: 1;
        }

        .order-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 10px;
          margin-bottom: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .order-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.08);
        }

        .order-header {
          padding: 12px;
        }

        .order-top { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          gap: 8px;
        }
        
        .person { font-weight: 700; font-size: 14px }
        .meta { color: rgba(233,240,251,0.7); font-size:13px }

        .expand-icon {
          font-size: 12px;
          color: rgba(233,240,251,0.5);
          transition: all 0.2s ease;
        }

        .order-card.expanded .expand-icon {
          color: rgba(102, 126, 234, 1);
        }

        .badge {
          padding:6px 10px; 
          border-radius:999px; 
          font-size:12px;
          background: #e6f7ff; 
          color:#0277bd;
          white-space: nowrap;
        }

        .order-card.aceptado .badge { background:#e8f5e9; color:#1b5e20 }
        .order-card.rechazado .badge { background:#fff0f0; color:#b71c1c }

        .order-body { 
          color: rgba(233,240,251,0.9); 
          font-size:13px;
          padding: 0 12px 12px 12px;
          border-top: 1px solid rgba(255,255,255,0.04);
          padding-top: 12px;
        }

        .order-body div {
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .order-actions { 
          display: flex; 
          gap: 8px; 
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .btn-accept { 
          flex:1; 
          padding:8px 10px; 
          border-radius:8px; 
          border:none; 
          background:linear-gradient(90deg,#1976d2,#3ea0ff); 
          color:#fff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-accept:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }

        .btn-accept:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-reject { 
          flex:1; 
          padding:8px 10px; 
          border-radius:8px; 
          border:1px solid rgba(255,255,255,0.06); 
          background:transparent; 
          color:#e9f0fb;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-reject:hover:not(:disabled) {
          background: rgba(233, 240, 251, 0.1);
          border-color: rgba(255,255,255,0.1);
        }

        .btn-reject:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media(max-width:900px){
          .orders-sidebar { right:12px; width:320px }
        }

        @media(max-width:640px){
          .orders-sidebar { position: absolute; left: 8px; right:8px; top:auto; bottom:0; width:auto; border-radius:12px 12px 0 0; max-height:50vh }
        }
      `}</style>
        </div>
    )
}

export default ConductorUI

