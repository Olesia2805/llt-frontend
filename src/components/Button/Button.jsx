import clsx from "clsx";
import styles from "./Button.module.css";
import Loader from "../Loader/Loader";

const Button = ({
  variant = "primary", // variant: "primary", "secondary", "ghost"
  text,
  children,
  className,
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  rightIcon,
  isActive = false,
  // loaderProps = { size: "sm" },
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        styles.button,
        styles[variant],
        {
          [styles.loading]: isLoading,
          [styles.active]: isActive,
        },
        className
      )}
      {...props}
    >
      <span className={styles.content}>{children || text}</span>

      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}

      {isLoading && <div className={styles.overlay} />}
    </button>
  );
};

export default Button;
