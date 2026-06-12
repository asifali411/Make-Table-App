import { useState } from "react";
import { ViewMode } from "../../../shared/types/global.types";
import PageHeader from "../../../shared/components/page-header/PageHeader";

const TIMETABLE_NAME = "Timetable-2026"

const Subjects = () => {

  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <>
      <PageHeader 
        title="Subjects"
        subtitle={`Define subject entries for ${TIMETABLE_NAME}`}
        viewMode={viewMode}
        addLabel="Add Subject"
        importLabel="Import"
        onViewModeChange={(mode) => setViewMode(mode)}
        onAdd={() => {}}
        onImport={() => {}}
      />
    </>
  );
};

export default Subjects;