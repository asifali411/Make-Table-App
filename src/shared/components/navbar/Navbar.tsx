import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  Link2,
  Settings,
  CircleHelp,
  Calendar,
  type LucideProps,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import styles from "./styles/Navbar.module.css";
import AppLogo from "../app-logo/AppLogo";

// --- Types ------------------------------------------------------------------------

type HrefType = `/${string}`;

interface MenuItem {
  href: HrefType;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  active?: boolean;
}

// ------------------------------------------------------------------------

const menuItems: MenuItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  { href: "/classes", label: "Classes", icon: BookOpen },
  { href: "/subjects", label: "Subjects", icon: GraduationCap },
  { href: "/teachers", label: "Teachers", icon: Users },
  { href: "/assignments", label: "Assignments", icon: Link2 },
];

const footerItems: MenuItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help & Support", icon: CircleHelp },
];

// -------------------------------------------------------------------------

const Navbar = () => {
  const navigate = useNavigate();
  const [acitveLink, setActiveLink] = useState<HrefType>("/dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = (href: HrefType) => {
    setActiveLink(href);
    navigate(href);
  };

  return (
    <div className={styles.app}>
      <section
        className={`${styles.sidebarWrapper} ${collapsed ? styles.collapsed : ""}`}
      >
        <div className={styles.sidebar}>
          <div className={styles.content}>
            <div className={styles.brand}>
              <AppLogo />
              <span className={styles.brandName}>MakeTable</span>
            </div>
            <div className={styles.group}>
              <div className={styles.groupLabel}>Menu</div>
              <ul className={styles.menu}>
                {menuItems.map(({ href, label, icon: Icon, active }) => (
                  <li key={href}>
                    <button
                      className={`${styles.menuButton} ${
                        acitveLink === href ? styles.menuButtonActive : ""
                      }`}
                      onClick={() => handleNavigation(href)}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? label : undefined}
                    >
                      <Icon className={styles.menuIcon} />
                      <span className={styles.menuLabel}>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.divider} />
            <div className={styles.group} style={{ marginTop: "auto" }}>
              <ul className={styles.menu}>
                {footerItems.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <button
                      className={`${styles.menuButton} ${acitveLink === href ? styles.menuButtonActive : ""}`}
                      onClick={() => handleNavigation(href)}
                      title={collapsed ? label : undefined}
                    >
                      <Icon className={styles.menuIcon} />
                      {!collapsed && <span>{label}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.right}>
        <Topbar onToggleSidebar={() => setCollapsed((prev) => !prev)} />
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default Navbar;
