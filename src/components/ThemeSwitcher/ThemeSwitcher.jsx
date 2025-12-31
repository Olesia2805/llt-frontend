import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeSwitcher;
