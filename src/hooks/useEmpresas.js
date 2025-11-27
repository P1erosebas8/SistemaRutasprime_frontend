import { useState } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useRegistroEmpresa() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registrarEmpresa = async (formData) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await apiRequest(
        "/empresa/register",
        "POST",
        formData,
        false,
        true
      );

      if (response.data.success) {
        setData(response.data.data);
        toast.success(
          response.data.message || 
          "Solicitud enviada correctamente. En espera de verificación."
        );
        return { success: true, data: response.data.data };
      } else {
        const errorMsg = response.data.message || "Error al enviar la solicitud";
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 
                       "Error al registrar la solicitud empresarial";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Error en registro:", err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };

  return {
    registrarEmpresa,
    loading,
    error,
    data,
    resetState,
  };
}