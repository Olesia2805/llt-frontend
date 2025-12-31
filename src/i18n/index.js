import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeGuestEn from "./locales/en/homeGuest.json";
import commonEn from "./locales/en/homeGuest.json";

import homeGuestUk from "./locales/uk/homeGuest.json";
import commonUk from "./locales/uk/common.json";

const savedLang = localStorage.getItem("lang") || "uk";

i18n.use(initReactI18next).init({
  resources: {
    uk: {
      homeGuest: homeGuestUk,
      common: commonUk,
    },
    en: {
      homeGuest: homeGuestEn,
      common: commonEn,
    },
  },
  lng: savedLang,
  fallbackLng: "uk",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
