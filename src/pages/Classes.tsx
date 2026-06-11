import { useState } from "react";
import { ViewMode } from "../shared/types/global.types";
import PageHeader from "../shared/components/pageHeader/PageHeader";
import styles from "@/features/classes/styles/Classes.module.css";

const Classes = () => {

  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <>
      <PageHeader 
        title="Classes"
        subtitle="Define class entries for ---"
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