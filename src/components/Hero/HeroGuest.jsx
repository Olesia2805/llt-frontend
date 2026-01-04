import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import Container from "../Container/Container";
import tripDark from "../../assets/img/trip-dark.jpg";
import tripLight from "../../assets/img/trip-light.jpg";
import Button from "../Button/Button";
import styles from "./HeroGuest.module.css";

const Hero = () => {
  const { t } = useTranslation("homeGuest");
  const { theme } = useContext(ThemeContext);

  const heroImage = theme === "dark" ? tripDark : tripLight;

  return (
    <Section variant="blobs">
      <Container>
        <div className={styles.heroWrapper}>
          <div className={styles.textWrapper}>
            <h1
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: t("hero.title") }}
            />
            <p className={styles.description}>{t("hero.description")}</p>
            <Button text={t("hero.button")} />
          </div>

          <img
            className={styles.image}
            src={heroImage}
            alt={t("hero.imageAlt")}
            loading="lazy"
          />
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
