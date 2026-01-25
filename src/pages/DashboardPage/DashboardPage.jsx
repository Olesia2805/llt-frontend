import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDashboardStats,
  getDashboardCalendar,
  getTravelHistory,
} from "../../api/dashboard.api";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import DashboardStatsCard from "../../components/DashboardStatsCard/DashboardStatsCard";
import DashboardCalendar from "../../components/DashboardCalendar/DashboardCalendar";
import DashboardMap from "../../components/DashboardMap/DashboardMap";
import styles from "./DashboardPage.module.css";
import { MdCalendarToday, MdTaskAlt, MdRocketLaunch } from "react-icons/md";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.userData);
  const [stats, setStats] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [travelData, setTravelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // TODO: Remove mock userId after testing - should require real user
      const userId = user?.id || "mock-user-id";

      try {
        setLoading(true);
        const [statsData, calendarInfo, travelInfo] = await Promise.all([
          getDashboardStats(userId),
          getDashboardCalendar(userId),
          getTravelHistory(userId),
        ]);

        setStats(statsData);
        setCalendarData(calendarInfo);
        setTravelData(travelInfo);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  if (loading || !stats || !calendarData || !travelData) {
    return null;
  }

  return (
    <Section>
      <Container>
        <div className={styles.heroSection}>
          <div className={styles.heroBackground} />
          <div className={styles.heroContent}>
            <p className={styles.heroLabel}>Welcome Back</p>
            <h1 className={styles.heroTitle}>
              Hello, {user?.firstName || "Traveler"}
            </h1>
            <p className={styles.heroDescription}>
              Your next adventure awaits. All systems ready for departure.
            </p>
          </div>
        </div>

        <div className={styles.statsBar}>
          <DashboardStatsCard
            icon={MdCalendarToday}
            label="Total Trips"
            value={stats.totalTrips}
            variant="default"
          />
          <DashboardStatsCard
            icon={MdTaskAlt}
            label="Completed"
            value={stats.completedTrips}
            variant="success"
          />
          <DashboardStatsCard
            icon={MdRocketLaunch}
            label="Active/Future"
            value={stats.activeTrips}
            variant="active"
          />
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.calendarColumn}>
            <DashboardCalendar calendarData={calendarData} />
          </div>
          <div className={styles.mapColumn}>
            <DashboardMap travelData={travelData} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default DashboardPage;
