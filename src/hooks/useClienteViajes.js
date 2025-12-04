import { useState, useEffect, useRef } from "react"
import { apiRequest } from "../services/api"
import { guardarViajeCliente, obtenerEstadisticasCliente } from "../services/storageService"

export const useClienteViajes = () => {
  const [viajeData, setViajeData] = useState(null)
  const [viajeSolicitado, setViajeSolicitado] = useState(false)
  const [cargandoViajeActivo, setCargandoViajeActivo] = useState(true)
  const [estadisticas, setEstadisticas] = useState(null)
  const pollingViajeInterval = useRef(null)

  useEffect(() => {
    const stats = obtenerEstadisticasCliente()
    setEstadisticas(stats)
  }, [])

  useEffect(() => {
    verificarViajeActivo()
    return () => {
      if (pollingViajeInterval.current) {
        clearInterval(pollingViajeInterval.current)
      }
    }
  }, [])

  const verificarViajeActivo = async () => {
    const emailGuardado = localStorage.getItem("clienteEmail")
    if (!emailGuardado) {
      setCargandoViajeActivo(false)
      return
    }

    try {
      const response = await apiRequest(`/viajes/activo?email=${emailGuardado}`, "GET", null, false)
      
      if (response.data?.tieneViajeActivo && response.data?.viaje) {
        const viaje = response.data.viaje
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
          pagoExitoso: true,
          origenCoord: [viaje.origenLat, viaje.origenLng],
          destinoCoord: [viaje.destinoLat, viaje.destinoLng],
          conductorId: viaje.conductorId,
          conductorNombres: viaje.conductorNombres,
          conductorApellidos: viaje.conductorApellidos,
          conductorCelular: viaje.conductorCelular,
          conductorEmail: viaje.conductorEmail,
          vehiculoPlaca: viaje.vehiculoPlaca,
          vehiculoMarca: viaje.vehiculoMarca,
          vehiculoColor: viaje.vehiculoColor,
          vehiculoAnio: viaje.vehiculoAnio
        })
        iniciarPollingEstado(viaje.id)
      }
    } catch (error) {
      console.error("Error al verificar viaje activo:", error)
    } finally {
      setCargandoViajeActivo(false)
    }
  }

  const iniciarPollingEstado = (viajeId) => {
    if (pollingViajeInterval.current) {
      clearInterval(pollingViajeInterval.current)
    }

    pollingViajeInterval.current = setInterval(async () => {
      try {
        const response = await apiRequest(`/viajes/${viajeId}`, "GET", null, false)
        
        if (response.data?.success && response.data?.viaje) {
          const viajeActualizado = response.data.viaje
          
          console.log("Estado del viaje actualizado:", viajeActualizado.estado)
          
          setViajeData(prev => ({
            ...prev,
            estado: viajeActualizado.estado,
            conductorId: viajeActualizado.conductorId,
            conductorNombres: viajeActualizado.conductorNombres,
            conductorApellidos: viajeActualizado.conductorApellidos,
            conductorCelular: viajeActualizado.conductorCelular,
            conductorEmail: viajeActualizado.conductorEmail,
            vehiculoPlaca: viajeActualizado.vehiculoPlaca,
            vehiculoMarca: viajeActualizado.vehiculoMarca,
            vehiculoColor: viajeActualizado.vehiculoColor,
            vehiculoAnio: viajeActualizado.vehiculoAnio
          }))

          if (viajeActualizado.estado === 'COMPLETADO') {
            console.log("Viaje completado, deteniendo polling...")
            clearInterval(pollingViajeInterval.current)
            pollingViajeInterval.current = null
          }

          if (viajeActualizado.estado === 'CANCELADO') {
            clearInterval(pollingViajeInterval.current)
            pollingViajeInterval.current = null
            resetearViaje()
          }
        }
      } catch (error) {
        console.error("Error al verificar estado del viaje:", error)
      }
    }, 3000)
  }

  const procesarPago = async (paymentData) => {
    const response = await apiRequest("/pagos/procesar", "POST", paymentData, false)
    
    if (response.data?.success) {
      localStorage.setItem("clienteEmail", paymentData.email)
      
      const viajeParaGuardar = {
        id: response.data.data.viajeId,
        origen: paymentData.origen,
        destino: paymentData.destino,
        tipo: paymentData.tipo,
        distancia: paymentData.distancia,
        precio: paymentData.amount / 100,
        chargeId: response.data.data.id,
        estado: response.data.data.estado
      }

      guardarViajeCliente(viajeParaGuardar)
      setEstadisticas(obtenerEstadisticasCliente())
      
      return {
        success: true,
        viajeId: response.data.data.viajeId,
        chargeId: response.data.data.id,
        estado: response.data.data.estado
      }
    }
    
    return { success: false, message: response.data?.message }
  }

  const resetearViaje = () => {
    setViajeSolicitado(false)
    setViajeData(null)
    if (pollingViajeInterval.current) {
      clearInterval(pollingViajeInterval.current)
      pollingViajeInterval.current = null
    }
  }

  return {
    viajeData,
    setViajeData,
    viajeSolicitado,
    setViajeSolicitado,
    cargandoViajeActivo,
    estadisticas,
    procesarPago,
    iniciarPollingEstado,
    resetearViaje
  }
}