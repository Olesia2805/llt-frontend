import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";

const languages = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UA" },
];

const LanguageSwitcher = () => {
  const { lang, changeLanguage } = useContext(LanguageContext);

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
};

export default LanguageSwitcher;
