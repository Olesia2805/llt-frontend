import { useState, useEffect } from "react";
import boatHighResolution from "../../assets/img/boat-high-resolution.webp";
import boatDesktop from "../../assets/img/boat-desktop.webp";
import boatMobile from "../../assets/img/boat-mobile.webp";
import { useTranslation } from "react-i18next";
import styles from "./SignUpPage.module.css";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

import { register } from "../../app/auth.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getPasswordStrength } from "../../app/passwordStrength";

const SignUpPage = () => {
  const { t } = useTranslation("signup");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [acceptedPolicies, setAcceptedPolicies] = useState(false);

  const strength = password ? getPasswordStrength(password) : "empty";

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptedPolicies) {
      setError(t("registration_form.error_policies"));
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    alert("Google signup integration goes here");
  };

  return (
    <Container>
      <div className={styles.signupWrapper}>
        {/* Hero Text */}
        <div className={styles.heroText}>
          <span className={styles.badge}>{t("hero_section.badge_text")}</span>
          <h1
            dangerouslySetInnerHTML={{
              __html: t("hero_section.title"),
            }}
          />
          <p>{t("hero_section.description")}</p>
        </div>

        {/* Registration Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>{t("registration_form.title")}</h2>
          <p
            className={styles.loginText}
            dangerouslySetInnerHTML={{ __html: t("login_text") }}
          />

          <label>
            {t("registration_form.fields.name.label")}
            <input
              type="text"
              placeholder={t("registration_form.fields.name.placeholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            {t("registration_form.fields.email.label")}
            <input
              type="email"
              placeholder={t("registration_form.fields.email.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            {t("registration_form.fields.password.label")}
            <input
              type="password"
              placeholder={t("registration_form.fields.password.placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.passwordStrength}>
              {/* Трек із рамкою завжди на місці, він тримає висоту */}
              <div className={styles.strengthTrack}>
                <div className={`${styles.strengthBar} ${styles[strength]}`} />
              </div>

              <span className={styles.strengthText}>
                {strength !== "empty"
                  ? t(`registration_form.password_strength.${strength}`)
                  : "\u00A0"}
              </span>
            </div>
          </label>

          <label className={styles.policies}>
            <input
              type="checkbox"
              checked={acceptedPolicies}
              onChange={(e) => setAcceptedPolicies(e.target.checked)}
              required
            />

            <span className={styles.checkbox} aria-hidden="true" />

            <span className={styles.text}>
              {t("registration_form.policies.text")}{" "}
              <a
                href="/policies"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {t("registration_form.policies.link")}
              </a>
            </span>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" variant="primary" isLoading={loading}>
            {t("buttons.submit")}
          </Button>

          <div className={styles.divider}>{t("buttons.divider_text")}</div>

          <Button
            type="button"
            variant="secondary"
            onClick={handleGoogleSignup}
            className={styles.googleButton}
          >
            {t("buttons.google_signup")}
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
