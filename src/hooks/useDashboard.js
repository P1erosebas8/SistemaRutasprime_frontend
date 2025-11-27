import { useState } from "react";
import { apiRequest } from "../services/api";

export function useDashboard() {
  const [loading, setLoading] = useState(false);
  const [clientCount, setClientCount] = useState(0);
  const [clientDriverCount, setClientDriverCount] = useState(0);
  const [adminSuperAdminCount, setAdminSuperAdminCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);

  const getClientCount = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/user/clientes/count", "GET", null, true, true);
      if (response?.data?.success) {
        setClientCount(response.data.data);
      }
    } catch (err) {
      console.error("Error al obtener el conteo de clientes:", err);
    } finally {
      setLoading(false);
    }
  };

  const getClientDriverCount = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/user/clientes-conductores/count", "GET", null, true, true);
      if (response?.data?.success) {
        setClientDriverCount(response.data.data);
      }
    } catch (err) {
      console.error("Error al obtener el conteo de clientes-conductores:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAdminSuperAdminCount = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/user/admins-superadmins/count", "GET", null, true, true);
      if (response?.data?.success) {
        setAdminSuperAdminCount(response.data.data);
      }
    } catch (err) {
      console.error("Error al obtener el conteo de admins-superadmins:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyCount = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/empresa/count", "GET", null, true, true);
      if (response?.data?.success) {
        setCompanyCount(response.data.data);
      }
    } catch (err) {
      console.error("Error al obtener el conteo de empresas:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    await Promise.all([
      getClientCount(),
      getClientDriverCount(),
      getAdminSuperAdminCount(),
      getCompanyCount(),
    ]);
  };

  return {
    loading,
    clientCount,
    clientDriverCount,
    adminSuperAdminCount,
    companyCount,
    loadDashboardData,
  };
}