import styles from "./DashboardStatsCard.module.css";

const DashboardStatsCard = ({ icon: Icon, label, value, variant = "default" }) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrapper} ${styles[variant]}`}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
