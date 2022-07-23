import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

import styles from "./ForecastWeather.module.css";

const ForecastWeather = ({ data }) => {
  const Week_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const dayInAWeek = new Date().getDate();

  const forecastDays = Week_DAYS.slice(Week_DAYS.indexOf(dayInAWeek) - 1, Week_DAYS.length).concat(
    Week_DAYS.slice(0, Week_DAYS.indexOf(dayInAWeek) - 1)
  );

  return (
    <div>
      <p className={styles["title"]}>Daily</p>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, index) => {
          return (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className={styles["daily-item"]}>
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      alt="daily weather"
                      className={styles["item-small"]}
                    />
                    <label className={styles["day"]}>{forecastDays[index]}</label>
                    <label className={styles["description"]}>{item.weather[0].description}</label>
                    <label className={styles["min-max"]}>
                      {Math.round(item.main.temp_min)} °C/ {Math.round(item.main.temp_max)} °C{" "}
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className={styles["daily-details-grid"]}>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Pressure</label>
                    <label>{item.main.pressure} hPA</label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Cloud cover</label>
                    <label>{item.clouds.all} clouds </label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Wind speed</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Sea level</label>
                    <label>{item.main.sea_level} m </label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Feels like</label>
                    <label>{Math.round(item.main.feels_like)} °C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ForecastWeather;
