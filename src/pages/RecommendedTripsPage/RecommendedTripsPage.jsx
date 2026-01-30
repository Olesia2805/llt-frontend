import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { TRAVELER_DNA, TRANSPORT } from "../../app/sectionPreferencesData";

import { BsStars } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import CurrencyDropdown from "../../components/CurrencyDropdown/CurrencyDropdown";
import DateRangeInput from "../../components/DateRangeInput/DateRangeInput";

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
  const { t } = useTranslation(["recommendedTrips", "tagPreferences"]);
  const { preferences } = useSelector((state) => state.userData);

  const [draftForm, setDraftForm] = useState({
    travelerDNA: preferences.interests ?? [],
    transportModes: preferences.transport_modes ?? [],
    city: preferences.home_city ?? "",
    budget: preferences.avg_daily_budget ?? 0,
    currency: preferences.currency ?? "UAH",
    startDate: null,
    endDate: null,
    isBudgetManual: false,
  });

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (
      !draftForm.startDate ||
      !draftForm.endDate ||
      draftForm.isBudgetManual
    ) {
      return;
    }

    const days = getTripDays(draftForm.startDate, draftForm.endDate);
    const dailyBudget = preferences.avg_daily_budget ?? 0;

    setDraftForm((prev) => ({
      ...prev,
      budget: dailyBudget * days,
    }));
  }, [
    draftForm.startDate,
    draftForm.endDate,
    draftForm.isBudgetManual,
    preferences.avg_daily_budget,
  ]);

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

    setDraftForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setDraftForm({
      travelerDNA: preferences.interests ?? [],
      transportModes: preferences.transport_modes ?? [],
      city: preferences.home_city ?? "",
      budget: preferences.avg_daily_budget ?? 0,
      currency: preferences.currency ?? "UAH",
      startDate: null,
      endDate: null,
      isBudgetManual: false,
    });
  };

  const budgetError =
    draftForm.budget < 0
      ? t("errors.budgetNegative")
      : draftForm.budget > 1000000
        ? t("errors.budgetTooHigh")
        : "";

  const isFormValid = !budgetError;

  return (
    <Section>
      <Container>
        <div className={styles.headerWrapper}>
          <h2>{t("title")}</h2>
          <p>{t("text")}</p>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.sectionGroup}>
            <h3>{t("destinationCity")}</h3>
            <InputField
              name="city"
              value={draftForm.city}
              onChange={handleChange}
              placeholder={t("cityPlaceholder")}
              disabled={isSending}
            />
          </div>

          <div className={styles.sectionGroup}>
            <h3>{t("maxBudget")}</h3>
            <div className={styles.budgetWrapper}>
              <InputField
                type="number"
                name="budget"
                min={0}
                value={draftForm.budget}
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

          <div className={styles.sectionGroup}>
            <h3>{t("dates")}</h3>
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
        </div>

        <div className={styles.sectionGroup}>
          <h3>{t("transport")}</h3>
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
          <h3>{t("travelerDNA")}</h3>
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
          <InputField />
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
            type="submit"
            disabled={isSending || !isFormValid}
            leftIcon={<BsStars />}
          >
            {t("buttons.generateRoute")}
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default RecommendedTripsPage;
