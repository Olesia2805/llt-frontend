import { useState } from "react";
import clsx from "clsx";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import styles from "./InputField.module.css";
import Button from "../Button/Button";

const InputField = ({ label, type = "text", error, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && <span className={styles.labelText}>{label}</span>}

      <div className={styles.inputContainer}>
        <input
          type={inputType}
          className={clsx(styles.input, error && styles.inputError)}
          {...props}
        />

        {isPassword && (
          <Button
            variant="inputBtn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
          </Button>
        )}
      </div>

      <span className={clsx(styles.errorText, !error && styles.invisible)}>
        {error || "\u00A0"}
      </span>
    </div>
  );
};

export default InputField;
