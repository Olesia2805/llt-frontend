import { useTranslation, Trans } from "react-i18next";
import styles from "./DashboardHero.module.css";

const DashboardHero = ({ user, nextTrip }) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroBackground} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {t("hero.hello", { name: user?.name || t("hero.traveler") })}
        </h1>
        <p className={styles.heroDescription}>
          {nextTrip ? (
            <Trans
              i18nKey={
                nextTrip.visitDate === "Current Trip"
                  ? "hero.descriptionWithTripActive"
                  : nextTrip.daysUntil === 1
                    ? "hero.descriptionWithTripTomorrow"
                    : "hero.descriptionWithTrip"
              }
              ns="dashboard"
              values={{
                destination: nextTrip.title || nextTrip.name,
                days: nextTrip.daysUntil,
              }}
              components={[
                <span key="0" />,
                <strong key="1" className={styles.destination} />,
              ]}
            />
          ) : (
            t("hero.description")
          )}
        </p>
      </div>
    </div>
  );
};

export default DashboardHero;
