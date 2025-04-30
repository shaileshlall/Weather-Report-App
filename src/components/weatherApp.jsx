import React, { useState } from "react";
import "./weather.style.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(true);

  const apiKey = "ecc5e7c6ef6ce46fc01ac34336544266";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(false);
    } catch (err) {
      setError(true);
      setWeatherData(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeather}>
          <img src="/img/search.png" alt="search" width="10px" />
        </button>
      </div>

      {error && (
        <div className="error">
          <p>Invalid city name.</p>
        </div>
      )}

      {weatherData && (
        <div className="weather">
          <img
            src={`/img/${weatherData.weather[0].main.toLowerCase()}.png`}
            className="weather-icon"
            alt="weather"
          />
          <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
          <h2 className="city">{weatherData.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/img/humidity.png" alt="humidity" />
              <div>
                <p className="humidity">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/img/wind.png" alt="wind" />
              <div>
                <p className="wind">{weatherData.wind.speed} km/h</p>
                <p>Wind speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
