import { useEffect, useRef, useState } from "react";
import UpdateDialog from "../../../shared/components/update-dialog/UpdateDialog";
import TextInput from "../../../shared/components/text-input/TextInput";
import Checkbox from "../../../shared/components/checkbox/Checkbox";

interface ClassForm {
  className: string;
  roomName: string;
  isLab: boolean;
}

interface UpdateClassDialogProps {
  open: boolean;
  data: ClassForm;
  onClose: () => void;
}

const INITIAL_FORM_ERROR = {
  className: false,
  roomName: false,
};

const UpdateClassDialog = ({ open, data, onClose }: UpdateClassDialogProps) => {
  const classNameRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ClassForm>(data);
  const [formError, setFormError] = useState(INITIAL_FORM_ERROR);

  useEffect(() => {
    if (open) classNameRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open) {
      setForm(data);
      setFormError(INITIAL_FORM_ERROR);
    }
  }, [open, data]);

  const validate = () => {
    const errors: typeof INITIAL_FORM_ERROR = {
      className: form.className.trim() === "",
      roomName: form.roomName.trim() === "",
    };

    setFormError(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleUpdateClass = () => {
    if (!validate()) return;

    // TODO: handle class updation

    onClose();
    document.getElementById("root")?.removeAttribute("inert");
  };

  const handleChange = (field: keyof ClassForm, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field in formError) {
      setFormError((prev) => ({
        ...prev,
        [field as keyof typeof formError]: false,
      }));
    }
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
          handleChange("className", value);
        }}
      />

      <TextInput
        label="Room Name"
        placeholder="eg: Room 101"
        defaultValue={form.roomName}
        hasError={formError.roomName}
        onChange={(value) => {
          handleChange("roomName", value);
        }}
      />

      <Checkbox
        label="is Lab"
        defaultValue={form.isLab}
        onChange={(value) => {
          handleChange("isLab", value);
        }}
      />
    </UpdateDialog>
  );
};

export default UpdateClassDialog;
