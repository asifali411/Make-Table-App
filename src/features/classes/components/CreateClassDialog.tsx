import { useState } from "react";
import CreateDialog from "../../../shared/components/create-dialog/CreateDialog";
import TextInput from "../../../shared/components/text-input/TextInput";

interface CreateClassDialogProps {
  open: boolean;
  
  onClose: () => void;
}

const CreateClassDialog = ({
  open,
  onClose,
}: CreateClassDialogProps) => {
  const [createForm, setCreateForm] = useState({
    className: "",
    roomName: "",
  });
  const [createFormError, setCreateFormError] = useState({
    className: false,
    roomName: false,
  }); 

  const handleCreateClass = () => {
    setCreateFormError({
      className: createForm.className.trim() === "",
      roomName: createForm.roomName.trim() === "",
    });

    // TODO: handle class creation
  };

  return (
    <CreateDialog
      open={open}
      title="Add Class"
      onClose={onClose}
      onCreate={handleCreateClass}
    >
      <TextInput
        label="Class Name"
        placeholder="eg: CSE A"
        hasError={createFormError.className}
        onChange={(value) => {
          setCreateForm((prev) => ({
            ...prev,
            className: value,
          }));

          setCreateFormError((prev) => ({
            ...prev,
            className: false,
          }));
        }}
      />

      <TextInput
        label="Room Name"
        placeholder="eg: Room 101"
        hasError={createFormError.roomName}
        onChange={(value) => {
          setCreateForm((prev) => ({
            ...prev,
            roomName: value,
          }));

          setCreateFormError((prev) => ({
            ...prev,
            roomName: false,
          }));
        }}
      />
    </CreateDialog>
  );
};

export default CreateClassDialog;