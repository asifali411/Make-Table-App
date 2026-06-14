import { useState } from "react";
import { ViewMode } from "../../../shared/types/global.types";
import PageHeader from "../../../shared/components/page-header/PageHeader";
import CreateSubjectDialog from "../components/CreateSubjectDialog";

const TIMETABLE_NAME = "Timetable-2026"

const Subjects = () => {

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [openCreateSubjectDialog, setOpenCreateSubjectDialog] = useState(false);

  return (
    <>
      <PageHeader 
        title="Subjects"
        subtitle={`Define subject entries for ${TIMETABLE_NAME}`}
        viewMode={viewMode}
        addLabel="Add Subject"
        importLabel="Import"
        onViewModeChange={(mode) => setViewMode(mode)}
        onAdd={() => setOpenCreateSubjectDialog(true)}
        onImport={() => {}}
      />

      <CreateSubjectDialog
        open={openCreateSubjectDialog}
        onClose={() => setOpenCreateSubjectDialog(false)}
      />
    </>
  );
};

export default Subjects;