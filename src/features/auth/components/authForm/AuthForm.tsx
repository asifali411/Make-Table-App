import { useState } from "react";
import styles from "./AuthForm.module.css";
import AuthInput from "../authInput/AuthInput";
import { Link } from "react-router-dom";

type AuthFormType = { authType: "register" | "login" };
type FormField =
  | keyof typeof FORM_INFO.register.initialValues
  | keyof typeof FORM_INFO.login.initialValues;

const FORM_INFO = {
  register: {
    title: "Create your account",
    tagline: "Start generating timetables in seconds.",
    submitBtn: "Create account",
    link: {
      text: "Already have an account?",
      spanText: "Sign In",
      link: "/login",
    },
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  },
  login: {
    title: "Sign in",
    tagline: "Welcome back. Let's get you in",
    submitBtn: "Sign in",
    link: {
      text: "New to MakeTable?",
      spanText: "Create one",
      link: "/register",
    },
    initialValues: {
      username: "",
      password: "",
    },
  },
} as const;
const AuthForm = ({ authType }: AuthFormType) => {
  const PAGE_CONTENT = FORM_INFO[authType];
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState(PAGE_CONTENT.initialValues);
  const loginHandler = (): undefined => {};

  //helper
  const updateField = (field: FormField, value: string) => {
    setFormData(
      (prev) =>
        ({
          ...prev,
          [field]: value,
        }) as typeof prev,
    );
  };

  return (
    <div className={styles.authCard}>
      <div className={styles.authHeader}>
        <h2 className={styles.authTitle}>{PAGE_CONTENT.title}</h2>
        <p className={styles.authSubtitle}>{PAGE_CONTENT.tagline}</p>
      </div>

      <form onSubmit={loginHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <AuthInput
            id="username__field"
            label="Username"
            placeholder="Username"
            type="text"
            icon="user"
            value={formData.username}
            onChange={(value) => updateField("username", value)}
          />

          {"email" in formData && (
            <AuthInput
              id="email__field"
              label="Email"
              placeholder="Email"
              type="email"
              icon="mail"
              value={formData.email}
              onChange={(value) => updateField("email", value)}
            />
          )}

          <AuthInput
            id="password__field"
            label="Password"
            placeholder="Password"
            type="password"
            icon="password"
            value={formData.password}
            onChange={(value) => updateField("password", value)}
          />

          {"confirmPassword" in formData && (
            <AuthInput
              id="confirmPassword__field"
              label="Confirm password"
              placeholder="Confirm password"
              type="password"
              icon="password"
              value={formData.confirmPassword}
              onChange={(value) => updateField("confirmPassword", value)}
            />
          )}
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={submitLoading}
        >
          {PAGE_CONTENT.submitBtn} <span>→</span>
        </button>

        <p className={styles.switchPrompt}>
          {PAGE_CONTENT.link.text}{" "}
          <Link to={PAGE_CONTENT.link.link}>{PAGE_CONTENT.link.spanText}</Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
