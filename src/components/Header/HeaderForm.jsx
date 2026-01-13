import styles from "./HeaderForm.module.css";
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Container from "../Container/Container";

const HeaderForm = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerInner}>
          <Logo variant="header" />
          <div className={styles.controls}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderForm;
