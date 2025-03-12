import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img src="/tea-logo2.png" alt="Logo" className={styles.logoImage} />
    </div>
  );
};

export default Logo;