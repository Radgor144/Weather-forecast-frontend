import React, { useState, useEffect } from "react";
import './App.css';

// Funkcja do pobierania danych pogodowych
const fetchWeatherData = async (latitude, longitude) => {
  console.log(latitude);
  console.log(longitude);
  const response = await fetch(`https://weatherforecastapi-1zmq.onrender.com/forecast?latitude=${latitude}&longitude=${longitude}`); // http://localhost:8080/
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

// Funkcja do pobierania podsumowania
const fetchSummary = async (latitude, longitude) => {
  const response = await fetch(`https://weatherforecastapi-1zmq.onrender.com/summary?latitude=${latitude}&longitude=${longitude}`); // http://localhost:8080/
  if (!response.ok) {
    throw new Error("Failed to fetch summary data");
  }
  return response.json();
};

// Mapowanie kodów pogodowych na ikony
const weatherIconMap = {
  0: "☀️", // Clear sky
  1: "🌤", // Mainly clear
  2: "⛅", // Partly cloudy
  3: "☁️", // Overcast
  45: "🌫", // Fog
  48: "🌫", // Rime fog
  51: "🌧", // Light drizzle
  53: "🌧", // Moderate drizzle
  55: "🌧", // Dense drizzle
  56: "🌧", // Freezing drizzle
  57: "🌧", // Dense freezing drizzle
  61: "🌦", // Light rain
  63: "🌦", // Moderate rain
  65: "🌧", // Heavy rain
  66: "🌧", // Light freezing rain
  67: "🌧", // Heavy freezing rain
  71: "❄️", // Light snow
  73: "❄️", // Moderate snow
  75: "❄️", // Heavy snow
  77: "❄️", // Snow grains
  80: "🌧", // Slight rain showers
  81: "🌧", // Moderate rain showers
  82: "🌧", // Violent rain showers
  85: "❄️", // Slight snow showers
  86: "❄️", // Heavy snow showers
  95: "⛈", // Thunderstorm
  96: "⛈", // Thunderstorm with slight hail
  99: "⛈", // Thunderstorm with heavy hail
};

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({
    latitude: 50.06,
    longitude: 19.93,
  });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location", error);
          alert("Nie udało się pobrać lokalizacji. Użyję lokalizacji domyślnej.");
        }
      );
    } else {
      alert("Geolokalizacja nie jest obsługiwana w tej przeglądarce.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (location.latitude && location.longitude) {
        setIsLoading(true);
        setError(null);
        try {
          const weather = await fetchWeatherData(location.latitude, location.longitude);
          const summaryData = await fetchSummary(location.latitude, location.longitude);
          setWeatherData(weather.proccessedData);
          setSummary(summaryData);
        } catch (err) {
          console.error("Error fetching data", err);
          setError("Wystąpił błąd podczas pobierania danych.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    getLocation();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL').replace(/\./g, '/');
  };

  // Funkcja formatująca średni czas nasłonecznienia na format "Xh Ym"
  const formatSunshineDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Obliczamy godziny
    const minutes = Math.floor((seconds % 3600) / 60); // Obliczamy minuty
    return `${hours}h ${minutes}m`;
  };

  // Jeśli dane o czasie nasłonecznienia są dostępne, formatujemy je
  const formattedSunshine = summary ? formatSunshineDuration(summary.sunshine_duration) : "N/A";

  return (
    <div className="app-container">
      <h1>Weather Forecast</h1>

      {error && <p className="error-message">{error}</p>}

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          {weatherData && (
            <div>
              <h3>Weather Forecast</h3>
              <table className="weather-table">
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
                      <td>{weatherIconMap[weatherData.weather_code[index]] || "❓"}</td>
                      <td>{weatherData.temperature_2m_max[index]}</td>
                      <td>{weatherData.temperature_2m_min[index]}</td>
                      <td>{weatherData.generatedEnergy_kWh[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

{summary && (
  <div className="summary-footer">
    <h3>Weekly Summary</h3>
    <p>Max Temp: {summary.temperature_2m_max} °C</p>
    <p>Min Temp: {summary.temperature_2m_min} °C</p>
    <p>Avg Pressure: {summary.avgPressure} hPa</p>
    <p>Avg Sunshine Duration: {formatSunshineDuration(summary.sunshine_duration)}</p> {/* Sformatowana wartość */}
    <p>Precipitation Summary: {summary.precipitationSummary}</p>
  </div>
)}


        </div>
      )}
    </div>
  );
};

export default App;
