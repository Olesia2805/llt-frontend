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
  leftIcon,
  rightIcon,
  isActive = false,
  href,
  // loaderProps = { size: "sm" },
  ...props
}) => {
  const Tag = href ? "a" : "button";

  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    {
      [styles.loading]: isLoading,
      [styles.active]: isActive,
      [styles.disabled]: disabled || isLoading,
    },
    className
  );

  return (
    <Tag
      {...(href
        ? { href }
        : { type, onClick, disabled: disabled || isLoading })}
      className={buttonClasses}
      {...props}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}

      <span className={styles.content}>{children || text}</span>

      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}

      {isLoading && <div className={styles.overlay} />}
    </Tag>
  );
};

export default Button;
