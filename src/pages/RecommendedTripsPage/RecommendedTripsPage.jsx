import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import { TRAVELER_DNA, TRANSPORT } from "../../app/sectionPreferencesData";

import { BsStars } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { BiSolidStar } from "react-icons/bi";

import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import CurrencyDropdown from "../../components/CurrencyDropdown/CurrencyDropdown";
import DateRangeInput from "../../components/DateRangeInput/DateRangeInput";
import CityAutocomplete from "../../components/CityAutocomplete/CityAutocomplete";
import TripCard from "../../components/TripCard/TripCard";
import Loader from "../../components/Loader/Loader";

import { recommendTrip } from "../../api/trips.api";

import styles from "./RecommendedTripsPage.module.css";

const getTripDays = (start, end) => {
  if (!start || !end) return 0;

  const startDate = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );

  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const diff = (endDate - startDate) / (1000 * 60 * 60 * 24);
  return diff + 1;
};

const RecommendedTripsPage = () => {
  const { t, i18n } = useTranslation(["recommendedTrips", "tagPreferences"]);
  const { preferences } = useSelector((state) => state.userData);

  const [tripData, setTripData] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const tripRef = useRef(null);

  const dailyBudget = preferences.avg_daily_budget ?? 0;

  const [draftForm, setDraftForm] = useState({
    travelerDNA: preferences.interests ?? [],
    transportModes: preferences.transport_modes ?? [],
    city: preferences.home_city ?? "",
    city_lat: preferences.home_lat ?? null,
    city_lng: preferences.home_lng ?? null,
    budget: preferences.avg_daily_budget ?? 0,
    currency: preferences.currency ?? "UAH",
    startDate: null,
    endDate: null,
    isBudgetManual: false,
    notes: "",
  });

  const days = getTripDays(draftForm.startDate, draftForm.endDate);

  const calculatedBudget = draftForm.isBudgetManual
    ? draftForm.budget
    : days > 0
      ? dailyBudget * days
      : 0;

  const hasCityText = draftForm.city.trim().length > 0;
  const hasCoords = draftForm.city_lat !== null && draftForm.city_lng !== null;

  const cityError =
    hasCityText && !hasCoords ? t("errors.selectCityFromList") : "";

  const budgetError = draftForm.budget < 0 ? t("errors.budgetNegative") : "";

  const isFormValid =
    !budgetError && !cityError && draftForm.startDate && draftForm.endDate;

  const toggleOption = (key, type) => {
    setDraftForm((prev) => ({
      ...prev,
      [type]: prev[type].includes(key)
        ? prev[type].filter((k) => k !== key)
        : [...prev[type], key],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget") {
      setDraftForm((prev) => ({
        ...prev,
        budget: value === "" ? "" : Number(value),
        isBudgetManual: true,
      }));
      return;
    }

    if (name === "city") {
      setDraftForm((prev) => ({
        ...prev,
        city: value,
        city_lat: null,
        city_lng: null,
      }));
      return;
    }

    setDraftForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCitySelect = (item) => {
    setDraftForm((prev) => ({
      ...prev,
      city: `${item.city}, ${item.country}`,
      city_lat: item.lat,
      city_lng: item.lng,
    }));
  };

  const handleReset = () => {
    setDraftForm({
      travelerDNA: preferences.interests ?? [],
      transportModes: preferences.transport_modes ?? [],
      city: preferences.home_city ?? "",
      city_lat: preferences.home_lat ?? null,
      city_lng: preferences.home_lng ?? null,
      budget: preferences.avg_daily_budget ?? 0,
      currency: preferences.currency ?? "UAH",
      startDate: null,
      endDate: null,
      isBudgetManual: false,
      notes: "",
    });
  };

  const handleGenerate = async () => {
    try {
      setTripData(null);
      setIsSending(true);
      setError(null);

      const languageMap = {
        uk: "Ukrainian",
        en: "English",
      };

      const payload = {
        origin: {
          city: draftForm.city,
          lat: draftForm.city_lat,
          lng: draftForm.city_lng,
        },
        dates: {
          start: draftForm.startDate?.toISOString().split("T")[0],
          end: draftForm.endDate?.toISOString().split("T")[0],
        },
        budget: calculatedBudget,
        interests: draftForm.travelerDNA,
        transport: draftForm.transportModes[0] || "car",
        currency: draftForm.currency,
        notes: draftForm.notes,
        language: languageMap[i18n.language] || "Ukrainian",
      };

      const data = await recommendTrip(payload);
      setTripData(data);

      setTimeout(() => {
        if (tripRef.current) {
          const topOffset =
            tripRef.current.getBoundingClientRect().top + window.scrollY;
          const headerOffset = 100;
          window.scrollTo({
            top: topOffset - headerOffset,
            behavior: "smooth",
          });
        }
      }, 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleTripSaved = () => {
    try {
      setIsSending(true);

      // const payload = buildTripPayload();
      // await saveTrip(payload);

      setTimeout(() => {
        setTripData(null);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        toast.success(t("toast.success"));
      }, 1000);

      setDraftForm((prev) => ({
        ...prev,
        startDate: null,
        endDate: null,
        notes: "",
      }));
    } catch {
      toast.error(t("toast.error"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Section>
      <Container>
        <div className={styles.headerWrapper}>
          <h2>{t("title")}</h2>
          <p>{t("text")}</p>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.sectionGroup}>
            <h3>
              {t("destinationCity")}{" "}
              <BiSolidStar className={styles.mustHaveField} />
            </h3>
            <CityAutocomplete
              placeholder={t("cityPlaceholder")}
              value={draftForm.city}
              onChange={handleChange}
              onSelect={handleCitySelect}
              error={cityError}
              disabled={isSending}
            />
          </div>

          <div className={styles.sectionGroup}>
            <h3>
              {t("dates")} <BiSolidStar className={styles.mustHaveField} />
            </h3>
            <DateRangeInput
              startDate={draftForm.startDate}
              endDate={draftForm.endDate}
              disabled={isSending}
              onChange={([start, end]) =>
                setDraftForm((prev) => ({
                  ...prev,
                  startDate: start,
                  endDate: end,
                }))
              }
            />
          </div>

          <div className={styles.sectionGroup}>
            <h3>
              {t("maxBudget")} <BiSolidStar className={styles.mustHaveField} />
            </h3>
            <div className={styles.budgetWrapper}>
              <InputField
                type="number"
                name="budget"
                min={0}
                value={calculatedBudget}
                onChange={handleChange}
                error={budgetError}
                disabled={isSending}
              />
              <CurrencyDropdown
                value={draftForm.currency}
                disabled={isSending}
                onChange={(currency) =>
                  setDraftForm((prev) => ({ ...prev, currency }))
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.sectionGroup}>
          <h3>
            {t("transport")} <BiSolidStar className={styles.mustHaveField} />
          </h3>
          <ul className={styles.tagGroup}>
            {TRANSPORT().map(({ id, key, title, Icon }) => (
              <li key={id}>
                <Tag
                  label={title}
                  icon={Icon}
                  isActive={draftForm.transportModes.includes(key)}
                  disabled={isSending}
                  onClick={() => toggleOption(key, "transportModes")}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sectionGroup}>
          <h3>
            {t("travelerDNA")} <BiSolidStar className={styles.mustHaveField} />
          </h3>
          <ul className={styles.tagGroup}>
            {TRAVELER_DNA().map(({ id, key, title, Icon }) => (
              <li key={id}>
                <Tag
                  label={title}
                  icon={Icon}
                  isActive={draftForm.travelerDNA.includes(key)}
                  disabled={isSending}
                  onClick={() => toggleOption(key, "travelerDNA")}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sectionGroup}>
          <h3>{t("travelerNotes")}</h3>
          <InputField
            name="notes"
            value={draftForm.notes}
            onChange={handleChange}
            placeholder={t("travelerNotes")}
          />
        </div>

        <div className={styles.buttons}>
          <Button
            variant="secondary"
            onClick={handleReset}
            leftIcon={<GrPowerReset />}
          >
            {t("buttons.resetChanges")}
          </Button>

          <Button
            onClick={handleGenerate}
            disabled={isSending || !isFormValid}
            leftIcon={<BsStars />}
          >
            {t("buttons.generateRoute")}
          </Button>
        </div>

        {tripData && !isSending && (
          <div ref={tripRef}>
            <TripCard data={tripData} onSave={handleTripSaved} />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </Container>
    </Section>
  );
};

export default RecommendedTripsPage;
