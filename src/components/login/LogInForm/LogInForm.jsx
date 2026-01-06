import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../Logo/Logo";
import styles from "./LogInForm.module.css";

const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className={styles.formContainer}>
      {/* Mobile Logo */}
      <div className={styles.mobileLogo}>
        <Logo variant="header" />
        <span>TravelApp</span>
      </div>

      <div className={styles.header}>
        <h1>Welcome Back</h1>
        <p>Continue your journey.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email or Username"
            className={`${styles.input} ${errors.email ? styles.error : ""}`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`${styles.input} ${errors.password ? styles.error : ""}`}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <label className={styles.rememberMe}>
            <input type="checkbox" {...register("rememberMe")} />
            <span>Remember me</span>
          </label>
          <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </div>

        <button type="submit" className={styles.submitButton}>
          Log In
        </button>
      </form>

      <div className={styles.divider}>
        <div className={styles.bgDivider}></div>
        <span>Or continue with</span>
        <div className={styles.bgDivider}></div>
      </div>

      <div className={styles.socialLogin}>
        <button className={styles.socialButton}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            ></path>
          </svg>
          <span className="sr-only">Google</span>
        </button>

      </div>

      <div className={styles.footer}>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInForm;
