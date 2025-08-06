export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Helper to fetch with JWT
 */
export async function fetchWithAuth<T>(
  url: string,
  opts: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = {
    ...(opts.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json"
  };

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...opts,
    headers
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Fetch error");
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function login(email: string, password: string) {
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(res => {
    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
  });
}

// PUBLIC_INTERFACE
export async function register(email: string, password: string) {
  return fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(res => {
    if (!res.ok) throw new Error("Registration error");
    return res.json();
  });
}

// PUBLIC_INTERFACE
export async function getNotes(filter?: string) {
  const qs = filter ? `?filter=${encodeURIComponent(filter)}` : "";
  return fetchWithAuth(`/notes${qs}`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function getNoteById(id: string) {
  return fetchWithAuth(`/notes/${id}`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function createNote(data: { title: string; content: string }) {
  return fetchWithAuth(`/notes`, {
    method: "POST",
    body: JSON.stringify(data)
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, data: { title: string; content: string }) {
  return fetchWithAuth(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string) {
  return fetchWithAuth(`/notes/${id}`, {
    method: "DELETE"
  });
}
