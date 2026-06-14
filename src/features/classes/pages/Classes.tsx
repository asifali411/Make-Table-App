import { useState } from "react";
import { ViewMode } from "../../../shared/types/global.types";
import PageHeader from "../../../shared/components/page-header/PageHeader";
import CreateClassDialog from "../components/CreateClassDialog";
import UpdateClassDialog from "../components/UpdateClassDialog";

const TIMETABLE_NAME = "Timetable-2026"

const Classes = () => {

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [openCreateClassDialog, setOpenCreateClassDialog] = useState(false);

  return (
    <>
      <PageHeader
        title="Classes"
        subtitle={`Define class entries for ${TIMETABLE_NAME}`}
        viewMode={viewMode}
        addLabel="Add Class"
        importLabel="Import"
        onViewModeChange={(mode) => setViewMode(mode)}
        onAdd={() => setOpenCreateClassDialog(true)}
        onImport={() => {}}
      />

      <CreateClassDialog 
        open={openCreateClassDialog}
        onClose={() => setOpenCreateClassDialog(false)}
      />

      <UpdateClassDialog
        open={false}
        data={{
          className: "CSE 1A",
          roomName: "Annex 101",
          isLab: false,
        }}
        onClose={() => {}}
      />
    </>
  );
};

export default Classes;