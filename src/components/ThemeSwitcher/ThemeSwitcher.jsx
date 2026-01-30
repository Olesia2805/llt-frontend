import { IoSunny, IoMoon } from "../../app/sectionsGuestIcons.js";
import styles from "./ThemeSwitcher.module.css";
import { useSelector } from "react-redux";

const ThemeSwitcher = ({ value, onChange }) => {
  const isAuthenticated = useSelector((state) => state.userData);
  const handleToggle = () => {
    const currentTheme = value === "system" ? "dark" : value;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    onChange(nextTheme);

    if (!isAuthenticated) {
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("guestTheme", nextTheme);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={styles.switcher}
      aria-label="Toggle theme"
    >
      {value === "dark" ? (
        <IoMoon className={styles.icon} />
      ) : (
        <IoSunny className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
