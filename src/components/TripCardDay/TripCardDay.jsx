import styles from "./TripCardDay.module.css";
import { GoDotFill } from "react-icons/go";

const TripCardDay = ({ dayIndex, activities }) => {
  return (
    <li className={styles.dayCard}>
      <h4 className={styles.dayTitle}>{dayIndex}</h4>
      <ul className={styles.activityList}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.activityItem}>
            <GoDotFill className={styles.activityIcon} />
            <h5 className={styles.activityTitle}>{activity.title}</h5>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default TripCardDay;
