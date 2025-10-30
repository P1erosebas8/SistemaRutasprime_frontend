import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getClientes = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/user/clientes", "GET", null, true, true);

      const dataFiltrada = response.data.data.map((u, index) => ({
        codigo: `C${(index + 1).toString().padStart(3, "0")}`,
        nombre: u.nombres,
        apellido: u.apellidos,
        correo: u.email,
        telefono: u.celular,
        dni: u.dniRuc,
      }));

      setClientes(dataFiltrada);
    } catch (err) {
      toast.error("No se pudieron obtener los clientes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  return { clientes, loading, getClientes };
}