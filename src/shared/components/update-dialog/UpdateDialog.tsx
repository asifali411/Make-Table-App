import { ReactNode } from "react";
import CreateDialog from "../create-dialog/CreateDialog";

// ---------------------------------------------------------------------------------------

interface UpdateDialogProps {
  open: boolean;
  title: string;
  updateLabel?: string;
  children: ReactNode;

  onUpdate: () => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------------------

const UpdateDialog = ({
  open,
  title,
  updateLabel = "Update",
  children,

  onUpdate,
  onClose,
}: UpdateDialogProps) => {
  return (
    <CreateDialog
      open={open}
      title={title}
      createLabel={updateLabel}
      onCreate={onUpdate}
      onClose={onClose}
    >
    {children}
    </CreateDialog>
  );
};

export default UpdateDialog;