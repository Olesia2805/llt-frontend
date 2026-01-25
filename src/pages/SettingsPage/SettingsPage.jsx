import { useTranslation } from "react-i18next";
import i18n from "i18next";
import styles from "./SettingsPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";

import defaultImg from "../../assets/img/default-avatar.jpg";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import Button from "../../components/Button/Button";

import { MdTune } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import { updateCurrentUser, updatePreferences } from "../../store/userSlice";
import InputField from "../../components/InputField/InputField";
import { useNameValidation } from "../../hooks/useNameValidation.js";

const SettingsPage = () => {
  const { t } = useTranslation("settings");
  const dispatch = useDispatch();

  const { user, preferences } = useSelector((state) => state.userData);
  const [isSaving, setIsSaving] = useState(false);
  const [draftName, setDraftName] = useState(user?.name || "");
  const [draftTheme, setDraftTheme] = useState(preferences.theme || "dark");
  const [draftLanguage, setDraftLanguage] = useState(
    preferences.language || "uk",
  );
  const [draftNotifications, setDraftNotifications] = useState(
    preferences.notifications_enabled ?? false,
  );

  const { error: nameError, isValid: isNameValid } = useNameValidation(
    draftName,
    t,
  );

  //TODO: UseEffect like in ProfilePage

  const handleSave = async () => {
    setIsSaving(true);
    try {
      i18n.changeLanguage(draftLanguage);
      dispatch(updateCurrentUser({ name: draftName.trim() }));

      await dispatch(
        updatePreferences({
          ...preferences,
          theme: draftTheme,
          language: draftLanguage,
          notifications_enabled: draftNotifications,
          notification_channels: draftNotifications ? ["email"] : [],
        }),
      ).unwrap();

      setDraftName(draftName);
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
    setDraftName(user?.name || "");
    setDraftTheme(preferences.theme || "dark");
    setDraftLanguage(preferences.language || "uk");
    setDraftNotifications(preferences.notifications_enabled ?? false);
  };

  return (
    <Section>
      <Container>
        <div className={styles.header}>
          <h2>{t("hero.title")}</h2>
          <p>{t("hero.description")}</p>
        </div>

        <div className={styles.container}>
          <section className={styles.profile}>
            <div className={styles.avatarWrapper}>
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className={styles.avatar}
                />
              ) : (
                <img
                  src={defaultImg}
                  alt={t("hero.avatar") || "avatar"}
                  className={styles.avatar}
                />
              )}
            </div>

            <InputField
              className={styles.nameInput}
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              error={nameError}
            />
            <p className={styles.email}>{user.email}</p>
            <span className={styles.plan}>{user.plan.toUpperCase()}</span>
          </section>

          <div className={styles.preferencesWrapper}>
            <section className={styles.preferences}>
              <h3 className={styles.sectionTitle}>
                <MdTune />
                {t("preferences.sectionTitle")}
              </h3>
              <div className={styles.preferencesList}>
                <div className={styles.row}>
                  <p>{t("preferences.theme")}</p>
                  <ThemeSwitcher value={draftTheme} onChange={setDraftTheme} />
                </div>
                <div className={styles.row}>
                  <p>{t("preferences.language")}</p>
                  <LanguageSwitcher
                    value={draftLanguage}
                    onChange={setDraftLanguage}
                  />
                </div>
                <div className={styles.row}>
                  <p>{t("preferences.notifications")}</p>
                  <label className={`${styles.switch} ${styles.rounded}`}>
                    <input
                      type="checkbox"
                      className={styles.switchInput}
                      checked={draftNotifications}
                      onChange={(e) => setDraftNotifications(e.target.checked)}
                    />
                    <span className={styles.switchThumb}></span>
                  </label>
                </div>
              </div>
              <div className={styles.buttons}>
                <Button
                  variant="secondary"
                  leftIcon={<GrPowerReset />}
                  onClick={handleReset}
                >
                  {t("buttons.resetChanges")}
                </Button>
                <Button
                  leftIcon={<FaCheck />}
                  onClick={handleSave}
                  disabled={isSaving || !isNameValid}
                >
                  {t("buttons.saveChanges")}
                </Button>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default SettingsPage;
