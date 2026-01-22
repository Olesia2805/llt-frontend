import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import styles from "./HeaderUser.module.css";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import defaultAvatar from "../../assets/img/default-avatar.jpg";
import { useSelector } from "react-redux";

const HeaderUser = ({ onBurgerClick, isSidebarOpen }) => {
  const user = useSelector((state) => state.userData);

  return (
    <header className={styles.header}>
      <Button
        variant="burgerBtn"
        onClick={onBurgerClick}
        aria-label="Toggle sidebar"
        leftIcon={
          isSidebarOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />
        }
      />

      <Logo variant="header" />

      <div className={styles.avatarWrapper}>
        {user?.avatar_url ? (
          <img src={user.avatar_url} alt={user.name} />
        ) : (
          <img src={defaultAvatar} alt={"avatar"} className={styles.avatar} />
        )}
      </div>
    </header>
  );
};

export default HeaderUser;
