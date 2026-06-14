import { useEffect, useRef, useState } from "react";
import UpdateDialog from "../../../shared/components/update-dialog/UpdateDialog";
import TextInput from "../../../shared/components/text-input/TextInput";
import Checkbox from "../../../shared/components/checkbox/Checkbox";

interface ClassForm {
  className: string;
  roomName: string;
  isLab: boolean;
}

interface UpdateClassDialog {
  open: boolean;
  data: ClassForm;
  onClose: () => void;
}

const UpdateClassDialog = ({ open, data, onClose }: UpdateClassDialog) => {
  const classNameRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    className: data.className,
    roomName: data.roomName,
    isLab: data.isLab,
  });
  const [formError, setFormError] = useState({
    className: false,
    roomName: false,
  });

  useEffect(() => {
    if (open) classNameRef.current?.focus();
  }, [open]);

  const handleUpdateClass = () => {
    setFormError({
      className: form.className.trim() === "",
      roomName: form.roomName.trim() === "",
    });

    // TODO: handle class updation
  };

  return (
    <UpdateDialog
      open={open}
      title="Update Class"
      onClose={onClose}
      onUpdate={handleUpdateClass}
    >
      <TextInput
        ref={classNameRef}
        label="Class Name"
        placeholder="eg: CSE A"
        defaultValue={form.className}
        hasError={formError.className}
        onChange={(value) => {
          setForm((prev) => ({
            ...prev,
            className: value,
          }));

          setFormError((prev) => ({
            ...prev,
            className: false,
          }));
        }}
      />

      <TextInput
        label="Room Name"
        placeholder="eg: Room 101"
        defaultValue={form.roomName}
        hasError={formError.roomName}
        onChange={(value) => {
          setForm((prev) => ({
            ...prev,
            roomName: value,
          }));

          setFormError((prev) => ({
            ...prev,
            roomName: false,
          }));
        }}
      />

      <Checkbox
        label="is Lab"
        defaultValue={form.isLab}
        onChange={(isLab) => {
          setForm((prev) => ({
            ...prev,
            isLab,
          }));
        }}
      />
    </UpdateDialog>
  );
};

export default UpdateClassDialog;
