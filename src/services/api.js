const API_URL = "http://localhost:8080/api";

export async function apiRequest(endpoint, method = "GET", body = null, auth = false, isAdmin = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const tokenKey = isAdmin ? "adminToken" : "token";
    const token = localStorage.getItem(tokenKey);
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    let errorMessage = "Error en la petición";
    if (data?.message) errorMessage = data.message;
    else if (typeof data === "string") errorMessage = data;
    throw new Error(errorMessage);
  }

  return { data }; 
}