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
        fechaRegistro: u.fechaRegistro
          ? new Date(u.fechaRegistro).toLocaleDateString()
          : "",
        rol: u.roles && u.roles[0] ? u.roles[0].replace("ROLE_", "") : "ADMIN",
      }));
      setAdmins(dataFiltrada);
    } catch (err) {
      toast.error("No se pudieron obtener los administradores");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const crearAdmin = async (nuevoAdmin) => {
    try {
      const response = await apiRequest(
        "/auth/admin/register-admin",
        "POST",
        nuevoAdmin,
        true,
        true
      );

      if (response.data.success) {
        toast.success("Administrador creado exitosamente");
        return { success: true };
      }

      return {
        success: false,
        message: response.data.message || "Error desconocido del servidor",
      };
    } catch (err) {
      console.error("Error al crear admin:", err);

      let mensaje = "Error del servidor";
      if (err.response?.data?.message) {
        mensaje = err.response.data.message;
      } else if (err.message) {
        mensaje = err.message;
      }

      return { success: false, message: mensaje };
    }
  };


  const exportarExcel = async () => {
    try {
      const { blob } = await apiRequest(
        "/user/export/excel",
        "GET",
        null,
        true,
        true,
        false,
        true
      );

      if (!blob) throw new Error("El archivo no fue generado correctamente");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const fecha = new Date();
      const nombreArchivo = `usuarios_${fecha.toISOString().split("T")[0]}.xlsx`;

      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Descarga de Excel iniciada (${nombreArchivo})`);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo descargar el archivo Excel");
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return { admins, loading, getAdmins, setAdmins, exportarExcel, crearAdmin };
}