import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Button from "../Button/Button";
import styles from "./CallToAction.module.css";

const CallToAction = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section variant="blobsBG ctaSectionBG">
      <Container>
        <div className={styles.ctaWrapper}>
          <div className="sectionHeaderWrapper">
            <h2>{t("cta.title")}</h2>
            <p>{t("cta.description")}</p>
          </div>
          <Button text={t("cta.button")} to="/signup" />
        </div>
      </Container>
    </Section>
  );
};

export default CallToAction;
