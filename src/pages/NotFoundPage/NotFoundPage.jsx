import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./NotFoundPage.module.css";
import mapResolution from "../../assets/img/map-high-resolution.webp";
import mapDesktop from "../../assets/img/map-desktop.webp";
import mapMobile from "../../assets/img/map-mobile.webp";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("notFound");

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <Section>
      <Container>
        <div className={styles.content}>
          <picture className={styles.imageWrapper}>
            <source media="(max-width: 768px)" srcSet={mapMobile} />
            <source srcSet={`${mapDesktop} 1x, ${mapResolution} 2x`} />
            <img
              className={styles.image}
              src={mapDesktop}
              alt={t("imageAlt")}
              width="450"
              height="570"
              loading="lazy"
            />
          </picture>

          <div className={styles.textWrapper}>
            <h1 className={styles.code}>{t("errorCode")}</h1>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.description}>{t("description")}</p>
          </div>

          <Button text={t("returnHome")} onClick={handleReturnHome} />
        </div>
      </Container>
    </Section>
  );
};

export default NotFoundPage;
