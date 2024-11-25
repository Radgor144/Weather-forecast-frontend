import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";

const WeatherTable = ({ weatherData, formatDate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sprawdzanie trybu ciemnego przy ładowaniu komponentu
  useEffect(() => {
    setIsDarkMode(document.body.classList.contains("dark"));
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: isDarkMode ? "#2C2C2C" : "#FFFFFF", // tło tabeli
    color: isDarkMode ? "#FFFFFF" : "#000000", // tekst tabeli
  };

  const thStyle = {
    padding: "8px",
    border: `1px solid ${isDarkMode ? "#555" : "#ddd"}`,
    backgroundColor: isDarkMode ? "#2980b9" : "#3498db", // Niebieskie tło dla nagłówka
    color: "#fff", // Biały kolor tekstu nagłówka
    textAlign: "center", // Wyśrodkowanie tekstu w nagłówkach
  };

  const tdStyle = {
    padding: "8px",
    border: `1px solid ${isDarkMode ? "#555" : "#ddd"}`,
    textAlign: "center", // Wyśrodkowanie tekstu w komórkach
  };

  return (
    <div>
      <h3 style={{ color: isDarkMode ? "#FFFFFF" : "#000000", textAlign: 'center' }}>
        Weather Forecast
      </h3>
      <table className="weather-table" style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Weather</th>
            <th style={thStyle}>Max Temp (°C)</th>
            <th style={thStyle}>Min Temp (°C)</th>
            <th style={thStyle}>Generated Energy (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.time.map((date, index) => (
            <tr key={index}>
              <td style={tdStyle}>{formatDate(date)}</td>
              <td style={tdStyle}>
                <WeatherIcon weatherCode={weatherData.weather_code[index]} />
              </td>
              <td style={tdStyle}>{weatherData.temperature_2m_max[index]}</td>
              <td style={tdStyle}>{weatherData.temperature_2m_min[index]}</td>
              <td style={tdStyle}>{weatherData.generatedEnergy_kWh[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
