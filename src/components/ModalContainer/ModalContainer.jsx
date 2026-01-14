import { useEffect } from "react";
import clsx from "clsx";
import styles from "./ModalContainer.module.css";

const ModalContainer = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={clsx(styles.overlay, isOpen && styles.show)}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default ModalContainer;
