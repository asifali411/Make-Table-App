import styles from "./styles/CircularCheckBox.module.css";
import { Check } from "lucide-react";
import React from "react";

interface CircularCheckBoxProps {
  checked: boolean;
  toggleCheck?: () => void;
  style?: React.CSSProperties;
  checkSize?: number;
  checkStroke?: number;
}

const CircularCheckBox = ({
  checked,
  toggleCheck,
  style,
  checkSize = 10,
  checkStroke = 2.2,
}: CircularCheckBoxProps) => {
  return (
    <span
      style={style}
      className={`${styles.CircularCheckBox} ${
        checked ? styles.circularcb__checked : ""
      }`}
      onClick={toggleCheck}
    >
      {checked && <Check size={checkSize} strokeWidth={checkStroke} />}
    </span>
  );
};

export default CircularCheckBox;
