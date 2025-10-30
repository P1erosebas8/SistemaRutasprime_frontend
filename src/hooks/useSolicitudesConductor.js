import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useSolicitudesConductor() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSolicitudes = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/conductor/list", "GET", null, true, true);
      const solicitudesData = response.data.data;

      const solicitudesConDni = await Promise.all(
        solicitudesData.map(async (s) => {
          try {
            const userResponse = await apiRequest(`/user/${s.user}`, "GET", null, true, true);
            const dniRuc = userResponse.data.data.dniRuc;

            return {
              id: s.id,
              codigo: s.codigoSolicitud,
              fechaSolicitud: new Date(s.fechaSolicitud).toLocaleDateString(),
              dniRuc,
              placa: s.placa,
              marca: s.marca,
              color: s.color,
              anioFabricacion: s.anioFabricacion,
              estado: s.estado,
              user: s.user,
              archivos: {
                fotoPersonaLicencia: s.fotoPersonaLicencia,
                fotoLicencia: s.fotoLicencia,
                antecedentesPenales: s.antecedentesPenales,
                tarjetaPropiedad: s.tarjetaPropiedad,
                tarjetaCirculacion: s.tarjetaCirculacion,
                soat: s.soat,
                revisionTecnica: s.revisionTecnica,
              },
            };
          } catch (e) {
            console.error("Error obteniendo usuario", e);
            return {
              ...s,
              dniRuc: "Desconocido",
            };
          }
        })
      );

      setSolicitudes(solicitudesConDni);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron obtener las solicitudes de conductor");
    } finally {
      setLoading(false);
    }
  };

  const actualizarSolicitud = async (id, estado, observacion = "") => {
    try {
      const body = { estado, observacion };
      const response = await apiRequest(`/conductor/verify/${id}`, "PUT", body, true, true);
      toast.success(response.data.message || "Solicitud actualizada correctamente");
      await getSolicitudes();
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar la solicitud");
    }
  };

  const obtenerHistorial = async (userId) => {
    try {
      const response = await apiRequest(`/conductor/historial/${userId}`, "GET", null, true, true);
      return response.data.data || [];
    } catch (err) {
      console.error(err);
      toast.error("No se pudo obtener el historial del conductor");
      return [];
    }
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  return {
    solicitudes,
    loading,
    getSolicitudes,
    actualizarSolicitud,
    obtenerHistorial, 
  };
}