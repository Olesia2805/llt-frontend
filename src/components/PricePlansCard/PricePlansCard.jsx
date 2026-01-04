import { FaCheck } from "../../app/sectionsGuestIcons.js";
import Button from "../Button/Button";
import styles from "./PricePlansCard.module.css";

const PricePlansCard = ({
  title,
  description,
  price,
  period,
  features,
  buttonText,
  isPopular,
}) => {
  return (
    <li className={`${styles.card} ${isPopular ? styles.popular : ""}`}>
      {isPopular && <span className={styles.badge}>POPULAR</span>}

      <h3 className={styles.title}>{title}</h3>
      <p className={styles}>{description}</p>

      <p className={styles.price}>
        {price}
        {period && <span className={styles.period}> /{period}</span>}
      </p>

      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature.id} className={styles.featureItem}>
            <FaCheck className={styles.icon} />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <Button text={buttonText} />
    </li>
  );
};

export default PricePlansCard;
