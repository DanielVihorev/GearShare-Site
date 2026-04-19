const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Wrapper around fetch that automatically attaches the gs_token JWT
 * as an Authorization: Bearer header for authenticated API calls.
 */
export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = localStorage.getItem("gs_token");
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(`${API_BASE}${path}`, { ...options, headers });
}

export const apiBase = API_BASE;
