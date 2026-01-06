import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeGuestEn from "./locales/en/homeGuest.json";
import commonEn from "./locales/en/common.json";
import notFoundEn from "./locales/en/notFound.json";

import homeGuestUk from "./locales/uk/homeGuest.json";
import commonUk from "./locales/uk/common.json";
import notFoundUk from "./locales/uk/notFound.json";

const savedLang = localStorage.getItem("lang") || "uk";

i18n.use(initReactI18next).init({
  resources: {
    uk: {
      homeGuest: homeGuestUk,
      common: commonUk,
      notFound: notFoundUk,
    },
    en: {
      homeGuest: homeGuestEn,
      common: commonEn,
      notFound: notFoundEn,
    },
  },
  lng: savedLang,
  fallbackLng: "uk",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
