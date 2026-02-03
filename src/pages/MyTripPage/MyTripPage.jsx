import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FaLocationDot } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";

import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import DateRangeInput from "../../components/DateRangeInput/DateRangeInput";
import { getTripById, getTripMap, updateTrip } from "../../services/trips.api";

import "leaflet/dist/leaflet.css";
import styles from "./MyTripPage.module.css";

const FlyToMarker = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 12, { duration: 1.5 });
  }, [position, map]);
  return null;
};

const normalizeTrip = (trip) => ({
  ...trip,
  startDate: trip.startDate ? new Date(trip.startDate) : null,
  endDate: trip.endDate ? new Date(trip.endDate) : null,
});

const MyTripPage = () => {
  const { t } = useTranslation("myTrip");
  const { id: tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePosition, setActivePosition] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    startDate: null,
    endDate: null,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const markerRefs = useRef({});

  useEffect(() => {
    if (!tripId) return;
    const fetchData = async () => {
      try {
        const tripData = (await getTripById(tripId)).trip;
        const mapPoints = (await getTripMap(tripId))?.markers || [];

        const normalizedTrip = normalizeTrip(tripData);

        setTrip(normalizedTrip);
        setForm({
          title: normalizedTrip.title,
          startDate: normalizedTrip.startDate,
          endDate: normalizedTrip.endDate,
        });
        setPoints(mapPoints);
      } catch {
        setError("Failed to load trip");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  const MAX_TRIP_DAYS = 7;

  const days =
    form.startDate && form.endDate
      ? Math.ceil((form.endDate - form.startDate) / (1000 * 60 * 60 * 24)) + 1
      : 0;

  const dateError =
    days > MAX_TRIP_DAYS
      ? t("errors.maxTripDays", { maxDays: MAX_TRIP_DAYS })
      : "";

  const formatDateLocal = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    if (!form.startDate || !form.endDate) {
      alert(t("errors.selectBothDates"));
      return;
    }

    if (days > MAX_TRIP_DAYS) {
      return;
    }

    setIsUpdating(true);

    try {
      const updated = await updateTrip(tripId, {
        title: form.title,
        startDate: formatDateLocal(form.startDate),
        endDate: formatDateLocal(form.endDate),
      });

      const normalized = normalizeTrip(updated);

      setTrip(normalized);
      setForm({
        title: normalized.title,
        startDate: normalized.startDate,
        endDate: normalized.endDate,
      });
      setIsEditing(false);
    } catch (e) {
      alert(e.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    if (!trip) return;

    setForm({
      title: trip.title,
      startDate: trip.startDate,
      endDate: trip.endDate,
    });
    setIsEditing(false);
  };

  const dayColors = [
    "#FF6B6B", // Day 1 - red
    "#4ECDC4", // Day 2 - teal
    "#FFD93D", // Day 3 - yellow
    "#6A4C93", // Day 4 - purple
    "#FF9F1C", // Day 5 - orange
    "#1A535C", // Day 6 - dark teal
    "#FF6BFF", // Day 7 - pink
  ];

  const handleTitleClick = (p) => {
    const pos = [p.position.lat, p.position.lng];
    setActivePosition(pos);
    if (markerRefs.current[p.id]) markerRefs.current[p.id].openPopup();
    if (window.innerWidth < 1280)
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const groupedPoints = points.reduce((acc, p) => {
    const dayIndex = p.infoWindowContent.dayIndex || 1;
    if (!acc[dayIndex]) acc[dayIndex] = [];
    acc[dayIndex].push(p);
    return acc;
  }, {});

  if (loading) return <Loader />;
  if (error || !trip)
    return <p className={styles.error}> {error || t("errors.tripNotFound")}</p>;

  return (
    <Section variant="sectionFooterDown">
      <Container>
        <div className={styles.changeBtn}>
          {!isEditing ? (
            <Button
              variant="secondary"
              leftIcon={<FaPen />}
              text={t("actions.edit")}
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <div className={styles.editActions}>
              <Button
                variant="primary"
                text={t("actions.save")}
                onClick={handleSave}
                disabled={isUpdating}
              />
              <Button
                variant="secondary"
                text={t("actions.cancel")}
                onClick={handleCancel}
              />
            </div>
          )}
        </div>
        <div className={styles.tripHeader}>
          {isEditing ? (
            <div className={styles.editInputsWrapper}>
              <InputField
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Trip Title"
                className={styles.editTitleInput}
              />
              <DateRangeInput
                startDate={form.startDate}
                endDate={form.endDate}
                onChange={([start, end]) =>
                  setForm((f) => ({ ...f, startDate: start, endDate: end }))
                }
                error={dateError}
              />
            </div>
          ) : (
            <>
              <h2 className={styles.tripTitle} title={trip.title}>
                {trip.title}
              </h2>
              {trip.startDate && trip.endDate && (
                <span className={styles.tripDates}>
                  {new Date(trip.startDate).toLocaleDateString("en-GB")} -{" "}
                  {new Date(trip.endDate).toLocaleDateString("en-GB")}
                </span>
              )}
            </>
          )}
        </div>

        <div className={styles.tripWrapper}>
          <div className={styles.mapContainer}>
            <MapContainer
              center={[
                points[0]?.position.lat || 0,
                points[0]?.position.lng || 0,
              ]}
              zoom={10}
              scrollWheelZoom={false}
              className={styles.leafletMap}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {points.map((p) => {
                const dayIndex = p.infoWindowContent.dayIndex || 1;
                const color = dayColors[(dayIndex - 1) % dayColors.length];
                const icon = L.divIcon({
                  className: "",
                  html: `<div style="background:${color}; width:20px; height:20px; border-radius:50%; border:2px solid white;"></div>`,
                  iconSize: [20, 20],
                });
                return (
                  <Marker
                    key={p.id}
                    position={[p.position.lat, p.position.lng]}
                    icon={icon}
                    ref={(el) => (markerRefs.current[p.id] = el)}
                  >
                    <Popup>{p.title}</Popup>
                  </Marker>
                );
              })}
              {activePosition && <FlyToMarker position={activePosition} />}
            </MapContainer>
          </div>

          <div className={styles.pointsList}>
            {Object.entries(groupedPoints).map(([dayIndex, points]) => {
              const color = dayColors[(dayIndex - 1) % dayColors.length];
              return (
                <div
                  key={dayIndex}
                  className={styles.pointItem}
                  style={{ borderLeft: `2px solid ${color}` }}
                >
                  <h4 className={styles.dayLabel}>
                    {t("labels.day", { number: dayIndex })}
                  </h4>
                  {points.map((p) => (
                    <div
                      key={p.id}
                      className={styles.pointPlace}
                      onClick={() => handleTitleClick(p)}
                    >
                      <FaLocationDot
                        className={styles.pointMarker}
                        style={{ color }}
                      />
                      <span className={styles.pointTitle}>{p.title}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default MyTripPage;
