import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { TbBrandGoogleFilled } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa6";

import styles from "./SignUpPage.module.css";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

import { register, googleAuth } from "../../app/auth.api";
import { useAuth } from "../../context/AuthContext";
import { getPasswordStrength } from "../../app/passwordStrength";

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
  const [error, setError] = useState("");

  const strength = password ? getPasswordStrength(password) : "empty";

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        const data = await googleAuth(tokenResponse.access_token);
        await login({ email: data.email, token: data.token });
        navigate("/");
      } catch (err) {
        setError(err.message || "Google auth failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError("Google login failed"),
  });

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

  return (
    <Container>
      <div className={styles.signupWrapper}>
        {/* Hero Text */}
        <div className={styles.heroText}>
          <span className={styles.badge}>
            <FaHashtag />
            {t("hero_section.badge_text").toUpperCase()}
          </span>
          <h1 dangerouslySetInnerHTML={{ __html: t("hero_section.title") }} />
          <p>{t("hero_section.description")}</p>
        </div>

        {/* Registration Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>{t("registration_form.title")}</h2>
          <p className={styles.loginText}>
            {t("login_text")}{" "}
            <Button variant="link-accent" to="/login">
              {t("login")}
            </Button>
          </p>

          {/* Google Signup */}
          <Button
            type="button"
            variant="secondary"
            onClick={handleGoogleSignup}
            leftIcon={<TbBrandGoogleFilled />}
          >
            {t("buttons.google_signup")}
          </Button>

          <div className={styles.divider}>{t("buttons.divider_text")}</div>

          {/* Form */}
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
            <div className={styles.strengthTrack}>
              <div className={`${styles.strengthBar} ${styles[strength]}`} />
            </div>
          </label>

          <label className={styles.policies}>
            <input
              type="checkbox"
              checked={acceptedPolicies}
              onChange={(e) => setAcceptedPolicies(e.target.checked)}
              required
              aria-required="true"
            />
            <span className={styles.checkbox} aria-hidden="true" />
            <p className={styles.text}>
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

          {/* Error Message */}
          {error && <p className={styles.error}>{error}</p>}

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
