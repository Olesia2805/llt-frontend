import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { updatePreferences } from "../../store/userSlice";
import { TRAVELER_DNA, TRANSPORT } from "../../app/sectionProfileData";

import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import styles from "./ProfilePage.module.css";
import defaultAvatar from "../../assets/img/default-avatar.jpg";
import { IoIosArrowDown } from "react-icons/io";

const ProfilePage = () => {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();
  const { user, preferences } = useSelector((state) => state.userData);

  const [draftForm, setDraftForm] = useState({
    travelerDNA: preferences.interests ?? [],
    transportModes: preferences.transport_modes ?? [],
    city: preferences.home_city ?? "",
    budget: preferences.avg_daily_budget ?? 0,
    currency: preferences.currency ?? "USD",
  });

  useEffect(() => {
    if (preferences) {
      setDraftForm({
        travelerDNA: preferences.interests ?? [],
        transportModes: preferences.transport_modes ?? [],
        city: preferences.home_city ?? "",
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

    setDraftForm((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const prefer = await dispatch(
        updatePreferences({
          ...preferences,
          interests: draftForm.travelerDNA,
          transport_modes: draftForm.transportModes,
          home_city: draftForm.city,
          avg_daily_budget: draftForm.budget,
          currency: draftForm.currency,
        }),
      ).unwrap();
      toast.success(t("toast.success"));

      console.log(prefer);
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
      budget: preferences.avg_daily_budget ?? 0,
      currency: preferences.currency ?? "USD",
    });
  };

  return (
    <Section>
      <Container>
        <div className={styles.profileCard}>
          <div className={styles.person}>
            <div className={styles.avatarWrapper}>
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} />
              ) : (
                <img src={defaultAvatar} alt={"avatar"} />
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
              disabled={isSaving}
            >
              {t("buttons.saveChanges")}
            </Button>
          </div>
        </div>

        <div className={`${styles.sectionGroup} ${styles.DNAGroup}`}>
          <h3>{t("travelerDNA")}</h3>
          <ul className={styles.tagGroup}>
            {TRAVELER_DNA().map(({ id, key, title, Icon }) => (
              <li
                key={id}
                className={`${styles.tag} ${
                  draftForm.travelerDNA.includes(key)
                    ? styles.selected
                    : styles.unselected
                }`}
                onClick={() => toggleOption(key, "travelerDNA")}
              >
                {Icon && <Icon className={styles.tagIcon} />}
                {title}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sectionGridGroup}>
          <div className={styles.sectionGroup}>
            <h3>{t("transport")}</h3>
            <ul className={styles.tagGroup}>
              {TRANSPORT().map(({ id, key, title, Icon }) => (
                <li
                  key={id}
                  className={`${styles.tag} ${
                    draftForm.transportModes.includes(key)
                      ? styles.selected
                      : styles.unselected
                  }`}
                  onClick={() => toggleOption(key, "transportModes")}
                >
                  {Icon && <Icon className={styles.tagIcon} />}
                  {title}
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
              placeholder={t("cityPlaceholder")}
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
                value={draftForm.budget}
                onChange={handleChange}
              />
              <IoIosArrowDown />

              <select
                className={styles.currencySelect}
                name="currency"
                value={draftForm.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
              </select>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ProfilePage;
