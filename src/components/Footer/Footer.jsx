import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";
import NetworkLinks from "../NetworkLinks/NetworkLinks";
import Container from "../Container/Container";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { emailRegex } from "../../app/validation";

// TODO: endpoint for email

const Footer = ({ setIsTeamOpen }) => {
  const { t } = useTranslation("common");

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: null });
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!touched) return;

    const timeoutId = setTimeout(() => {
      if (!emailRegex.test(email)) {
        setErrors({ email: t("footer.email_invalid") });
      } else {
        setErrors({ email: null });
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [email, touched, t]);

  useEffect(() => {
    if (email) {
      localStorage.setItem("subscribe_email", email);
    }
  }, [email]);

  useEffect(() => {
    if (!errors.email) return;
    if (email.trim() !== "") return;

    const timer = setTimeout(() => {
      setErrors({ email: null });
    }, 5000);

    return () => clearTimeout(timer);
  }, [errors.email, email]);

  const validate = () => {
    if (!emailRegex.test(email)) {
      setErrors({ email: t("footer.email_invalid") });
      return false;
    }

    setErrors({ email: null });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!validate()) return;

    try {
      localStorage.removeItem("subscribe_email");
      toast.success(t("footer.success"));
      setEmail("");
    } catch {
      toast.error(t("footer.error"));
    } finally {
      setTouched(false);
    }
  };

  return (
    <footer>
      <hr className={styles.divider} />
      <Container>
        <div className={styles.top}>
          <div className={styles.column}>
            <Logo />
            <p className={styles.description}>{t("footer.description")}</p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>{t("footer.company")}</h3>
            <ul className={styles.links}>
              <li>
                <Button
                  variant="link-button-muted"
                  onClick={() => setIsTeamOpen(true)}
                >
                  {t("footer.team.modalName")}
                </Button>
              </li>
              <li>
                <Button variant="link-muted" to="/policies">
                  {t("footer.terms")}
                </Button>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>{t("footer.newsletterTitle")}</h4>
            <p className={styles.description}>
              {t("footer.newsletterDescription")}
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <InputField
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <Button type="submit" text={t("footer.button")} />
            </form>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} LiteLifeTrip Inc.
            {` ${t("footer.copyright")}`}
          </p>
          <NetworkLinks />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
