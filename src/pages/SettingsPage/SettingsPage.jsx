import { useTranslation } from "react-i18next";
import styles from "./SettingsPage.module.css";

import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";

import defaultAvatar from "../../assets/img/default-avatar.jpg";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import Button from "../../components/Button/Button";

import { MdTune } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const SettingsPage = () => {
  const { t } = useTranslation("settings");

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

            <h3 className={styles.name}>Alex Thompson</h3>
            <p className={styles.email}>alex.thompson@example.com</p>
            <span className={styles.plan}>EXPLORER</span>
          </section>

          <div className={styles.preferencesWrapper}>
            <section className={styles.preferences}>
              <h3 className={styles.sectionTitle}>
                <MdTune />
                {t("preferences.sectionTitle")}
              </h3>

              <div className={styles.row}>
                <p>{t("preferences.theme")}</p>
                <ThemeSwitcher />
              </div>

              <div className={styles.row}>
                <p>{t("preferences.language")}</p>
                <LanguageSwitcher />
              </div>

              <div className={styles.row}>
                <p>{t("preferences.notifications")}</p>
                <label className={`${styles.switch} ${styles.rounded}`}>
                  <input type="checkbox" className={styles.switchInput} />
                  <span className={styles.switchThumb}></span>
                </label>
              </div>
            </section>
            <Button leftIcon={<FaCheck />}>{t("buttons.saveChanges")}</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default SettingsPage;
