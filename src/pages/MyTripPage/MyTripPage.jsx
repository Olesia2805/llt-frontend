import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FaLocationDot } from "react-icons/fa6";

import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import { getTripById, getTripMap } from "../../services/trips.api";

import "leaflet/dist/leaflet.css";
import styles from "./MyTripPage.module.css";

const FlyToMarker = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 12, { duration: 1.5 });
  }, [position, map]);
  return null;
};

const MyTripPage = () => {
  const { id: tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePosition, setActivePosition] = useState(null);

  const markerRefs = useRef({});

  useEffect(() => {
    if (!tripId) return;
    const fetchData = async () => {
      try {
        const tripData = (await getTripById(tripId)).trip;
        const mapPoints = (await getTripMap(tripId))?.markers || [];
        setTrip(tripData);
        setPoints(mapPoints);
      } catch {
        setError("Failed to load trip");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  if (loading) return <Loader />;
  if (error || !trip)
    return <p className={styles.error}>{error || "Trip not found"}</p>;
  if (!trip) return <p style={{ textAlign: "center" }}>Trip not found</p>;

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

  return (
    <Section variant="sectionFooterDown">
      <Container>
        <div className={styles.tripHeader}>
          <h2 className={styles.tripTitle}>{trip.title}</h2>
          {trip.startDate && trip.endDate && (
            <span className={styles.tripDates}>
              {new Date(trip.startDate).toLocaleDateString("en-GB")} -{" "}
              {new Date(trip.endDate).toLocaleDateString("en-GB")}
            </span>
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
                  <h4 className={styles.dayLabel}>Day {dayIndex}</h4>
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
