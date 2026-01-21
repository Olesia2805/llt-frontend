import { useTranslation } from "react-i18next";
import i18n from "i18next";
import styles from "./SettingsPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";

import defaultAvatar from "../../assets/img/default-avatar.jpg";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import Button from "../../components/Button/Button";

import { MdTune } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import { updatePreferences } from "../../store/preferencesSlice";

const SettingsPage = () => {
  const { t } = useTranslation("settings");
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.preferences.data);
  const user = useSelector((state) => state.auth.user);
  const [isSaving, setIsSaving] = useState(false);

  const [localTheme, setLocalTheme] = useState(preferences.theme || "dark");
  const [localLanguage, setLocalLanguage] = useState(
    preferences.language || "uk",
  );
  const [localNotifications, setLocalNotifications] = useState(
    preferences.notifications_enabled ?? false,
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      i18n.changeLanguage(localLanguage);
      await dispatch(
        updatePreferences({
          theme: localTheme,
          language: localLanguage,
          notifications_enabled: localNotifications,
        }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to save preferences:", error);
    } finally {
      setIsSaving(false);
    }
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
              <img
                src={defaultAvatar}
                alt={t("hero.avatar")}
                className={styles.avatar}
              />
            </div>

            <h3 className={styles.name}>{user.name}</h3>
            <p className={styles.email}>{user.email}</p>
            <span className={styles.plan}>{user.plan.toUpperCase()}</span>
          </section>

          <div className={styles.preferencesWrapper}>
            <section className={styles.preferences}>
              <h3 className={styles.sectionTitle}>
                <MdTune />
                {t("preferences.sectionTitle")}
              </h3>

              <div className={styles.row}>
                <p>{t("preferences.theme")}</p>
                <ThemeSwitcher value={localTheme} onChange={setLocalTheme} />
              </div>

              <div className={styles.row}>
                <p>{t("preferences.language")}</p>
                <LanguageSwitcher
                  value={localLanguage}
                  onChange={setLocalLanguage}
                />
              </div>

              <div className={styles.row}>
                <p>{t("preferences.notifications")}</p>
                <label className={`${styles.switch} ${styles.rounded}`}>
                  <input
                    type="checkbox"
                    className={styles.switchInput}
                    checked={localNotifications}
                    onChange={(e) => setLocalNotifications(e.target.checked)}
                  />
                  <span className={styles.switchThumb}></span>
                </label>
              </div>
            </section>
            <Button
              leftIcon={<FaCheck />}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving
                ? t("buttons.saving") || "Saving..."
                : t("buttons.saveChanges")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default SettingsPage;
