import { useState, useContext, useRef, useEffect } from "react";
import LanguageContext from "../../context/LanguageContext";
import styles from "./LanguageSwitcher.module.css";

const languages = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UK" },
];

const LanguageSwitcher = () => {
  const { lang, changeLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.toggle}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {lang.toUpperCase()}
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {languages.map(({ code, label }) => (
            <li key={code}>
              <button
                className={styles.menuItem}
                onClick={() => {
                  changeLanguage(code);
                  setOpen(false);
                }}
                disabled={lang === code}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
