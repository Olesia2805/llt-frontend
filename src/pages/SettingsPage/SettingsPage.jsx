import { useTranslation } from "react-i18next";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  const { t } = useTranslation("settings");
  return (
    <>
      <header className={styles.header}>
        <h2>Settings</h2>
        <p>Manage your account profile and global preferences.</p>
      </header>

      <div className={styles.content}>
        {/* Profile */}
        <section className={styles.profile}>
          <div className={styles.avatar} />
          <h3>Alex Thompson</h3>
          <p className={styles.email}>alex.thompson@example.com</p>

          <label className={styles.label}>Full name</label>
          <input
            className={styles.input}
            type="text"
            defaultValue="Alex Thompson"
          />
        </section>

        {/* Preferences */}
        <section className={styles.preferences}>
          <h3>
            <span className="material-symbols-outlined">tune</span>
            Preferences
          </h3>

          <div className={styles.block}>
            <p className={styles.blockTitle}>App Theme</p>
            <div className={styles.buttons}>
              <button className={styles.secondary}>Light</button>
              <button className={styles.primary}>Dark</button>
            </div>
          </div>

          <div className={styles.block}>
            <p className={styles.blockTitle}>System Language</p>
            <select className={styles.select}>
              <option>English (US)</option>
              <option>Ukrainian</option>
              <option>German</option>
            </select>
          </div>
        </section>
      </div>

      <button className={styles.save}>Save changes</button>
    </>
  );
};

export default SettingsPage;
