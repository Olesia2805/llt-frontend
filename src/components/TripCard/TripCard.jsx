import TripCardDay from "../TripCardDay/TripCardDay";
import styles from "./TripCard.module.css";
import { TbBrandWechat } from "react-icons/tb";
import { useRef, useMemo, useState, useEffect } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaBus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { explainRecommendTrip } from "../../services/trips.api";

const TripCard = ({ data }) => {
  const { t } = useTranslation("recommendedTrips");
  const cardRef = useRef(null);
  const hasFetchedWhy = useRef(false);

  const [whyText, setWhyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { trip, mapData } = data || {};

  const {
    id,
    userId,
    title,
    summary,
    totalBudgetEstimate,
    currency,
    startDate,
    endDate,
    transportMode,
  } = trip || {};

  const durationDays = useMemo(() => {
    if (!startDate || !endDate) return 1;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const startTime = Date.UTC(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    );
    const endTime = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    const diff = Math.floor((endTime - startTime) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff + 1);
  }, [startDate, endDate]);

  const daysMap = useMemo(() => {
    const markers = mapData?.markers || [];
    return markers.reduce((acc, marker) => {
      const day = Number(marker.infoWindowContent?.dayIndex || 1);
      if (!acc[day]) acc[day] = [];
      acc[day].push(marker);
      return acc;
    }, {});
  }, [mapData]);

  const days = useMemo(() => {
    return Object.entries(daysMap)
      .map(([dayIndex, activities]) => ({
        dayIndex: Number(dayIndex),
        activities: activities.sort((a, b) => a.orderIndex - b.orderIndex),
      }))
      .sort((a, b) => a.dayIndex - b.dayIndex);
  }, [daysMap]);

  useEffect(() => {
    if (!trip || hasFetchedWhy.current) return;

    hasFetchedWhy.current = true;

    const fetchExplanation = async () => {
      try {
        setIsLoading(true);
        setError("");

        const payload = {
          user_id: userId,
          trip_id: id,
          trip_plan: trip,
          question: t("whyQuestion"),
        };

        console.log(payload);
        const response = await explainRecommendTrip(payload);
        setWhyText(response?.explanation || "");
      } catch {
        setError(t("whyError"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchExplanation();
  }, [trip, id, userId, t]);

  if (!trip || !mapData) return null;

  return (
    <div ref={cardRef} className={styles.tripCard}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <MdOutlineCalendarToday />
          <div className={styles.metaText}>
            <span className={styles.metaLabel}>{t("meta.duration")}</span>
            <span className={styles.metaValue}>{durationDays}</span>
          </div>
        </div>

        <div className={styles.metaItem}>
          <TbPigMoney />
          <div className={styles.metaText}>
            <span className={styles.metaLabel}>{t("meta.budget")}</span>
            <span className={styles.metaValue}>
              ≈ {totalBudgetEstimate} {currency}
            </span>
          </div>
        </div>

        <div className={styles.metaItem}>
          <FaBus />
          <div className={styles.metaText}>
            <span className={styles.metaLabel}>{t("meta.transport")}</span>
            <span className={styles.metaValue}>
              {t(`transportOptions.${transportMode}`) ?? "—"}
            </span>
          </div>
        </div>
      </div>

      <ul className={styles.days}>
        {days.map(({ dayIndex, activities }) => (
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

        {isLoading && <p className={styles.whyText}>{t("whyLoading")}</p>}

        {error && <p className={styles.whyError}>{error}</p>}

        {whyText && <p className={styles.whyText}>{whyText}</p>}
      </div>
    </div>
  );
};

export default TripCard;
