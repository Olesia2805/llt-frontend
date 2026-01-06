import { useTranslation } from "react-i18next";
import styles from "./LoginHero.module.css";
import loginBg from "../../../assets/img/login_background.png";
import Logo from "../../Logo/Logo";

const LoginHero = () => {
  const { t } = useTranslation("login");

  return (
    <div className={styles.leftPanel}>
      <div
        className={styles.heroBackground}
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.brand}>
          <Logo variant="header" />
          <span className={styles.brandName}>TravelApp</span>
        </div>
        <div className={styles.heroText}>
          <h2>{t("hero.title")}</h2>
          <p>{t("hero.subtitle")}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;
