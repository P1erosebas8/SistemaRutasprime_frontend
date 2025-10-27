// Simulación del backend para registrar transportistas
// En un proyecto real, usarías fetch o axios hacia tu API REST

export const transportistaService = {
  register: async (data) => {
    try {
      // Si tuvieras backend:
      // const res = await fetch("http://localhost:3000/api/transportistas/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // const result = await res.json();
      // return result;

      console.log("📦 Registrando transportista en base de datos:", data);
      return { success: true }; // Simulación exitosa
    } catch (err) {
      console.error("Error registrando transportista:", err);
      throw err;
    }
  },
};
