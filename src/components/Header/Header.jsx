// import styles from './Header.module.css';
// import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Logo from "../Logo/Logo.jsx";
// import AuthBar from '../AuthBar/AuthBar.jsx';
// import UserBar from '../UserBar/UserBar.jsx';

function Header() {
  return (
    <header>
      <Logo />
      {/* <ThemeSwitcher /> */}
      <LanguageSwitcher />
    </header>
  );
}

export default Header;
