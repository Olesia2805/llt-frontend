import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserTrips, deleteTrip } from "../../app/trips.api";
import MyTripCard from "../../components/MyTripCard/MyTripCard";
import ModalDeleteTrip from "../../components/ModalDeleteTrip/ModalDeleteTrip";
import styles from "./MyTripsPage.module.css";
import { FiPlusCircle } from "react-icons/fi";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

const MyTripsPage = () => {
  const { user, isRefreshing } = useAuth();

  const userId = user?.id;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [tripToDelete, setTripToDelete] = useState(null);

  useEffect(() => {
    if (isRefreshing || !userId) return;

    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserTrips(userId);
        setTrips(response);
      } catch (err) {
        setError(err.message || "Failed to load trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
    console.log(fetchTrips);
  }, [userId, isRefreshing]);

  // const statusFilters = useMemo(() => {
  //   const statuses = trips.map((t) => t.status);
  //   return ["all", ...new Set(statuses)];
  // }, [trips]);

  // // const statusFilters = useMemo(() => {
  // //   const statuses = trips.map((t) => t.status).filter(Boolean);
  // //   return ["all", ...Array.from(new Set(statuses))];
  // // }, [trips]);

  const dateFilters = [
    { id: "all", label: "All Trips" },
    { id: "present", label: "Present" },
    { id: "future", label: "Future" },
    { id: "past", label: "Past" },
  ];

  const filteredTrips = useMemo(() => {
    const now = Date.now();

    return trips
      .filter((trip) => {
        const start = new Date(trip.startDate).getTime();
        const end = new Date(trip.endDate).getTime();

        if (activeFilter === "future") return start > now;
        if (activeFilter === "past") return end < now;
        if (activeFilter === "present") return start <= now && end >= now;

        return true;
      })
      .filter((trip) =>
        trip.title?.toLowerCase().includes(search.toLowerCase())
      );
  }, [trips, activeFilter, search]);

  const handleAskDelete = (tripId) => {
    setTripToDelete(tripId);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTrip(tripToDelete);
      setTrips((prev) => prev.filter((trip) => trip.id !== tripToDelete));
    } catch (err) {
      alert(err.message);
    } finally {
      setTripToDelete(null);
    }
  };

  if (isRefreshing || loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <Section>
      <Container>
        <div className={styles.headerWrapper}>
          <div className={styles.headerRow}>
            <div className={styles.header}>
              <h1>My Journeys</h1>
              <p>Manage your planned adventure</p>
            </div>

            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search trips..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />

              {search ? (
                <Button
                  variant="inputBtn"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <IoIosCloseCircleOutline />
                </Button>
              ) : (
                <FaSearch className={styles.searchIcon} />
              )}
            </div>
          </div>
          <div className={styles.filters}>
            {dateFilters.map((dates) => (
              <Button
                key={dates.id}
                variant={activeFilter === dates.id ? "primary" : "secondary"}
                onClick={() => setActiveFilter(dates.id)}
              >
                {dates.label}
              </Button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          <Button
            className={styles.createCard}
            onClick={() => console.log("Navigate to create trip")}
          >
            <FiPlusCircle />
            <p>Plan New Trip</p>
          </Button>

          {filteredTrips.map((trip) => (
            <MyTripCard key={trip.id} trip={trip} onDelete={handleAskDelete} />
          ))}
        </div>

        <ModalDeleteTrip
          isOpen={tripToDelete !== null}
          onCancel={() => setTripToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      </Container>
    </Section>
  );
};

export default MyTripsPage;
