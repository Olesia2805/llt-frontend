import styles from "./Blobs.module.css";

const HeroBlobs = () => {
  return (
    <div className={styles.blobContainer} aria-hidden="true">
      <span className={`${styles.blob} ${styles.blob1}`} />
      <span className={`${styles.blob} ${styles.blob2}`} />
      <span className={`${styles.blob} ${styles.blob3}`} />
    </div>
  );
};

export default HeroBlobs;
