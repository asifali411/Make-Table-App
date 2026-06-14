import { useEffect, useRef, useState } from "react";
import CreateDialog from "../../../shared/components/create-dialog/CreateDialog";
import TextInput from "../../../shared/components/text-input/TextInput";
import Checkbox from "../../../shared/components/checkbox/Checkbox";

interface CreateClassDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateClassDialog = ({
  open,
  onClose,
}: CreateClassDialogProps) => {
  const classNameRef = useRef<HTMLInputElement>(null);
  
  const [createForm, setCreateForm] = useState({
    className: "",
    roomName: "",
    isLab: false,
  });
  const [createFormError, setCreateFormError] = useState({
    className: false,
    roomName: false,
  }); 

  useEffect(() => {
    if(open) classNameRef.current?.focus();
  }, [open]);

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
        ref={classNameRef}
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

      <Checkbox label="is Lab" onChange={(isLab) => {
        setCreateForm((prev) => ({
          ...prev,
          isLab,
        }));
      }} />
    </CreateDialog>
  );
};

export default CreateClassDialog;