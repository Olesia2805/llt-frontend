import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";
import NetworkLinks from "../NetworkLinks/NetworkLinks";
import { useTranslation } from "react-i18next";
import Container from "../Container/Container";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className={styles.footer}>
      <Container>
        <hr className={styles.divider} />
        <Logo />
        <p>{t("footer.description")}</p>
        <hr className={styles.divider} />
        <NetworkLinks />
        <p>
          &copy; {new Date().getFullYear()} LiteLifeTrip Inc.{" "}
          {t("footer.copyright")}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
