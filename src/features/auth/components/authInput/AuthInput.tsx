import styles from "./AuthInput.module.css";
import { User, LockKeyhole, Eye, EyeOff, Mail } from "lucide-react";
import { memo, useEffect, useState, type InputHTMLAttributes } from "react";

type IconType = "user" | "mail" | "password";

interface RequiredInputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: IconType;
}

const ICONS = {
  user: User,
  mail: Mail,
  password: LockKeyhole,
} as const;

const AuthInput = memo(
  ({
    id,
    label,
    value,
    onChange,
    error,
    icon,
    type = "text",
    ...props
  }: RequiredInputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [shake, setShake] = useState(false);

    //shaking handler
    useEffect(() => {
      if (!error) return;
      setShake(false);
      const timer = setTimeout(() => setShake(true), 0);
      return () => clearTimeout(timer);
    }, [error]);

    const isPassword = type === "password";
    const inputType = isPassword && !showPassword ? "password" : "text";
    const Icon = icon !== undefined ? ICONS[icon] : null;

    return (
      <div className={styles.inputContainer}>
        <label htmlFor={id} className={styles.label}>
          <span>{label}</span>
          {error && <span className={styles.errorLabel}>{error}</span>}
        </label>

        <div
          className={[
            styles.inputField,
            error && styles.errorField,
            shake && styles.triggerShake,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {Icon && <Icon size={16} strokeWidth={1.75} />}

          <input
            {...props}
            id={id}
            type={inputType}
            value={value}
            autoComplete="off"
            onChange={(e) => onChange(e.target.value)}
          />

          {isPassword && (
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={1.75} />
              ) : (
                <Eye size={16} strokeWidth={1.75} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);

export default AuthInput;
