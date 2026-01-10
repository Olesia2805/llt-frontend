import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";
import NetworkLinks from "../NetworkLinks/NetworkLinks";
import { useTranslation } from "react-i18next";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    //TODO: Toaster
    //TODO: BE endpoint

    setEmail("");
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
              <li>{t("footer.aboutUs")}</li>
              <li>{t("footer.team")}</li>
              <li>
                <Link to="/policies" className={styles.footerLink}>
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.title}>{t("footer.newsletterTitle")}</h4>
            <p className={styles.description}>
              {t("footer.newsletterDescription")}
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                className={styles.input}
                required
              />

              <Button text={t("footer.button")} />
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
