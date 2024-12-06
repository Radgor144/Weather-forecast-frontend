import { useState, useEffect } from "react";
import { fetchWeatherData, fetchSummary } from "../api/WeatherDataClient.js";

export const useWeatherData = (location) => {
  const [weatherData, setWeatherData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const weather = await fetchWeatherData(location.latitude, location.longitude);
        const summaryData = await fetchSummary(location.latitude, location.longitude);
        setWeatherData(weather.proccessedData);
        setSummary(summaryData);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("The error occurred while fetching the data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (location.latitude && location.longitude) {
      fetchData();
    }
  }, [location]);

  return { weatherData, summary, isLoading, error};
};
