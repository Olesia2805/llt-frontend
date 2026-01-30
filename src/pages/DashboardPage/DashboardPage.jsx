import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getDashboardData } from "../../api/dashboard.api";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import DashboardStatsCard from "../../components/DashboardStatsCard/DashboardStatsCard";
import DashboardCalendar from "../../components/DashboardCalendar/DashboardCalendar";
import DashboardMap from "../../components/DashboardMap/DashboardMap";
import DashboardHero from "../../components/DashboardHero/DashboardHero";
import styles from "./DashboardPage.module.css";
import { MdCalendarToday, MdTaskAlt, MdRocketLaunch } from "react-icons/md";

const DashboardPage = () => {
  // const { user } = useSelector((state) => state.userData);
  const { t } = useTranslation("dashboard");
  
  
  // TODO: remove mock data
  const user = {
    id: "4b278d27-2e9e-4e4e-ad3a-ad55c0567729",
  };
  // TODO: remove mock data
  
  
  const [stats, setStats] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [travelData, setTravelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const { stats, calendarData, travelData } = await getDashboardData(
          user.id,
        );

        setStats(stats);
        setCalendarData(calendarData);
        setTravelData(travelData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  if (loading) {
    return null; 
  }

  // Find next upcoming trip
  const nextTrip = travelData?.cities
    ?.filter((city) => city.status === "upcoming")
    ?.sort((a, b) => {
      // Prioritize "Current Trip" over future trips
      if (a.visitDate === "Current Trip") return -1;
      if (b.visitDate === "Current Trip") return 1;
      return (a.daysUntil || 0) - (b.daysUntil || 0);
    })?.[0];

  // Default stats and data if empty
  const displayStats = stats || { totalTrips: 0, completedTrips: 0, activeTrips: 0 };
  const displayCalendarData = calendarData || { events: [], upcomingTrips: [] };
  const displayTravelData = travelData || { cities: [] };

  return (
    <Section>
      <DashboardHero user={user} nextTrip={nextTrip} />
      <Container>
        <div className={styles.statsBar}>
          <DashboardStatsCard
            icon={MdCalendarToday}
            label={t("stats.totalTrips")}
            value={displayStats.totalTrips}
            variant="default"
          />
          <DashboardStatsCard
            icon={MdTaskAlt}
            label={t("stats.completed")}
            value={displayStats.completedTrips}
            variant="success"
          />
          <DashboardStatsCard
            icon={MdRocketLaunch}
            label={t("stats.activeFuture")}
            value={displayStats.activeTrips}
            variant="active"
          />
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.calendarColumn}>
            <DashboardCalendar calendarData={displayCalendarData} />
          </div>
          <div className={styles.mapColumn}>
            <DashboardMap travelData={displayTravelData} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default DashboardPage;
