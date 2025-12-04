import { useState, useEffect, useCallback } from "react"
import GoogleMapView from "../components/GoogleMapView"
import { geocodeAddress } from "../services/maps"
import { useConductorViajes } from "../hooks/useConductorViajes"
import { FormularioConductor } from "../components/FormularioConductor"
import { ModalViajeTerminado } from "../components/ModalViajeTerminado"

function ConductorUI() {
  const [position, setPosition] = useState([-12.0464, -77.0428])
  const [directionsRequest, setDirectionsRequest] = useState(null)
  const [viajeConcluido, setViajeConcluido] = useState(false)
  
  const DRIVER_ID = 1

  const {
    viajeAsignado,
    estadoViaje,
    buscandoViaje,
    estadisticas,
    dirigirme,
    iniciarViaje,
    finalizarViaje,
    resetearViaje
  } = useConductorViajes(DRIVER_ID)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => console.warn("No se pudo obtener la ubicación del conductor")
      )
    }
  }, [])

  useEffect(() => {
    if (viajeAsignado && estadoViaje) {
      if (estadoViaje === "esperando") {
        mostrarRutaAlOrigen()
      } else if (estadoViaje === "enCamino") {
        mostrarRutaAlDestino()
      }
    }
  }, [estadoViaje, viajeAsignado])

  const getCoordinates = async (direccion) => {
    try {
      const res = await geocodeAddress(direccion)
      if (res) return [res.lat, res.lng]
      return null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const mostrarRutaAlOrigen = async () => {
    if (navigator.geolocation && viajeAsignado) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const miUbicacion = [pos.coords.latitude, pos.coords.longitude]
          setPosition(miUbicacion)
          
          const coordOrigen = viajeAsignado.origenLat && viajeAsignado.origenLng
            ? [viajeAsignado.origenLat, viajeAsignado.origenLng]
            : await getCoordinates(viajeAsignado.origen)
          
          if (coordOrigen) {
            setDirectionsRequest({
              origin: { lat: miUbicacion[0], lng: miUbicacion[1] },
              destination: { lat: coordOrigen[0], lng: coordOrigen[1] }
            })
          }
        }
      )
    }
  }

  const mostrarRutaAlDestino = async () => {
    if (!viajeAsignado) return

    const coordOrigen = viajeAsignado.origenLat && viajeAsignado.origenLng
      ? [viajeAsignado.origenLat, viajeAsignado.origenLng]
      : await getCoordinates(viajeAsignado.origen)
    
    const coordDestino = viajeAsignado.destinoLat && viajeAsignado.destinoLng
      ? [viajeAsignado.destinoLat, viajeAsignado.destinoLng]
      : await getCoordinates(viajeAsignado.destino)
    
    if (coordOrigen && coordDestino) {
      setDirectionsRequest({
        origin: { lat: coordOrigen[0], lng: coordOrigen[1] },
        destination: { lat: coordDestino[0], lng: coordDestino[1] }
      })
    }
  }

  const handleDirigirme = async () => {
    const success = await dirigirme()
    if (success) {
      await mostrarRutaAlOrigen()
    }
  }

  const handleIniciarViaje = async () => {
    const success = await iniciarViaje()
    if (success) {
      await mostrarRutaAlDestino()
    }
  }

  const handleFinalizarViaje = async () => {
    const success = await finalizarViaje()
    if (success) {
      setViajeConcluido(true)
      
      setTimeout(() => {
        setViajeConcluido(false)
        setDirectionsRequest(null)
        resetearViaje()
      }, 2500)
    }
  }

  return (
    <div className="app-layout">
      <ModalViajeTerminado mostrar={viajeConcluido} />

      <div className="left-sidebar">
        <FormularioConductor
          viajeActivo={viajeAsignado}
          estadoViaje={estadoViaje}
          buscandoViaje={buscandoViaje}
          estadisticas={estadisticas}
          onDirigirme={handleDirigirme}
          onIniciarViaje={handleIniciarViaje}
          onFinalizarViaje={handleFinalizarViaje}
        />
      </div>

      <div className="map-container">
        <GoogleMapView
          center={{ lat: position[0], lng: position[1] }}
          zoom={13}
          markers={[{ position: { lat: position[0], lng: position[1] } }]}
          directions={directionsRequest}
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
            width: 100%;
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

export default ConductorUI