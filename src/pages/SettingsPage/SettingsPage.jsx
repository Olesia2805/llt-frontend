import { useTranslation } from "react-i18next";
import i18n from "i18next";
import styles from "./SettingsPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";

import defaultImg from "../../assets/img/default-avatar.jpg";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import Button from "../../components/Button/Button";

import { MdTune } from "react-icons/md";
import { FaCheck, FaPlus } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import { updateCurrentUser, updatePreferences } from "../../store/userSlice";
import InputField from "../../components/InputField/InputField";
import { useNameValidation } from "../../hooks/useNameValidation.js";
import { useClickOutside } from "../../hooks/useClickOutside";

const SettingsPage = () => {
  const { t } = useTranslation("settings");
  const dispatch = useDispatch();

  const { user, preferences } = useSelector((state) => state.userData);

  const [isSaving, setIsSaving] = useState(false);
  const [draftName, setDraftName] = useState(user?.name || "");
  const [draftAvatar, setDraftAvatar] = useState(user?.avatar_url || "");
  const [draftTheme, setDraftTheme] = useState(preferences.theme || "dark");
  const [draftLanguage, setDraftLanguage] = useState(
    preferences.language || "uk",
  );
  const [draftNotifications, setDraftNotifications] = useState(
    preferences.notifications_enabled ?? false,
  );

  const [showAvatarInput, setShowAvatarInput] = useState(false);

  const { error: nameError, isValid: isNameValid } = useNameValidation(
    draftName,
    t,
  );

  const popoverRef = useRef(null);

  useClickOutside(popoverRef, () => setShowAvatarInput(false));

  const handleAvatarUrlChange = (value) => {
    if (!value) {
      setDraftAvatar("");
      return;
    }
    try {
      const url = new URL(value);
      const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      const extension = url.pathname.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        toast.error(t("toast.invalidUrl"));
        return;
      }

      setDraftAvatar(value);
    } catch {
      toast.error(t("toast.invalidUrl"));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      i18n.changeLanguage(draftLanguage);

      await dispatch(
        updateCurrentUser({
          name: draftName.trim(),
          avatar_url: draftAvatar,
        }),
      ).unwrap();

      await dispatch(
        updatePreferences({
          ...preferences,
          theme: draftTheme,
          language: draftLanguage,
          notifications_enabled: draftNotifications,
          notification_channels: draftNotifications ? ["email"] : [],
        }),
      ).unwrap();

      toast.success(t("toast.success"));
    } catch (error) {
      toast.error(t("toast.error"));

      console.error("Failed to save preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setDraftName(user?.name || "");
    setDraftAvatar(user?.avatar_url || "");
    setDraftTheme(preferences.theme || "dark");
    setDraftLanguage(preferences.language || "uk");
    setDraftNotifications(preferences.notifications_enabled ?? false);
  };

  const handleRemoveSubscription = async () => {
    if (!user?.plan || user.plan === "Explorer") return;

    try {
      await dispatch(updateCurrentUser({ plan: "Explorer" })).unwrap();
      toast.success(t("toast.successRemoved"));
    } catch {
      toast.error(t("toast.error"));
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
                src={draftAvatar || defaultImg}
                alt={user?.name || "avatar"}
                className={styles.avatar}
              />
              <button
                type="button"
                className={styles.avatarPlus}
                onClick={() => setShowAvatarInput((prev) => !prev)}
              >
                <FaPlus />
              </button>

              {showAvatarInput && (
                <div className={styles.avatarInputPopover} ref={popoverRef}>
                  <p>{t("preferences.urlInput")}</p>
                  <InputField
                    placeholder="https://example.com/avatar.png"
                    value={draftAvatar}
                    onChange={(e) => handleAvatarUrlChange(e.target.value)}
                  />
                </div>
              )}
            </div>

            <InputField
              className={styles.nameInput}
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              error={nameError}
            />

            <p className={styles.email}>{user.email}</p>

            <div className={styles.planRow}>
              <span className={styles.plan}>{user.plan.toUpperCase()}</span>
              {user.plan !== "Explorer" && (
                <Button
                  variant="removeSubscriptionBtn"
                  text={t("buttons.removeSubscription")}
                  onClick={handleRemoveSubscription}
                />
              )}
            </div>
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
                  disabled={isSaving}
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
