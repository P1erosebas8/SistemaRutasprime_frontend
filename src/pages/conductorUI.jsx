import { useState, useEffect, useRef } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import GoogleMapView from "../components/GoogleMapView";
import { geocodeAddress } from "../services/maps";
import { apiRequest } from "../services/api";
import { guardarViajeConductor, obtenerEstadisticasConductor } from "../services/storageService";

function ConductorUI() {
  const [position, setPosition] = useState([-12.0464, -77.0428]);
  const [directionsRequest, setDirectionsRequest] = useState(null);
  const [viajeConcluido, setViajeConcluido] = useState(false);
  const [buscandoViaje, setBuscandoViaje] = useState(true);
  const [estadoViaje, setEstadoViaje] = useState(null);
  const [viajeAsignado, setViajeAsignado] = useState(null);
  const pollingInterval = useRef(null);
  const [estadisticas, setEstadisticas] = useState(null);
  
  const DRIVER_ID = 1;

  useEffect(() => {
    const stats = obtenerEstadisticasConductor();
    setEstadisticas(stats);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => console.warn("No se pudo obtener la ubicación del conductor")
      );
    }
  }, []);

  useEffect(() => {
    verificarViajeActivo();
  }, []);

  useEffect(() => {
    if (!viajeAsignado && buscandoViaje) {
      buscarViajesDisponibles();
      
      pollingInterval.current = setInterval(() => {
        buscarViajesDisponibles();
      }, 3000);
    }

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [viajeAsignado, buscandoViaje]);

  const verificarViajeActivo = async () => {
    try {
      console.log("Verificando viaje activo del conductor...");
      const response = await apiRequest(
        `/driver/active-trip?driverId=${DRIVER_ID}`, 
        "GET", 
        null, 
        false
      );
      
      if (response.data?.tieneViajeActivo && response.data?.viaje) {
        const viaje = response.data.viaje;
        console.log("Viaje activo encontrado:", viaje);
        
        setViajeAsignado({
          id: viaje.id,
          origen: viaje.origen,
          destino: viaje.destino,
          cliente: `${viaje.nombre} ${viaje.apellido}`,
          tipo: viaje.tipo,
          distancia: viaje.distanciaKm,
          precio: viaje.precio,
          comentarios: viaje.comentarios,
          estado: viaje.estado
        });
        
        switch(viaje.estado) {
          case 'CONDUCTOR_ASIGNADO':
            setEstadoViaje("encontrado");
            break;
          case 'EN_CAMINO':
            setEstadoViaje("esperando");
            await mostrarRutaAlOrigen(viaje);
            break;
          case 'EN_PROGRESO':
            setEstadoViaje("enCamino");
            await mostrarRutaAlDestino(viaje);
            break;
          default:
            setEstadoViaje("encontrado");
        }
        
        setBuscandoViaje(false);
      } else {
        console.log("No hay viaje activo");
        setBuscandoViaje(true);
      }
    } catch (error) {
      console.error("Error al verificar viaje activo:", error);
      setBuscandoViaje(true);
    }
  };

  const buscarViajesDisponibles = async () => {
    try {
      console.log("Buscando viajes disponibles...");
      const response = await apiRequest("/driver/available-trips", "GET", null, false);
      
      if (response.data?.hayViajes && response.data?.viajes?.length > 0) {
        const viaje = response.data.viajes[0];
        console.log("Viaje encontrado:", viaje);
        
        await aceptarViaje(viaje);
      } else {
        console.log("No hay viajes disponibles en este momento");
      }
    } catch (error) {
      console.error("Error al buscar viajes:", error);
    }
  };

  const aceptarViaje = async (viaje) => {
    try {
      console.log("Aceptando viaje ID:", viaje.id);
      
      const response = await apiRequest("/driver/accept-trip", "POST", {
        viajeId: viaje.id,
        driverId: DRIVER_ID
      }, false);
      
      if (response.data?.success) {
        const viajeAceptado = response.data.viaje;
        console.log("Viaje aceptado exitosamente:", viajeAceptado);
        
        setViajeAsignado({
          id: viajeAceptado.id,
          origen: viajeAceptado.origen,
          destino: viajeAceptado.destino,
          cliente: `${viajeAceptado.nombre} ${viajeAceptado.apellido}`,
          tipo: viajeAceptado.tipo,
          distancia: viajeAceptado.distanciaKm,
          precio: viajeAceptado.precio,
          comentarios: viajeAceptado.comentarios,
          estado: viajeAceptado.estado
        });
        
        setEstadoViaje("encontrado");
        setBuscandoViaje(false);
        
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
        }
      }
    } catch (error) {
      console.error("Error al aceptar viaje:", error);
      if (error.message.includes("ya no está disponible")) {
        console.log("Viaje ya tomado, buscando otro...");
      }
    }
  };

  const getCoordinates = async (direccion) => {
    try {
      const res = await geocodeAddress(direccion);
      if (res) return [res.lat, res.lng];
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const mostrarRutaAlOrigen = async (viaje) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const miUbicacion = [pos.coords.latitude, pos.coords.longitude];
          setPosition(miUbicacion);
          
          const coordOrigen = await getCoordinates(viaje.origen);
          
          if (coordOrigen) {
            setDirectionsRequest({
              origin: { lat: miUbicacion[0], lng: miUbicacion[1] },
              destination: { lat: coordOrigen[0], lng: coordOrigen[1] }
            });
          }
        }
      );
    }
  };

  const mostrarRutaAlDestino = async (viaje) => {
    const coordOrigen = await getCoordinates(viaje.origen);
    const coordDestino = await getCoordinates(viaje.destino);
    
    if (coordOrigen && coordDestino) {
      setDirectionsRequest({
        origin: { lat: coordOrigen[0], lng: coordOrigen[1] },
        destination: { lat: coordDestino[0], lng: coordDestino[1] }
      });
    }
  };

  const dirigirme = async () => {
    try {
      await apiRequest("/driver/update-status", "PUT", {
        viajeId: viajeAsignado.id,
        driverId: DRIVER_ID,
        estado: "EN_CAMINO"
      }, false);
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const miUbicacion = [pos.coords.latitude, pos.coords.longitude];
            setPosition(miUbicacion);
            
            const coordOrigen = await getCoordinates(viajeAsignado.origen);
            
            if (coordOrigen) {
              setDirectionsRequest({
                origin: { lat: miUbicacion[0], lng: miUbicacion[1] },
                destination: { lat: coordOrigen[0], lng: coordOrigen[1] }
              });
              setEstadoViaje("esperando");
            }
          }
        );
      }
    } catch (error) {
      console.error("Error al dirigirse al origen:", error);
    }
  };

  const iniciarViaje = async () => {
    try {
      await apiRequest("/driver/update-status", "PUT", {
        viajeId: viajeAsignado.id,
        driverId: DRIVER_ID,
        estado: "EN_PROGRESO"
      }, false);
      
      const coordOrigen = await getCoordinates(viajeAsignado.origen);
      const coordDestino = await getCoordinates(viajeAsignado.destino);
      
      if (coordOrigen && coordDestino) {
        setDirectionsRequest({
          origin: { lat: coordOrigen[0], lng: coordOrigen[1] },
          destination: { lat: coordDestino[0], lng: coordDestino[1] }
        });
        setEstadoViaje("enCamino");
      }
    } catch (error) {
      console.error("Error al iniciar viaje:", error);
    }
  };

  const finalizarViaje = async () => {
    try {
      await apiRequest("/driver/update-status", "PUT", {
        viajeId: viajeAsignado.id,
        driverId: DRIVER_ID,
        estado: "COMPLETADO"
      }, false);
      
      guardarViajeConductor(viajeAsignado);
      setEstadisticas(obtenerEstadisticasConductor());
      
      setViajeConcluido(true);
      
      setTimeout(() => {
        setViajeConcluido(false);
        setViajeAsignado(null);
        setEstadoViaje(null);
        setDirectionsRequest(null);
        setBuscandoViaje(true);
      }, 2500);
    } catch (error) {
      console.error("Error al finalizar viaje:", error);
    }
  };

  const getBotonAccion = () => {
    switch(estadoViaje) {
      case "encontrado":
        return <Button variant="primary" className="fw-bold px-4 py-2" onClick={dirigirme}>Dirigirme</Button>;
      case "esperando":
        return <Button variant="warning" className="fw-bold px-4 py-2" onClick={iniciarViaje}>En espera del cliente</Button>;
      case "enCamino":
        return <Button variant="danger" className="fw-bold px-4 py-2" onClick={finalizarViaje}>Finalizar viaje</Button>;
      default:
        return null;
    }
  };

  const getTitulo = () => {
    switch(estadoViaje) {
      case "encontrado":
        return "¡Viaje Encontrado!";
      case "esperando":
        return "En Espera del Cliente";
      case "enCamino":
        return "Viaje en Curso";
      default:
        return "";
    }
  };

  return (
    <div className="map-container">
      {estadisticas && estadisticas.totalViajes > 0 && !viajeAsignado && (
        <Card className="stats-panel-driver-bottom">
          <h6 className="fw-bold text-light mb-3 text-center">Mis Ganancias</h6>
          <div className="stat-item">
            <span>Total viajes:</span>
            <span className="fw-bold">{estadisticas.totalViajes}</span>
          </div>
          <div className="stat-item">
            <span>Ganancia total:</span>
            <span className="fw-bold text-success">S/ {estadisticas.gananciaTotal.toFixed(2)}</span>
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
          zoom={13}
          markers={[{ position: { lat: position[0], lng: position[1] } }]}
          directions={directionsRequest}
        />
      </div>

      {viajeConcluido && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="success-icon-conductor">✓</div>
            <h3 className="success-text-conductor">¡Viaje Concluido!</h3>
            <p className="success-subtitle-conductor">El viaje ha finalizado exitosamente</p>
          </div>
        </div>
      )}

      {buscandoViaje && !viajeAsignado && (
        <div className="searching-overlay-conductor">
          <div className="searching-card-conductor">
            <Spinner animation="border" className="searching-spinner-conductor" />
            <h3 className="searching-text-conductor">Buscando viaje</h3>
            <div className="searching-dots-conductor">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="mt-3 text-muted">Consultando cada 3 segundos...</p>
          </div>
        </div>
      )}

      {viajeAsignado && estadoViaje && (
        <Card className="floating-card-active text-light border-0 shadow-lg p-4">
          <h4 className="fw-bold mb-3 text-center">{getTitulo()}</h4>
          <div className="viaje-details">
            <div className="detail-row">
              <span className="detail-label">Cliente:</span>
              <span className="detail-value">{viajeAsignado.cliente}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Origen:</span>
              <span className="detail-value">{viajeAsignado.origen.substring(0, 50)}...</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Destino:</span>
              <span className="detail-value">{viajeAsignado.destino.substring(0, 50)}...</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Tipo:</span>
              <span className="detail-value">{viajeAsignado.tipo}</span>
            </div>
            {viajeAsignado.comentarios && (
              <div className="detail-row">
                <span className="detail-label">Comentarios:</span>
                <span className="detail-value">{viajeAsignado.comentarios}</span>
              </div>
            )}
            <div className="detail-row">
              <span className="detail-label">Distancia:</span>
              <span className="detail-value fw-bold">{viajeAsignado.distancia} km</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Ganancia:</span>
              <span className="detail-value fw-bold text-success">S/ {(viajeAsignado.precio * 0.8).toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            {getBotonAccion()}
          </div>
        </Card>
      )}

      <style>{`
        .map-container {
          position: relative;
          width: 100%;
          height: 100vh;
        }
        .map-element {
          width: 100%;
          height: 100%;
        }
        .stats-panel-driver-bottom {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(30, 42, 82, 0.95);
          backdrop-filter: blur(15px);
          border-radius: 15px;
          padding: 15px;
          z-index: 2000;
          min-width: 220px;
          border: 2px solid #00d4ff;
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
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
        .floating-card-active {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 95%;
          max-width: 500px;
          background: linear-gradient(135deg, #1e2a52, #27396d);
          backdrop-filter: blur(12px);
          border-radius: 20px 20px 0 0;
          z-index: 1000;
          transition: all 0.3s ease;
          animation: slideUpCard 0.4s ease-out;
        }
        .viaje-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 15px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .detail-label {
          font-weight: 600;
          color: #b0b8d4;
        }
        .detail-value {
          color: #ffffff;
          text-align: right;
          max-width: 60%;
        }
        .modal-overlay {
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
        .modal-card {
          background: white;
          padding: 50px 60px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideUpModal 0.4s ease-out;
        }
        .success-icon-conductor {
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
        .success-text-conductor {
          font-size: 32px;
          font-weight: 800;
          color: #333;
          margin-bottom: 10px;
        }
        .success-subtitle-conductor {
          font-size: 18px;
          color: #666;
          margin: 0;
        }
        .searching-overlay-conductor {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-in;
        }
        .searching-card-conductor {
          background: white;
          padding: 50px 60px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideUpModal 0.4s ease-out;
        }
        .searching-spinner-conductor {
          width: 80px;
          height: 80px;
          color: #00d4ff;
          border-width: 6px;
        }
        .searching-text-conductor {
          margin-top: 25px;
          font-size: 28px;
          font-weight: 800;
          color: #333;
        }
        .searching-dots-conductor {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
        }
        .searching-dots-conductor span {
          width: 12px;
          height: 12px;
          background: #00d4ff;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .searching-dots-conductor span:nth-child(1) {
          animation-delay: -0.32s;
        }
        .searching-dots-conductor span:nth-child(2) {
          animation-delay: -0.16s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpCard {
          from { transform: translateY(50px) translateX(-50%); opacity: 0; }
          to { transform: translateY(0) translateX(-50%); opacity: 1; }
        }
        @keyframes slideUpModal {
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
          .stats-panel-driver-bottom {
            bottom: 10px;
            left: 10px;
            font-size: 12px;
            min-width: 180px;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default ConductorUI;