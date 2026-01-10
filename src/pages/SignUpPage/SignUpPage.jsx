import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { TbBrandGoogleFilled } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa6";
import clsx from "clsx";

import styles from "./SignUpPage.module.css";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import InputField from "../../components/InputField/InputField";

import { register, googleAuth } from "../../app/auth.api";
import { useAuth } from "../../context/AuthContext";
import {
  getPasswordStrength,
  emailRegex,
  nameRegex,
} from "../../app/validation";

import boatHighResolution from "../../assets/img/boat-high-resolution.webp";
import boatDesktop from "../../assets/img/boat-desktop.webp";
import boatMobile from "../../assets/img/boat-mobile.webp";

const SignUpPage = () => {
  const { t } = useTranslation("signup");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const strength = password ? getPasswordStrength(password) : "empty";

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t("registration_form.errors.name_required");
    } else if (!nameRegex.test(name)) {
      newErrors.name = t("registration_form.errors.name_invalid");
    }

    if (!emailRegex.test(email)) {
      newErrors.email = t("registration_form.errors.email_invalid");
    }

    if (password.length < 6) {
      newErrors.password = t("registration_form.errors.password_short");
    }

    if (!acceptedPolicies) {
      newErrors.policies = t("registration_form.errors.policies_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!name) {
      setErrors((prev) => ({ ...prev, name: null }));
      return;
    }
    const timeoutId = setTimeout(() => {
      if (name.trim().length < 2) {
        setErrors((prev) => ({
          ...prev,
          name: t("registration_form.errors.name_short"),
        }));
      } else if (name.trim().length > 30) {
        setErrors((prev) => ({
          ...prev,
          name: t("registration_form.errors.name_too_long"),
        }));
      } else if (!nameRegex.test(name)) {
        setErrors((prev) => ({
          ...prev,
          name: t("registration_form.errors.name_invalid"),
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: null }));
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [name, t]);

  useEffect(() => {
    if (!email) {
      setErrors((prev) => ({ ...prev, email: null }));
      return;
    }
    const timeoutId = setTimeout(() => {
      if (!emailRegex.test(email)) {
        setErrors((prev) => ({
          ...prev,
          email: t("registration_form.errors.email_invalid"),
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [email, t]);

  useEffect(() => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: null }));
      return;
    }
    const timeoutId = setTimeout(() => {
      if (password.length < 6) {
        setErrors((prev) => ({
          ...prev,
          password: t("registration_form.errors.password_short"),
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [password, t]);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setErrors({});
    try {
      const data = await googleAuth(credentialResponse.credential);
      await login({ email: data.email, token: data.token });
      navigate("/");
    } catch (err) {
      setErrors({ form: err.message || "Google auth failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    setLoading(true);
    try {
      await register({ name, email, password });
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (fieldName, value, setter) => {
    setter(value);
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  return (
    <Container>
      <div className={styles.signupWrapper}>
        <div className={styles.heroText}>
          <span className={styles.badge}>
            <FaHashtag />
            {t("hero_section.badge_text").toUpperCase()}
          </span>
          <h1 dangerouslySetInnerHTML={{ __html: t("hero_section.title") }} />
          <p>{t("hero_section.description")}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h2>{t("registration_form.title")}</h2>
          <p className={styles.loginText}>
            {t("login_text")}{" "}
            <Button variant="link-accent" to="/login">
              {t("login")}
            </Button>
          </p>

          <div className={styles.googleBtnContainer}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setErrors({ form: "Google login failed" })}
            />
          </div>

          <div className={styles.divider}>{t("buttons.divider_text")}</div>

          <InputField
            label={t("registration_form.fields.name.label")}
            placeholder={t("registration_form.fields.name.placeholder")}
            value={name}
            onChange={(e) => handleFieldChange("name", e.target.value, setName)}
            error={errors.name}
          />

          <InputField
            type="email"
            label={t("registration_form.fields.email.label")}
            placeholder={t("registration_form.fields.email.placeholder")}
            value={email}
            onChange={(e) =>
              handleFieldChange("email", e.target.value, setEmail)
            }
            error={errors.email}
          />

          <InputField
            type="password"
            label={t("registration_form.fields.password.label")}
            placeholder={t("registration_form.fields.password.placeholder")}
            value={password}
            onChange={(e) =>
              handleFieldChange("password", e.target.value, setPassword)
            }
            error={errors.password}
          />
          <div className={styles.passwordStrengthWrapper}>
            <div className={styles.strengthTrack}>
              <div className={`${styles.strengthBar} ${styles[strength]}`} />
            </div>

            <p
              className={clsx(
                styles.strengthText,
                strength === "empty" && styles.invisible
              )}
            >
              {strength !== "empty"
                ? t(`registration_form.password_strength.${strength}`)
                : ""}
            </p>
          </div>

          <label className={styles.policies}>
            <input
              type="checkbox"
              checked={acceptedPolicies}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setAcceptedPolicies(isChecked);
                if (isChecked && errors.policies) {
                  setErrors((prev) => ({ ...prev, policies: null }));
                }
              }}
            />
            <span className={styles.checkbox} aria-hidden="true" />
            <p className={styles.policiesText}>
              {t("registration_form.policies.text")}{" "}
              <Button
                variant="link-accent"
                to="/policies"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("registration_form.policies.link")}
              </Button>
            </p>
          </label>

          <div className={styles.formErrorWrapper}>
            <p
              className={clsx(
                styles.errorText,
                !(errors.policies || errors.form) && styles.invisible
              )}
            >
              {errors.policies || errors.form || ""}
            </p>
          </div>

          <Button type="submit" isLoading={loading}>
            {t("buttons.submit")}
          </Button>
        </form>

        <picture>
          <source media="(max-width: 768px)" srcSet={boatMobile} />
          <source srcSet={`${boatDesktop} 1x, ${boatHighResolution} 2x`} />
          <img
            className={styles.image}
            src={boatDesktop}
            alt={t("hero_section.imageAlt")}
            loading="lazy"
          />
        </picture>
      </div>
    </Container>
  );
};

export default SignUpPage;
