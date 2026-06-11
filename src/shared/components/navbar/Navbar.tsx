import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  Link2,
  Settings,
  CircleHelp,
  Calendar,
} from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";
import styles from "./styles/Navbar.module.css";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, active: true },
  { href: "/classes", label: "Classes", icon: BookOpen },
  { href: "/subjects", label: "Subjects", icon: GraduationCap },
  { href: "/teachers", label: "Teachers", icon: Users },
  { href: "/assignments", label: "Assignments", icon: Link2 },
];

const footerItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help & Support", icon: CircleHelp },
];

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.gap} />
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebar}>
          <div className={styles.content}>
            <div className={styles.brand}>
              <div className={styles.logo}>
                <Calendar />
              </div>
              <span className={styles.brandName}>MakeTable</span>
            </div>

            <div className={styles.group}>
              <div className={styles.groupLabel}>Menu</div>
              <ul className={styles.menu}>
                {menuItems.map(({ href, label, icon: Icon, active }) => (
                  <li key={href}>
                    <button
                      className={`${styles.menuButton} ${
                        active ? styles.menuButtonActive : ""
                      }`}
                      onClick={() => navigate(href)}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon className={styles.menuIcon} />
                      <span>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.divider} />

            <div className={styles.group} style={{ marginTop: "auto "}}>
              <ul className={styles.menu}>
                {footerItems.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <button className={styles.menuButton} onClick={() => navigate(href)}>
                      <Icon className={styles.menuIcon} />
                      <span>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;