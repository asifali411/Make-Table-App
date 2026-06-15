import styles from "../styles/Auth.module.css";
import AppLogo from "../../../shared/components/appLogo/AppLogo";
const Login = () => {
  return (
    <main className={styles.authPage}>
      <AppLogo />
      <div className={styles.content__left}></div>
      <div className={styles.content__right}></div>
    </main>
  );
};

export default Login;
