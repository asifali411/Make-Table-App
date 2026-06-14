import Checkbox from "../../../shared/components/checkbox/Checkbox";
import CreateDialog from "../../../shared/components/create-dialog/CreateDialog";
import NumberInput from "../../../shared/components/number-input/NumberInput";
import TextInput from "../../../shared/components/text-input/TextInput";
import styles from "../styles/SubjectDialog.module.css";

interface CreateSubjectDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateSubjectDialog = ({
  open,
  onClose,
}: CreateSubjectDialogProps) => {


  const handleCreateSubject = () => {
    
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
          hasError={false}
          onChange={(_value) => {}}
        />

        <div className={styles.row}>
          <Checkbox label="is Lab" onChange={() => {}} />

          <NumberInput label="Hardness" hasError={false} onChange={() => {}} />
        </div>
      </div>

      <div className={styles.seperator} />

      <div className={styles.group}>
        <span className={styles.groupTitle}>DAILY CONSTRAINTS</span>

        <div className={styles.row}>
          <NumberInput
            label="Min classes/day"
            hasError={false}
            onChange={() => {}}
          />

          <NumberInput
            label="Max classes/day"
            hasError={false}
            onChange={() => {}}
          />
        </div>
      </div>
    </CreateDialog>
  );
};

export default CreateSubjectDialog;