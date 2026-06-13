import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import styles from "./styles/CreateDialog.module.css";

// ---------------------------------------------------------------------------------------

interface CreateDialogProps {
  open: boolean;
  title: string;
  createLabel?: string;
  children: ReactNode;

  onCreate: () => void;
  onClose: () => void;
};

// ---------------------------------------------------------------------------------------

const CreateDialog = ({
  open,
  title,
  createLabel = "Create",
  children,

  onCreate,
  onClose,
}: CreateDialogProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  // ---------------------------------------------------------------------------------------

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // ---------------------------------------------------------------------------------------

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>
            {title}
          </h2>

          <button onClick={onClose} ref={closeRef}>
            <X />
          </button>
        </div>

        <div className={styles.body}>{children}</div>

        <div className={styles.action}>
          <button className={styles.createBtn} onClick={onCreate}>
            {createLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDialog;