import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeGuestEn from "./locales/en/homeGuest.json";
import policiesEn from "./locales/en/policies.json";
import signupEn from "./locales/en/signup.json";
import commonEn from "./locales/en/common.json";
import notFoundEn from "./locales/en/notFound.json";
import loginEn from "./locales/en/login.json";
import sidebarEn from "./locales/en/sidebar.json";
// import profileEn from "./locales/en/profile.json";
// import myTripsEn from "./locales/en/myTrips.json";
import settingsEn from "./locales/en/settings.json";

import homeGuestUk from "./locales/uk/homeGuest.json";
import policiesUk from "./locales/uk/policies.json";
import signupUk from "./locales/uk/signup.json";
import commonUk from "./locales/uk/common.json";
import notFoundUk from "./locales/uk/notFound.json";
import loginUk from "./locales/uk/login.json";
import sidebarUk from "./locales/uk/sidebar.json";
// import profileUk from "./locales/uk/profile.json";
// import myTripsUk from "./locales/uk/myTrips.json";
import settingsUk from "./locales/uk/settings.json";

const savedLang = localStorage.getItem("lang") || "uk";

i18n.use(initReactI18next).init({
  resources: {
    uk: {
      homeGuest: homeGuestUk,
      policies: policiesUk,
      signup: signupUk,
      common: commonUk,
      notFound: notFoundUk,
      sidebar: sidebarUk,
      // profile: profileUk,
      // myTrips: myTripsUk,
      settings: settingsUk,
      login: loginUk,
    },
    en: {
      homeGuest: homeGuestEn,
      policies: policiesEn,
      signup: signupEn,
      common: commonEn,
      notFound: notFoundEn,
      sidebar: sidebarEn,
      // profile: profileEn,
      // myTrips: myTripsEn,
      settings: settingsEn,
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
