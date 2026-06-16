import { useState } from "react";
import styles from "./AuthForm.module.css";
import AuthInput from "../authInput/AuthInput";
import { Link } from "react-router-dom";
import { COMPONENT_CONTENT } from "./content.constant";

type AuthFormType = { authType: "register" | "login" };
type FormField =
  | keyof typeof COMPONENT_CONTENT.register.initialValues
  | keyof typeof COMPONENT_CONTENT.login.initialValues;

const AuthForm = ({ authType }: AuthFormType) => {
  const SELECTED_CONTENT = COMPONENT_CONTENT[authType];
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState(SELECTED_CONTENT.initialValues);
  const [errorStates, setErrorStates] = useState(
    SELECTED_CONTENT.initialErrors,
  );
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
        <h2 className={styles.authTitle}>{SELECTED_CONTENT.title}</h2>
        <p className={styles.authSubtitle}>{SELECTED_CONTENT.tagline}</p>
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
            error={errorStates.username}
            onChange={(value) => updateField("username", value)}
          />

          {"email" in formData && "email" in errorStates && (
            <AuthInput
              id="email__field"
              label="Email"
              placeholder="Email"
              type="email"
              icon="mail"
              value={formData.email}
              error={errorStates.email}
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
            error={errorStates.password}
            onChange={(value) => updateField("password", value)}
          />

          {"confirmPassword" in formData &&
            "confirmPassword" in errorStates && (
              <AuthInput
                id="confirmPassword__field"
                label="Confirm password"
                placeholder="Confirm password"
                type="password"
                icon="password"
                error={errorStates.confirmPassword}
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
          {SELECTED_CONTENT.submitBtn} <span>→</span>
        </button>

        <p className={styles.switchPrompt}>
          {SELECTED_CONTENT.link.text}{" "}
          <Link to={SELECTED_CONTENT.link.link}>
            {SELECTED_CONTENT.link.spanText}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
