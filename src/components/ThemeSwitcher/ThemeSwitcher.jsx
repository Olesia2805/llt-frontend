import { useContext } from "react";
import { IoSunny, IoMoon } from "../../app/sectionsGuestIcons.js";
import ThemeContext from "../../context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.switcher}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <IoSunny className={styles.icon} />
      ) : (
        <IoMoon className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
