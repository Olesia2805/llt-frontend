import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UA" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "uk");

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLang(code);
    localStorage.setItem("lang", code);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div>
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          disabled={lang === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
