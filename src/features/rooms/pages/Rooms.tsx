import { useState } from "react";
import { ViewMode } from "../../../shared/types/global.types";
import PageHeader from "../../../shared/components/page-header/PageHeader";
import CreateRoomDialog from "../components/CreateRoomDialog";

const Rooms = () => {

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = useState(false);

  return (
    <>
      <PageHeader
        title="Rooms"
        subtitle={`Define rooms in your Institution.`}
        viewMode={viewMode}
        addLabel="Add Room"
        importLabel="Import"
        onViewModeChange={(mode) => setViewMode(mode)}
        onAdd={() => setOpenCreateRoomDialog(true)}
        onImport={() => {}}
      />

      <CreateRoomDialog 
        open={openCreateRoomDialog}
        onClose={() => setOpenCreateRoomDialog(false)}
      />
    </>
  );
};

export default Rooms;
