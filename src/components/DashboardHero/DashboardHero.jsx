import styles from "./DashboardHero.module.css";


const DashboardHero = ({ user }) => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroBackground} />
        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>Welcome Back</p>
          <h1 className={styles.heroTitle}>
            Hello, {user?.firstName || "Traveler"}
          </h1>
          <p className={styles.heroDescription}>
            Your next adventure awaits. All systems ready for departure.
          </p>
        </div>
    </div>
  );
};

export default DashboardHero;
