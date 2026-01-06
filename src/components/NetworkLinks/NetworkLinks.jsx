import { SOCIAL_NETWORKS } from "../../app/sectionsGuestIcons.js";
import styles from "./NetworkLinks.module.css";

const NetworkLinks = () => {
  return (
    <ul className={styles.networkLinks}>
      {SOCIAL_NETWORKS.map(({ link, Icon, label }) => (
        <li className={styles.item} key={link}>
          <a
            href={link}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {Icon && <Icon className={styles.icon} />}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NetworkLinks;
