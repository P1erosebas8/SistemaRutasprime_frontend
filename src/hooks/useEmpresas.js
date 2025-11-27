import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmpresas = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/empresa/list", "GET", null, true, true);
      const data = response.data.data || [];

      const empresasFormatted = data.map((e) => ({
        id: e.id,
        ruc: e.ruc,
        razonSocial: e.razonSocial,
        direccion: e.direccion,
        telefono: e.telefono,
        representante: e.representante,
        estado: e.estado,
      }));

      setEmpresas(empresasFormatted);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron obtener las empresas registradas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmpresas();
  }, []);

  return {
    empresas,
    loading,
    getEmpresas,
  };
}
