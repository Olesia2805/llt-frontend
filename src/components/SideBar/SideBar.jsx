import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./SideBar.module.css";
import Button from "../Button/Button";
import { PiSignOutBold } from "react-icons/pi";
import { sidebarItems } from "../../app/sidebarUserData.js";

const SideBar = () => {
  const { t } = useTranslation("sidebar");
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.navList}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.id}>
              <Button variant="ghost" to={item.path} rightIcon={<Icon />}>
                <span>{t(item.label)}</span>
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        onClick={async () => {
          await logout();
          navigate("/");
        }}
        rightIcon={<PiSignOutBold />}
      >
        {t("logout")}
      </Button>
    </aside>
  );
};

export default SideBar;
