const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const register = async (payload) => {
  console.log("REGISTER PAYLOAD:", payload);

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 400) throw new Error(data?.message || "Invalid data");

    if (res.status === 409)
      throw new Error(data?.message || "User already exists");

    throw new Error(data?.message || "Registration failed");
  }

  return data;
};

export const login = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Login failed");
  }

  return data;
};

export const logout = async () => {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const refresh = async () => {
  const res = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh failed");

  return res.json();
};
