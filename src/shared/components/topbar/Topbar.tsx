import { PanelLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { Breadcrumb } from "./types/topbar.types";
import styles from "./styles/Topbar.module.css";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export default function Topbar({
  onToggleSidebar,
}: TopbarProps) {

  const userInitial = "ME";
  const breadcrumb: Breadcrumb = {
    label: "Dashboard",
    href: "/",
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <> 
      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={16} />
        </button>

        <nav aria-label="breadcrumb" className={styles.breadcrumb}>
          <ol className={styles.breadcrumbList}>
            <li className={styles.breadcrumbItem} onClick={() => navigate(breadcrumb.href)}>
              <span aria-current="page" className={styles.breadcrumbCurrent}>
                {breadcrumb.label}
              </span>
            </li>
          </ol>
        </nav>

        <div className={styles.spacer} />

        <div className={styles.avatar}>
          <span className={styles.avatarLabel}>{userInitial}</span>
        </div>
      </header>
    </>
  );
}