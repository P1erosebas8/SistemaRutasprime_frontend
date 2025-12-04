import { useState, useRef, useEffect } from "react"
import { Form, ListGroup, Spinner } from "react-bootstrap"
import { useAuth } from "../hooks/useAuth"


export const FormularioViaje = ({ 
  onSubmit, 
  precio, 
  distancia, 
  buscando,
  estadisticas,
  initialData = null,
  onCoordinatesChange,
  viajeActivo = null
}) => {
  const [activeSection, setActiveSection] = useState("viaje")
  const [formData, setFormData] = useState(initialData || {
    nombre: "",
    apellido: "",
    email: "",
    origen: "",
    destino: "",
    tipo: "",
    comentarios: ""
  })
  const [origenCoord, setOrigenCoord] = useState(null)
  const [destinoCoord, setDestinoCoord] = useState(null)
  const [sugOrigen, setSugOrigen] = useState([])
  const [sugDestino, setSugDestino] = useState([])
  const [errors, setErrors] = useState({})

  const searchTimer = useRef(null)
  const abortRef = useRef(null)
  const cacheRef = useRef(new Map())
  
  const { getProfile } = useAuth()

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const profile = await getProfile()
        setFormData(prev => ({
          ...prev,
          nombre: profile.nombres || "",
          apellido: profile.apellidos || "",
          email: profile.email || ""
        }))
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error)
      }
    }
    
    if (!viajeActivo) {
      cargarDatosUsuario()
    }
  }, [])


  useEffect(() => {
    if (!viajeActivo) {
      setFormData(prev => ({
        nombre: prev.nombre,
        apellido: prev.apellido,
        email: prev.email,
        origen: "",
        destino: "",
        tipo: "",
        comentarios: ""
      }))
      setOrigenCoord(null)
      setDestinoCoord(null)
      setSugOrigen([])
      setSugDestino([])
      setErrors({})
    }
  }, [viajeActivo])


  useEffect(() => {
    if (onCoordinatesChange && origenCoord && destinoCoord) {
      onCoordinatesChange({ origenCoord, destinoCoord })
    }
  }, [origenCoord, destinoCoord, onCoordinatesChange])


  const searchAddress = (query, setter) => {
    if (!query || query.trim().length < 3) {
      setter([])
      return
    }

    const key = query.trim()
    if (cacheRef.current.has(key)) {
      setter(cacheRef.current.get(key))
      return
    }

    if (abortRef.current) {
      try { abortRef.current.abort() } catch (e) { }
      abortRef.current = null
    }

    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(async () => {
      try {
        abortRef.current = new AbortController()
        const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=pe&q=${encodeURIComponent(key)}&limit=5`
        const res = await fetch(url, { signal: abortRef.current.signal })
        const data = await res.json()
        const items = Array.isArray(data) ? data.slice(0, 5) : []
        cacheRef.current.set(key, items)
        setter(items)
      } catch (err) {
        if (err.name === "AbortError") return
        console.error(err)
      } finally {
        abortRef.current = null
      }
    }, 300)
  }


  const handleSelectSuggestion = (item, tipo) => {
    const coords = [parseFloat(item.lat), parseFloat(item.lon)]
    
    if (tipo === "origen") {
      setFormData((p) => ({ ...p, origen: item.display_name }))
      setSugOrigen([])
      setOrigenCoord(coords)
    }
    if (tipo === "destino") {
      setFormData((p) => ({ ...p, destino: item.display_name }))
      setSugDestino([])
      setDestinoCoord(coords)
    }
  }


  const validateName = (name, field) => {
    const regex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/
    if (!name.trim()) return `El ${field} es requerido`
    if (!regex.test(name)) return `El ${field} solo debe contener letras`
    return null
  }


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) return "El email es requerido"
    if (!regex.test(email)) return "Email inválido"
    return null
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    const nombreError = validateName(formData.nombre, "nombre")
    const apellidoError = validateName(formData.apellido, "apellido")
    const emailError = validateEmail(formData.email)

    if (nombreError) newErrors.nombre = nombreError
    if (apellidoError) newErrors.apellido = apellidoError
    if (emailError) newErrors.email = emailError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!origenCoord || !destinoCoord) {
      alert("Por favor selecciona origen y destino del mapa")
      return
    }
    
    if (!precio) {
      alert("Esperando cálculo de precio...")
      return
    }

    onSubmit({ formData, origenCoord, destinoCoord })
  }


  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "nombre" || name === "apellido") {
      const regex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]*$/
      if (!regex.test(value)) {
        setErrors({ ...errors, [name]: `Solo se permiten letras` })
        return
      } else {
        const newErrors = { ...errors }
        delete newErrors[name]
        setErrors(newErrors)
      }
    }

    if (name === "email") {
      const newErrors = { ...errors }
      delete newErrors.email
      setErrors(newErrors)
    }

    setFormData({ ...formData, [name]: value })
    if (name === "origen") searchAddress(value, setSugOrigen)
    if (name === "destino") searchAddress(value, setSugDestino)
  }


  const invertir = () => {
    const textoTemp = formData.origen
    const coordTemp = origenCoord
    setFormData({ ...formData, origen: formData.destino, destino: textoTemp })
    setOrigenCoord(destinoCoord)
    setDestinoCoord(coordTemp)
  }


  const getEstadoTexto = (estado) => {
    const estados = {
      'BUSCANDO_CONDUCTOR': 'Buscando conductor',
      'CONDUCTOR_ASIGNADO': 'Conductor asignado',
      'EN_CAMINO': 'Conductor en camino',
      'EN_PROGRESO': 'Viaje en progreso',
      'COMPLETADO': 'Viaje completado'
    }
    return estados[estado] || estado
  }


  const getEstadoColor = (estado) => {
    const colores = {
      'BUSCANDO_CONDUCTOR': '#ff9800',
      'CONDUCTOR_ASIGNADO': '#2196f3',
      'EN_CAMINO': '#9c27b0',
      'EN_PROGRESO': '#4caf50',
      'COMPLETADO': '#00bcd4'
    }
    return colores[estado] || '#666'
  }


  const tieneConductorAsignado = viajeActivo && viajeActivo.conductorId && viajeActivo.estado !== 'BUSCANDO_CONDUCTOR' && viajeActivo.estado !== 'CANCELADO'

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header-fixed">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeSection === "viaje" ? "active" : ""}`}
            onClick={() => setActiveSection("viaje")}
          >
            {viajeActivo ? "Viaje en Proceso" : "Pedir Viaje"}
          </button>
          <button 
            className={`tab-btn ${activeSection === "gastos" ? "active" : ""}`}
            onClick={() => setActiveSection("gastos")}
          >
            Mis Gastos
          </button>
        </div>
      </div>

      <div className="sidebar-content-scroll">
        {activeSection === "viaje" ? (
          <div className="content-inner">
            {viajeActivo ? (
              <div className="viaje-activo-container">
                <div className="viaje-header-active">
                  <h2 className="main-title">Tu Viaje</h2>
                  <div 
                    className="estado-badge-active"
                    style={{ background: getEstadoColor(viajeActivo.estado) }}
                  >
                    <Spinner animation="border" size="sm" className="spinner-badge" />
                    {getEstadoTexto(viajeActivo.estado)}
                  </div>
                </div>

                <div className="viaje-details-card">
                  {tieneConductorAsignado ? (
                    <>
                      <div className="section-title">Información del Conductor</div>

                      <div className="detail-row">
                        <span className="detail-label">Conductor</span>
                        <span className="detail-value">
                          {viajeActivo.conductorNombres} {viajeActivo.conductorApellidos}
                        </span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Celular</span>
                        <span className="detail-value">{viajeActivo.conductorCelular}</span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Email</span>
                        <span className="detail-value-small">{viajeActivo.conductorEmail}</span>
                      </div>

                      <div className="detail-separator"></div>

                      <div className="section-title">Información del Vehículo</div>

                      <div className="detail-row">
                        <span className="detail-label">Vehículo</span>
                        <span className="detail-value">
                          {viajeActivo.vehiculoMarca} {viajeActivo.vehiculoColor}
                        </span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Placa</span>
                        <span className="detail-value">{viajeActivo.vehiculoPlaca}</span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Año</span>
                        <span className="detail-value">{viajeActivo.vehiculoAnio}</span>
                      </div>

                      <div className="detail-separator"></div>
                    </>
                  ) : (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">Cliente</span>
                        <span className="detail-value">
                          {viajeActivo.nombre} {viajeActivo.apellido}
                        </span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{formData.email || viajeActivo.email || "N/A"}</span>
                      </div>

                      <div className="detail-separator"></div>
                    </>
                  )}

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
                    <span className="detail-label">Costo total</span>
                    <span className="detail-value-highlight price">S/ {viajeActivo.precio}</span>
                  </div>

                  {viajeActivo.chargeId && (
                    <>
                      <div className="detail-separator"></div>
                      <div className="detail-row">
                        <span className="detail-label">ID de Pago</span>
                        <span className="detail-value-small">{viajeActivo.chargeId}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="info-message">
                  {viajeActivo.estado === 'BUSCANDO_CONDUCTOR' && (
                    <p>Estamos buscando el mejor conductor disponible para ti...</p>
                  )}
                  {viajeActivo.estado === 'CONDUCTOR_ASIGNADO' && (
                    <p>¡Conductor asignado! Pronto estará en camino.</p>
                  )}
                  {viajeActivo.estado === 'EN_CAMINO' && (
                    <p>El conductor está en camino a tu ubicación.</p>
                  )}
                  {viajeActivo.estado === 'EN_PROGRESO' && (
                    <p>Tu viaje está en progreso. ¡Buen viaje!</p>
                  )}
                  {viajeActivo.estado === 'COMPLETADO' && (
                    <p>¡Viaje completado! Gracias por usar nuestro servicio.</p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="title-row">
                  <h2 className="main-title">¿Deseas enviar?</h2>
                  <button 
                    type="button" 
                    className="swap-btn" 
                    onClick={invertir}
                    title="Intercambiar"
                  >
                    ⇅
                  </button>
                </div>

                {precio && distancia && (
                  <div className="price-card">
                    <div className="price-item">
                      <span className="price-label">Distancia</span>
                      <span className="price-val">{distancia} km</span>
                    </div>
                    <div className="price-item highlight">
                      <span className="price-label">Precio estimado</span>
                      <span className="price-total">S/ {precio}</span>
                    </div>
                  </div>
                )}

                <Form onSubmit={handleSubmit} className="main-form">
                  <Form.Group className="field-group">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      isInvalid={!!errors.nombre}
                      placeholder="Tu nombre"
                      required
                      disabled
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="field-group">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      isInvalid={!!errors.apellido}
                      placeholder="Tu apellido"
                      required
                      disabled
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.apellido}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="field-group">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="correo@ejemplo.com"
                      required
                      disabled
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="field-group position-relative">
                    <Form.Label>Punto de recogida</Form.Label>
                    <Form.Control
                      type="text"
                      name="origen"
                      value={formData.origen}
                      onChange={handleChange}
                      placeholder="¿De dónde deseas enviar?"
                    />
                    {sugOrigen.length > 0 && (
                      <ListGroup className="suggest-list">
                        {sugOrigen.map((s, i) => (
                          <ListGroup.Item
                            key={i}
                            action
                            onClick={() => handleSelectSuggestion(s, "origen")}
                          >
                            {s.display_name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Form.Group>

                  <Form.Group className="field-group position-relative">
                    <Form.Label>Destino</Form.Label>
                    <Form.Control
                      type="text"
                      name="destino"
                      value={formData.destino}
                      onChange={handleChange}
                      placeholder="¿A dónde deseas enviar?"
                    />
                    {sugDestino.length > 0 && (
                      <ListGroup className="suggest-list">
                        {sugDestino.map((s, i) => (
                          <ListGroup.Item
                            key={i}
                            action
                            onClick={() => handleSelectSuggestion(s, "destino")}
                          >
                            {s.display_name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Form.Group>

                  <Form.Group className="field-group">
                    <Form.Label>Tipo de servicio</Form.Label>
                    <Form.Select
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona una opción</option>
                      <option>Mudanza</option>
                      <option>Productos grandes</option>
                      <option>Industrial</option>
                      <option>Comercial</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="field-group">
                    <Form.Label>Comentarios (opcional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleChange}
                      placeholder="Información adicional..."
                    />
                  </Form.Group>

                  <button 
                    type="submit" 
                    className="submit-btn" 
                    disabled={buscando || !precio}
                  >
                    {buscando ? "Procesando..." : "Solicitar servicio"}
                  </button>
                </Form>
              </>
            )}
          </div>
        ) : (
          <div className="content-inner">
            <h2 className="main-title">Tus Estadísticas</h2>

            {estadisticas && estadisticas.totalViajes > 0 ? (
              <div className="stats-wrapper">
                <div className="stat-box box-blue">
                  <div className="stat-num">{estadisticas.totalViajes}</div>
                  <div className="stat-desc">Viajes completados</div>
                </div>

                <div className="stat-box box-red">
                  <div className="stat-num">S/ {estadisticas.gastoTotal.toFixed(2)}</div>
                  <div className="stat-desc">Total invertido</div>
                </div>

                <div className="stat-box box-green">
                  <div className="stat-num">{estadisticas.distanciaTotal.toFixed(2)} km</div>
                  <div className="stat-desc">Distancia recorrida</div>
                </div>
              </div>
            ) : (
              <div className="empty-box">
                <p className="empty-title">Sin datos</p>
                <p className="empty-text">Aún no has realizado ningún viaje</p>
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

        .estado-badge-active {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 20px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          margin-top: 12px;
        }

        .spinner-badge {
          width: 16px;
          height: 16px;
          border-width: 2px;
        }

        .viaje-details-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: #667eea;
          margin: 16px 0 8px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-title:first-child {
          margin-top: 0;
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

        .detail-value-small {
          font-size: 11px;
          font-weight: 500;
          color: #666;
          word-break: break-all;
          text-align: right;
        }

        .detail-separator {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #ddd 50%, transparent 100%);
          margin: 8px 0;
        }

        .info-message {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-left: 4px solid #2196f3;
          border-radius: 8px;
          padding: 16px;
          margin-top: 20px;
        }

        .info-message p {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: #1565c0;
          line-height: 1.6;
        }

        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .main-title {
          font-size: 26px;
          font-weight: 700;
          color: #000;
          margin: 0;
        }

        .swap-btn {
          background: #000;
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 22px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .swap-btn:hover {
          background: #333;
          transform: rotate(180deg) scale(1.05);
        }

        .price-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25);
        }

        .price-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          color: white;
        }

        .price-item.highlight {
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          margin-top: 10px;
          padding-top: 16px;
        }

        .price-label {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.95;
        }

        .price-val {
          font-size: 16px;
          font-weight: 700;
        }

        .price-total {
          font-size: 28px;
          font-weight: 800;
        }

        .main-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field-group {
          margin-bottom: 0;
        }

        .field-group label {
          font-size: 14px;
          font-weight: 600;
          color: #000;
          margin-bottom: 8px;
          display: block;
        }

        .field-group input,
        .field-group select,
        .field-group textarea {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 15px;
          transition: all 0.3s;
          width: 100%;
        }

        .field-group input:disabled,
        .field-group input[readonly] {
          background-color: #f5f5f5;
          cursor: not-allowed;
          color: #666;
        }

        .field-group input:focus,
        .field-group select:focus,
        .field-group textarea:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .suggest-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          max-height: 220px;
          overflow-y: auto;
          z-index: 1000;
          margin-top: 4px;
        }

        .suggest-list .list-group-item {
          border: none;
          padding: 14px 16px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
        }

        .suggest-list .list-group-item:hover {
          background: #f5f5f5;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 12px;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          background: linear-gradient(135deg, #ccc 0%, #999 100%);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
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

        .stat-box.box-red {
          background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
          border-left-color: #f44336;
        }

        .stat-box.box-green {
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
          border-left-color: #4caf50;
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

        .empty-text {
          font-size: 15px;
          color: #999;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .content-inner {
            padding: 20px 16px;
          }

          .main-title {
            font-size: 22px;
          }

          .swap-btn {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .price-total {
            font-size: 24px;
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