import { createPortal } from "react-dom";
import styles from "../styles/DropdownBody.module.css";
import { Option } from "../types/searchableDropdown.type";
import { useState } from "react";
import { Search } from "lucide-react";

interface DropdownBodyProps {
  open: boolean;
  options: Option[];
  placeholder?: string;
  style?: React.CSSProperties;
  ref: any;

  onSelect: (option: string) => void;
}

const DropdownBody = ({
  open,
  options,
  placeholder = "",
  style = {},
  ref,

  onSelect,
}: DropdownBodyProps) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(
    options.find((opt) => opt.isSelected)?.label ?? "",
  );

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleSelect = (label: string) => {
    setSelected(label);
    onSelect(label);
  };

  if (!open) return null;

  return createPortal(
    <div
      className={styles.dropdown}
      style={style}
      ref={ref}
    >
      <div className={styles.searchBox}>
        <Search />
        <input
          className={styles.input}
          placeholder={placeholder}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
        />
      </div>
      <ol>
        {options.map((opt) => (
          <li key={opt.label}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(opt.label)}
              className={`${selected === opt.label ? styles.selected : ""}`}
            >
              {selected === opt.label ? <opt.icon /> : ""}
              {opt.label}
            </button>
          </li>
        ))}
      </ol>
    </div>,
    document.body,
  );
};

export default DropdownBody;
