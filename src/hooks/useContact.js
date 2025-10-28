import { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../services/api";
import { contactValidators } from "../utils/validators";

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateAll = (data) => {
    const newErrors = {};
    for (const field in data) {
      const validator = contactValidators[field];
      if (validator) {
        const error = validator(data[field]);
        if (error) newErrors[field] = error;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendMessage = async (formData) => {
    if (!validateAll(formData)) {
      toast.warning("Por favor corrige los errores antes de enviar");
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest("/contact", "POST", formData);
      toast.success(response.data.message || "Mensaje enviado correctamente");
      return response.data;
    } catch (err) {
      toast.error(err.message || "Error al enviar el mensaje");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendMessage,
    errors,
    setErrors,
  };
}