import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./SideBar.module.css";
import Button from "../Button/Button";
import { PiSignOutBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { sidebarItems } from "../../app/sidebarUserData.js";
import { logout } from "../../store/authSlice.js";
import { clearPreferences } from "../../store/preferencesSlice.js";

const SideBar = ({ onClose }) => {
  const { t } = useTranslation("sidebar");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLink = (path) => {
    onClose();
    navigate(path);
  };

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    dispatch(clearPreferences());
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
