import React from "react";

const Summary = ({ summary, formatSunshineDuration}) => (
  <div className={`summary-footer`}>
    <h3>Weekly Summary</h3>
    <p>Max Temp: {summary.temperature_2m_max} °C</p>
    <p>Min Temp: {summary.temperature_2m_min} °C</p>
    <p>Avg Pressure: {summary.avgPressure} hPa</p>
    <p>Avg Sunshine Duration: {formatSunshineDuration(summary.sunshine_duration)}</p>
    <p>Precipitation Summary: {summary.precipitationSummary}</p>
  </div>
);

export default Summary;
