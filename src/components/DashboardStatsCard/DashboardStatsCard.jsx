import styles from "./DashboardStatsCard.module.css";

const DashboardStatsCard = ({ icon: Icon, label, value, variant = "default" }) => {
  const formattedValue = typeof value === 'number' && value < 10 && value >= 0 
    ? `0${value}` 
    : value;

  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrapper} ${styles[variant]}`}>
        <Icon className={styles.icon} />
      </div>
      <div className={`${styles.content} ${variant === 'active' ? styles.active : ''}`}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{formattedValue}</p>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
