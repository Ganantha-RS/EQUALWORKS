const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export function getToken() {
  return localStorage.getItem("skillbridge_token");
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("skillbridge_token", token);
  } else {
    localStorage.removeItem("skillbridge_token");
  }
}

export async function api(path, options = {}) {
  const token = getToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = json.message || "Request failed";
    const error = new Error(message);
    error.status = response.status;
    error.errors = json.errors || {};
    throw error;
  }

  return json;
}
