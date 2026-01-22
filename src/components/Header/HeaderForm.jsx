import styles from "./HeaderForm.module.css";
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Container from "../Container/Container";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const HeaderForm = () => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(
    localStorage.getItem("guestTheme") || "dark",
  );
  const [lang, setLang] = useState(localStorage.getItem("guestLang") || "uk");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerInner}>
          <Logo variant="header" />
          <div className={styles.controls}>
            <ThemeSwitcher value={theme} onChange={setTheme} />
            <LanguageSwitcher value={lang} onChange={setLang} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderForm;
