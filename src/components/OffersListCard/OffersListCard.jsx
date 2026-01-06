import styles from "./OffersListCard.module.css";

const OffersListCard = ({ title, description, Icon }) => {
  return (
    <li className={styles.card}>
      <div className={styles.iconWrapper}>
        {Icon && <Icon className={styles.icon} />}
      </div>

      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
};

export default OffersListCard;
