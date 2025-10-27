import { useState } from "react";
import { transportistaService } from "../services/transportistaService";

export const useAuthTransportista = () => {
  const [loading, setLoading] = useState(false);

  const register = async (formData) => {
    setLoading(true);
    try {
      const result = await transportistaService.register(formData);
      return result;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};
