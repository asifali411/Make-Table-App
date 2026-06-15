import { useState } from "react";
import styles from "../styles/BadgeSelect.module.css";

interface BadgeSelectProps {
  label: string;
  options: string[];
  defaultValue: string;

  onSelect: (value: string) => void;
}

const BadgeSelect = ({
  label,
  options,
  defaultValue,
  onSelect,
}: BadgeSelectProps) => {

  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (value: string) => {
    setSelected(value);
    onSelect(value);
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.wrapper}>
        {options.map((opt) => (
          <button
            className={`${styles.option} ${selected === opt ? styles.selected : ""}`}
            onClick={() => handleChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BadgeSelect;