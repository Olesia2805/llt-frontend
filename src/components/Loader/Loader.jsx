import styles from "./Loader.module.css";

const Loader = ({ children }) => {
  return <div className={styles.loader}>{children}</div>;
};

export default Loader;
