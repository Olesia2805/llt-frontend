import { IoSunny, IoMoon } from "../../app/sectionsGuestIcons.js";
import styles from "./ThemeSwitcher.module.css";
import { useState } from "react";

const ThemeSwitcher = ({ value, onChange }) => {
  const [localTheme, setLocalTheme] = useState(value || "dark");

  const handleToggle = () => {
    const nextTheme =
      localTheme === "dark"
        ? "light"
        : localTheme === "light"
          ? "dark"
          : "dark";

    setLocalTheme(nextTheme);
    onChange(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const resolvedTheme =
    localTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : localTheme;

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={styles.switcher}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <IoMoon className={styles.icon} />
      ) : (
        <IoSunny className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
