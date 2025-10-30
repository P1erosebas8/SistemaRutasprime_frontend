import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useAdminUsers() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAdmins = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/user/admins", "GET", null, true, true);

      const dataFiltrada = response.data.data.map((u) => ({
        id: u.id,
        nombres: u.nombres || "",
        apellidos: u.apellidos || "",
        celular: u.celular || "",
        email: u.email || "",
        dniRuc: u.dniRuc || "",
        fechaRegistro: u.fechaRegistro ? new Date(u.fechaRegistro).toLocaleDateString() : "",
        rol: (u.roles && u.roles[0]) ? u.roles[0].replace("ROLE_", "") : "ADMIN",
      }));

      setAdmins(dataFiltrada);
    } catch (err) {
      toast.error("No se pudieron obtener los administradores");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return { admins, loading, getAdmins, setAdmins };
}