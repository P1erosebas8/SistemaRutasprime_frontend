import { useState, useEffect, useRef } from "react"
import { Card, Form, Button, Row, Col, ListGroup, Spinner } from "react-bootstrap"
import GoogleMapView from "../components/GoogleMapView"
import { geocodeAddress } from "../services/maps"

function ChangeView() { return null } 

function ClienteUI() {
  const [formData, setFormData] = useState({ origen: "", destino: "", tipo: "", comentarios: "" })
  const [origenCoord, setOrigenCoord] = useState(null)
  const [destinoCoord, setDestinoCoord] = useState(null)
  const [ruta, setRuta] = useState([])
  const [position, setPosition] = useState([-12.0464, -77.0428])
  const [sugOrigen, setSugOrigen] = useState([])
  const [sugDestino, setSugDestino] = useState([])
  const [precio, setPrecio] = useState(null)
  const origenRef = useRef(null)
  const destinoRef = useRef(null)
  const [anchoOrigen, setAnchoOrigen] = useState("100%")
  const [anchoDestino, setAnchoDestino] = useState("100%")
  const [bounds, setBounds] = useState(null)
  const [buscando, setBuscando] = useState(false)


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
      setRuta([])
      setBounds([origenCoord, destinoCoord])
      setDirectionsRequest({ origin: o, destination: d })
    } else {
      setPrecio(null)
      setRuta([])
      setBounds(null)
      setDirectionsRequest(null)
    }
  }, [origenCoord, destinoCoord])

  const [directionsRequest, setDirectionsRequest] = useState(null)
  const [awaitingDirectionsOnSubmit, setAwaitingDirectionsOnSubmit] = useState(false)

  // Improved search: persistent debounce, request cancellation and simple cache
  const searchTimer = useRef(null)
  const abortRef = useRef(null)
  const cacheRef = useRef(new Map())

  const searchAddress = (query, setter) => {
    // only search from 3 characters to reduce load
    if (!query || query.trim().length < 3) {
      setter([])
      return
    }

    // cache hit
    const key = query.trim()
    if (cacheRef.current.has(key)) {
      setter(cacheRef.current.get(key))
      return
    }

    // cancel previous inflight request
    if (abortRef.current) {
      try { abortRef.current.abort() } catch (e) { /* ignore */ }
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

  const getRuta = async (o, d) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${o[1]},${o[0]};${d[1]},${d[0]}?overview=full&geometries=geojson`
    const res = await fetch(url)
    const data = await res.json()
    if (data.routes?.length > 0) {
      const coords = data.routes[0].geometry.coordinates.map(([lo, la]) => [la, lo])
      setRuta(coords)
      setBounds([o, d])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!origenCoord || !destinoCoord) return alert("Selecciona ubicaciones válidas.")
    // trigger directions rendering and wait for onDirections callback to compute price
    setBuscando(true)
    setAwaitingDirectionsOnSubmit(true)
    const o = { lat: origenCoord[0], lng: origenCoord[1] }
    const d = { lat: destinoCoord[0], lng: destinoCoord[1] }
    setDirectionsRequest({ origin: o, destination: d })
    setBounds([origenCoord, destinoCoord])
  }

  const handleChange = (e) => {
    const { name, value } = e.target
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

  return (
    <div className="map-container">
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
              // compute price from distanceMeters
              const BASE_FARE = 10
              const PER_KM = 2.5
              const km = (distanceMeters || 0) / 1000
              const computedPrice = Math.max((BASE_FARE + PER_KM * km), 5)
              setPrecio(parseFloat(computedPrice.toFixed(2)))
              // if the price was awaited by a submit action, stop the searching overlay
              if (awaitingDirectionsOnSubmit) {
                setBuscando(false)
                setAwaitingDirectionsOnSubmit(false)
              }
            }}
        />
      </div>

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

      <Card className="floating-card p-4 text-light">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">🚚 Solicitar un servicio</h4>
          <Button className="invert-btn" onClick={invertir}>⇅</Button>
        </div>

        {precio && (
          <div className="price-box mb-3">
            <span className="price-title">Costo estimado:</span>
            <span className="price-value">S/ {precio}</span>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
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
              {buscando ? "Buscando..." : "Buscar conductor"}
            </Button>
          </div>
        </Form>
      </Card>

      <style>{`
        .map-container { position: relative; width: 100%; height: 100vh; }
        .map-element { width: 100%; height: 100%; }
        .floating-card {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 100%; max-width: 900px;
          background: rgba(20,27,54,0.9); border-radius: 25px 25px 0 0;
          backdrop-filter: blur(15px); z-index: 2000;
        }
        .invert-btn {
          background: #00d4ff; border: none; color: black;
          padding: 7px 18px; font-size: 20px; border-radius: 12px;
        }
        .suggest-box {
          position: absolute; top: 100%; left: 0; background: white;
          max-height: 150px; overflow-y: auto; z-index: 5000;
          border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .marker-label {
          font-weight: 900;
          font-size: 17px;
          color: black;
          padding: 4px 10px;
          text-align: center;
          margin-bottom: 4px;
        }
        .price-box {
          background: white; padding: 12px 18px; border-radius: 12px;
          display:flex; justify-content:space-between; align-items:center;
        }
        .price-title { font-size:18px; font-weight:700; color:#222; }
        .price-value { font-size:24px; font-weight:900; color:#00aaff; }
        
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
          animation: slideUp 0.4s ease-out;
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default ClienteUI