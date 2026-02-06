import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { getUserTrips, deleteTrip, cloneTrip } from "../../services/trips.api";
import MyTripCard from "../../components/MyTripCard/MyTripCard";
import ModalDeleteTrip from "../../components/ModalDeleteTrip/ModalDeleteTrip";
import styles from "./MyTripsPage.module.css";
import { FiPlusCircle } from "react-icons/fi";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import InputField from "../../components/InputField/InputField";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

//TODO: statusFilters
//TODO: townFilter

const MyTripsPage = () => {
  const { t } = useTranslation("myTrips");
  const { user } = useSelector((state) => state.userData);

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [tripToDelete, setTripToDelete] = useState(null);
  const [confirmedDelete, setConfirmedDelete] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await getUserTrips(user.id);
        setTrips(response);
      } catch (err) {
        setError(err.message || "Failed to load trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user?.id]);

  const dateFilters = [
    { id: "all", label: t("buttons.allTrips") },
    { id: "present", label: t("buttons.presentTrips") },
    { id: "future", label: t("buttons.futureTrips") },
    { id: "past", label: t("buttons.pastTrips") },
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
        trip.title?.toLowerCase().includes(search.toLowerCase()),
      );
  }, [trips, activeFilter, search]);

  const handleAskDelete = (tripId) => {
    setTripToDelete(tripId);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTrip(tripToDelete);
      setConfirmedDelete(tripToDelete);
      const response = await getUserTrips(user.id);
      setTrips(response);
    } catch (err) {
      alert(err.message);
    } finally {
      setTripToDelete(null);
    }
  };

  const handleAnimationEnd = async (tripId) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== tripId));
    setConfirmedDelete(null);
  };

  const handleClone = async (tripId) => {
    if (!tripId) return;
    try {
      await cloneTrip(tripId);
      toast.success(t("toast.success"));
      const response = await getUserTrips(user.id);
      setTrips(response);
    } catch (err) {
      alert(err.message);
      toast.error(t("toast.error"));
    }
  };

  return (
    <Section variant="sectionFooterDown">
      <Container>
        <div className={styles.headerWrapper}>
          <div className={styles.headerRow}>
            <div>
              <h2>{t("hero.title")}</h2>
              <p>{t("hero.description")}</p>
            </div>
            <div className={styles.searchWrapper}>
              <InputField
                type="text"
                placeholder={t("searchInput")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                rightElement={
                  search ? (
                    <Button
                      variant="inputBtn"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      rightIcon={<IoIosCloseCircleOutline fontSize="24px" />}
                    />
                  ) : (
                    <FaSearch className={styles.searchIcon} />
                  )
                }
              />
            </div>
          </div>
          <ul className={styles.filters}>
            {dateFilters.map((dates) => (
              <Button
                key={dates.id}
                variant={activeFilter === dates.id ? "primary" : "secondary"}
                onClick={() => setActiveFilter(dates.id)}
              >
                {dates.label}
              </Button>
            ))}
          </ul>
        </div>

        <div className={styles.grid}>
          {loading && <Loader />}

          {!loading && trips.length === 0 && (
            <Button variant="createCard" to="/recommended-trips">
              <FiPlusCircle fontSize={32} />
              <p>{t("buttons.planNewTrip")}</p>
            </Button>
          )}

          {!loading &&
            filteredTrips.length > 0 &&
            filteredTrips.map((trip) => (
              <MyTripCard
                trip={trip}
                onDelete={handleAskDelete}
                confirmedDelete={confirmedDelete}
                onAnimationEnd={handleAnimationEnd}
                onClone={handleClone}
              />
            ))}

          {!loading && trips.length !== 0 && filteredTrips.length === 0 && (
            <p>{t("noTrips")}</p>
          )}
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
