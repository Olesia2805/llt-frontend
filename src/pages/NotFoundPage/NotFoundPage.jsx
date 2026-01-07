import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./NotFoundPage.module.css";
import illustration from "../../assets/img/404_img.png";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("notFound");

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <Section className={styles.root}>
      <Container>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              src={illustration}
              alt="404 illustration"
              className={styles.image}
            />
          </div>

          <div className={styles.textWrapper}>
            <p className={styles.code}>{t("errorCode")}</p>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.description}>{t("description")}</p>
          </div>

          <div className={styles.actions}>
            <Button
              text={t("returnHome")}
              variant="primary"
              onClick={handleReturnHome}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default NotFoundPage;
