import { useState } from "react";
import Checkbox from "../../../shared/components/checkbox/Checkbox";
import CreateDialog from "../../../shared/components/create-dialog/CreateDialog";
import NumberInput from "../../../shared/components/number-input/NumberInput";
import TextInput from "../../../shared/components/text-input/TextInput";
import styles from "../styles/SubjectDialog.module.css";
import BadgeSelect from "./BadgeSelect";

interface SubjectForm {
  subjectName: string;
  isLab: boolean;
  minClassesDay: number;
  maxClassesDay: number;
  minClassesWeek: number;
  maxClassesWeek: number;
  maxConsecutive: number;
}

interface CreateSubjectDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateSubjectDialog = ({ open, onClose }: CreateSubjectDialogProps) => {
  const [form, setForm] = useState<SubjectForm>({
    subjectName: "",
    isLab: false,
    minClassesDay: 0,
    maxClassesDay: 2,
    minClassesWeek: 1,
    maxClassesWeek: 5,
    maxConsecutive: 2,
  });

  const [formError, setFormError] = useState({
    subjectName: false,
    minClassesDay: false,
    maxClassesDay: false,
    minClassesWeek: false,
    maxClassesWeek: false,
    maxConsecutive: false,
  });

  const handleCreateSubject = () => {
    setFormError((prev) => ({
      ...prev,
      subjectName: form.subjectName.trim() === "",
    }));
  };

  const handleChange = (
    field: keyof SubjectForm,
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
      title="Add Subject"
      onClose={onClose}
      onCreate={handleCreateSubject}
    >
      <div className={styles.group}>
        <span className={styles.groupTitle}>BASIC INFO</span>

        <TextInput
          label="Name"
          placeholder="eg: Mathematics"
          defaultValue={form.subjectName}
          hasError={formError.subjectName}
          onChange={(value) => {
            handleChange("subjectName", value);
          }}
        />

        <div className={styles.row}>
          <Checkbox
            label="is Lab"
            defaultValue={form.isLab}
            onChange={(value) => {
              handleChange("isLab", value);
            }}
          />

          <BadgeSelect
            label="Hardness"
            options={["Low", "Med", "High"]}
            defaultValue="Low"
            onSelect={() => {}}
          />
        </div>
      </div>

      <div className={styles.seperator} />

      <div className={styles.group}>
        <span className={styles.groupTitle}>DAILY CONSTRAINTS</span>

        <div className={styles.row}>
          <NumberInput
            label="Min classes/day"
            defaultValue={form.minClassesDay}
            hasError={formError.minClassesDay}
            onChange={(value) => {
              handleChange("minClassesDay", value);
            }}
          />

          <NumberInput
            label="Max classes/day"
            defaultValue={form.maxClassesDay}
            hasError={formError.maxClassesDay}
            onChange={(value) => {
              handleChange("maxClassesDay", value);
            }}
          />
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.groupTitle}>WEEKLY CONSTRAINTS</span>

        <div className={styles.row}>
          <NumberInput
            label="Min classes/week"
            defaultValue={form.minClassesWeek}
            hasError={formError.minClassesWeek}
            onChange={(value) => {
              handleChange("minClassesWeek", value);
            }}
          />

          <NumberInput
            label="Max classes/week"
            defaultValue={form.maxClassesWeek}
            hasError={formError.maxClassesWeek}
            onChange={(value) => {
              handleChange("maxClassesWeek", value);
            }}
          />
        </div>

        <NumberInput
          label="Max consecutive"
          defaultValue={form.maxConsecutive}
          hasError={formError.maxConsecutive}
          onChange={(value) => {
            handleChange("maxConsecutive", value);
          }}
        />
      </div>
    </CreateDialog>
  );
};

export default CreateSubjectDialog;
