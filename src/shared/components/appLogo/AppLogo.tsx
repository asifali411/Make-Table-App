import styles from "./AppLogo.module.css";
import { Calendar } from "lucide-react";
const AppLogo = () => {
  return (
    <div className={styles.logo}>
      <Calendar />
    </div>
  );
};

export default AppLogo;
