import styles from "./AuthHero.module.css";
const AuthHero = () => {
  return (
    <div className={styles.heroPanel}>
      <h1 className={styles.heroTitle}>
        Welcome back to <span className={styles.textGradient}>MakeTable.</span>
      </h1>
      <p className={styles.heroText}>
        Log in to continue managing your timetables, classes and assignments.
      </p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>1.2s</div>
          <div className={styles.statLabel}>Avg generate</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>0%</div>
          <div className={styles.statLabel}>Conflicts</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>Free</div>
          <div className={styles.statLabel}>Forever</div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
