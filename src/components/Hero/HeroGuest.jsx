import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import tripPreviewCard from "../../assets/img/trip-preview-card.jpg";
// import Button from "../Button/Button";
import styles from "./HeroGuest.module.css";
import Blobs from "../Blobs/Blobs";

const Hero = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <div className={styles.heroWrapper}>
        <Blobs />
        <div className={styles.textWrapper}>
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: t("hero.title") }}
          />
          <p className={styles.description}>{t("hero.description")}</p>
        </div>

        <img
          className={styles.image}
          src={tripPreviewCard}
          alt={t("hero.imageAlt")}
        />
      </div>
    </Section>
  );
};

export default Hero;
