import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { useState, useEffect } from "react";

const Header = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");

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
            <>
              <ThemeSwitcher value={theme} onChange={setTheme} />
              <LanguageSwitcher value={lang} onChange={setLang} />
              <Button
                variant="secondary"
                text={t("header.login")}
                to="/login"
              />
              <Button
                text={t("header.signup")}
                to="/signup"
                className={styles.signupBtn}
              />
            </>
          </div>
        </div>
      </Container>
      <hr className={styles.divider} />
    </header>
  );
};

export default Header;
