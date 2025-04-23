import styles from "./FarmerCard.module.css";

const FarmerCard = ({ imageSrc, name, description }) => {
  return (
    <div className={styles.card}>
      <img src={imageSrc} alt={name} className={styles.image} />
      <div className={styles.text}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default FarmerCard;