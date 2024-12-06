import React, { useState} from "react";
import './css/app.css';
import WeatherTable from "./components/WeatherTable";
import Summary from "./components/Summary";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Map from "./components/Map";
import { useWeatherData } from "./hooks/UseWeatherData  ";
import { useGeolocation } from "./hooks/UseGeolocation";

const App = () => {
  const defaultLocation = { latitude: 50.06, longitude: 19.93 };
  const [location, setLocation] = useGeolocation(defaultLocation);
  const {weatherData, summary, isLoading, error} = useWeatherData(location);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleClickLocation = async (lat, lng) => {
    setLocation({ latitude: lat, longitude: lng });
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("pl-PL").replace(/\./g, "/");

  const formatSunshineDuration = (seconds) =>
    `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : ""}`}>
      <h1>Weather Forecast</h1>
      <div className="coordinates">
        <strong>Current Location:</strong> Latitude: {location.latitude}, Longitude: {location.longitude}
      </div>
      <button className="toggle-dark-mode-button" onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      {error && <Error message={error} />}
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {weatherData && <WeatherTable weatherData={weatherData} formatDate={formatDate} />}
          {location.latitude && location.longitude && (
            <Map
              latitude={location.latitude}
              longitude={location.longitude}
              onClickLocation={handleClickLocation}
            />
          )}
          {summary && <Summary summary={summary} formatSunshineDuration={formatSunshineDuration} />}
        </div>
      )}
    </div>
  );
};

export default App;