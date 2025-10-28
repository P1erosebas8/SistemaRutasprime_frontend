import { useState } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiRequest("/auth/public/login", "POST", { email, password });
      const token = response?.data?.data?.token;
      const roles = response?.data?.data?.roles || [];

      if (!token) throw new Error("No se recibió token del servidor");

      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(roles));

      toast.success("Inicio de sesión exitoso");
      return response.data;
    } catch (err) {
      toast.error("Usuario o contraseña incorrectos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (form) => {
    setLoading(true);
    try {
      const data = await apiRequest("/auth/public/register", "POST", form);
      toast.success("Registro exitoso, revisa tu correo para el OTP");
      return data;
    } catch (err) {
      toast.error(err.message || "Error al registrarse");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const response = await apiRequest("/user/profile", "GET", null, true);
      return response.data.data;
    } catch (err) {
      toast.error("No se pudo obtener el perfil");
      throw err;
    }
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    try {
      const data = await apiRequest("/user/update", "PUT", updates, true);
      toast.success("Perfil actualizado correctamente");
      return data;
    } catch (err) {
      toast.error(err.message || "Error al actualizar perfil");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    try {
      const data = await apiRequest(
        "/user/change-password",
        "PUT",
        { oldPassword, newPassword },
        true
      );
      toast.success("Contraseña cambiada correctamente");
      return data;
    } catch (err) {
      toast.error(err.message || "Error al cambiar contraseña");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const applyConductor = async (formData) => {
    setLoading(true);
    try {
      const response = await apiRequest("/conductor/apply", "POST", formData, true, false, true);
      toast.success("Solicitud enviada correctamente");
      return response.data;
    } catch (err) {
      toast.error(err.message || "Error al enviar la solicitud");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    toast.info("Sesión cerrada");
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return {
    loading,
    login,
    register,
    getProfile,
    updateProfile,
    changePassword,
    applyConductor,
    logout,
    isAuthenticated,
  };
}