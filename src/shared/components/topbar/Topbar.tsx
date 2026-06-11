import { PanelLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

import { Breadcrumb } from "./types/topbar.types";
import styles from "./styles/Topbar.module.css";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  // TODO: Replace with actual user initials.
  const userInitial = "ME";

  const location = useLocation();

  const breadcrumbs = useMemo(
    () => convertToBreadcrumbs(location.pathname),
    [location.pathname],
  );

  return (
    <header className={styles.topbar}>
      <button
        type="button"
        className={styles.iconButton}
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <PanelLeft size={16} />
      </button>

      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol className={styles.breadcrumbList}>
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={breadcrumb.href} className={styles.breadcrumbItem}>
                {isLast ? (
                  <span
                    aria-current="page"
                    className={styles.breadcrumbCurrent}
                  >
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link to={breadcrumb.href} className={styles.breadcrumbLink}>
                    {breadcrumb.label}
                  </Link>
                )}

                {!isLast && <ChevronRight size={16} />}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className={styles.spacer} />

      <div className={styles.avatar}>
        <span className={styles.avatarLabel}>{userInitial}</span>
      </div>
    </header>
  );
};

export default Topbar;

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatLabel(segment: string): string {
  const specialLabels: Record<string, string> = {
    "help": "Help And Support",
  };

  if (specialLabels[segment]) {
    return specialLabels[segment];
  }

  return segment.split("-").map(capitalize).join(" ");
}

function convertToBreadcrumbs(pathname: string): Breadcrumb[] {
  const segments = pathname.split("/");

  const breadcrumbs: Breadcrumb[] = [];

  segments.forEach((segment, index) => {
    breadcrumbs.push({
      label: formatLabel(segment),
      href: `/${segments.slice(0, index + 1).join("/")}`,
    });
  });

  return breadcrumbs;
}