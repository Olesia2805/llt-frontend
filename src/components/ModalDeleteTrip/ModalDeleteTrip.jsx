import { useState } from "react";
import styles from "./ModalDeleteTrip.module.css";
import ModalContainer from "../ModalContainer/ModalContainer";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "../Button/Button";
import { IoTrashBin } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ModalDeleteTrip = ({ isOpen, onConfirm, onCancel }) => {
  const { t } = useTranslation("myTrips");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = () => {
    setIsDeleting(true);

    setTimeout(() => {
      onConfirm();
      setIsDeleting(false);
    }, 1400);
  };
  return (
    <ModalContainer isOpen={isOpen} onClose={onCancel}>
      <Button
        variant="closeBtn"
        onClick={onCancel}
        leftIcon={<IoIosCloseCircleOutline />}
      />

      <div className={styles.content}>
        <div
          className={`${styles.binWrapper} ${isDeleting ? styles.animate : ""}`}
        >
          <div className={styles.lid} />

          <div className={styles.trash} />

          <IoTrashBin className={styles.binIcon} />
        </div>

        <h2 className={styles.title}>{t("deleteModal.title")}</h2>

        <p className={styles.description}>{t("deleteModal.description")}</p>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
            {t("deleteModal.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {t("deleteModal.confirm")}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ModalDeleteTrip;
