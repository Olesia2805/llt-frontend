import styles from "./MyTripCard.module.css";
import { MdCalendarMonth } from "react-icons/md";
import { PiCalendarCheckBold } from "react-icons/pi";
import { ImBin } from "react-icons/im";
import Button from "../Button/Button";

const MyTripCard = ({ trip, onDelete }) => {
  const { id, title, startDate, endDate, status } = trip;

  // const formatDate = (date) =>
  //   new Intl.DateTimeFormat("en-GB", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   }).format(new Date(date));

  return (
    <li className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.status}>{status}</span>
        <Button
          variant="deleteBtn"
          onClick={() => onDelete(id)}
          leftIcon={<ImBin />}
        />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.dates}>
        <p>
          <MdCalendarMonth />
          START: {startDate}
          {/* {formatDate(startDate)} */}
        </p>
        <p>
          <PiCalendarCheckBold />
          END: {endDate}
          {/* {formatDate(endDate)} */}
        </p>
      </div>
    </li>
  );
};

export default MyTripCard;
