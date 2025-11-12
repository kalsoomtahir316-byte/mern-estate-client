const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
// agar phir bhi type error aaye to temporary: const API = (import.meta as any).env.VITE_API_URL || "http://localhost:5000";

export const http = (path: string, opts: RequestInit = {}) =>
  fetch(API + path, { credentials: "include", ...opts }).then(async (r) => {
    if (!r.ok) throw new Error(await r.text());
    const ct = r.headers.get("content-type") || "";
    return ct.includes("application/json") ? r.json() : r.text();
  });

export const authHeader = (t: string) => ({ Authorization: `Bearer ${t}` });