import { emailRegex, passwordRegex } from "../../../shared/utils/regexProvider";
import type { AuthErrors, AuthForm } from "../types/types";

const useValidate = (form: AuthForm) => {
  const newErrorStates: AuthErrors = {};
  let hasError = false;

  // username
  if (!form.username.trim()) {
    newErrorStates.username = "Username is required";
    hasError = true;
  } else if (form.username.length <= 3) {
    newErrorStates.username = "Username too short";
    hasError = true;
  }

  // email (register only)
  if (form.email !== undefined) {
    if (!form.email.trim()) {
      newErrorStates.email = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(form.email)) {
      newErrorStates.email = "Invalid email address";
      hasError = true;
    }
  }

  // password
  if (!form.password.trim()) {
    newErrorStates.password = "Password is required";
    hasError = true;
  } else if (form.password.length < 6) {
    newErrorStates.password = "Password too short";
    hasError = true;
  } else if (!passwordRegex.test(form.password)) {
    newErrorStates.password = "Include A-Z, a-z, 0-9 & symbol";
    hasError = true;
  }

  // confirm password (register only)
  if (form.confirmPassword !== undefined) {
    if (!form.confirmPassword) {
      newErrorStates.confirmPassword = "Confirm your password";
      hasError = true;
    } else if (form.confirmPassword !== form.password) {
      newErrorStates.confirmPassword = "Passwords do not match";
      hasError = true;
    }
  }

  return {
    hasError,
    newErrorStates,
  };
};

export default useValidate;
