import { useState, useEffect, useRef } from "react"
import { Card, Form, Button, Row, Col, ListGroup, Spinner, Toast, ToastContainer } from "react-bootstrap"
import GoogleMapView from "../components/GoogleMapView"
import { apiRequest } from "../services/api"
import { guardarViajeCliente, obtenerEstadisticasCliente } from "../services/storageService"

function ClienteUI() {
  const [formData, setFormData] = useState({ 
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
  const [position, setPosition] = useState([-12.0464, -77.0428])
  const [sugOrigen, setSugOrigen] = useState([])
  const [sugDestino, setSugDestino] = useState([])
  const [precio, setPrecio] = useState(null)
  const [distancia, setDistancia] = useState(null)
  const origenRef = useRef(null)
  const destinoRef = useRef(null)
  const [anchoOrigen, setAnchoOrigen] = useState("100%")
  const [anchoDestino, setAnchoDestino] = useState("100%")
  const [bounds, setBounds] = useState(null)
  const [pagoExitoso, setPagoExitoso] = useState(false)
  const [pagoFallido, setPagoFallido] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [buscando, setBuscando] = useState(false)
  const [viajeSolicitado, setViajeSolicitado] = useState(false)
  const [viajeData, setViajeData] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [errors, setErrors] = useState({})
  const [cargandoViajeActivo, setCargandoViajeActivo] = useState(true)
  const [estadisticas, setEstadisticas] = useState(null)
  const pollingViajeInterval = useRef(null)

  const CULQI_PUBLIC_KEY = "pk_test_WD4uhK2lok9tOMNS"

  const errorMessages = {
    stolen_card: "Tarjeta reportada como robada",
    lost_card: "Tarjeta reportada como perdida",
    insufficient_funds: "Fondos insuficientes",
    contact_issuer: "Contactar con el emisor",
    incorrect_cvv: "CVV incorrecto",
    issuer_not_available: "Emisor no disponible",
    issuer_decline_operation: "Operación rechazada por el emisor",
    invalid_card: "Tarjeta inválida",
    processing_error: "Error de procesamiento",
    fraudulent: "Transacción fraudulenta detectada"
  }

  useEffect(() => {
    const stats = obtenerEstadisticasCliente();
    setEstadisticas(stats);
  }, []);

  useEffect(() => {
    const verificarViajeActivo = async () => {
      const emailGuardado = localStorage.getItem("clienteEmail")
      
      if (!emailGuardado) {
        setCargandoViajeActivo(false)
        return
      }

      try {
        console.log("Verificando viaje activo para:", emailGuardado)
        const response = await apiRequest(`/viajes/activo?email=${emailGuardado}`, "GET", null, false)
        
        if (response.data?.tieneViajeActivo && response.data?.viaje) {
          const viaje = response.data.viaje
          console.log("Viaje activo encontrado:", viaje)
          
          setFormData({
            nombre: viaje.nombre,
            apellido: viaje.apellido,
            email: viaje.emailCliente,
            origen: viaje.origen,
            destino: viaje.destino,
            tipo: viaje.tipo,
            comentarios: viaje.comentarios || ""
          })
          
          setOrigenCoord([viaje.origenLat, viaje.origenLng])
          setDestinoCoord([viaje.destinoLat, viaje.destinoLng])
          setDistancia(viaje.distanciaKm)
          setPrecio(viaje.precio)
          setPosition([viaje.origenLat, viaje.origenLng])
          setBounds([[viaje.origenLat, viaje.origenLng], [viaje.destinoLat, viaje.destinoLng]])
          
          setViajeSolicitado(true)
          setViajeData({
            id: viaje.id,
            nombre: viaje.nombre,
            apellido: viaje.apellido,
            origen: viaje.origen,
            destino: viaje.destino,
            tipo: viaje.tipo,
            comentarios: viaje.comentarios,
            precio: viaje.precio,
            distancia: viaje.distanciaKm,
            chargeId: viaje.chargeId,
            estado: viaje.estado,
            pagoExitoso: true
          })
          
          iniciarPollingEstado(viaje.id)
        } else {
          console.log("No hay viaje activo")
        }
      } catch (error) {
        console.error("Error al verificar viaje activo:", error)
      } finally {
        setCargandoViajeActivo(false)
      }
    }

    verificarViajeActivo()

    return () => {
      if (pollingViajeInterval.current) {
        clearInterval(pollingViajeInterval.current)
      }
    }
  }, [])

  const iniciarPollingEstado = (viajeId) => {
    if (pollingViajeInterval.current) {
      clearInterval(pollingViajeInterval.current)
    }

    pollingViajeInterval.current = setInterval(async () => {
      try {
        const response = await apiRequest(`/viajes/${viajeId}`, "GET", null, false)
        
        if (response.data?.success && response.data?.viaje) {
          const viajeActualizado = response.data.viaje
          
          setViajeData(prev => ({
            ...prev,
            estado: viajeActualizado.estado
          }))

          if (viajeActualizado.estado === 'COMPLETADO' || viajeActualizado.estado === 'CANCELADO') {
            if (pollingViajeInterval.current) {
              clearInterval(pollingViajeInterval.current)
            }
            setViajeSolicitado(false)
            setViajeData(null)
            setFormData({
              nombre: "",
              apellido: "",
              email: "",
              origen: "",
              destino: "",
              tipo: "",
              comentarios: ""
            })
            setOrigenCoord(null)
            setDestinoCoord(null)
            setPrecio(null)
            setDistancia(null)
          }
        }
      } catch (error) {
        console.error("Error al verificar estado del viaje:", error)
      }
    }, 3000)
  }

  useEffect(() => {
    if (window.Culqi) {
      window.Culqi.publicKey = CULQI_PUBLIC_KEY
      
      window.culqi = async function() {
        if (window.Culqi.token) {
          const token = window.Culqi.token.id
          const email = window.Culqi.token.email
          
          try {
            const paymentData = {
              token: token,
              amount: Math.round(precio * 100),
              email: formData.email || email,
              firstName: formData.nombre,
              lastName: formData.apellido,
              descripcion: `Servicio de transporte - ${formData.tipo}`,
              origen: formData.origen,
              destino: formData.destino,
              origenLat: origenCoord[0],
              origenLng: origenCoord[1],
              destinoLat: destinoCoord[0],
              destinoLng: destinoCoord[1],
              tipo: formData.tipo,
              comentarios: formData.comentarios,
              distancia: distancia
            }

            const response = await apiRequest("/pagos/procesar", "POST", paymentData, false)
            
            window.Culqi.close()
            
            if (response.data?.success) {
              localStorage.setItem("clienteEmail", formData.email || email)
              
              const viajeParaGuardar = {
                id: response.data.data.viajeId,
                origen: formData.origen,
                destino: formData.destino,
                tipo: formData.tipo,
                distancia: distancia,
                precio: precio,
                chargeId: response.data.data.id,
                estado: response.data.data.estado
              };
              
              guardarViajeCliente(viajeParaGuardar);
              setEstadisticas(obtenerEstadisticasCliente());
              
              setPagoExitoso(true)
              
              setTimeout(() => {
                setPagoExitoso(false)
                setBuscando(true)
                
                setTimeout(() => {
                  setBuscando(false)
                  setViajeSolicitado(true)
                  setViajeData({
                    id: response.data.data.viajeId,
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    origen: formData.origen,
                    destino: formData.destino,
                    tipo: formData.tipo,
                    comentarios: formData.comentarios,
                    precio: precio,
                    distancia: distancia,
                    chargeId: response.data.data.id,
                    estado: response.data.data.estado,
                    pagoExitoso: true
                  })
                  
                  iniciarPollingEstado(response.data.data.viajeId)
                }, 5000)
              }, 2000)
            } else {
              let friendlyError = "Error al procesar el pago"
              
              if (response.data?.message) {
                try {
                  const parsed = JSON.parse(response.data.message.replace("Error de Culqi: ", ""))
                  const declineCode = parsed.decline_code || parsed.merchant_message
                  friendlyError = errorMessages[declineCode] || parsed.user_message || friendlyError
                } catch {
                  friendlyError = response.data.message
                }
              }
              
              setErrorMessage(friendlyError)
              setPagoFallido(true)
              
              setTimeout(() => {
                setPagoFallido(false)
                setErrorMessage("")
              }, 3000)
            }
          } catch (error) {
            window.Culqi.close()
            
            let friendlyError = "Error al procesar el pago"
            
            if (error.message) {
              try {
                const parsed = JSON.parse(error.message)
                const declineCode = parsed.decline_code || parsed.merchant_message
                friendlyError = errorMessages[declineCode] || parsed.user_message || friendlyError
              } catch {
                friendlyError = error.message
              }
            }
            
            setErrorMessage(friendlyError)
            setPagoFallido(true)
            
            setTimeout(() => {
              setPagoFallido(false)
              setErrorMessage("")
            }, 3000)
          }
        } else if (window.Culqi.order) {
          const order = window.Culqi.order
          console.log("Orden creada:", order)
        } else {
          window.Culqi.close()
          const culqiError = window.Culqi.error
          const errorCode = culqiError?.decline_code || culqiError?.merchant_message
          const friendlyError = errorMessages[errorCode] || culqiError?.user_message || "Error al procesar el pago"
          
          setErrorMessage(friendlyError)
          setPagoFallido(true)
          
          setTimeout(() => {
            setPagoFallido(false)
            setErrorMessage("")
          }, 3000)
        }
      }
    }
  }, [formData, precio, distancia, origenCoord, destinoCoord])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude]
          setPosition(coords)
          setOrigenCoord(coords)
          
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
          const res = await fetch(url)
          const data = await res.json()
          if (data.display_name) {
            setFormData((prev) => ({ ...prev, origen: data.display_name }))
          }
        },
        () => {}
      )
    }
  }, [])

  const resizeInputs = () => {
    if (origenRef.current) setAnchoOrigen(origenRef.current.getBoundingClientRect().width + "px")
    if (destinoRef.current) setAnchoDestino(destinoRef.current.getBoundingClientRect().width + "px")
  }

  useEffect(() => {
    resizeInputs()
    window.addEventListener("resize", resizeInputs)
    return () => window.removeEventListener("resize", resizeInputs)
  }, [])

  useEffect(() => {
    if (origenCoord && destinoCoord) {
      const o = { lat: origenCoord[0], lng: origenCoord[1] }
      const d = { lat: destinoCoord[0], lng: destinoCoord[1] }
      setPrecio(null)
      setDistancia(null)
      setBounds([origenCoord, destinoCoord])
      setDirectionsRequest({ origin: o, destination: d })
    } else {
      setPrecio(null)
      setDistancia(null)
      setBounds(null)
      setDirectionsRequest(null)
    }
  }, [origenCoord, destinoCoord])

  const [directionsRequest, setDirectionsRequest] = useState(null)
  const [awaitingDirectionsOnSubmit, setAwaitingDirectionsOnSubmit] = useState(false)

  const searchTimer = useRef(null)
  const abortRef = useRef(null)
  const cacheRef = useRef(new Map())

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
      setPosition(coords)
    }
    if (tipo === "destino") {
      setFormData((p) => ({ ...p, destino: item.display_name }))
      setSugDestino([])
      setDestinoCoord(coords)
      setPosition(coords)
    }
  }

  const validateName = (name, field) => {
    const regex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/
    if (!name.trim()) {
      return `El ${field} es requerido`
    }
    if (!regex.test(name)) {
      return `El ${field} solo debe contener letras`
    }
    return null
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      return "El email es requerido"
    }
    if (!regex.test(email)) {
      return "Email inválido"
    }
    return null
  }

  const handleSubmit = async (e) => {
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
      setToastMessage("Por favor, corrige los errores en el formulario")
      setShowToast(true)
      return
    }
    
    if (!origenCoord || !destinoCoord) {
      setToastMessage("Selecciona ubicaciones válidas")
      setShowToast(true)
      return
    }
    
    if (!precio) {
      setToastMessage("Espera a que se calcule el precio")
      setShowToast(true)
      return
    }
    
    window.Culqi.settings({
      title: 'Servicio de Transporte',
      description: `Viaje de ${distancia} km - ${formData.tipo}`,
      currency: 'PEN',
      amount: Math.round(precio * 100)
    })
    
    window.Culqi.options({
      style: {
        logo: 'https://culqi.com/LogoCulqi.png',
        maincolor: '#00aaff',
        buttontext: '#ffffff',
        maintext: '#4A4A4A',
        desctext: '#4A4A4A'
      },
      paymentMethods: {
        tarjeta: true,
        bancaMovil: false,
        agente: false,
        billetera: false,
        cuotealo: false,
        yape: false
      }
    })
    
    window.Culqi.open()
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
    if (coordTemp) setPosition(coordTemp)
  }

  if (cargandoViajeActivo) {
    return (
      <div className="map-container">
        <div className="searching-overlay">
          <div className="searching-card">
            <Spinner animation="border" className="searching-spinner" />
            <h3 className="searching-text">Cargando...</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="map-container">
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="danger">
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {estadisticas && estadisticas.totalViajes > 0 && !viajeSolicitado && (
        <Card className="stats-panel-bottom-left">
          <h6 className="fw-bold text-light mb-3 text-center">Mis Estadísticas</h6>
          <div className="stat-item">
            <span>Total viajes:</span>
            <span className="fw-bold">{estadisticas.totalViajes}</span>
          </div>
          <div className="stat-item">
            <span>Gasto total:</span>
            <span className="fw-bold text-danger">S/ {estadisticas.gastoTotal.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span>Distancia total:</span>
            <span className="fw-bold">{estadisticas.distanciaTotal.toFixed(2)} km</span>
          </div>
        </Card>
      )}

      <div className="map-element">
        <GoogleMapView
          center={{ lat: position[0], lng: position[1] }}
          zoom={15}
          markers={[
            ...(origenCoord ? [{ position: { lat: origenCoord[0], lng: origenCoord[1] } }] : []),
            ...(destinoCoord ? [{ position: { lat: destinoCoord[0], lng: destinoCoord[1] } }] : []),
          ]}
          directions={directionsRequest}
          onDirections={({ directionsResult, distanceMeters }) => {
            const BASE_FARE = 10
            const PER_KM = 2.5
            const km = (distanceMeters || 0) / 1000
            const computedPrice = Math.max((BASE_FARE + PER_KM * km), 5)
            setPrecio(parseFloat(computedPrice.toFixed(2)))
            setDistancia(parseFloat(km.toFixed(2)))
            if (awaitingDirectionsOnSubmit) {
              setAwaitingDirectionsOnSubmit(false)
            }
          }}
        />
      </div>

      {pagoExitoso && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h3 className="success-text">¡Pago Exitoso!</h3>
            <p className="success-subtitle">Tu pago ha sido procesado correctamente</p>
          </div>
        </div>
      )}

      {pagoFallido && (
        <div className="error-overlay">
          <div className="error-card">
            <div className="error-icon">✕</div>
            <h3 className="error-text">Pago Fallido</h3>
            <p className="error-subtitle">{errorMessage}</p>
          </div>
        </div>
      )}

      {buscando && (
        <div className="searching-overlay">
          <div className="searching-card">
            <Spinner animation="border" className="searching-spinner" />
            <h3 className="searching-text">Buscando conductor</h3>
            <div className="searching-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {viajeSolicitado && viajeData && (
        <Card className="viaje-activo-card p-4 text-light">
          <div className="viaje-header">
            <h5 className="mb-0">Viaje en Proceso</h5>
          </div>
          <hr className="my-2" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
          <div className="viaje-info">
            <div className="info-row">
              <span className="info-label">Cliente:</span>
              <span className="info-value">{viajeData.nombre} {viajeData.apellido}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Origen:</span>
              <span className="info-value">{viajeData.origen.substring(0, 40)}...</span>
            </div>
            <div className="info-row">
              <span className="info-label">Destino:</span>
              <span className="info-value">{viajeData.destino.substring(0, 40)}...</span>
            </div>
            <div className="info-row">
              <span className="info-label">Tipo:</span>
              <span className="info-value">{viajeData.tipo}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Distancia:</span>
              <span className="info-value fw-bold">{viajeData.distancia} km</span>
            </div>
            <div className="info-row">
              <span className="info-label">Costo:</span>
              <span className="info-value fw-bold text-success">S/ {viajeData.precio}</span>
            </div>
            {viajeData.chargeId && (
              <div className="info-row">
                <span className="info-label">ID de Pago:</span>
                <span className="info-value" style={{fontSize: '11px'}}>{viajeData.chargeId}</span>
              </div>
            )}
          </div>
          <div className="status-badge">
            <Spinner animation="border" size="sm" className="me-2" />
            {viajeData.estado === 'BUSCANDO_CONDUCTOR' && 'Buscando conductor'}
            {viajeData.estado === 'CONDUCTOR_ASIGNADO' && 'Conductor asignado'}
            {viajeData.estado === 'EN_CAMINO' && 'Conductor en camino'}
            {viajeData.estado === 'EN_PROGRESO' && 'Viaje en progreso'}
            {viajeData.estado === 'COMPLETADO' && 'Viaje completado'}
          </div>
        </Card>
      )}

      {!viajeSolicitado && (
        <Card className="floating-card p-4 text-light">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Solicitar un servicio</h4>
            <Button className="invert-btn" onClick={invertir}>⇅</Button>
          </div>

          {precio && distancia && (
            <div className="price-box mb-3">
              <div>
                <span className="price-title">Distancia:</span>
                <span className="price-subtitle"> {distancia} km</span>
              </div>
              <div>
                <span className="price-title">Costo estimado:</span>
                <span className="price-value"> S/ {precio}</span>
              </div>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Row className="g-4">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    isInvalid={!!errors.nombre}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    isInvalid={!!errors.apellido}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.apellido}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6} className="position-relative">
                <Form.Group>
                  <Form.Label className="fw-semibold">Punto de inicio</Form.Label>
                  <Form.Control
                    ref={origenRef}
                    type="text"
                    name="origen"
                    value={formData.origen}
                    onChange={handleChange}
                    required
                  />
                  {sugOrigen.length > 0 && (
                    <ListGroup className="suggest-box" style={{ width: anchoOrigen }}>
                      {sugOrigen.map((s, i) => (
                        <ListGroup.Item key={i} action onClick={() => handleSelectSuggestion(s, "origen")}>
                          {s.display_name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Form.Group>
              </Col>

              <Col xs={12} md={6} className="position-relative">
                <Form.Group>
                  <Form.Label className="fw-semibold">Destino</Form.Label>
                  <Form.Control
                    ref={destinoRef}
                    type="text"
                    name="destino"
                    value={formData.destino}
                    onChange={handleChange}
                    required
                  />
                  {sugDestino.length > 0 && (
                    <ListGroup className="suggest-box" style={{ width: anchoDestino }}>
                      {sugDestino.map((s, i) => (
                        <ListGroup.Item key={i} action onClick={() => handleSelectSuggestion(s, "destino")}>
                          {s.display_name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Tipo de carga</Form.Label>
                  <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
                    <option value="">Seleccionar...</option>
                    <option>Mudanza</option>
                    <option>Productos grandes</option>
                    <option>Industrial</option>
                    <option>Comercial</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={8}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Comentarios adicionales</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mt-3">
              <Button type="submit" className="fw-bold px-4 py-2" variant="info" disabled={buscando}>
                Continuar al pago
              </Button>
            </div>
          </Form>
        </Card>
      )}

      <style>{`
        .map-container { position: relative; width: 100%; height: 100vh; }
        .map-element { width: 100%; height: 100%; }
        .stats-panel-bottom-left {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(20, 27, 54, 0.95);
          backdrop-filter: blur(15px);
          border-radius: 15px;
          padding: 15px;
          z-index: 2000;
          min-width: 220px;
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
          border: 2px solid #00d4ff;
        }
        .stat-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          color: #ffffff;
          font-size: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .stat-item:last-child {
          border-bottom: none;
        }
        .floating-card {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 900px;
          background: rgba(20,27,54,0.9);
          border-radius: 25px 25px 0 0;
          backdrop-filter: blur(15px);
          z-index: 2000;
        }
        .invert-btn {
          background: #00d4ff;
          border: none;
          color: black;
          padding: 7px 18px;
          font-size: 20px;
          border-radius: 12px;
        }
        .suggest-box {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          max-height: 150px;
          overflow-y: auto;
          z-index: 5000;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .price-box {
          background: white;
          padding: 12px 18px;
          border-radius: 12px;
          display:flex;
          justify-content:space-between;
          align-items:center;
        }
        .price-title { font-size:16px; font-weight:700; color:#222; }
        .price-subtitle { font-size:18px; font-weight:900; color:#555; }
        .price-value { font-size:24px; font-weight:900; color:#00aaff; }
        .success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          z-index: 6000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-in;
        }
        .success-card {
          background: white;
          padding: 50px 60px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideUpCenter 0.4s ease-out;
        }
        .success-icon {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #4CAF50;
          color: white;
          font-size: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          animation: scaleIn 0.5s ease-out;
        }
        .success-text {
          font-size: 32px;
          font-weight: 800;
          color: #333;
          margin-bottom: 10px;
        }
        .success-subtitle {
          font-size: 18px;
          color: #666;
          margin: 0;
        }
        .error-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          z-index: 6000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-in;
        }
        .error-card {
          background: white;
          padding: 50px 60px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideUpCenter 0.4s ease-out;
        }
        .error-icon {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #f44336;
          color: white;
          font-size: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          animation: scaleIn 0.5s ease-out;
        }
        .error-text {
          font-size: 32px;
          font-weight: 800;
          color: #333;
          margin-bottom: 10px;
        }
        .error-subtitle {
          font-size: 18px;
          color: 666;
          margin: 0;
        }
        .searching-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-in;
        }
        .searching-card {
          background: white;
          padding: 50px 60px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideUpCenter 0.4s ease-out;
        }
        .searching-spinner {
          width: 80px;
          height: 80px;
          color: #00d4ff;
          border-width: 6px;
        }
        .searching-text {
          margin-top: 25px;
          font-size: 28px;
          font-weight: 800;
          color: #333;
        }
        .searching-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
        }
        .searching-dots span {
          width: 12px;
          height: 12px;
          background: #00d4ff;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .searching-dots span:nth-child(1) { animation-delay: -0.32s; }
        .searching-dots span:nth-child(2) { animation-delay: -0.16s; }
        .viaje-activo-card {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 900px;
          background: rgba(20, 27, 54, 0.95);
          border-radius: 25px 25px 0 0;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          z-index: 3000;
          backdrop-filter: blur(15px);
          animation: slideUp 0.4s ease-out;
        }
        .viaje-header {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
        }
        .viaje-header h5 {
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .viaje-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .info-label {
          font-size: 14px;
          font-weight: 600;
          color: #b0b8d4;
        }
        .info-value {
          font-size: 15px;
          color: #ffffff;
          text-align: right;
          max-width: 65%;
        }
        .status-badge {
          margin-top: 15px;
          padding: 12px;
          background: rgba(0, 212, 255, 0.2);
          border: 2px solid #00d4ff;
          border-radius: 12px;
          text-align: center;
          font-weight: 700;
          color: #00d4ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px) translateX(-50%); opacity: 0; }
          to { transform: translateY(0) translateX(-50%); opacity: 1; }
        }
        @keyframes slideUpCenter {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        @media (max-width: 768px) {
          .viaje-activo-card, .floating-card {
            max-width: 95%;
            padding: 20px;
          }
          .stats-panel-bottom-left {
            bottom: 10px;
            left: 10px;
            font-size: 12px;
            min-width: 180px;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  )
}

export default ClienteUI