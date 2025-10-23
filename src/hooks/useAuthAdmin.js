import { useState } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useAuthAdmin() {
  const [loading, setLoading] = useState(false);

  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiRequest("/auth/admin/login", "POST", { email, password });

      const token = response?.data?.data?.token;
      if (!token) throw new Error("No se recibió token del servidor");

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminRoles", JSON.stringify(response.data.data.roles));

      toast.success("Inicio de sesión exitoso");
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Usuario o contraseña incorrectos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAdminProfile = async () => {
    try {
      const response = await apiRequest("/admin/profile", "GET", null, true);
      return response.data;
    } catch (err) {
      toast.error("No se pudo obtener el perfil del administrador");
      throw err;
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRoles");
    toast.info("Sesión de administrador cerrada");
  };

  const isAdminAuthenticated = !!localStorage.getItem("adminToken");

  return {
    loading,
    loginAdmin,
    getAdminProfile,
    logoutAdmin,
    isAdminAuthenticated,
  };
}