import { List, LayoutGrid, Download, Plus } from "lucide-react";
import type { ViewMode } from "../../types/global.types";
import styles from "./styles/PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  onImport?: () => void;
  onAdd?: () => void;
  addLabel?: string;
  importLabel?: string;
}

export default function PageHeader({
  title,
  subtitle,
  viewMode = "list",
  onViewModeChange,
  onImport,
  onAdd,
  addLabel = "Add",
  importLabel = "Import",
}: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.actions}>
        <div className={styles.viewToggle} role="group">
          <button
            type="button"
            role="radio"
            aria-checked={viewMode === "list"}
            aria-label="List view"
            data-state={viewMode === "list" ? "on" : "off"}
            className={styles.toggleButton}
            onClick={() => onViewModeChange?.("list")}
          >
            <List size={16} strokeWidth={2} />
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={viewMode === "grid"}
            aria-label="Grid view"
            data-state={viewMode === "grid" ? "on" : "off"}
            className={styles.toggleButton}
            onClick={() => onViewModeChange?.("grid")}
          >
            <LayoutGrid size={16} strokeWidth={2} />
          </button>
        </div>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onImport}
        >
          <Download size={16} strokeWidth={2} />
          {importLabel}
        </button>

        <button type="button" className={styles.primaryButton} onClick={onAdd}>
          <Plus size={16} strokeWidth={2} />
          {addLabel}
        </button>
      </div>
    </div>
  );
}
