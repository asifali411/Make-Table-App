import styles from "./SummaryGrid.module.css";
import { Table2, CircleCheck, Pencil } from "lucide-react";

interface SummaryDataType {
  total?: number;
  published?: number;
  drafts?: number;
}

interface Props {
  data?: SummaryDataType;
}

const SummaryGrid = ({ data }: Props) => {
  const iconSize = 20;
  const iconStrokeWidth = 2;

  const items = [
    {
      label: "Total Timetables",
      value: data?.total ?? "—",
      Icon: Table2,
      iconClass: styles.detailsGrid__icon,
    },
    {
      label: "Published",
      value: data?.published ?? "—",
      Icon: CircleCheck,
      iconClass: `${styles.detailsGrid__icon} ${styles.publishedTb}`,
    },
    {
      label: "Drafts",
      value: data?.drafts ?? "—",
      Icon: Pencil,
      iconClass: `${styles.detailsGrid__icon} ${styles.draftTb}`,
    },
  ];

  return (
    <div className={`${styles.detailsGrid} stagger-children`}>
      {items.map((item) => {
        const Icon = item.Icon;

        return (
          <div key={item.label} className={styles.gridItem}>
            <div className={item.iconClass}>
              <Icon size={iconSize} strokeWidth={iconStrokeWidth} />
            </div>

            <div className={styles.detailsGrid__info}>
              <p>{item.label}</p>
              <h4>{item.value}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryGrid;
