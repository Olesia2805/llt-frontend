import styles from "./Section.module.css";
import clsx from "clsx";

const Section = ({ children, variant = "main" }) => {
  // variant: "mainBG", "altBG", "blobsBG", "ctaSectionBG", "sectionFooterDown"
  const variantClasses = variant.split(" ").map((v) => {
    if (v === "mainBG") return styles.mainBG;
    if (v === "altBG") return styles.altBG;
    if (v === "blobsBG") return styles.blobBG;
    if (v === "ctaSectionBG") return styles.ctaSectionBG;
    if (v === "sectionFooterDown") return styles.sectionFooterDown;
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
