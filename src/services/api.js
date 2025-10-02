const API_URL = "http://localhost:8080/api";

export async function apiRequest(endpoint, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    let errorMessage = "Error en la petición";
    try {
      const errorData = await response.json(); 
      if (errorData.message) {
        errorMessage = errorData.message;
      }
      if (errorData.data) {
        const errors = Object.values(errorData.data);
        errorMessage = errors.join(" | "); 
      }
    } catch {
      errorMessage = await response.text();
    }
    throw new Error(errorMessage);
  }

  return response.json();
}