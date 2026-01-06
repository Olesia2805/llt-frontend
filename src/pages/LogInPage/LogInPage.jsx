import styles from "./LogInPage.module.css";
import LoginHero from "../../components/login/LoginHero/LoginHero";
import LogInForm from "../../components/login/LogInForm/LogInForm";

const LogInPage = () => {
  return (
    <div className={styles.wrapper}>
      <LoginHero />

      {/* Right Panel: Login Form */}
      <div className={styles.rightPanel}>
        <LogInForm />
      </div>
    </div>
  );
};

export default LogInPage;
