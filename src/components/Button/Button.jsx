import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./Button.module.css";
import Loader from "../Loader/Loader";

const Button = ({
  variant = "primary",
  // variant = "primary" | "secondary" | "ghost" | "link-accent" | "link-muted" | "dot"
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

  to, // internal navigation
  href, // external link

  ...props
}) => {
  const isLink = Boolean(to || href);

  if (import.meta.env.DEV && isLink && onClick) {
    console.warn(
      "[Button]: `onClick` is ignored when `to` or `href` is provided."
    );
  }

  let Component = "button";

  if (to) Component = Link;
  if (href) Component = "a";

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

  const commonProps = {
    className: buttonClasses,
    ...props,
  };

  const content = (
    <>
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span className={styles.content}>{children || text}</span>
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      {isLoading && <Loader />}
    </>
  );

  if (Component === "button") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        {...commonProps}
      >
        {content}
      </button>
    );
  }

  if (Component === Link) {
    return (
      <Link to={to} aria-disabled={disabled || isLoading} {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
      {content}
    </a>
  );
};

export default Button;
