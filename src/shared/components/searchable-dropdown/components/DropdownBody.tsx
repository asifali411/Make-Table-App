import { createPortal } from "react-dom";
import styles from "../styles/DropdownBody.module.css";
import { Option } from "../types/searchableDropdown.type";
import { useEffect, useRef, useState } from "react";
import { Search, CheckIcon } from "lucide-react";
import { similarity } from "../../../utils/searchAlgorithm";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(
    options.find((opt) => opt.isSelected)?.label ?? "",
  );
  const [items, setItems] = useState<Option[]>(options);

  const handleSearch = (query: string) => {
    setSearch(query);
    if (query.trim() == "") {
      setItems(options);
      return;
    }

    setItems(
      options.filter(
        (opt) => similarity(opt.label.toLowerCase(), query.toLowerCase()) > 0.2,
      ),
    );
  };

  const handleSelect = (label: string) => {
    setSelected(label);
    onSelect(label);
  };

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

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
          ref={inputRef}
        />
      </div>
      <ol>
        {items.map((opt) => (
          <li key={opt.label}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(opt.label)}
              className={`${selected === opt.label ? styles.selected : ""}`}
            >
              {selected === opt.label ? <CheckIcon /> : ""}
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
