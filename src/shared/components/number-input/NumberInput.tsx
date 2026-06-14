import { ChangeEvent, useState } from "react";
import styles from "./styles/NumberInput.module.css";

interface NumberInputProps {
  ref?: any;
  label: string;
  defaultValue?: number;
  hasError: boolean;
  min?: number;
  max?: number;

  onChange: (value: number) => void;
}

const NumberInput = ({
  ref,
  label,
  defaultValue = 0,
  hasError,
  min = 0,
  max = 999,

  onChange,
}: NumberInputProps) => {
  const [input, setInput] = useState(String(defaultValue));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleBlur = () => {
    let value = Number(input);

    if (isNaN(value)) value = min;

    value = Math.min(max, Math.max(min, value));

    setInput(String(value));
    onChange(value);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${hasError ? styles.error : ""}`}
        ref={ref}
        type="number"
        value={input}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
      />
    </div>
  );
};

export default NumberInput;
