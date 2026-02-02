// import api from "./api";

import i18n from "i18next";

export const searchCities = async (query) => {
  if (!query) return [];

  const lang = i18n.language === "uk" ? "uk" : "en";

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?` +
      new URLSearchParams({
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 5,
      }),
    {
      headers: {
        "Accept-Language": lang,
        "User-Agent": "LiteLifeTrip",
      },
    },
  );

  const data = await res.json();

  return data
    .map((item) => ({
      city:
        item.address.city || item.address.town || item.address.village || "",
      country: item.address.country || "",
      lat: Number(item.lat),
      lng: Number(item.lon),
    }))
    .filter((item) => item.city);
};

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

// export const getCityInfo = async (city) => {
//   try {
//     const { data } = await api.get("/integrations/maps/city", {
//       params: { city: encodeURIComponent(city) },
//     });
//     console.log(data);
//     return data.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Failed to get city information",
//     );
//   }
// };

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
