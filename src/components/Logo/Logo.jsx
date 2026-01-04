import { Link } from "react-router-dom";
import { PiMapTrifoldBold } from "../../app/sectionsGuestIcons.js";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to="/" aria-label="LiteLifeTrip home" className={styles.logo}>
      <PiMapTrifoldBold className={styles.icon} />
      <span className={styles.text}>LiteLifeTrip</span>
    </Link>
  );
};

export default Logo;
