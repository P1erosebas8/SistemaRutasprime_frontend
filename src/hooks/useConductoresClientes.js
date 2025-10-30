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

            const dataFiltrada = response.data.data.map((u, index) => ({
                codigo: `U${(index + 1).toString().padStart(3, "0")}`,
                nombre: u.nombres,
                apellido: u.apellidos,
                correo: u.email,
                telefono: u.celular,
                dni: u.dniRuc,
                roles: u.roles.join(", ").replace(/ROLE_/g, ""),
                activo: u.activo ? "Sí" : "No",
                fechaRegistro: new Date(u.fechaRegistro).toLocaleDateString(),
            }));

            setUsuarios(dataFiltrada);
        } catch (err) {
            toast.error("No se pudieron obtener los usuarios");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getConductoresClientes();
    }, []);

    return { usuarios, loading, getConductoresClientes };
}