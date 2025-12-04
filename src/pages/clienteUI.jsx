import { useState, useEffect, useCallback } from "react"
import { Spinner } from "react-bootstrap"
import GoogleMapView from "../components/GoogleMapView"
import { FormularioViaje } from "../components/FormularioViaje"
import { OverlaysPago } from "../components/OverlaysPago"
import { ModalViajeTerminado } from "../components/ModalViajeTerminado"
import { useClienteViajes } from "../hooks/useClienteViajes"

function ClienteUI() {
  const [origenCoord, setOrigenCoord] = useState(null)
  const [destinoCoord, setDestinoCoord] = useState(null)
  const [position, setPosition] = useState([-12.0464, -77.0428])
  const [precio, setPrecio] = useState(null)
  const [distancia, setDistancia] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [pagoExitoso, setPagoExitoso] = useState(false)
  const [pagoFallido, setPagoFallido] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [buscando, setBuscando] = useState(false)
  const [directionsRequest, setDirectionsRequest] = useState(null)
  const [formDataActual, setFormDataActual] = useState(null)
  const [viajeConcluido, setViajeConcluido] = useState(false)

  const CULQI_PUBLIC_KEY = import.meta.env.VITE_CULQI_PUBLIC_KEY

  const {
    viajeData,
    setViajeData,
    viajeSolicitado,
    setViajeSolicitado,
    cargandoViajeActivo,
    estadisticas,
    procesarPago,
    iniciarPollingEstado
  } = useClienteViajes()

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
    console.log("Estado del viaje actualizado:", viajeData?.estado)
    
    if (viajeData && viajeData.estado === 'COMPLETADO') {
      console.log("Viaje completado detectado, mostrando modal...")
      setViajeConcluido(true)
      
      setTimeout(() => {
        console.log("Cerrando modal y reseteando estado...")
        setViajeConcluido(false)
        setViajeSolicitado(false)
        setViajeData(null)
        setOrigenCoord(null)
        setDestinoCoord(null)
        setDirectionsRequest(null)
        setPrecio(null)
        setDistancia(null)
      }, 2500)
    }
  }, [viajeData?.estado])

  useEffect(() => {
    if (window.Culqi) {
      window.Culqi.publicKey = CULQI_PUBLIC_KEY

      window.culqi = async function () {
        if (window.Culqi.token) {
          const token = window.Culqi.token.id
          const email = window.Culqi.token.email

          try {
            const paymentData = {
              token: token,
              amount: Math.round(precio * 100),
              email: formDataActual.email || email,
              firstName: formDataActual.nombre,
              lastName: formDataActual.apellido,
              descripcion: `Servicio de transporte - ${formDataActual.tipo}`,
              origen: formDataActual.origen,
              destino: formDataActual.destino,
              origenLat: origenCoord[0],
              origenLng: origenCoord[1],
              destinoLat: destinoCoord[0],
              destinoLng: destinoCoord[1],
              tipo: formDataActual.tipo,
              comentarios: formDataActual.comentarios,
              distancia: distancia
            }

            const result = await procesarPago(paymentData)

            window.Culqi.close()

            if (result.success) {
              setPagoExitoso(true)

              setTimeout(() => {
                setPagoExitoso(false)
                setBuscando(true)

                setTimeout(() => {
                  setBuscando(false)
                  setViajeSolicitado(true)
                  setViajeData({
                    id: result.viajeId,
                    nombre: formDataActual.nombre,
                    apellido: formDataActual.apellido,
                    origen: formDataActual.origen,
                    destino: formDataActual.destino,
                    tipo: formDataActual.tipo,
                    comentarios: formDataActual.comentarios,
                    precio: precio,
                    distancia: distancia,
                    chargeId: result.chargeId,
                    estado: result.estado,
                    pagoExitoso: true
                  })

                  iniciarPollingEstado(result.viajeId)
                }, 5000)
              }, 2000)
            } else {
              let friendlyError = "Error al procesar el pago"
              if (result.message) {
                try {
                  const parsed = JSON.parse(result.message.replace("Error de Culqi: ", ""))
                  const declineCode = parsed.decline_code || parsed.merchant_message
                  friendlyError = errorMessages[declineCode] || parsed.user_message || friendlyError
                } catch {
                  friendlyError = result.message
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
  }, [formDataActual, precio, distancia, origenCoord, destinoCoord])

  useEffect(() => {
    if (navigator.geolocation && !viajeSolicitado) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude]
          setPosition(coords)
        },
        () => { }
      )
    }
  }, [viajeSolicitado])

  useEffect(() => {
    if (viajeData && viajeData.origenCoord && viajeData.destinoCoord) {
      setOrigenCoord(viajeData.origenCoord)
      setDestinoCoord(viajeData.destinoCoord)
      setPosition(viajeData.origenCoord)
      setBounds([viajeData.origenCoord, viajeData.destinoCoord])
      setDistancia(viajeData.distancia)
      setPrecio(viajeData.precio)
    }
  }, [viajeData])

  useEffect(() => {
    if (origenCoord && destinoCoord) {
      const o = { lat: origenCoord[0], lng: origenCoord[1] }
      const d = { lat: destinoCoord[0], lng: destinoCoord[1] }
      setDirectionsRequest({ origin: o, destination: d })
    } else {
      setPrecio(null)
      setDistancia(null)
      setDirectionsRequest(null)
    }
  }, [origenCoord, destinoCoord])  

  const handleFormSubmit = ({ formData, origenCoord: origen, destinoCoord: destino }) => {
    if (!precio || !distancia) {
      console.error("No hay precio o distancia calculados")
      return
    }

    setFormDataActual(formData)
    setOrigenCoord(origen)
    setDestinoCoord(destino)

    window.Culqi.settings({
      title: 'Servicio de Transporte',
      description: `Viaje de ${distancia} km - ${formData.tipo}`,
      currency: 'PEN',
      amount: Math.round(precio * 100)
    })

    window.Culqi.options({
      style: {
        logo: 'https://culqi.com/LogoCulqi.png',
        maincolor: '#667eea',
        buttontext: '#ffffff',
        maintext: '#000000',
        desctext: '#666666'
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

  const handleDirectionsCallback = useCallback(({ directionsResult, distanceMeters }) => {
    const BASE_FARE = 10
    const PER_KM = 2.5
    const km = (distanceMeters || 0) / 1000
    const computedPrice = Math.max((BASE_FARE + PER_KM * km), 5)
    setPrecio(parseFloat(computedPrice.toFixed(2)))
    setDistancia(parseFloat(km.toFixed(2)))
  }, [])

  const handleCoordinatesChange = useCallback(({ origenCoord, destinoCoord }) => {
    console.log("Recibiendo coordenadas del formulario:", { origenCoord, destinoCoord })
    setOrigenCoord(origenCoord)
    setDestinoCoord(destinoCoord)
  }, [])

  if (cargandoViajeActivo) {
    return (
      <div className="app-layout">
        <div className="loading-screen">
          <div className="loading-box">
            <Spinner animation="border" className="loading-spinner" />
            <h3 className="loading-text">Cargando...</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <OverlaysPago
        pagoExitoso={pagoExitoso}
        pagoFallido={pagoFallido}
        errorMessage={errorMessage}
      />

      <ModalViajeTerminado mostrar={viajeConcluido} />

      <div className="left-sidebar">
        <FormularioViaje
          onSubmit={handleFormSubmit}
          precio={precio}
          distancia={distancia}
          buscando={buscando}
          estadisticas={estadisticas}
          viajeActivo={viajeSolicitado ? viajeData : null}
          onCoordinatesChange={handleCoordinatesChange}
        />
      </div>

      <div className={`map-container ${!viajeSolicitado ? 'with-sidebar' : 'full-width'}`}>
        <GoogleMapView
          center={{ lat: position[0], lng: position[1] }}
          zoom={15}
          markers={[
            ...(origenCoord ? [{ position: { lat: origenCoord[0], lng: origenCoord[1] } }] : []),
            ...(destinoCoord ? [{ position: { lat: destinoCoord[0], lng: destinoCoord[1] } }] : []),
          ]}
          directions={directionsRequest}
          onDirections={handleDirectionsCallback}
        />
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          overflow: hidden;
          height: 100%;
          width: 100%;
        }

        .app-layout {
          display: flex;
          position: fixed;
          top: 100px;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: calc(100vh - 100px);
          overflow: hidden;
        }

        .left-sidebar {
          width: 420px;
          min-width: 420px;
          height: 100%;
          background: white;
          box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          overflow: hidden;
        }

        .map-container {
          flex: 1;
          height: 100%;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .map-container.full-width {
          width: 100%;
        }

        .map-container.with-sidebar {
          width: calc(100% - 420px);
        }

        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-box {
          text-align: center;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          color: #667eea;
          margin-bottom: 16px;
        }

        .loading-text {
          font-size: 18px;
          font-weight: 600;
          color: #000;
        }

        @media (max-width: 768px) {
          .app-layout {
            flex-direction: column;
            top: 80px;
            height: calc(100vh - 80px);
          }

          .left-sidebar {
            width: 100%;
            min-width: 100%;
            height: 45vh;
            max-height: 45vh;
            order: 2;
            border-radius: 20px 20px 0 0;
            box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: hidden;
          }

          .map-container {
            width: 100% !important;
            height: 100%;
            order: 1;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default ClienteUI