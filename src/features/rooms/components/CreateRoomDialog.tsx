import { useState } from "react";
import CreateDialog from "../../../shared/components/create-dialog/CreateDialog";
import TextInput from "../../../shared/components/text-input/TextInput";

interface RoomForm {
  name: string;
}

interface CreateRoomDialogProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM: RoomForm = {
  name: "",
};

const INITIAL_FORM_ERROR = {
  name: false,
};

type FormErrorKey = keyof typeof INITIAL_FORM_ERROR;

const CreateRoomDialog = ({ open, onClose }: CreateRoomDialogProps) => {
  const [form, setForm] = useState<RoomForm>(INITIAL_FORM);
  const [formError, setFormError] = useState(INITIAL_FORM_ERROR);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFormError(INITIAL_FORM_ERROR);
  };

  const validate = () => {
    const errors: typeof INITIAL_FORM_ERROR = {
      name: form.name.trim() === "",
    };

    setFormError(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleCreateRoom = () => {
    if (!validate()) return;

    // TODO: handle Room creation

    resetForm();
    document.getElementById("root")?.removeAttribute("inert");
    onClose();
  };

  const handleChange = (field: keyof RoomForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field in formError) {
      setFormError((prev) => ({
        ...prev,
        [field as FormErrorKey]: false,
      }));
    }
  };

  return (
    <CreateDialog
      open={open}
      title="Add Room"
      onClose={onClose}
      onCreate={handleCreateRoom}
    >
      <TextInput
        label="Room Name"
        placeholder="eg: Room 101"
        defaultValue={form.name}
        hasError={formError.name}
        onChange={(value) => {
          handleChange("name", value);
        }}
      />
    </CreateDialog>
  );
};

export default CreateRoomDialog;
