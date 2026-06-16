import styles from "../styles/Auth.module.css";
import AppLogo from "../../../shared/components/app-logo/AppLogo";
import AuthHero from "../components/authHero/AuthHero";
import AuthForm from "../components/authForm/AuthForm";
import Blobs from "../components/blobs/Blobs";
const Login = () => {
  return (
    <main className={styles.authPage}>
      <Blobs />
      <aside className={styles.content__left}>
        <div className={styles.brand}>
          <AppLogo />
          <span className={styles.brandName}>MakeTable</span>
        </div>

        <AuthHero />
        <p className={styles.panelFooter}>
          © {new Date().getFullYear()} MakeTable · Open source
        </p>
      </aside>
      <div className={styles.content__right}>
        <AuthForm authType="login" />
      </div>
    </main>
  );
};

export default Login;
