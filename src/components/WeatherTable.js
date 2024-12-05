import React from "react";
import WeatherIcon from "./WeatherIcon";
import '../css/table.css';

const WeatherTable = ({ weatherData, formatDate}) => {

  return (
    <div>
      <h3 className={`table-name`}>
        Weather Forecast
      </h3>
      <table className={`weather-table`}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Generated Energy (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.time.map((date, index) => (
            <tr key={index}>
              <td>{formatDate(date)}</td>
              <td>
                <WeatherIcon weatherCode={weatherData.weather_code[index]} />
              </td>
              <td>{weatherData.temperature_2m_max[index]}</td>
              <td>{weatherData.temperature_2m_min[index]}</td>
              <td>{weatherData.generatedEnergy_kWh[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
