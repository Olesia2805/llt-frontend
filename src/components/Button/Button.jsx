import clsx from "clsx";
import styles from "./Button.module.css";

const Button = ({
  variant = "primary",
  // variant: "primary", "secondary", "..."
  text,
  className,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles.button, styles[variant], className)}
    >
      {text}
    </button>
  );
};

export default Button;
