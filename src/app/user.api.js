import api from "./api";

export const getCurrentUser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("No access token found");

  const { data } = await api.get("/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
