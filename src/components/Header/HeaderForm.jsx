import styles from "./HeaderForm.module.css";
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Container from "../Container/Container";
import { useSelector } from "react-redux";

const HeaderForm = () => {
  const preferences = useSelector((state) => state.preferences.data);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerInner}>
          <Logo variant="header" />
          <div className={styles.controls}>
            <ThemeSwitcher value={preferences.theme} onChange={() => {}} />
            <LanguageSwitcher
              value={preferences.language}
              onChange={() => {}}
            />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderForm;
