import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useSolicitudesEmpresa() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSolicitudes = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/empresa/list", "GET", null, true, true);
      const solicitudesData = response.data.data;

      const solicitudesFormateadas = solicitudesData.map((s) => ({
        id: s.id,
        codigo: s.codigoSolicitud,
        fechaSolicitud: new Date(s.fechaSolicitud).toLocaleDateString(),
        nombres: s.nombres,
        apellidos: s.apellidos,
        dni: s.dni,
        correoCorporativo: s.correoCorporativo,
        telefono: s.telefono,
        nombreEmpresa: s.nombreEmpresa,
        rucEmpresa: s.rucEmpresa,
        estado: s.estado,
        observacionAdmin: s.observacionAdmin,
      }));

      setSolicitudes(solicitudesFormateadas);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron obtener las solicitudes empresariales");
    } finally {
      setLoading(false);
    }
  };

  const verificarSolicitud = async (id, estado, observacion = "") => {
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

  const actualizarEmpresa = async (id, updateData) => {
    try {
      const response = await apiRequest(`/empresa/${id}`, "PUT", updateData, true, true);
      toast.success(response.data.message || "Empresa actualizada correctamente");
      await getSolicitudes();
      return { success: true };
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar la empresa");
      return { success: false };
    }
  };

  const eliminarEmpresa = async (id) => {
    try {
      const response = await apiRequest(`/empresa/${id}`, "DELETE", null, true, true);
      toast.success(response.data.message || "Empresa eliminada correctamente");
      await getSolicitudes();
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar la empresa");
    }
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  return {
    solicitudes,
    loading,
    getSolicitudes,
    verificarSolicitud,
    obtenerHistorial,
    actualizarEmpresa,
    eliminarEmpresa,
  };
}