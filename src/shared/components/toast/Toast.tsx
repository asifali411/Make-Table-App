import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import styles from "./styles/Toast.module.css";
import { Toast, ToastType } from "./types/toast.types";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  InfoIcon,
  X,
} from "lucide-react";

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle aria-hidden="true" />,
  error: <XCircle aria-hidden="true" />,
  warning: <AlertTriangle aria-hidden="true" />,
  info: <InfoIcon aria-hidden="true" />,
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export default function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [state, setState] = useState<"entering" | "visible" | "leaving">(
    "entering",
  );
  const duration = toast.duration ?? 4000;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLeave = useCallback(() => {
    setState("leaving");
    setTimeout(() => onRemove(toast.id), 380);
  }, [toast.id, onRemove]);

  useEffect(() => {
    const enterTimer = setTimeout(() => setState("visible"), 10);

    timerRef.current = setTimeout(startLeave, duration);

    return () => {
      clearTimeout(enterTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, startLeave]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(startLeave, 1500);
  };

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${styles[state]}`}
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.icon}>{icons[toast.type]}</span>

      <div className={styles.body}>
        {toast.title && <p className={styles.title}>{toast.title}</p>}
        <p className={styles.message}>{toast.message}</p>
      </div>

      <button
        className={styles.close}
        onClick={startLeave}
        aria-label="Dismiss notification"
      >
        <X aria-hidden="true" />
      </button>

      <div
        className={styles.progress}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
}