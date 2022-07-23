import styles from "./CurrentWeather.module.css";
const CurrentWeather = ({
  city,
  temp,
  feels_like,
  pressure,
  humidity,
  description,
  wind,
  icon
}) => {
  return (
    <div className={styles["weather"]}>
      <div className={styles["top"]}>
        <div>
          <p className={styles["city"]}>{city}</p>
          <p className={styles["weather-description"]}>{description}</p>
        </div>

        <img src={`icons/${icon}.png`} alt="weather" className={styles["weather-icon"]} />
      </div>
      <div className={styles["bottom"]}>
        <p className={styles["temperature"]}>{Math.round(temp)}°C</p>
        <div className={styles["details"]}>
          <div className={styles["parameter-row"]}>
            <span className={`${styles["parameter-label"]} ${styles["top"]}`}>Details</span>
          </div>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Feels like</span>
            <span className={styles["parameter-value"]}>{feels_like}°C</span>
          </div>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Wind</span>
            <span className={styles["parameter-value"]}>{wind} m/s</span>
          </div>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Humidity</span>
            <span className={styles["parameter-value"]}>{humidity}%</span>
          </div>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Pressure</span>
            <span className={styles["parameter-value"]}>{pressure} hPA</span>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CurrentWeather;
