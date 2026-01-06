import styles from "./TestimonialsCard.module.css";
import { TESTIMONIAL_ICONS } from "../../app/sectionsGuestIcons.js";

const TestimonialsCard = ({ name, role, rating, text }) => {
  const StarIcon = TESTIMONIAL_ICONS.star;
  const HalfstarIcon = TESTIMONIAL_ICONS.halfstar;
  const QuoteIcon = TESTIMONIAL_ICONS.quotes;

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <div className={styles.rating}>
          {Array.from({ length: Math.floor(rating) }).map((_, i) => (
            <span key={i}>
              <StarIcon />
            </span>
          ))}

          {rating % 1 !== 0 && (
            <span key="half">
              <HalfstarIcon />
            </span>
          )}
        </div>

        <div className={styles.user}>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{role}</p>
        </div>
      </div>

      <p className={styles.text}>"{text}"</p>

      <QuoteIcon className={styles.quotes} />
    </li>
  );
};

export default TestimonialsCard;
