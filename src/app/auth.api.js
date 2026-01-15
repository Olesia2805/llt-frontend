import api from "./api";

export const register = async (payload) => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 400) throw new Error(message || "Invalid data");
    if (status === 409) throw new Error(message || "User already exists");

    throw new Error(message || "Registration failed");
  }
};

export const googleAuth = async (idToken) => {
  try {
    const { data } = await api.post("/auth/oauth/google/idtoken", { idToken });
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Google session expired. Please try again.");
    }

    throw new Error(
      error.response?.data?.message || "Google authentication failed"
    );
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const refresh = async () => {
  try {
    const { data } = await api.post("/auth/refresh");
    return data;
  } catch {
    throw new Error("Refresh failed");
  }
};
