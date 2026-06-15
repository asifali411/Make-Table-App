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

const CreateTeacherDialog = ({
  open,
  onClose
}: CreateTeacherDialogProps) => {

  const [form, setForm] = useState<TeacherForm>({
    name: "",
    maxPerDay: 4,
    maxPerWeek: 15,
    maxConsecutive: 2,
  });

  const [formError, setFormError] = useState({
    name: false,
    maxPerDay: false,
    maxPerWeek: false,
    maxConsecutive: false,
  });

  const handleCreateTeacher = () => {
    setFormError((prev) => ({
      ...prev,
      name: form.name.trim() === "",
    }));

    // TODO: handle teacher creation
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
        hasError={formError.name}
        onChange={(value) => {
          handleChange("name", value);
        }}
      />

      <div className={styles.row}>
        <NumberInput
          label="Max/Day"
          hasError={formError.maxPerDay}
          onChange={(value: number) => {
            handleChange("maxPerDay", value);
          }}
        />
        <NumberInput
          label="Max/Week"
          hasError={formError.maxPerWeek}
          onChange={(value: number) => {
            handleChange("maxPerWeek", value);
          }}
        />
        <NumberInput
          label="Max Consec."
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