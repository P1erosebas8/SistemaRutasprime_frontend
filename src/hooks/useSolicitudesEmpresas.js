import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useSolicitudesEmpresas() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSolicitudes = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/empresa/solicitudes", "GET", null, true, true);
      const data = response.data.data || [];

      const solicitudesFormatted = data.map((e) => ({
        id: e.id,
        ruc: e.ruc,
        razonSocial: e.razonSocial,
        direccion: e.direccion,
        telefono: e.telefono,
        representante: e.representante,
        fechaSolicitud: new Date(e.fechaSolicitud).toLocaleDateString(),
        estado: e.estado,
      }));

      setSolicitudes(solicitudesFormatted);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron obtener las solicitudes de empresas");
    } finally {
      setLoading(false);
    }
  };

  const actualizarSolicitud = async (id, estado, observacion = "") => {
    try {
      const body = { estado, observacion };
      const response = await apiRequest(`/empresa/verify/${id}`, "PUT", body, true, true);
      toast.success(response.data.message || "Solicitud actualizada correctamente");
      await getSolicitudes();
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar la solicitud");
    }
  };
  const obtenerHistorial = async (empresaId) => {
  try {
    const response = await apiRequest(`/empresa/historial/${empresaId}`, "GET", null, true, true);
    return response.data.data || [];
  } catch (err) {
    console.error(err);
    toast.error("No se pudo obtener el historial de la empresa");
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
    obtenerHistorial
  };
}
