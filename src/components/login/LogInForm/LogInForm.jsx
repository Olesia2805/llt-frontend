import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import styles from "./LogInForm.module.css";
import Button from "../../Button/Button";
import InputField from "../../InputField/InputField";

import { emailRegex } from "../../../app/validation";
import { login, googleAuth } from "../../../store/userSlice";

const LogInForm = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.userData);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!email) {
        setErrors((prev) => ({ ...prev, email: null }));
      } else if (!emailRegex.test(email)) {
        setErrors((prev) => ({
          ...prev,
          email: t("validation.emailPattern"),
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [email, t]);

  const validate = () => {
    const newErrors = {};
    if (!emailRegex.test(email)) {
      newErrors.email = t("validation.emailPattern");
    }
    if (!password) {
      newErrors.password = t("validation.passwordRequired");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrors({});
    try {
      await dispatch(
        googleAuth({ credential: credentialResponse.credential }),
      ).unwrap();

      navigate("/");
    } catch (err) {
      setErrors({ form: err });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      setErrors({ form: err });
    }
  };

  const handleFieldChange = (fieldName, value, setter) => {
    setter(value);
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2>{t("form.welcome")}</h2>
      <p className={styles.loginText}>
        {t("form.noAccount")}{" "}
        <Button variant="link-accent" to="/signup">
          {t("form.signup")}
        </Button>
      </p>

      <div className={styles.googleBtnContainer}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setErrors({ form: "Google login failed" })}
        />
      </div>

      <div className={styles.divider}>{t("form.orContinue")}</div>

      <InputField
        id="email"
        type="email"
        label={t("form.emailLabel")}
        placeholder={t("form.emailPlaceholder")}
        value={email}
        onChange={(e) => handleFieldChange("email", e.target.value, setEmail)}
        error={errors.email}
        name="email"
        autoComplete="email"
      />

      <InputField
        id="password"
        type="password"
        label={t("form.passwordLabel")}
        placeholder={t("form.passwordPlaceholder")}
        value={password}
        onChange={(e) =>
          handleFieldChange("password", e.target.value, setPassword)
        }
        autoComplete="current-password"
        name="password"
        error={errors.password}
      />

      <div className={styles.actions}>
        <label className={styles.rememberMe}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className={styles.checkbox} aria-hidden="true" />
          <span className={styles.rememberMeText}>{t("form.rememberMe")}</span>
        </label>
        <Button variant="link-accent" to="#">
          {t("form.forgotPassword")}
        </Button>
      </div>

      <div className={styles.formErrorWrapper} role="alert" aria-live="polite">
        <p className={clsx(styles.errorText, !errors.form && styles.invisible)}>
          {errors.form || "\u00A0"}
        </p>
      </div>

      <Button type="submit" isLoading={loading}>
        {t("form.loginButton")}
      </Button>
    </form>
  );
};

export default LogInForm;
