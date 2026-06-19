import { useState } from "react";
import Checkbox from "../../../shared/components/checkbox/Checkbox";
import CreateDialog from "../../../shared/components/create-dialog/CreateDialog";
import SearchableDropdown from "../../../shared/components/searchable-dropdown/SearchableDropdown";
import styles from "../styles/Dialog.module.css";

interface AssignmentForm {
  teacherName: string | undefined;
  className: string | undefined;
  subjectName: string | undefined;
  role: string | undefined;
  days: string[] | undefined;
}

interface CreateAssignmentDialogProps {
  open: boolean;
  onClose: () => void;
}

const TEACHERS: string[] = [
  "Dr. Smith",
  "Dr. Jones",
  "Prof. Kumar",
  "Ms. Davis",
];

const CLASSES: string[] = [
  "CSE A",
  "CSE B",
  "CSE LAB",
];

const SUBJECTS: string[] = [
  "Mathematics",
  "Physics",
  "English",
];

const ROLES: string[] = [
  "Class Teacher",
  "Subject Teacher",
];

const DAYS: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const INITIAL_FORM: AssignmentForm = {
  teacherName: undefined,
  className: undefined,
  subjectName: undefined,
  role: undefined,
  days: undefined,
};

const CreateAssignmentDialog = ({
  open,
  onClose,
}: CreateAssignmentDialogProps) => {
  const [form, setForm] = useState<AssignmentForm>(INITIAL_FORM);

  const resetForm = () => {
    setForm(INITIAL_FORM);
  };

  const validate = () => {
    // TODO: validate form
    console.log(form);
    
    return true;
  };

  const handleCreateAssignment = () => {
    if (!validate()) return;

    // TODO: handle assignment creation

    resetForm();
    document.getElementById("root")?.removeAttribute("inert");
    onClose();
  };

  const handleChange = (
    field: keyof AssignmentForm,
    value: string | string[],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <CreateDialog
      open={open}
      title="Add Assignment"
      onClose={onClose}
      onCreate={handleCreateAssignment}
    >
      <SearchableDropdown
        options={TEACHERS}
        label="Teacher"
        emptyPlaceholder="Select a Teacher"
        searchPlaceholder="search..."
        onSelect={(value) => {
          handleChange("teacherName", value);
        }}
      />

      <SearchableDropdown
        options={CLASSES}
        label="Class"
        emptyPlaceholder="Select a Class"
        searchPlaceholder="search..."
        onSelect={(value) => {
          handleChange("className", value);
        }}
      />

      <SearchableDropdown
        options={SUBJECTS}
        label="Subject"
        emptyPlaceholder="Select a Subject"
        searchPlaceholder="search..."
        onSelect={(value) => {
          handleChange("subjectName", value);
        }}
      />

      <SearchableDropdown
        options={ROLES}
        label="Role"
        emptyPlaceholder="Select a Role"
        searchPlaceholder="search..."
        onSelect={(value) => {
          handleChange("role", value);
        }}
      />

      {form.role?.startsWith("Class") && (
        <>
          <label className={styles.label}>Moring Class Days</label>
          <div className={styles.row}>
            {DAYS.map((day) => (
              <Checkbox
                key={day}
                label={day}
                onChange={(value) => {
                  if (value) {
                    setForm((prev) => {
                      const newDays = prev.days ?? [];
                      newDays?.push(day);
                      return {
                        ...prev,
                        days: Array.from(new Set(newDays)),
                      };
                    });
                  } else {
                    setForm((prev) => {
                      const newDays = prev.days ?? [];
                      newDays?.slice(newDays.indexOf(day), 1);
                      return {
                        ...prev,
                        days: Array.from(new Set(newDays)),
                      };
                    });
                  }
                }}
              />
            ))}
          </div>
        </>
      )}
    </CreateDialog>
  );
};

export default CreateAssignmentDialog;
