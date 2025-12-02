export const guardarViajeCliente = (viaje) => {
    try {
      const viajesGuardados = obtenerViajesCliente();
      
      const viajeCliente = {
        id: viaje.id,
        fecha: new Date().toISOString(),
        origen: viaje.origen,
        destino: viaje.destino,
        tipo: viaje.tipo,
        distancia: viaje.distancia,
        gasto: viaje.precio,
        chargeId: viaje.chargeId,
        estado: viaje.estado
      };
      
      viajesGuardados.unshift(viajeCliente);
      
      if (viajesGuardados.length > 50) {
        viajesGuardados.pop();
      }
      
      localStorage.setItem('viajesCliente', JSON.stringify(viajesGuardados));
      actualizarEstadisticasCliente(viajeCliente);
      
      console.log('Viaje guardado en localStorage (Cliente):', viajeCliente);
      return true;
    } catch (error) {
      console.error('Error al guardar viaje del cliente:', error);
      return false;
    }
  };
  
  export const obtenerViajesCliente = () => {
    try {
      const viajes = localStorage.getItem('viajesCliente');
      return viajes ? JSON.parse(viajes) : [];
    } catch (error) {
      console.error('Error al obtener viajes del cliente:', error);
      return [];
    }
  };
  
  const actualizarEstadisticasCliente = (nuevoViaje) => {
    try {
      let stats = obtenerEstadisticasCliente();
      
      stats.totalViajes += 1;
      stats.gastoTotal += nuevoViaje.gasto;
      stats.distanciaTotal += nuevoViaje.distancia;
      stats.ultimoViaje = nuevoViaje.fecha;
      
      localStorage.setItem('statsCliente', JSON.stringify(stats));
    } catch (error) {
      console.error('Error al actualizar estadísticas del cliente:', error);
    }
  };
  
  export const obtenerEstadisticasCliente = () => {
    try {
      const stats = localStorage.getItem('statsCliente');
      if (stats) {
        return JSON.parse(stats);
      }
      
      return {
        totalViajes: 0,
        gastoTotal: 0,
        distanciaTotal: 0,
        ultimoViaje: null
      };
    } catch (error) {
      console.error('Error al obtener estadísticas del cliente:', error);
      return {
        totalViajes: 0,
        gastoTotal: 0,
        distanciaTotal: 0,
        ultimoViaje: null
      };
    }
  };
  
  export const guardarViajeConductor = (viaje) => {
    try {
      const viajesGuardados = obtenerViajesConductor();
      
      const viajeConductor = {
        id: viaje.id,
        fecha: new Date().toISOString(),
        cliente: viaje.cliente,
        origen: viaje.origen,
        destino: viaje.destino,
        tipo: viaje.tipo,
        distancia: viaje.distancia,
        ganancia: viaje.precio * 0.8,
        precioTotal: viaje.precio,
        estado: viaje.estado
      };
      
      viajesGuardados.unshift(viajeConductor);
      
      if (viajesGuardados.length > 50) {
        viajesGuardados.pop();
      }
      
      localStorage.setItem('viajesConductor', JSON.stringify(viajesGuardados));
      actualizarEstadisticasConductor(viajeConductor);
      
      console.log('Viaje guardado en localStorage (Conductor):', viajeConductor);
      return true;
    } catch (error) {
      console.error('Error al guardar viaje del conductor:', error);
      return false;
    }
  };
  
  export const obtenerViajesConductor = () => {
    try {
      const viajes = localStorage.getItem('viajesConductor');
      return viajes ? JSON.parse(viajes) : [];
    } catch (error) {
      console.error('Error al obtener viajes del conductor:', error);
      return [];
    }
  };
  
  const actualizarEstadisticasConductor = (nuevoViaje) => {
    try {
      let stats = obtenerEstadisticasConductor();
      
      stats.totalViajes += 1;
      stats.gananciaTotal += nuevoViaje.ganancia;
      stats.distanciaTotal += nuevoViaje.distancia;
      stats.ultimoViaje = nuevoViaje.fecha;
      
      localStorage.setItem('statsConductor', JSON.stringify(stats));
    } catch (error) {
      console.error('Error al actualizar estadísticas del conductor:', error);
    }
  };
  
  export const obtenerEstadisticasConductor = () => {
    try {
      const stats = localStorage.getItem('statsConductor');
      if (stats) {
        return JSON.parse(stats);
      }
      
      return {
        totalViajes: 0,
        gananciaTotal: 0,
        distanciaTotal: 0,
        ultimoViaje: null
      };
    } catch (error) {
      console.error('Error al obtener estadísticas del conductor:', error);
      return {
        totalViajes: 0,
        gananciaTotal: 0,
        distanciaTotal: 0,
        ultimoViaje: null
      };
    }
  };
  
  export const limpiarDatosCliente = () => {
    localStorage.removeItem('viajesCliente');
    localStorage.removeItem('statsCliente');
  };
  
  export const limpiarDatosConductor = () => {
    localStorage.removeItem('viajesConductor');
    localStorage.removeItem('statsConductor');
  };  