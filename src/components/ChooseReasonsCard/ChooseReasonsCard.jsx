import styles from "./ChooseReasonsCard.module.css";

const ChooseReasonsCard = ({ title, description, Icon }) => {
  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          {Icon && <Icon className={styles.icon} />}
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <span className={styles.divider} />

      <p className={styles.description}>{description}</p>
    </li>
  );
};

export default ChooseReasonsCard;
