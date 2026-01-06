import styles from "./LoginHero.module.css";
import loginBg from "../../../assets/img/login_background.png";
import Logo from "../../Logo/Logo";

const LoginHero = () => {
  return (
    <div className={styles.leftPanel}>
      <div
        className={styles.heroBackground}
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.brand}>
          <Logo variant="header" />
          <span className={styles.brandName}>TravelApp</span>
        </div>
        <div className={styles.heroText}>
          <h2>Plan your next adventure.</h2>
          <p>
            Discover new destinations, organize your itinerary, and travel with
            peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;
