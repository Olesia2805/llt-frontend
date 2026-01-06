import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeGuestEn from "./locales/en/homeGuest.json";
import policiesEn from "./locales/en/policies.json";
import commonEn from "./locales/en/common.json";

import homeGuestUk from "./locales/uk/homeGuest.json";
import policiesUk from "./locales/uk/policies.json";
import commonUk from "./locales/uk/common.json";

const savedLang = localStorage.getItem("lang") || "uk";

i18n.use(initReactI18next).init({
  resources: {
    uk: {
      homeGuest: homeGuestUk,
      policies: policiesUk,
      common: commonUk,
    },
    en: {
      homeGuest: homeGuestEn,
      policies: policiesEn,
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
