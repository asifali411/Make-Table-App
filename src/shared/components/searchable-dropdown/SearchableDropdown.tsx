import { useCallback, useEffect, useRef, useState } from "react";
import DropdownBody from "./components/DropdownBody";
import { Option } from "./types/searchableDropdown.type";
import styles from "./styles/SearchableDropdown.module.css";
import { ChevronDown } from "lucide-react";

interface SearchableDropdownProps {
  options: Option[];
  style?: React.CSSProperties;
  label: string,
  emptyPlaceholder?: string;
  searchPlaceholder?: string;

  onSelect: (option: string) => void;
}

const SearchableDropdown = ({
  options,
  style,
  label = "",
  emptyPlaceholder = "Select an option",
  searchPlaceholder = "",

  onSelect,
}: SearchableDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(
    options.find((opt) => opt.isSelected)?.label ?? emptyPlaceholder
  );

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();

    const dropdownHeight = dropdownRef.current?.offsetHeight ?? 200;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < dropdownHeight && rect.top > dropdownHeight;

    setDropdownStyle({
      position: "fixed",
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      ...(openUpward
        ? { bottom: window.innerHeight - rect.top, top: "auto" }
        : { top: rect.bottom, bottom: "auto" }),
    });
  }, []);

  useEffect(() => {
    updatePosition();
    if (!open) return;

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, options, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  return (
    <div ref={wrapperRef}>
      <div 
        className={styles.container}
        onClick={() => setOpen((prev) => !prev)}
      >
        <label>{label}</label>
        <div className={styles.selecter}>
          <span>
            {selected}
          </span>
          <ChevronDown />
        </div>
      </div>

      <DropdownBody
        open={open}
        ref={dropdownRef}
        options={options}
        placeholder={searchPlaceholder}
        style={{
          ...style,
          ...dropdownStyle,
        }}
        onSelect={(option: string) => {
          setOpen(false);
          onSelect(option);
          setSelected(option);
        }}
      />
    </div>
  );
};

export default SearchableDropdown;
