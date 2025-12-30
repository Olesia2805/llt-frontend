// import styles from './Header.module.css';
import Logo from "../Logo/Logo.jsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useAuth } from "../../context/AuthContext.jsx";
// import AuthBar from '../AuthBar/AuthBar.jsx';
// import UserBar from '../UserBar/UserBar.jsx';

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
