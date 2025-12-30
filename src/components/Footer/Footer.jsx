import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";
import NetworkLinks from "../NetworkLinks/NetworkLinks";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.divider} />
      <Logo />
      <p>
        Discover the world with LiteLifeTrip. Plan your routes, track your
        stats, and explore new horizons with our comprehensive travel companion.
      </p>
      <hr className={styles.divider} />
      <NetworkLinks />
      <p>
        &copy; {new Date().getFullYear()} LiteLifeTrip Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
