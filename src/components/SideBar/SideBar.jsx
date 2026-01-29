import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./SideBar.module.css";
import Button from "../Button/Button";
import { PiSignOutBold } from "react-icons/pi";
import { AiOutlineSignature } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { sidebarItems } from "../../app/sidebarUserData.js";
import { logout } from "../../store/userSlice.js";
import { clearPreferences } from "../../store/userSlice.js";
import { useSelector } from "react-redux";

const SideBar = ({ onClose }) => {
  const { t } = useTranslation("sidebar");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userData);

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
    <>
      <Button
        variant="secondary"
        leftIcon={<FaPlus />}
        onClick={() => handleClickLink("/recommended-trips")}
      >
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

      {user?.plan.toLowerCase() === "explorer" && (
        <div className={styles.subscriptionWrapper}>
          <h3>{t("subscriptionHeader").toUpperCase()}</h3>
          <p>{t("subscriptionText")}</p>
          <Button
            variant="secondary"
            leftIcon={<AiOutlineSignature />}
            onClick={() => handleClickLink("/subscription")}
          >
            {t("subscriptionBtn")}
          </Button>
        </div>
      )}

      <Button onClick={handleLogout} rightIcon={<PiSignOutBold />}>
        {t("logout")}
      </Button>
    </>
  );
};

export default SideBar;
