import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./NotFoundPage.module.css";
import illustration from "../../assets/img/404_img.png";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <p className={styles.errorCode}>ERROR 404</p>
            <h1 className={styles.title}>
              Looks like you've wandered off the map
            </h1>
            <p className={styles.description}>
              The destination you are looking for doesn't exist or has been
              moved. Even the best travelers get lost sometimes.
            </p>
          </div>

          <div className={styles.actions}>
            <Button
              text="Return Home"
              variant="primary"
              onClick={handleReturnHome}
              className={styles.primaryButton}
            />
            <button className={styles.secondaryButton}>Help Center</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
