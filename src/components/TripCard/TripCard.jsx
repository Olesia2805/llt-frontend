import TripCardDay from "../TripCardDay/TripCardDay";
import Button from "../Button/Button";
import styles from "./TripCard.module.css";
import { TbBrandWechat } from "react-icons/tb";
import { FaBookmark } from "react-icons/fa6";
import { disintegrate } from "../../utils/disintegrate";
import { useRef } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaBus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TripCard = ({ data, onSave }) => {
  const { t } = useTranslation("recommendedTrips");
  const cardRef = useRef(null);
  if (!data) return null;

  const {
    title,
    summary,
    total_budget_estimate,
    currency,
    duration_days,
    itinerary,
    transport,
  } = data;

  const daysMap = itinerary.reduce((acc, item) => {
    if (!acc[item.day_index]) acc[item.day_index] = [];
    acc[item.day_index].push(item);
    return acc;
  }, {});

  const days = Object.entries(daysMap);

  const handleSave = () => {
    if (!cardRef.current) return;
    disintegrate(cardRef.current);
    onSave();
  };

  return (
    <div ref={cardRef} className={styles.tripCard}>
      <div className={styles.headerBtn}>
        <Button
          leftIcon={<FaBookmark />}
          onClick={handleSave}
          text={t("buttons.saveRoute")}
        />
      </div>

      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <MdOutlineCalendarToday />
          <div className={styles.metaText}>
            <span className={styles.metaLabel}>{t("meta.duration")}</span>
            <span className={styles.metaValue}>{`${duration_days} days`}</span>
          </div>
        </div>
        <div className={styles.metaItem}>
          <TbPigMoney />
          <div className={styles.metaText}>
            <span className={styles.metaLabel}>{t("meta.budget")}</span>
            <span
              className={styles.metaValue}
            >{`≈ ${total_budget_estimate} ${currency}`}</span>
          </div>
        </div>
        <div className={styles.metaItem}>
          <FaBus />
          <div className={styles.metaText}>
            <span className={styles.metaLabel}>{t("meta.transport")}</span>
            <span className={styles.metaValue}>{transport ?? "—"}</span>
          </div>
        </div>
      </div>

      <ul className={styles.days}>
        {days.map(([dayIndex, activities]) => (
          <TripCardDay
            key={dayIndex}
            dayIndex={dayIndex}
            activities={activities}
          />
        ))}
      </ul>

      <div className={styles.why}>
        <h4 className={styles.whyTitle}>
          <TbBrandWechat />
          {t("whyTitle")}
        </h4>
        <p className={styles.whyText}>{itinerary[0]?.rationale}</p>
      </div>
    </div>
  );
};

export default TripCard;
