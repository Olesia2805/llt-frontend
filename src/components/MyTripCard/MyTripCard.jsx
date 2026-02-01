import { useEffect, useRef } from "react";
import styles from "./MyTripCard.module.css";
import { MdCalendarMonth } from "react-icons/md";
import { PiCalendarCheckBold } from "react-icons/pi";
import { ImBin } from "react-icons/im";
import { GrClone } from "react-icons/gr";
import Button from "../Button/Button";
import { disintegrate } from "../../utils/disintegrate";
import { ROUTER } from "../../app/routes";
import { Link } from "react-router-dom";

const MyTripCard = ({
  trip,
  onDelete,
  confirmedDelete,
  onAnimationEnd,
  onClone,
}) => {
  const { id, title, startDate, endDate, status } = trip;

  const cardRef = useRef(null);
  useEffect(() => {
    if (confirmedDelete === id && cardRef.current) {
      disintegrate(cardRef.current, () => {
        onAnimationEnd(id);
      });
    }
  }, [confirmedDelete, id, onAnimationEnd]);

  return (
    <li ref={cardRef} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.status}>{status}</span>
        <div className={styles.tripCardBtnsWrapper}>
          <Button
            variant="tripCardBtn"
            onClick={() => onClone(id)}
            leftIcon={<GrClone />}
          />
          <Button
            variant="tripCardBtn"
            onClick={() => onDelete(id)}
            leftIcon={<ImBin />}
          />
        </div>
      </div>
      <Link key={trip.id} to={ROUTER.MYTRIP.replace(":id", trip.id)}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.dates}>
          <p>
            <MdCalendarMonth />
            START: {startDate}
          </p>
          <p>
            <PiCalendarCheckBold />
            END: {endDate}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default MyTripCard;
