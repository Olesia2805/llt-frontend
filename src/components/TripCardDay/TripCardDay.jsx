import styles from "./TripCardDay.module.css";

const TripCardDay = ({ dayIndex, activities }) => {
  return (
    <li className={styles.dayCard}>
      <h4 className={styles.dayTitle}>{dayIndex}</h4>

      <ul className={styles.activityList}>
        {activities.map((activity, index) => (
          <li key={index} className={styles.activityItem}>
            <h5 className={styles.activityTitle}>{activity.title}</h5>
            <p className={styles.activityDescription}>{activity.description}</p>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default TripCardDay;
