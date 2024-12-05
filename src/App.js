import React, { useState, useEffect } from "react";
import './css/app.css';
import WeatherTable from "./components/WeatherTable";
import Summary from "./components/Summary";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Map from "./components/Map";
import { fetchWeatherData, fetchSummary} from "./api/WeatherDataClient.js";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: 50.06, longitude: 19.93 });
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        () => alert("Nie udało się pobrać lokalizacji. Użyję lokalizacji domyślnej.")
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

  useEffect(() => getLocation(), []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleClickLocation = async (lat, lng) => {
    try {
      const weather = await fetchWeatherData(lat, lng);
      const summaryData = await fetchSummary(lat, lng);
      setWeatherData(weather.proccessedData);
      setSummary(summaryData);
      setLocation({ latitude: lat, longitude: lng });  
    } catch (err) {
      console.error("Error fetching data for clicked location", err);
      setError("Wystąpił błąd podczas pobierania danych.");
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pl-PL').replace(/\./g, '/');
  const formatSunshineDuration = (seconds) => `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1>Weather Forecast</h1>

      <div className={`coordinates`}>
        <strong>Current Location: </strong> Latitude: {location.latitude}, Longitude: {location.longitude}
      </div>

      <button className="toggle-dark-mode-button" onClick={toggleDarkMode}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      {error && <Error message={error} />}
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {weatherData && <WeatherTable weatherData={weatherData} formatDate={formatDate} />}
          {location.latitude && location.longitude && <Map latitude={location.latitude} longitude={location.longitude} onClickLocation={handleClickLocation} />}
          {summary && <Summary summary={summary} formatSunshineDuration={formatSunshineDuration}/>}
        </div>
      )}
    </div>
  );
};

export default App;
