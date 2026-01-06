import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeGuestEn from "./locales/en/homeGuest.json";
import commonEn from "./locales/en/common.json";
import loginEn from "./locales/en/login.json";

import homeGuestUk from "./locales/uk/homeGuest.json";
import commonUk from "./locales/uk/common.json";
import loginUk from "./locales/uk/login.json";

const savedLang = localStorage.getItem("lang") || "uk";

i18n.use(initReactI18next).init({
  resources: {
    uk: {
      homeGuest: homeGuestUk,
      common: commonUk,
      login: loginUk,
    },
    en: {
      homeGuest: homeGuestEn,
      common: commonEn,
      login: loginEn,
    },
  },
  lng: savedLang,
  fallbackLng: "uk",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
