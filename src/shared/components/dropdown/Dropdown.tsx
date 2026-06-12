import { useEffect, useRef, useState, useCallback } from "react";
import DropdownBody from "./components/DropdownBody";
import styles from "./styles/Dropdown.module.css";
import type { Option } from "./types/dropdown.types";

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  options: Option[];
  style?: React.CSSProperties;
  onSelect: (option: string) => void;
}

const Dropdown = ({
  open,
  onClose,
  options,
  style,
  onSelect,
}: DropdownProps) => {
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();

    const dropdownHeight = dropdownRef.current?.offsetHeight ?? 200;
    const dropdownWidth = dropdownRef.current?.offsetWidth ?? 200;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < dropdownHeight && rect.top > dropdownHeight;

    setDropdownStyle({
      position: "fixed",
      left: rect.left - dropdownWidth,
      width: rect.width,
      zIndex: 9999,
      ...(openUpward
        ? { bottom: window.innerHeight - rect.top, top: "auto" }
        : { top: `calc(${rect.bottom}px + var(--space-5))`, bottom: "auto" }),
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
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <DropdownBody
        open={open}
        ref={dropdownRef}
        options={options}
        style={{
          ...style,
          ...dropdownStyle,
        }}
        onSelect={onSelect}
      />
    </div>
  );
};

export default Dropdown;