import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Button from "../Button/Button";
import styles from "./CallToAction.module.css";
import Blobs from "../Blobs/Blobs";

const CallToAction = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <Container>
        <div className={styles.ctaWrapper}>
          <Blobs />
          <div className={styles.textWrapper}>
            <h2 className={styles.title}>{t("cta.title")}</h2>
            <p className={styles.description}>{t("cta.description")}</p>
          </div>
          <Button text={t("cta.button")} />
        </div>
      </Container>
    </Section>
  );
};

export default CallToAction;
