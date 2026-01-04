import styles from "./Section.module.css";
import clsx from "clsx";

const Section = ({ children, variant = "main" }) => {
  // variant: "mainBG", "altBG", "blobs", "ctaSection"
  const variantClasses = variant.split(" ").map((v) => {
    if (v === "main") return styles.mainBG;
    if (v === "altBG") return styles.altBG;
    if (v === "blobs") return styles.blobBG;
    if (v === "ctaSection") return styles.ctaSection;
    return null;
  });

  const hasBlobs = variant.includes("blobs");

  return (
    <section className={clsx(styles.section, ...variantClasses)}>
      {children}
      {hasBlobs && (
        <div className={styles.blobContainer} aria-hidden="true">
          <span className={`${styles.blob} ${styles.blob1}`} />
          <span className={`${styles.blob} ${styles.blob2}`} />
          <span className={`${styles.blob} ${styles.blob3}`} />
        </div>
      )}
    </section>
  );
};

export default Section;
