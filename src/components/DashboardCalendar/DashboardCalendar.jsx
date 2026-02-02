import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./DashboardCalendar.module.css";
import { MdChevronLeft, MdChevronRight, MdCalendarMonth } from "react-icons/md";
import Button from "../Button/Button";

const DashboardCalendar = ({ calendarData }) => {
  const { t } = useTranslation("dashboard");
  const { events, upcomingTrips } = calendarData;
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const [displayYear, setDisplayYear] = useState(today.getFullYear());

  const monthNames = [
    t("calendar.months.January"),
    t("calendar.months.February"),
    t("calendar.months.March"),
    t("calendar.months.April"),
    t("calendar.months.May"),
    t("calendar.months.June"),
    t("calendar.months.July"),
    t("calendar.months.August"),
    t("calendar.months.September"),
    t("calendar.months.October"),
    t("calendar.months.November"),
    t("calendar.months.December"),
  ];

  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonthDays = new Date(displayYear, displayMonth, 0).getDate();
  const prevMonthStart = prevMonthDays - adjustedFirstDay + 1;

  const calendarDays = [];
  
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push({ day: prevMonthStart + i, isCurrentMonth: false });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }

  const hasEvent = (day) => {
    return events.some(e => e.date === day);
  };

  const getTripPosition = (day) => {
    // Create a date object for the current day in the displayed month
    const currentDate = new Date(displayYear, displayMonth, day);
    currentDate.setHours(0, 0, 0, 0);

    // Find a trip that covers this specific day
    const tripEvent = events.find((e) => {
      if (!e.startDate || !e.endDate) return false;
      const tripStart = new Date(e.startDate);
      const tripEnd = new Date(e.endDate);
      tripStart.setHours(0, 0, 0, 0);
      tripEnd.setHours(0, 0, 0, 0);
      return currentDate >= tripStart && currentDate <= tripEnd;
    });

    if (!tripEvent) return null;

    const tripStart = new Date(tripEvent.startDate);
    const tripEnd = new Date(tripEvent.endDate);
    tripStart.setHours(0, 0, 0, 0);
    tripEnd.setHours(0, 0, 0, 0);

    // Determine position
    let position = "middle";
    if (currentDate.getTime() === tripStart.getTime()) position = "start";
    else if (currentDate.getTime() === tripEnd.getTime()) position = "end";

    // Determine if it's a future trip (starts after today)
    const normalizedToday = new Date();
    normalizedToday.setHours(0, 0, 0, 0);
    const isFuture = tripStart > normalizedToday;

    return { position, isFuture };
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      displayMonth === today.getMonth() &&
      displayYear === today.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <MdCalendarMonth />
          {t("calendar.title")}
        </h3>
        <div className={styles.navigation}>
          <Button
            variant="secondary"
            className={styles.navBtn}
            onClick={handlePrevMonth}
            aria-label={t("calendar.prevMonth")}
          >
            <MdChevronLeft />
          </Button>
          <Button
            variant="secondary"
            className={styles.navBtn}
            onClick={handleNextMonth}
            aria-label={t("calendar.nextMonth")}
          >
            <MdChevronRight />
          </Button>
        </div>
      </div>

      <div className={styles.monthLabel}>{monthNames[displayMonth]} {displayYear}</div>

      <div className={styles.weekdays}>
        {[
          t("calendar.weekdays.Mon"),
          t("calendar.weekdays.Tue"),
          t("calendar.weekdays.Wed"),
          t("calendar.weekdays.Thu"),
          t("calendar.weekdays.Fri"),
          t("calendar.weekdays.Sat"),
          t("calendar.weekdays.Sun"),
        ].map((day) => (
          <span key={day} className={styles.weekday}>{day}</span>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {calendarDays.map((item, index) => {
          const tripData = item.isCurrentMonth ? getTripPosition(item.day) : null;
          const isTodayDay = item.isCurrentMonth && isToday(item.day);
          
          const tripClasses = tripData 
            ? `${styles[tripData.position]} ${tripData.isFuture ? styles.future : ""}` 
            : "";

          return (
            <div
              key={index}
              className={`${styles.day} ${
                !item.isCurrentMonth ? styles.otherMonth : ""
              } ${tripClasses}`}
            >
              {item.day}
              {isTodayDay && <div className={styles.todayDot} title="Today" />}
            </div>
          );
        })}
      </div>

      <div className={styles.upcomingSection}>
        <h4 className={styles.upcomingTitle}>{t("calendar.upcomingNext")}</h4>
        <div className={styles.upcomingList}>
          {upcomingTrips && upcomingTrips.length > 0 ? (
            upcomingTrips.map((trip) => (
              <div key={trip.id} className={styles.upcomingTrip}>
                <div className={styles.tripDate}>
                  <span className={styles.tripMonth}>
                    {monthNames[new Date(trip.startDate).getMonth()].slice(0, 3)}
                  </span>
                  <span className={styles.tripDay}>
                    {new Date(trip.startDate).getDate()}
                  </span>
                </div>
                <div className={styles.tripInfo}>
                  <p className={styles.tripTitle}>{trip.title}</p>
                  <p className={styles.tripDetails}>
                    {trip.duration}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noTripsMessage}>
              {t("calendar.noTrips")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCalendar;
