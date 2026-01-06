import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Logo from "../../Logo/Logo";
import styles from "./LogInForm.module.css";

import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";

const LogInForm = () => {
  const { t } = useTranslation("login");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };
  
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className={styles.formContainer}>
      {/* Mobile Logo */}
      <div className={styles.mobileLogo}>
        <Logo variant="header" />
        <span>TravelApp</span>
      </div>

      <div className={styles.header}>
        <h1>{t("form.welcome")}</h1>
        <p>{t("form.continue")}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">{t("form.emailLabel")}</label>
          <input
            id="email"
            type="text"
            placeholder={t("form.emailPlaceholder")}
            className={`${styles.input} ${errors.email ? styles.error : ""}`}
            {...register("email", { 
              required: t("validation.emailRequired"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("validation.emailPattern")
              }
            })}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">{t("form.passwordLabel")}</label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("form.passwordPlaceholder")}
              className={`${styles.input} ${errors.password ? styles.error : ""}`}
              {...register("password", { 
                required: t("validation.passwordRequired"),
                minLength: {
                  value: 8,
                  message: t("validation.passwordLength")
                },
                validate: {
                  complexity: (value) => 
                    /(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value) || t("validation.passwordComplexity")
                }
              })}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOff size={20} />
              ) : (
                <IoEye size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <label className={styles.rememberMe}>
            <input type="checkbox" {...register("rememberMe")} />
            <span>{t("form.rememberMe")}</span>
          </label>
          <a href="#" className={styles.forgotPassword}>
            {t("form.forgotPassword")}
          </a>
        </div>

        <button type="submit" className={styles.submitButton}>
          {t("form.loginButton")}
        </button>
      </form>

      <div className={styles.divider}>
        <div className={styles.bgDivider}></div>
        <span>{t("form.orContinue")}</span>
        <div className={styles.bgDivider}></div>
      </div>

      <div className={styles.socialLogin}>
        <GoogleLoginButton onClick={handleGoogleLogin} />
      </div>

      <div className={styles.footer}>
        <p>
          {t("form.noAccount")}{" "}
          <Link to="/signup" className={styles.signupLink}>
            {t("form.signup")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInForm;
