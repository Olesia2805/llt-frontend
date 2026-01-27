import { useTranslation } from "react-i18next";
import styles from "./DashboardHero.module.css";


const DashboardHero = ({ user }) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroBackground} />
        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>{t("hero.welcomeBack")}</p>
          <h1 className={styles.heroTitle}>
            {t("hero.hello", { name: user?.firstName || t("hero.traveler") })}
          </h1>
          <p className={styles.heroDescription}>
            {t("hero.description")}
          </p>
        </div>
    </div>
  );
};

export default DashboardHero;
