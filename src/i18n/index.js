import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homeGuestEn from './locales/en/homeGuest.json';
import policiesEn from './locales/en/policies.json';
import commonEn from './locales/en/common.json';
import notFoundEn from './locales/en/notFound.json';
import loginEn from './locales/en/login.json';

import homeGuestUk from './locales/uk/homeGuest.json';
import policiesUk from './locales/uk/policies.json';
import commonUk from './locales/uk/common.json';
import notFoundUk from './locales/uk/notFound.json';
import loginUk from './locales/uk/login.json';

const savedLang = localStorage.getItem('lang') || 'uk';

i18n.use(initReactI18next).init({
  resources: {
    uk: {
      homeGuest: homeGuestUk,
      policies: policiesUk,
      common: commonUk,
      notFound: notFoundUk,
      login: loginUk,
    },
    en: {
      homeGuest: homeGuestEn,
      policies: policiesEn,
      common: commonEn,
      notFound: notFoundEn,
      login: loginEn,
    },
  },
  lng: savedLang,
  fallbackLng: 'uk',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
