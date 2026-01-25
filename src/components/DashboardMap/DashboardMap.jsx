import { useState } from "react";
import styles from "./DashboardMap.module.css";
import { MdPublic, MdAdd, MdRemove } from "react-icons/md";

const DashboardMap = ({ travelData }) => {
  const { cities, stats } = travelData;
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <MdPublic />
          Travel History
        </h3>
        <div className={styles.badge}>Global View</div>
      </div>

      <div className={styles.mapWrapper}>
        <div className={styles.mapBackground} />

        {cities.map((city) => (
          <div
            key={city.id}
            className={styles.cityMarker}
            style={{ top: city.position.top, left: city.position.left, right: city.position.right }}
            onMouseEnter={() => setHoveredCity(city.id)}
            onMouseLeave={() => setHoveredCity(null)}
          >
            <div
              className={`${styles.marker} ${
                city.status === "upcoming" ? styles.markerUpcoming : styles.markerVisited
              }`}
            />
            {hoveredCity === city.id && (
              <div className={styles.tooltip}>
                <p className={styles.tooltipCity}>
                  {city.name}, {city.country}
                </p>
                <p className={styles.tooltipDate}>{city.visitDate}</p>
              </div>
            )}
          </div>
        ))}

        <div className={styles.zoomControls}>
          <button className={styles.zoomBtn} aria-label="Zoom in">
            <MdAdd />
          </button>
          <button className={styles.zoomBtn} aria-label="Zoom out">
            <MdRemove />
          </button>
        </div>

        <div className={styles.statsOverlay}>
          <div className={styles.stat}>
            <p className={styles.statLabel}>Cities Visited</p>
            <p className={styles.statValue}>{stats.citiesVisited}</p>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <p className={styles.statLabel}>Countries</p>
            <p className={`${styles.statValue} ${styles.statHighlight}`}>
              {stats.countriesVisited}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMap;
