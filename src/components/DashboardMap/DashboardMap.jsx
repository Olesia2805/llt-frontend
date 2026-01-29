import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import styles from "./DashboardMap.module.css";
import { MdPublic, MdAdd, MdRemove } from "react-icons/md";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 20,
  lng: 0,
};

const LIBRARIES = ["marker"];

const options = {
  disableDefaultUI: true,
  zoomControl: false,
};

// Custom component to use the new AdvancedMarkerElement
const AdvancedMarker = ({ map, position, onClick, status }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map || !window.google?.maps?.marker) return;

    const pin = new google.maps.marker.PinElement({
      background: status === "upcoming" ? "#6366f1" : "#94a3b8",
      borderColor: status === "upcoming" ? "#ffffff" : "transparent",
      glyphColor: "white",
      scale: status === "upcoming" ? 1.2 : 0.8,
    });

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      content: pin.element,
    });

    const listener = marker.addListener("click", onClick);
    markerRef.current = marker;

    return () => {
      if (listener) listener.remove();
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, [map, position, onClick, status]);

  return null;
};

const DashboardMap = ({ travelData }) => {
  const { t } = useTranslation("dashboard");
  const { cities } = travelData;
  const [map, setMap] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [enrichedCities, setEnrichedCities] = useState(cities);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (!isLoaded || !window.google?.maps?.Geocoder || cities.length === 0) {
      setEnrichedCities(cities);
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    
    const fetchCountries = async () => {
      const promises = cities.map(async (city) => {
        if (city.country) return city;

        try {
          const response = await geocoder.geocode({ location: city.coordinates });
          if (response.results && response.results.length > 0) {
            const countryComponent = response.results[0].address_components.find(
              (c) => c.types.includes("country")
            );
            if (countryComponent) {
              return { ...city, country: countryComponent.short_name };
            }
          }
        } catch (error) {
          console.error(`Failed to geocode ${city.name}:`, error);
        }
        return city;
      });

      const results = await Promise.all(promises);
      setEnrichedCities(results);
    };

    fetchCountries();
  }, [isLoaded, cities]);

  const stats = useMemo(() => {
    const visitedCities = enrichedCities.filter((city) => city.status === "visited");
    return {
      citiesVisited: visitedCities.length,
      countriesVisited: new Set(visitedCities.map((city) => city.country).filter(Boolean)).size,
    };
  }, [enrichedCities]);

  useEffect(() => {
    if (map && enrichedCities.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      enrichedCities.forEach((city) => {
        bounds.extend(city.coordinates);
      });
      map.fitBounds(bounds);
      
      // Optional: Don't zoom in too much for a single city
      if (enrichedCities.length === 1) {
        const listener = window.google.maps.event.addListener(map, 'idle', () => {
          if (map.getZoom() > 10) map.setZoom(10);
          window.google.maps.event.removeListener(listener);
        });
      }
    }
  }, [map, enrichedCities]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleZoomIn = () => {
    if (map) map.setZoom(map.getZoom() + 1);
  };

  const handleZoomOut = () => {
    if (map) map.setZoom(map.getZoom() - 1);
  };

  const center = useMemo(() => {
    if (enrichedCities.length > 0) {
      return enrichedCities[0].coordinates;
    }
    return defaultCenter;
  }, [enrichedCities]);

  const mapOptions = useMemo(() => ({
    ...options,
    mapId: import.meta.env.VITE_GOOGLE_MAPS_LIGHT_MAP_ID || "DEMO_MAP_ID",
  }), []);

  if (!isLoaded) return <div className={styles.mapLoading}>Loading Map...</div>;

  return (
    <div className={styles.mapContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <MdPublic />
          {t("map.title")}
        </h3>
        <div className={styles.badge}>{t("map.badge")}</div>
      </div>

      <div className={styles.mapWrapper}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={3}
          options={mapOptions}
          onLoad={(map) => setMap(map)}
          onUnmount={onUnmount}
        >
          {enrichedCities.map((city) => (
            <AdvancedMarker
              key={city.id}
              map={map}
              position={city.coordinates}
              status={city.status}
              onClick={() => setSelectedCity(city)}
            />
          ))}

          {selectedCity && (
            <InfoWindow
              position={selectedCity.coordinates}
              onCloseClick={() => setSelectedCity(null)}
            >
              <div className={styles.infoWindow}>
                <p className={styles.tooltipCity}>
                  {selectedCity.name}, {selectedCity.country}
                </p>
                <p className={styles.tooltipDate}>{selectedCity.visitDate}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        <div className={styles.zoomControls}>
          <button
            className={styles.zoomBtn}
            onClick={handleZoomIn}
            aria-label={t("map.zoomIn")}
          >
            <MdAdd />
          </button>
          <button
            className={styles.zoomBtn}
            onClick={handleZoomOut}
            aria-label={t("map.zoomOut")}
          >
            <MdRemove />
          </button>
        </div>

        <div className={styles.statsOverlay}>
          <div className={styles.stat}>
            <p className={styles.statLabel}>{t("map.citiesVisited")}</p>
            <p className={styles.statValue}>{stats.citiesVisited}</p>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <p className={styles.statLabel}>{t("map.countries")}</p>
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
