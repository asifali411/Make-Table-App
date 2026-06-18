import { useState } from "react";
import CreateDialog from "../../../../shared/components/create-dialog/CreateDialog";
import TextInput from "../../../../shared/components/text-input/TextInput";
import DaySelector from "../../../../shared/components/day-selector/DaySelector";
import { Day } from "../../../../shared/types/days.types";
//constants
const INITIAL_FORM = {
  name: "",
  slots: 6,
} as const;
const INITIAL_ERROR_STATES = {
  name: false,
  slots: false,
};

//types
interface TimetableForm {
  name: string;
  slots: number;
}

type SelectedDays = Day[];

type CreateTimetableDialogProps = {
  isVisible: boolean;
  onClose: () => void;
};
//todo: validation
//todo: include number type for input field for slots. strings are real messy
const CreateTimetableDialog = ({
  isVisible,
  onClose,
}: CreateTimetableDialogProps) => {
  const [form, setForm] = useState<TimetableForm>(INITIAL_FORM);
  const [errorStates, setErrorStates] = useState(INITIAL_ERROR_STATES);
  const [selectedDays, setSelectedDays] = useState<SelectedDays>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrorStates(INITIAL_ERROR_STATES);
  };

  const validate = () => {
    const slotsNumber = Number(form.slots);

    const errors: typeof INITIAL_ERROR_STATES = {
      name: form.name.trim() === "",

      slots:
        Number.isNaN(slotsNumber) ||
        !Number.isInteger(slotsNumber) ||
        slotsNumber <= 0,
    };

    setErrorStates(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleCreate = () => {
    if (!validate()) return;

    resetForm();
    document.getElementById("root")?.removeAttribute("inert");
    onClose();
  };
  //handles change
  const handleChange = <K extends keyof TimetableForm>(
    field: K,
    value: TimetableForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <CreateDialog
      open={isVisible}
      title="Create timetable"
      onClose={() => {
        resetForm();
        onClose();
      }}
      onCreate={handleCreate}
    >
      <TextInput
        label="Timetable Name"
        placeholder="eg: Timetable-2026"
        defaultValue={form?.name}
        hasError={errorStates?.name}
        onChange={(value) => {
          handleChange("name", value);
        }}
      />

      <TextInput
        label="Slots"
        placeholder="eg: 9"
        defaultValue={form?.slots.toString()}
        hasError={errorStates?.slots}
        onChange={(value) => {
          const num = Number(value);
          console.log(Number.isNaN(num));
          handleChange("slots", Number.isNaN(num) ? 0 : num);
        }}
      />

      <DaySelector
        label="Select Days"
        selectedDays={selectedDays}
        toggleDay={(day: Day) => {
          setSelectedDays((prev) => {
            if (prev.includes(day)) {
              return prev.filter((d) => d !== day);
            } else {
              return [...prev, day];
            }
          });
        }}
      />
    </CreateDialog>
  );
};

export default CreateTimetableDialog;
