import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./SideBar.module.css";
import Button from "../Button/Button";
import { PiSignOutBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { sidebarItems } from "../../app/sidebarUserData.js";

const SideBar = ({ onClose }) => {
  const { t } = useTranslation("sidebar");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClickLink = (path) => {
    onClose();
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate("/");
  };

  return (
    <div className={`${styles.sidebar}`}>
      <Button variant="secondary" leftIcon={<FaPlus />}>
        {t("cta")}
      </Button>
      <ul className={styles.navList}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Button
                variant="ghost"
                onClick={() => handleClickLink(item.path)}
                rightIcon={<Icon />}
              >
                <span>{t(item.label)}</span>
              </Button>
            </li>
          );
        })}
      </ul>

      <Button onClick={handleLogout} rightIcon={<PiSignOutBold />}>
        {t("logout")}
      </Button>
    </div>
  );
};

export default SideBar;
