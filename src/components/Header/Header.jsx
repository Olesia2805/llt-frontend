import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Container from "../Container/Container";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <header>
      <hr className={styles.divider} />
      <Container>
        <Logo />
        <ThemeSwitcher />
        <LanguageSwitcher />
        {isAuthenticated ? (
          <Button text="Logout" onClick={logout} />
        ) : (
          <Button text="Login" onClick={login} />
        )}
      </Container>
    </header>
  );
};

export default Header;
