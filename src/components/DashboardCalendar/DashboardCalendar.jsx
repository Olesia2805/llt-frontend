import { useState } from "react";
import styles from "./DashboardCalendar.module.css";
import { MdChevronLeft, MdChevronRight, MdCalendarMonth } from "react-icons/md";
import Button from "../Button/Button";

const DashboardCalendar = ({ calendarData }) => {
  const { currentMonth, currentYear, events, upcomingTrips } = calendarData;
  const [displayMonth, setDisplayMonth] = useState(currentMonth);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, displayMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, displayMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonthDays = new Date(currentYear, displayMonth, 0).getDate();
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
    const tripEvent = events.find(e => e.startDate && e.endDate);
    if (!tripEvent) return null;
    
    if (day === tripEvent.startDate) return "start";
    if (day === tripEvent.endDate) return "end";
    if (day > tripEvent.startDate && day < tripEvent.endDate) return "middle";
    return null;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <MdCalendarMonth />
          Trip Schedule
        </h3>
        <div className={styles.navigation}>
          <Button
            variant="secondary"
            className={styles.navBtn}
            onClick={() => setDisplayMonth((prev) => (prev === 0 ? 11 : prev - 1))}
            aria-label="Previous month"
          >
            <MdChevronLeft />
          </Button>
          <Button
            variant="secondary"
            className={styles.navBtn}
            onClick={() => setDisplayMonth((prev) => (prev === 11 ? 0 : prev + 1))}
            aria-label="Next month"
          >
            <MdChevronRight />
          </Button>
        </div>
      </div>

      <div className={styles.monthLabel}>{monthNames[displayMonth]} {currentYear}</div>

      <div className={styles.weekdays}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span key={day} className={styles.weekday}>{day}</span>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {calendarDays.map((item, index) => {
          const tripPosition = item.isCurrentMonth ? getTripPosition(item.day) : null;
          const hasEventDot = item.isCurrentMonth && hasEvent(item.day);

          return (
            <div
              key={index}
              className={`${styles.day} ${
                !item.isCurrentMonth ? styles.otherMonth : ""
              } ${tripPosition ? styles[tripPosition] : ""}`}
            >
              {item.day}
              {hasEventDot && <div className={styles.eventDot} />}
            </div>
          );
        })}
      </div>

      <div className={styles.upcomingSection}>
        <h4 className={styles.upcomingTitle}>Upcoming Next</h4>
        <div className={styles.upcomingList}>
          {upcomingTrips.map((trip) => (
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
                  {trip.duration} • {trip.travelers} Travelers
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCalendar;
