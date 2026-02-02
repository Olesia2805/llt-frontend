import api from "./api";

export const getCurrentUser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("No access token found");

  const { data } = await api.get("/users/me");

  return data;
};

export const updateCurrentUser = async (payload) => {
  try {
    const { data } = await api.patch(`/users/me`, payload);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Update user failed");
  }
};

export const getPreferences = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("No access token found");

  const { data } = await api.get("/users/me/preferences");

  return data;
};

export const updatePreferences = async (payload) => {
  try {
    const { data } = await api.patch(`/users/me/preferences`, payload);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Update preferences failed",
    );
  }
};
