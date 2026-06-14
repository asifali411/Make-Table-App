import { ChangeEvent, useState } from "react";
import styles from "./styles/TextInput.module.css";

interface TextInputProps {
  ref?: any;
  label: string;
  placeholder: string;
  hasError: boolean;
  defaultValue?: string;

  onChange: (value: string) => void;
}

const TextInput = ({
  ref,
  label,
  placeholder,
  hasError,
  defaultValue = "",

  onChange,
}: TextInputProps) => {

  const [input, setInput] = useState<string>(defaultValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onChange(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${hasError ? styles.error : ""}`}
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default TextInput;