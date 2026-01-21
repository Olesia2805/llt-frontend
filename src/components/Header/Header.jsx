import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { useSelector } from "react-redux";

const Header = () => {
  const { t } = useTranslation("common");
  const preferences = useSelector((state) => state.preferences.data);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerInner}>
          <Logo variant="header" />

          <div className={styles.controls}>
            <>
              <ThemeSwitcher value={preferences.theme} onChange={() => {}} />
              <LanguageSwitcher
                value={preferences.language}
                onChange={() => {}}
              />
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
