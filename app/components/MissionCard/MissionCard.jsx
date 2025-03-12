import styles from './MissionCard.module.css';

const MissionCard = ({ title, text, imageSrc, imageAlt }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default MissionCard;