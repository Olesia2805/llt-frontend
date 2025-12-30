import { useState, useEffect } from "react";
import i18n from "../i18n";
import LanguageContext from "./LanguageContext";

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("uk");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "uk";

    setTimeout(() => {
      setLang(savedLang);
      i18n.changeLanguage(savedLang);
      document.documentElement.lang = savedLang;
    }, 0);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
