import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./styles/CreateDialog.module.css";
import { createPortal } from "react-dom";

// ---------------------------------------------------------------------------------------

interface CreateDialogProps {
  open: boolean;
  title: string;
  createLabel?: string;
  children: ReactNode;

  onCreate: () => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------------------

const CreateDialog = ({
  open,
  title,
  createLabel = "Create",
  children,

  onCreate,
  onClose,
}: CreateDialogProps) => {
  useEffect(() => {
    if (open) document.getElementById("root")?.setAttribute("inert", "true");

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        document.getElementById("root")?.removeAttribute("inert");
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // ---------------------------------------------------------------------------------------

  if (!open) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          document.getElementById("root")?.removeAttribute("inert");
          onClose();
        }
      }}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>
            {title}
          </h2>

          <button
            onClick={() => {
              document.getElementById("root")?.removeAttribute("inert");
              onClose();
            }}
          >
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
    </div>,
    document.body,
  );
};

export default CreateDialog;
