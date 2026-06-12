import { useState } from "react";
import { ViewMode } from "../../../shared/types/global.types";
import PageHeader from "../../../shared/components/page-header/PageHeader";
import useToast from "../../../shared/components/toast/hooks/useToast";

const TIMETABLE_NAME = "Timetable-2026"

const Classes = () => {

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { addToast } = useToast();

  return (
    <>
      <PageHeader 
        title="Classes"
        subtitle={`Define class entries for ${TIMETABLE_NAME}`}
        viewMode={viewMode}
        addLabel="Add Class"
        importLabel="Import"
        onViewModeChange={(mode) => setViewMode(mode)}
        onAdd={() => {}}
        onImport={() => {}}
      />
    </>
  );
};

export default Classes;