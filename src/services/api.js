const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  auth = false,
  isAdmin = false,
  isFormData = false,
  isFile = false,
  isEmpresa = false
) {
  const headers = {};


  if (auth) {
    let token;
    if (isEmpresa) {
      token = localStorage.getItem("empresaToken");
    } else {
      const tokenKey = isAdmin ? "adminToken" : "token";
      token = localStorage.getItem(tokenKey);
    }
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }


  if (!isFormData && !isFile) {
    headers["Content-Type"] = "application/json";
  }


  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : null,
  });


  if (!res.ok) {
    let msg = "Error en la petición";
    try {
      const err = await res.json();
      if (err?.message) msg = err.message;
    } catch { }
    throw new Error(msg);
  }


  if (isFile) {
    const blob = await res.blob();
    return { blob };
  }


  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }


  return { data };
}


export { API_URL };