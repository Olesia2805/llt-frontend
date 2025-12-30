// import styles from './Header.module.css';
import Logo from "../Logo/Logo";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <header>
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
    </header>
  );
};

export default Header;
