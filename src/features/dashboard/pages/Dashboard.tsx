import styles from "../styles/Dashboard.module.css";
import { Plus } from "lucide-react";
import SummaryGrid from "../components/summaryGrid/SummaryGrid";
import { useState } from "react";
import CreateTimetableDialog from "../components/dialogs/CreateTimetableDialog";
const Dashboard = () => {
  const [openCreateTimetableDialog, setOpenCreateClassDialog] =
    useState<boolean>(false);
  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Manage your timetable workspace</p>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => setOpenCreateClassDialog(true)}
        >
          <Plus size={16} strokeWidth={2} />
          Create Timetable
        </button>
      </header>
      <SummaryGrid />

      {/*Create dialog */}
      <CreateTimetableDialog
        isVisible={openCreateTimetableDialog}
        onClose={() => setOpenCreateClassDialog(false)}
      />
    </div>
  );
};

export default Dashboard;
