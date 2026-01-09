const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const register = async (payload) => {
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

export const googleAuth = async (idToken) => {
  const res = await fetch(`${BASE_URL}/auth/oauth/google/idToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401)
      throw new Error("Google session expired. Please try again.");
    throw new Error(data?.message || "Google authentication failed");
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
