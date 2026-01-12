import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Container from "../Container/Container";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";

const Header = () => {
  const { t } = useTranslation("common");
  const { login } = useAuth();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerInner}>
          <Logo variant="header" />

          <div className={styles.controls}>
            <>
              <ThemeSwitcher />
              <LanguageSwitcher />
              <Button
                variant="secondary"
                text={t("header.login")}
                onClick={login}
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
