import api from "../app/api";

export const register = async (payload) => {
  try {
    const { data } = await api.post("/auth/register", payload);

    if (data.tokens) {
      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
    }

    return data.user;
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

    if (data.tokens) {
      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
    }

    return data.user;
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

    localStorage.setItem("accessToken", data.tokens.access);
    localStorage.setItem("refreshToken", data.tokens.refresh);

    return data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    await api.post("/auth/logout", { refreshToken });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const refreshTokens = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token found");
    const { data } = await api.post("/auth/refresh", { refreshToken });

    localStorage.setItem("accessToken", data.tokens.access);
    localStorage.setItem("refreshToken", data.tokens.refresh);

    return data.tokens;
  } catch {
    throw new Error("Refresh failed");
  }
};
