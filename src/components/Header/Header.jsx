// import styles from './Header.module.css';
import Logo from "../Logo/Logo.jsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
// import AuthBar from '../AuthBar/AuthBar.jsx';
// import UserBar from '../UserBar/UserBar.jsx';

const Header = () => {
  return (
    <header>
      <Logo />
      <ThemeSwitcher />
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
