import { IoSunny, IoMoon } from "../../app/sectionsGuestIcons.js";
import styles from "./ThemeSwitcher.module.css";
import { useSelector } from "react-redux";

const ThemeSwitcher = ({ value, onChange }) => {
  const isAuthenticated = useSelector((state) => state.auth);
  const handleToggle = () => {
    const nextTheme = value === "dark" ? "light" : "dark";
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
