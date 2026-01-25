import api from "./api";

// export const searchPOIs = async (city, interests) => {
//   try {
//     const { data } = await api.post("/integrations/maps/pois", {
//       city,
//       interests,
//     });
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to search POIs");
//   }
// };

export const getCityInfo = async (city) => {
  try {
    const { data } = await api.get("/integrations/maps/city", {
      params: { city: encodeURIComponent(city) },
    });
    console.log(data);
    return data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get city information",
    );
  }
};

// export const getWeatherForecast = async (city, start_date, end_date) => {
//   try {
//     const { data } = await api.get("/integrations/weather/city", {
//       params: { city, start_date, end_date },
//     });
//     return data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Failed to get weather forecast",
//     );
//   }
// };

// export const startGoogleOAuth = async (userId) => {
//   try {
//     const { data } = await api.get("/integrations/calendar/google/connect", {
//       params: { userId },
//     });
//     return data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Failed to start Google OAuth flow",
//     );
//   }
// };

// export const googleOAuthCallback = async (code, state) => {
//   try {
//     const { data } = await api.get("/integrations/calendar/google/callback", {
//       params: { code, state },
//     });
//     return data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message ||
//         "Failed to complete Google OAuth callback",
//     );
//   }
// };

// export const getCalendarStatus = async (userId) => {
//   try {
//     const { data } = await api.get("/integrations/calendar/status", {
//       params: { userId },
//     });
//     return data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Failed to get calendar status",
//     );
//   }
// };

// export const createCalendarEvent = async (eventData) => {
//   try {
//     const { data } = await api.post("/integrations/calendar/events", eventData);
//     return data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Failed to create calendar event",
//     );
//   }
// };
