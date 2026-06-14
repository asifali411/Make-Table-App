import { CheckIcon } from "lucide-react";
import styles from "./styles/Checkbox.module.css";
import { useState } from "react";

interface CheckboxProps {
  label?: string;
  defaultValue?: boolean;
  onChange: (value: boolean) => void;
  style?: React.CSSProperties;
}

const Checkbox = ({
  label = "",
  defaultValue = false,
  style = {},
  onChange,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <label className={styles.container} style={style}>
      <input
        type="checkbox"
        id={`checkbox-${label}`}
        checked={isChecked}
        onChange={handleChange}
        className={styles.input}
        tabIndex={-1}
      />

      <span
        className={`${styles.wrapper} ${isChecked ? styles.selected : ""}`}
        tabIndex={0}
      >
        {isChecked && <CheckIcon />}
      </span>

      <span>{label}</span>
    </label>
  );
};

export default Checkbox;