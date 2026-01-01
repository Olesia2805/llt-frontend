import styles from "./OfferListCard.module.css";

const OfferListCard = ({ title, description, Icon }) => {
  return (
    <li className={styles.card}>
      <div className={styles.iconWrapper}>
        {Icon && <Icon className="icon" />}
      </div>

      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
};

export default OfferListCard;
