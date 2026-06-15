import { useEffect, useRef, useState } from "react";
import CreateDialog from "../../../shared/components/create-dialog/CreateDialog";
import TextInput from "../../../shared/components/text-input/TextInput";
import Checkbox from "../../../shared/components/checkbox/Checkbox";

interface ClassForm {
  className: string;
  roomName: string;
  isLab: boolean;
}

interface CreateClassDialogProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM: ClassForm = {
  className: "",
  roomName: "",
  isLab: false,
};

const INITIAL_FORM_ERROR = {
  className: false,
  roomName: false,
};

const CreateClassDialog = ({ open, onClose }: CreateClassDialogProps) => {
  const classNameRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ClassForm>(INITIAL_FORM);
  const [formError, setFormError] = useState(INITIAL_FORM_ERROR);

  useEffect(() => {
    if (open) classNameRef.current?.focus();
  }, [open]);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFormError(INITIAL_FORM_ERROR);
  };

  const validate = () => {
    const errors: typeof INITIAL_FORM_ERROR = {
      className: form.className.trim() === "",
      roomName: form.roomName.trim() === "",
    };

    setFormError(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleCreateClass = () => {
    if (!validate()) return;

    // TODO: handle class creation

    resetForm();
    document.getElementById("root")?.removeAttribute("inert");
    onClose();
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
    </CreateDialog>
  );
};

export default CreateClassDialog;