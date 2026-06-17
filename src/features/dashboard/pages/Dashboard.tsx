import styles from "../styles/Dashboard.module.css";
import { Plus } from "lucide-react";
import SummaryGrid from "../components/summaryGrid/SummaryGrid";
const Dashboard = () => {
  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Create timetables</p>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => {}}
        >
          <Plus size={16} strokeWidth={2} />
          Create Timetable
        </button>
      </header>
      <SummaryGrid />
    </div>
  );
};

export default Dashboard;
