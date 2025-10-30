import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../services/api";

export function useContactAdmin() {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMensajes = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/contact/all", "GET", null, true, true);

      const dataFormateada = response.data.map((m) => ({
        id: m.id,
        codigo: m.messageCode,
        nombre: m.name,
        correo: m.email,
        mensaje: m.message,
        fecha: new Date(m.createdAt).toLocaleString("es-PE", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        replies: m.replies,
      }));

      setMensajes(dataFormateada);
    } catch (err) {
      console.error("Error al obtener mensajes:", err);
      toast.error("No se pudieron obtener los mensajes de contacto");
    } finally {
      setLoading(false);
    }
  };

  const responderMensaje = async (nombre, correo, mensajeRespuesta) => {
    try {
      const body = {
        name: nombre,
        email: correo,
        replyMessage: mensajeRespuesta,
      };

      await apiRequest("/contact/reply", "POST", body, true, true);
      toast.success("Respuesta enviada exitosamente");
      getMensajes();
    } catch (error) {
      console.error("Error al enviar respuesta:", error);
      toast.error("No se pudo enviar la respuesta");
    }
  };

  const getRespuestasPorCodigo = async (codigo) => {
    try {
      const response = await apiRequest(`/contact/${codigo}`, "GET", null, true, true);
      return response.data;
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
      toast.error("No se pudieron obtener las respuestas del mensaje");
      return null;
    }
  };

  useEffect(() => {
    getMensajes();
  }, []);

  return { mensajes, loading, getMensajes, responderMensaje, getRespuestasPorCodigo };
}