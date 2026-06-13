import { ChangeEvent, useState } from "react";
import styles from "./styles/TextInput.module.css";

interface TextInputProps {
  label: string,
  placeholder: string,
  hasError: boolean,

  onChange: (value: string) => void;
}

const TextInput = ({
  label,
  placeholder,
  hasError,

  onChange,
}: TextInputProps) => {

  const [input, setInput] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onChange(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input 
        className={`${styles.input} ${hasError ? styles.error : ""}`}
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default TextInput;