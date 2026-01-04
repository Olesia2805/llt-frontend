import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              src={illustration}
              alt="404 illustration"
              className={styles.illustration}
            />
          </div>

          <div className={styles.textContent}>
            <p className={styles.errorCode}>{t("errorCode")}</p>
            <h1 className={styles.title}>
              {t("title")}
            </h1>
            <p className={styles.description}>
              {t("description")}
            </p>
          </div>

          <div className={styles.actions}>
            <Button
              text={t("returnHome")}
              variant="primary"
              onClick={handleReturnHome}
              className={styles.primaryButton}
            />
            <button className={styles.secondaryButton}>
              {t("helpCenter")}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
