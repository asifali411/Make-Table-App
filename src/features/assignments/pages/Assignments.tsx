import { useState } from "react";
import { ViewMode } from "../../../shared/types/global.types";
import PageHeader from "../../../shared/components/page-header/PageHeader";
import CreateAssignmentDialog from "../components/CreateAssignmentDialog";

const TIMETABLE_NAME = "Timetable-2026"

const Assignments = () => {

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [openCreateAssignmentDialog, setOpenCreateAssignmentDialog] = useState(false);

  return (
    <>
      <PageHeader 
        title="Assignments"
        subtitle={`Define subject entries for ${TIMETABLE_NAME}`}
        viewMode={viewMode}
        addLabel="Add Assignment"
        importLabel="Import"
        onViewModeChange={(mode) => setViewMode(mode)}
        onAdd={() => setOpenCreateAssignmentDialog(true)}
        onImport={() => {}}
      />

      <CreateAssignmentDialog
        open={openCreateAssignmentDialog}
        onClose={() => setOpenCreateAssignmentDialog(false)}
      />
    </>
  );
};

export default Assignments;