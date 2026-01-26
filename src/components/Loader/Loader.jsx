import { ClimbingBoxLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <ClimbingBoxLoader color="var(--primary)" />
    </div>
  );
};

export default Loader;
