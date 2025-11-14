import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const ConductorUI = () => {
    const [position, setPosition] = useState([-12.0464, -77.0428])

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

    const acceptOrder = (id) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'aceptado' } : o)))
    }

    const rejectOrder = (id) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'rechazado' } : o)))
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
                    <h3>🚚 Pedidos</h3>
                    <small>Selecciona y acepta un pedido</small>
                </div>

                <div className="orders-list">
                    {orders.map((o) => (
                        <div key={o.id} className={`order-card ${o.status}`}>
                            <div className="order-top">
                                <div>
                                    <div className="person">{o.persona}</div>
                                    <div className="meta">{o.distance} • {o.eta}</div>
                                </div>
                                <div className="badge">{o.status}</div>
                            </div>

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

        .sidebar-header h3 { margin: 0; font-size: 18px }
        .sidebar-header small { color: rgba(233,240,251,0.5) }

        .orders-list {
          margin-top: 12px;
          overflow: auto;
          padding-right: 6px;
        }

        .order-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .order-top { display:flex; justify-content:space-between; align-items:flex-start }
        .person { font-weight:700 }
        .meta { color: rgba(233,240,251,0.7); font-size:13px }

        .badge {
          padding:6px 10px; border-radius:999px; font-size:12px;
          background: #e6f7ff; color:#0277bd;
        }

        .order-card.aceptado .badge { background:#e8f5e9; color:#1b5e20 }
        .order-card.rechazado .badge { background:#fff0f0; color:#b71c1c }

        .order-body { color: rgba(233,240,251,0.9); font-size:13px }

        .order-actions { display:flex; gap:8px; margin-top:6px }
        .btn-accept { flex:1; padding:8px 10px; border-radius:8px; border:none; background:linear-gradient(90deg,#1976d2,#3ea0ff); color:#fff }
        .btn-reject { flex:1; padding:8px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); background:transparent; color:#e9f0fb }

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

