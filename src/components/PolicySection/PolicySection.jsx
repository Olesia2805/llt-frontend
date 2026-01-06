import styles from "./PolicySection.module.css";
import Section from "../../components/Section/Section";

const PolicySection = ({ id, title, Icon, children }) => {
  return (
    <div id={id} className={styles.card}>
      <Section>
        <div className={styles.headerWrapper}>
          <div className={styles.iconWrapper}>
            {Icon && <Icon className={styles.icon} />}
          </div>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <hr className={styles.divider} />

        <div className={styles.content}>{children}</div>
      </Section>
    </div>
  );
};

export default PolicySection;
