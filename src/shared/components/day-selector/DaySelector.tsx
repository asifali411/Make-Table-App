import styles from "./DaySelector.module.css";
import CircularCheckBox from "../checkbox/CircularCheckBox";
import { Day } from "../../types/days.types";

interface DaySelectorProps {
  selectedDays: Day[];
  toggleDay: (day: Day) => void;
  days?: Day[];
  label?: string;
  errorMessage?: string;
}

const DEFAULT_DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DaySelector = ({
  selectedDays,
  toggleDay,
  days = DEFAULT_DAYS,
  label,
  errorMessage,
}: DaySelectorProps) => {
  return (
    <div className={styles.daySelector}>
      {label && (
        <div className={styles.labelRow}>
          <span className={styles.label}>{label}</span>
          {errorMessage ? (
            <span className={styles.error}>{errorMessage}</span>
          ) : null}
        </div>
      )}

      <div className={styles.dayGrid}>
        {days.map((day) => {
          const active = selectedDays.includes(day);

          return (
            <span
              key={day}
              className={`${styles.dayItem} ${active ? styles.active : ""}`}
              onClick={() => toggleDay(day)}
              aria-pressed={active}
            >
              <CircularCheckBox
                checked={active}
                checkSize={11}
                checkStroke={2}
              />
              <span className={styles.dayText}>{day}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector;
