import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const ConductorUI = () => {
    const [position, setPosition] = useState([-12.0464, -77.0428])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [showDetail, setShowDetail] = useState(false)
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

    const openOrderDetail = (order) => {
      setSelectedOrder(order)
      setShowDetail(true)
    }

    const closeOrderDetail = () => {
      setSelectedOrder(null)
      setShowDetail(false)
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
                    <div key={o.id} className={`order-card ${o.status}`}>
                      <div 
                        className="order-header"
                        onClick={() => openOrderDetail(o)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="order-top">
                          <div>
                            <div className="person">{o.persona}</div>
                            <div className="meta">{o.distance} • {o.eta}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div className="badge">{o.status}</div>
                            <span className="expand-icon">▶</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {showDetail && selectedOrder && (
                  <div className="order-detail-overlay" onClick={(e) => e.target === e.currentTarget && closeOrderDetail()}>
                    <div className="order-detail-card">
                      <div className="detail-header">
                        <button className="detail-back" onClick={closeOrderDetail}>←</button>
                        <h3>Detalles de la reserva</h3>
                      </div>

                      <div className="detail-body">
                        <div className="detail-time">Hoy, ahora</div>

                        <div className="fare">{selectedOrder.price} <span className="fare-sub">para ti</span></div>
                        <div className="rate-row"><span>S/. 3.20/km</span> · <span>S/. 97.65/h</span></div>

                        <div className="provider">Rutas Prime</div>

                        <div className="timeline">
                          <div className="timeline-item">
                            <div className="dot purple" />
                            <div className="timeline-content">
                              <div className="time">23:40 h</div>
                              <div className="address">{selectedOrder.inicio}</div>
                            </div>
                          </div>

                          <div className="timeline-item">
                            <div className="dot" />
                            <div className="timeline-content">
                              <div className="time small">{selectedOrder.eta} · {selectedOrder.distance}</div>
                              <div className="address">{selectedOrder.destino}</div>
                            </div>
                          </div>
                        </div>

                        <div style={{marginTop:10, color:'rgba(233,240,251,0.8)'}} className="comments"><strong>Comentarios:</strong> {selectedOrder.comentarios}</div>
                      </div>

                      <div className="detail-actions">
                        <button className="accept-full" onClick={() => { acceptOrder(selectedOrder.id); closeOrderDetail(); }}>Aceptar reserva</button>
                      </div>
                    </div>
                  </div>
                )}
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

        /* Mobile-friendly adjustments */
        @media(max-width:640px){
          .orders-sidebar {
            position: fixed;
            left: 8px;
            right: 8px;
            top: auto;
            bottom: 0;
            width: calc(100% - 16px);
            border-radius: 12px 12px 0 0;
            max-height: 60vh;
            padding: 12px;
            z-index: 1400;
          }

          /* Reduce map height so the bottom sheet fits */
          .conductor-map {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 60vh;
          }

          .orders-list {
            max-height: calc(60vh - 140px);
            overflow: auto;
            margin-top: 8px;
          }

          .order-card {
            margin-bottom: 10px;
            border-radius: 10px;
          }

          .order-header { padding: 10px }
          .order-body { padding: 0 10px 10px; font-size: 14px }

          /* Stack action buttons vertically for touch */
          .order-actions { flex-direction: column; gap: 8px; padding: 10px }
          .btn-accept, .btn-reject { width: 100%; }

          .btn-stats { padding: 6px 10px; font-size: 14px }
        }

        @media(max-width:480px){
          .orders-sidebar { left: 6px; right: 6px; width: calc(100% - 12px); max-height: 65vh }
          .conductor-map { height: calc(100vh - 65vh) }
          .person { font-size: 15px }
          .meta { font-size: 12px }
          .btn-stats { font-size: 14px; padding: 8px 10px }
        }

        /* Order detail overlay */
        .order-detail-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2,6,23,0.6);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 2000;
          padding: 16px;
        }

        .order-detail-card {
          width: 100%;
          max-width: 720px;
          border-radius: 14px;
          background: #0e1723;
          color: #e9f0fb;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(2,6,23,0.6);
        }

        .detail-header { display:flex; align-items:center; gap:12px; padding:14px 16px }
        .detail-back { background:transparent; border:none; color:#e9f0fb; font-size:20px; cursor:pointer }
        .detail-header h3 { margin:0; font-size:16px }

        .detail-map { display: none; }
        .detail-map-placeholder { display: none; }

        .detail-body { padding: 8px 16px 16px }
        .fare { font-size:28px; font-weight:700; color:#fff }
        .fare-sub { font-size:12px; color: rgba(233,240,251,0.7); margin-left:8px }
        .ride-meta { color: rgba(233,240,251,0.7); margin-top:6px }
        .addresses { margin-top:12px; font-size:14px; color: rgba(233,240,251,0.95) }

        .detail-time { color: rgba(233,240,251,0.7); font-size:13px; margin-bottom:6px }
        .rate-row { color: rgba(233,240,251,0.6); margin-top:6px; font-size:13px }
        .provider { margin-top:12px; padding:10px 12px; background: rgba(255,255,255,0.02); border-radius:10px; font-weight:600 }

        .timeline { margin-top:12px; padding: 6px 4px 12px 18px; border-left: 2px solid rgba(102,126,234,0.12) }
        .timeline-item { display:flex; gap:10px; align-items:flex-start; margin-bottom:14px }
        .dot { width:12px; height:12px; border-radius:50%; background: rgba(255,255,255,0.6); margin-left:-16px; margin-top:6px }
        .dot.purple { background: linear-gradient(90deg,#8e24aa,#6a1b9a); box-shadow: 0 4px 12px rgba(142,36,170,0.25) }
        .timeline-content { color: rgba(233,240,251,0.95); font-size:14px }
        .timeline-content .time { color: rgba(233,240,251,0.6); font-size:13px; margin-bottom:6px }
        .timeline-content .time.small { font-size:13px; color: rgba(233,240,251,0.7) }
        .timeline-content .address { font-size:15px; font-weight:600; line-height:1.2 }

        .detail-actions { padding: 12px; }
        .accept-full { width:100%; padding:14px; border-radius:10px; background: linear-gradient(90deg,#6a1b9a,#8e24aa); color:#fff; border:none; font-weight:700; font-size:16px; cursor:pointer }

        @media(min-width:900px){
          .order-detail-overlay { align-items: center }
          .order-detail-card { width: 80%; }
        }
      `}</style>
        </div>
    )
}

export default ConductorUI

