import axios from "axios";
import { useState } from "react";
import "./App.css";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import ForecastWeather from "./components/forecastWeather/ForecastWeather";
import Search from "./components/search/Search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcastWeather, setForcastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);

    const [lat, lon] = searchData.value.split(" ");

    const currentWeather = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );

    const forcastWeather = axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );

    Promise.all([currentWeather, forcastWeather])
      .then(async (response) => {
        const weatherResponse = await response[0]?.data;
        const forcastResponse = await response[1]?.data;

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForcastWeather({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(currentWeather);
  console.log(forcastWeather);

  return (
    <div className="container">
      {}
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather != null ? (
        <>
          {" "}
          <CurrentWeather
            city={currentWeather.city}
            description={currentWeather.weather[0].description}
            icon={currentWeather.weather[0].icon}
            temp={currentWeather.main.temp}
            wind={currentWeather.wind.speed}
            feels_like={currentWeather.main.feels_like}
            pressure={currentWeather.main.pressure}
            humidity={currentWeather.main.humidity}
          />
        </>
      ) : (
        <>
          <h1 className="message">Please enter a city</h1>
        </>
      )}
      {forcastWeather ? <ForecastWeather/> : <></>}
    </div>
  );
}

export default App;
