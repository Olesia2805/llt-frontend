import styles from "./LanguageSwitcher.module.css";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UK" },
];

const LanguageSwitcher = ({ value, onChange }) => {
  const { i18n } = useTranslation();
  const [localLang, setLocalLang] = useState(value || "uk");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (code) => {
    setLocalLang(code);
    onChange(code);
    i18n.changeLanguage(code);
    setOpen(false);
  };

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
        {localLang.toUpperCase()}
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {languages.map(({ code, label }) => (
            <li key={code}>
              <button
                className={styles.menuItem}
                onClick={() => {
                  handleSelect(code);
                  setOpen(false);
                }}
                disabled={localLang === code}
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
