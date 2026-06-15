import { useState } from "react";
import CreateDialog from "../../../shared/components/create-dialog/CreateDialog";
import NumberInput from "../../../shared/components/number-input/NumberInput";
import TextInput from "../../../shared/components/text-input/TextInput";
import styles from "../styles/TeacherDialog.module.css";

interface TeacherForm {
  name: string;
  maxPerDay: number;
  maxPerWeek: number;
  maxConsecutive: number;
}

interface CreateTeacherDialogProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM: TeacherForm = {
  name: "",
  maxPerDay: 4,
  maxPerWeek: 15,
  maxConsecutive: 2,
};

const INITIAL_FORM_ERROR = {
  name: false,
  maxPerDay: false,
  maxPerWeek: false,
  maxConsecutive: false,
};

const CreateTeacherDialog = ({ open, onClose }: CreateTeacherDialogProps) => {
  const [form, setForm] = useState<TeacherForm>(INITIAL_FORM);
  const [formError, setFormError] = useState(INITIAL_FORM_ERROR);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFormError(INITIAL_FORM_ERROR);
  };

  const validate = () => {
    const errors: typeof INITIAL_FORM_ERROR = {
      name: form.name.trim() === "",
      maxPerDay: false,
      maxPerWeek: false,
      maxConsecutive: false,
    };

    setFormError(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleCreateTeacher = () => {
    if (!validate()) return;

    // TODO: handle teacher creation

    resetForm();
    document.getElementById("root")?.removeAttribute("inert");
    onClose();
  };

  const handleChange = (
    field: keyof TeacherForm,
    value: string | boolean | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFormError((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  return (
    <CreateDialog
      open={open}
      title="Add Teacher"
      onClose={onClose}
      onCreate={handleCreateTeacher}
    >
      <TextInput
        label="Name"
        placeholder="eg: Dr Smith"
        defaultValue={form.name}
        hasError={formError.name}
        onChange={(value) => {
          handleChange("name", value);
        }}
      />

      <div className={styles.row}>
        <NumberInput
          label="Max/Day"
          defaultValue={form.maxPerDay}
          hasError={formError.maxPerDay}
          onChange={(value: number) => {
            handleChange("maxPerDay", value);
          }}
        />

        <NumberInput
          label="Max/Week"
          defaultValue={form.maxPerWeek}
          hasError={formError.maxPerWeek}
          onChange={(value: number) => {
            handleChange("maxPerWeek", value);
          }}
        />

        <NumberInput
          label="Max Consec."
          defaultValue={form.maxConsecutive}
          hasError={formError.maxConsecutive}
          onChange={(value: number) => {
            handleChange("maxConsecutive", value);
          }}
        />
      </div>
    </CreateDialog>
  );
};

export default CreateTeacherDialog;
