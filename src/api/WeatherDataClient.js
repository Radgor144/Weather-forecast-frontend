
const API_URL = 'http://localhost:8080';

export const fetchWeatherData = async (latitude, longitude) => {
  const response = await fetch(`${API_URL}/forecast?latitude=${latitude}&longitude=${longitude}`); //
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return response.json();
};

export const fetchSummary = async (latitude, longitude) => {
  const response = await fetch(`${API_URL}/summary?latitude=${latitude}&longitude=${longitude}`);
  if (!response.ok) throw new Error("Failed to fetch summary data");
  return response.json();
};
