// import styles from './Header.module.css';
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Container from "../Container/Container";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <header>
      <Container>
        <Logo />
        <ThemeSwitcher />
        <LanguageSwitcher />
        <div>
          {isAuthenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
