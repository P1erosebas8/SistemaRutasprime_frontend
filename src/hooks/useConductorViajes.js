import { useState, useEffect, useRef } from "react"
import { apiRequest } from "../services/api"
import { guardarViajeConductor, obtenerEstadisticasConductor } from "../services/storageService"


export const useConductorViajes = (driverId) => {
  const [viajeAsignado, setViajeAsignado] = useState(null)
  const [estadoViaje, setEstadoViaje] = useState(null)
  const [buscandoViaje, setBuscandoViaje] = useState(true)
  const [estadisticas, setEstadisticas] = useState(null)
  const pollingInterval = useRef(null)


  // Cargar estadísticas
  useEffect(() => {
    const stats = obtenerEstadisticasConductor()
    setEstadisticas(stats)
  }, [])


  // Verificar viaje activo al cargar (solo si driverId está disponible)
  useEffect(() => {
    if (driverId) {
      verificarViajeActivo()
    }
  }, [driverId])


  // Buscar viajes disponibles (solo si driverId está disponible)
  useEffect(() => {
    if (!driverId) {
      console.log("Esperando Driver ID...")
      return
    }

    if (!viajeAsignado && buscandoViaje) {
      buscarViajesDisponibles()
      
      pollingInterval.current = setInterval(() => {
        buscarViajesDisponibles()
      }, 3000)
    }


    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    }
  }, [viajeAsignado, buscandoViaje, driverId])


  const verificarViajeActivo = async () => {
    if (!driverId) return
    
    try {
      console.log("Verificando viaje activo del conductor:", driverId)
      const response = await apiRequest(
        `/driver/active-trip?driverId=${driverId}`, 
        "GET", 
        null, 
        false
      )
      
      if (response.data?.tieneViajeActivo && response.data?.viaje) {
        const viaje = response.data.viaje
        console.log("Viaje activo encontrado:", viaje)
        
        const viajeData = {
          id: viaje.id,
          origen: viaje.origen,
          destino: viaje.destino,
          cliente: `${viaje.nombre} ${viaje.apellido}`,
          tipo: viaje.tipo,
          distancia: viaje.distanciaKm,
          precio: viaje.precio,
          comentarios: viaje.comentarios,
          estado: viaje.estado,
          origenLat: viaje.origenLat,
          origenLng: viaje.origenLng,
          destinoLat: viaje.destinoLat,
          destinoLng: viaje.destinoLng
        }
        
        setViajeAsignado(viajeData)
        
        switch(viaje.estado) {
          case 'CONDUCTOR_ASIGNADO':
            setEstadoViaje("encontrado")
            break
          case 'EN_CAMINO':
            setEstadoViaje("esperando")
            break
          case 'EN_PROGRESO':
            setEstadoViaje("enCamino")
            break
          default:
            setEstadoViaje("encontrado")
        }
        
        setBuscandoViaje(false)
      } else {
        console.log("No hay viaje activo")
        setBuscandoViaje(true)
      }
    } catch (error) {
      console.error("Error al verificar viaje activo:", error)
      setBuscandoViaje(true)
    }
  }


  const buscarViajesDisponibles = async () => {
    if (!driverId) return
    
    try {
      console.log("Buscando viajes disponibles...")
      const response = await apiRequest("/driver/available-trips", "GET", null, false)
      
      if (response.data?.hayViajes && response.data?.viajes?.length > 0) {
        const viaje = response.data.viajes[0]
        console.log("Viaje encontrado:", viaje)
        await aceptarViaje(viaje)
      } else {
        console.log("No hay viajes disponibles en este momento")
      }
    } catch (error) {
      console.error("Error al buscar viajes:", error)
    }
  }


  const aceptarViaje = async (viaje) => {
    if (!driverId) {
      console.error("No se puede aceptar viaje sin driverId")
      return
    }
    
    try {
      console.log("Aceptando viaje ID:", viaje.id, "con driverId:", driverId)
      
      const response = await apiRequest("/driver/accept-trip", "POST", {
        viajeId: viaje.id,
        driverId: driverId
      }, false)
      
      if (response.data?.success) {
        const viajeAceptado = response.data.viaje
        console.log("Viaje aceptado exitosamente:", viajeAceptado)
        
        setViajeAsignado({
          id: viajeAceptado.id,
          origen: viajeAceptado.origen,
          destino: viajeAceptado.destino,
          cliente: `${viajeAceptado.nombre} ${viajeAceptado.apellido}`,
          tipo: viajeAceptado.tipo,
          distancia: viajeAceptado.distanciaKm,
          precio: viajeAceptado.precio,
          comentarios: viajeAceptado.comentarios,
          estado: viajeAceptado.estado,
          origenLat: viajeAceptado.origenLat,
          origenLng: viajeAceptado.origenLng,
          destinoLat: viajeAceptado.destinoLat,
          destinoLng: viajeAceptado.destinoLng
        })
        
        setEstadoViaje("encontrado")
        setBuscandoViaje(false)
        
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current)
        }
      }
    } catch (error) {
      console.error("Error al aceptar viaje:", error)
      if (error.message && error.message.includes("ya no está disponible")) {
        console.log("Viaje ya tomado, buscando otro...")
      }
    }
  }


  const actualizarEstadoViaje = async (nuevoEstado) => {
    if (!driverId) return false
    
    try {
      await apiRequest("/driver/update-status", "PUT", {
        viajeId: viajeAsignado.id,
        driverId: driverId,
        estado: nuevoEstado
      }, false)
      return true
    } catch (error) {
      console.error("Error al actualizar estado del viaje:", error)
      return false
    }
  }


  const dirigirme = async () => {
    const success = await actualizarEstadoViaje("EN_CAMINO")
    if (success) {
      setEstadoViaje("esperando")
    }
    return success
  }


  const iniciarViaje = async () => {
    const success = await actualizarEstadoViaje("EN_PROGRESO")
    if (success) {
      setEstadoViaje("enCamino")
    }
    return success
  }


  const finalizarViaje = async () => {
    const success = await actualizarEstadoViaje("COMPLETADO")
    if (success) {
      guardarViajeConductor(viajeAsignado)
      setEstadisticas(obtenerEstadisticasConductor())
      return true
    }
    return false
  }


  const resetearViaje = () => {
    setViajeAsignado(null)
    setEstadoViaje(null)
    setBuscandoViaje(true)
  }


  return {
    viajeAsignado,
    estadoViaje,
    buscandoViaje,
    estadisticas,
    dirigirme,
    iniciarViaje,
    finalizarViaje,
    resetearViaje
  }
}