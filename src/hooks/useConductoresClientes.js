import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-toastify";

export function useConductoresClientes() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    const getConductoresClientes = async () => {
        setLoading(true);
        try {
            const response = await apiRequest(
                "/user/conductores-clientes",
                "GET",
                null,
                true,
                true
            );

            const dataFiltrada = response.data.data.map((u) => ({
                id: u.id,
                codigo: u.id,
                nombre: u.nombres,
                apellido: u.apellidos,
                correo: u.email,
                telefono: u.celular,
                dni: u.dniRuc,
                roles: u.roles.join(", ").replace(/ROLE_/g, ""),
                activo: u.activo ? "Sí" : "No",
                fechaRegistro: new Date(u.fechaRegistro).toLocaleDateString(),
                direccion: u.direccion || "",
                numero: u.numero || ""
            }));

            setUsuarios(dataFiltrada);
        } catch (err) {
            toast.error("No se pudieron obtener los usuarios");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const actualizarUsuario = async (id, datosActualizar) => {
        try {
            const response = await apiRequest(
                `/user/update/${id}`,
                "PUT",
                datosActualizar,
                true,
                true
            );
            if (response.data.success) {
                toast.success("Usuario actualizado exitosamente");
                getConductoresClientes();
                return { success: true };
            }
            toast.error(response.data.message || "Error al actualizar el usuario");
            return {
                success: false,
                message: response.data.message || "Error desconocido del servidor",
            };
        } catch (err) {
            let mensaje = "Error del servidor";
            if (err.response?.data?.message) {
                mensaje = err.response.data.message;
            } else if (err.message) {
                mensaje = err.message;
            }
            toast.error(mensaje);
            return { success: false, message: mensaje };
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            const response = await apiRequest(
                `/user/${id}`,
                "DELETE",
                null,
                true,
                true
            );
            if (response.data.success) {
                toast.success("Usuario eliminado exitosamente");
                getConductoresClientes();
                return { success: true };
            }
            toast.error(response.data.message || "Error al eliminar el usuario");
            return {
                success: false,
                message: response.data.message || "Error desconocido del servidor",
            };
        } catch (err) {
            let mensaje = "Error del servidor";
            if (err.response?.data?.message) {
                mensaje = err.response.data.message;
            } else if (err.message) {
                mensaje = err.message;
            }
            toast.error(mensaje);
            return { success: false, message: mensaje };
        }
    };

    useEffect(() => {
        getConductoresClientes();
    }, []);

    return { usuarios, loading, getConductoresClientes, actualizarUsuario, eliminarUsuario };
}