import { createPortal } from "react-dom";
import styles from "../styles/DropdownBody.module.css";
import { RefObject } from "react";

interface DropdownBodyProps {
  open: boolean;
  options: string[];
  style?: React.CSSProperties;
  onSelect: (option: string) => void;
  ref: RefObject<HTMLDivElement | null>;
}

const DropdownBody = ({
  open,
  options,
  style,
  onSelect,
  ref,
}: DropdownBodyProps) => {
  return createPortal(
    <div
      className={styles.dropdown}
      ref={ref}
      style={{
        ...style,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <ol>
        {options.map((opt) => (
          <li key={opt}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelect(opt)}
            >
              {opt}
            </button>
          </li>
        ))}
      </ol>
    </div>,
    document.body,
  );
};

export default DropdownBody;