import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Logo from "../../Logo/Logo";
import styles from "./LogInForm.module.css";

import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";

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
  
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
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
              {showPassword ? (
                <IoEyeOff size={20} />
              ) : (
                <IoEye size={20} />
              )}
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
        <GoogleLoginButton onClick={handleGoogleLogin} />
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
