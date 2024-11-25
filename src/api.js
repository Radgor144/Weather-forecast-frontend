import axios from 'axios';

const API_URL = 'http://localhost:8080';


export const fetchWeatherData = async (latitude, longitude) => {
  const response = await axios.get(`${API_URL}/forecast`, {
    params: { latitude, longitude },
  });
  return response.data;
};

export const fetchSummary = async (latitude, longitude) => {
  const response = await axios.get(`${API_URL}/summary`, {
    params: { latitude, longitude },
  });
  return response.data;
};
