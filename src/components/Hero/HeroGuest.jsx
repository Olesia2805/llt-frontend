import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Section from "../Section/Section";
import Container from "../Container/Container";
import tripDarkHighResolution from "../../assets/img/trip-dark-high-resolution.webp";
import tripDarkDesktop from "../../assets/img/trip-dark-desktop.webp";
import tripDarkMobile from "../../assets/img/trip-dark-mobile.webp";
import tripLightHighResolution from "../../assets/img/trip-light-high-resolution.webp";
import tripLightDesktop from "../../assets/img/trip-light-desktop.webp";
import tripLightMobile from "../../assets/img/trip-light-mobile.webp";
import Button from "../Button/Button";
import styles from "./HeroGuest.module.css";

const HeroGuest = () => {
  const { t } = useTranslation("homeGuest");

  const theme = useSelector((state) => state.userData.preferences.theme);

  const highResolutionSrc =
    theme === "dark" ? tripDarkHighResolution : tripLightHighResolution;
  const desktopSrc = theme === "dark" ? tripDarkDesktop : tripLightDesktop;
  const mobileSrc = theme === "dark" ? tripDarkMobile : tripLightMobile;

  return (
    <Section variant="blobsBG">
      <Container>
        <div className={styles.heroWrapper}>
          <div className={styles.textWrapper}>
            <h1
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: t("hero.title") }}
            />
            <p className={styles.description}>{t("hero.description")}</p>
            <Button text={t("hero.button")} to="/signup" />
          </div>

          <picture>
            <source media="(max-width: 768px)" srcSet={mobileSrc} />
            <source srcSet={`${desktopSrc} 1x, ${highResolutionSrc} 2x`} />
            <img
              className={styles.image}
              src={desktopSrc}
              alt={t("hero.imageAlt")}
              width="450"
              height="570"
              fetchPriority="high"
              loading="eager"
            />
          </picture>
        </div>
      </Container>
    </Section>
  );
};

export default HeroGuest;
