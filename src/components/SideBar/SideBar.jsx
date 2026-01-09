import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";
import Button from "../Button/Button";
import { PiSignOutBold } from "react-icons/pi";
import { sidebarItems } from "../../app/sidebarUserData.js";

const SideBar = () => {
  const { t } = useTranslation("sidebar");
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.navList}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <li key={item.id} className={isActive ? styles.active : ""}>
              <Button variant="ghost" to={item.path}>
                <Icon className={styles.icon} />
                <span>{t(item.id)}</span>
              </Button>
            </li>
          );
        })}
      </ul>
      <div className={styles.logoutWrapper}>
        <Button to="/logout">
          {t("logout")}
          <PiSignOutBold className={styles.icon} />
        </Button>
      </div>
    </aside>
  );
};

export default SideBar;
