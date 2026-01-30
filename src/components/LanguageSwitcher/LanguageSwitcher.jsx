import styles from "./LanguageSwitcher.module.css";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../hooks/useClickOutside";

const languages = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UK" },
];

const LanguageSwitcher = ({ value, onChange }) => {
  const { i18n } = useTranslation();
  const isAuthenticated = useSelector((state) => state.userData);
  const [localLang, setLocalLang] = useState(value || "uk");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setLocalLang(value);
  }, [value]);

  const handleSelect = (code) => {
    setLocalLang(code);
    onChange(code);

    if (!isAuthenticated) {
      i18n.changeLanguage(code);
      localStorage.setItem("guestLang", code);
    }
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={styles.toggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {localLang.toUpperCase()}
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {languages.map(({ code, label }) => (
            <li key={code}>
              <button
                className={styles.menuItem}
                onClick={() => {
                  handleSelect(code);
                  setIsOpen(false);
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
