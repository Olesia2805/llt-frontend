import api from "./api";

export const getUserTrips = async (userId) => {
  try {
    const { data } = await api.get(`/users/${userId}/trips`);
    return data.data.trips || [];
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user trips",
    );
  }
};

export const deleteTrip = async (tripId) => {
  try {
    await api.delete(`/trips/${tripId}`);
  } catch (error) {
    if (error.response?.status === 404) throw new Error("Trip not found");
    throw new Error(error.response?.data?.message || "Failed to delete trip");
  }
};

export const recommendTrip = async (payload) => {
  try {
    const { data } = await api.post(`/trips/recommend`, payload);
    return data.data;
  } catch (error) {
    if (error.response?.status === 400)
      throw new Error("Incorrect data for route generation");
    if (error.response?.status === 401)
      throw new Error("User authentication required");
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while generating the journey",
    );
  }
};

export const cloneTrip = async (tripId) => {
  if (!tripId) throw new Error("Trip ID is required");

  try {
    await api.post(`/trips/${tripId}/clone`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to clone the trip",
    );
  }
};

export const explainRecommendTrip = async (payload) => {
  try {
    const { data } = await api.post("/ai/explain", payload);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "AI error");
  }
};

export const getTripById = async (tripId) => {
  try {
    const { data } = await api.get(`/trips/${tripId}`);
    return data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Trip not found");
    }
    throw new Error(error.response?.data?.message || "Failed to fetch trip");
  }
};

export const getTripMap = async (tripId) => {
  try {
    const { data } = await api.get(`/trips/${tripId}/map`);
    return data.data;
  } catch (error) {
    if (error.response?.status === 404) throw new Error("Trip not found");
    throw new Error(
      error.response?.data?.message || "Failed to fetch trip map",
    );
  }
};

export const updateTrip = async (tripId, payload) => {
  try {
    const { data } = await api.patch(`/trips/${tripId}`, payload);
    return data.data.trip;
  } catch (error) {
    if (error.response?.status === 404) throw new Error("Trip not found");
    throw new Error(error.response?.data?.message || "Failed to update trip");
  }
};
