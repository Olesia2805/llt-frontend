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
