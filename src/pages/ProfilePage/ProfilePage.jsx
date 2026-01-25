import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { updatePreferences } from "../../store/userSlice";
// import { getCityInfo } from "../../store/integrationSlice";
import { TRAVELER_DNA, TRANSPORT } from "../../app/sectionProfileData";

import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import CurrencyDropdown from "../../components/CurrencyDropdown/CurrencyDropdown";
import styles from "./ProfilePage.module.css";
import defaultImg from "../../assets/img/default-avatar.jpg";

//TODO:
// - input for city
// - input for budget (design)
// - current forecast for home_city

const ProfilePage = () => {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();
  const { user, preferences } = useSelector((state) => state.userData);
  // const { cityInfo } = useSelector((state) => state.integrationData);

  const [draftForm, setDraftForm] = useState({
    travelerDNA: preferences.interests ?? [],
    transportModes: preferences.transport_modes ?? [],
    city: preferences.home_city ?? "",
    // city_lat: preferences.home_lat ?? null,
    // city_lng: preferences.home_lng ?? null,
    budget: preferences.avg_daily_budget ?? 0,
    currency: preferences.currency ?? "USD",
  });

  useEffect(() => {
    if (preferences) {
      setDraftForm({
        travelerDNA: preferences.interests ?? [],
        transportModes: preferences.transport_modes ?? [],
        city: preferences.home_city ?? "",
        // city_lat: preferences.home_lat ?? null,
        // city_lng: preferences.home_lng ?? null,
        budget: preferences.avg_daily_budget ?? 0,
        currency: preferences.currency ?? "USD",
      });
    }
  }, [preferences]);

  const [isSaving, setIsSaving] = useState(false);

  const toggleOption = (key, type) => {
    setDraftForm((prev) => {
      const arr = prev[type];
      const updated = arr.includes(key)
        ? arr.filter((k) => k !== key)
        : [...arr, key];
      return { ...prev, [type]: updated };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget") {
      if (value === "") {
        setDraftForm((prev) => ({
          ...prev,
          budget: "",
        }));
        return;
      }

      const normalized = value.replace(/^0+(?=\d)/, "");

      setDraftForm((prev) => ({
        ...prev,
        budget: Number(normalized),
      }));
      return;
    }

    setDraftForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await dispatch(
        updatePreferences({
          ...preferences,
          interests: draftForm.travelerDNA,
          transport_modes: draftForm.transportModes,
          home_city: draftForm.city,
          // home_lat: draftForm.city_lat,
          // home_lng: draftForm.city_lng,
          avg_daily_budget: Math.max(0, Number(draftForm.budget)),
          currency: draftForm.currency,
        }),
      ).unwrap();
      toast.success(t("toast.success"));
    } catch (error) {
      toast.error(t("toast.error"));
      handleReset();
      console.error("Failed to save preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setDraftForm({
      travelerDNA: preferences.interests ?? [],
      transportModes: preferences.transport_modes ?? [],
      city: preferences.home_city ?? "",
      // city_lat: preferences.home_lat ?? null,
      // city_lng: preferences.home_lng ?? null,
      budget: preferences.avg_daily_budget ?? 0,
      currency: preferences.currency ?? "USD",
    });
  };

  const budgetError =
    draftForm.budget < 0
      ? t("errors.budgetNegative")
      : draftForm.budget > 1000000
        ? t("errors.budgetTooHigh")
        : "";

  const isCityValid = draftForm.city.trim() !== "";
  // && draftForm.city_lat !== null &&
  // draftForm.city_lng !== null;

  // const handleCityInput = (e) => {
  //   const city = e.target.value;
  //   if (city) dispatch(getCityInfo(city));
  // };

  const isFormValid =
    !budgetError &&
    draftForm.travelerDNA.length >= 0 &&
    draftForm.transportModes.length >= 0;

  return (
    <Section>
      <Container>
        <div className={styles.profileCard}>
          <div className={styles.person}>
            <div className={styles.avatarWrapper}>
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} />
              ) : (
                <img src={defaultImg} alt={"avatar"} />
              )}
            </div>
            <div className={styles.personInfo}>
              <h2>{user.name}</h2>
              <span className={styles.plan}>{user.plan.toUpperCase()}</span>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button
              variant="secondary"
              className={styles.resetButton}
              onClick={handleReset}
            >
              {t("buttons.resetChanges")}
            </Button>
            <Button
              className={styles.saveButton}
              onClick={handleSave}
              disabled={isSaving || !isFormValid}
            >
              {t("buttons.saveChanges")}
            </Button>
          </div>
        </div>

        <div className={`${styles.sectionGroup} ${styles.DNAGroup}`}>
          <h3>{t("travelerDNA")}</h3>
          <ul className={styles.tagGroup}>
            {TRAVELER_DNA().map(({ id, key, title, Icon }) => (
              <li key={id}>
                <Button
                  variant="tag"
                  isActive={draftForm.travelerDNA.includes(key)}
                  disabled={isSaving}
                  onClick={() => toggleOption(key, "travelerDNA")}
                  leftIcon={Icon && <Icon />}
                >
                  {title}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sectionGridGroup}>
          <div className={styles.sectionGroup}>
            <h3>{t("transport")}</h3>
            <ul className={styles.tagGroup}>
              {TRANSPORT().map(({ id, key, title, Icon }) => (
                <li key={id}>
                  <Button
                    variant="tag"
                    isActive={draftForm.transportModes.includes(key)}
                    disabled={isSaving}
                    onClick={() => toggleOption(key, "transportModes")}
                    leftIcon={Icon && <Icon />}
                  >
                    {title}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sectionGroup}>
            <h3>{t("primaryCity")}</h3>
            <p>{t("primaryCityText")}</p>
            <InputField
              name="city"
              value={draftForm.city}
              onChange={handleChange}
              // onChange={handleCityInput}
              placeholder={t("cityPlaceholder")}
              error={isCityValid}
              disabled={isSaving}
            />
          </div>

          <div className={styles.sectionGroup}>
            <h3>{t("budget")}</h3>
            <p>{t("budgetText")}</p>
            <div className={styles.budgetWrapper}>
              <InputField
                type="number"
                name="budget"
                min={0}
                step={1}
                inputMode="numeric"
                pattern="[0-9]*"
                value={draftForm.budget}
                onChange={handleChange}
                error={budgetError}
                disabled={isSaving}
              />

              <CurrencyDropdown
                value={draftForm.currency}
                disabled={isSaving}
                onChange={(currency) =>
                  setDraftForm((prev) => ({ ...prev, currency }))
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ProfilePage;
