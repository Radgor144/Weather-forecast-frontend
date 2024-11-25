import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake, faThunderstorm } from '@fortawesome/free-solid-svg-icons';

const fontAwesomeIconMap = {
  0: <FontAwesomeIcon icon={faSun} style={{ color: "#FFD43B" }} />,               // Clear sky
  1: <FontAwesomeIcon icon={faCloudSun} style={{ color: "#FFD43B" }} />,          // Mainly clear
  2: <FontAwesomeIcon icon={faCloud} style={{ color: "#888" }} />,                // Partly cloudy
  3: <FontAwesomeIcon icon={faCloud} style={{ color: "#444" }} />,                // Overcast
  45: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#555" }} />,           // Fog
  48: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#666" }} />,           // Depositing rime fog
  51: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#007BFF" }} />,        // Light drizzle
  53: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#007BFF" }} />,        // Moderate drizzle
  55: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#007BFF" }} />,        // Dense drizzle
  56: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#007BFF" }} />,        // Light freezing drizzle
  57: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#007BFF" }} />,        // Dense freezing drizzle
  61: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#1E90FF" }} />,        // Light rain
  63: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#1E90FF" }} />,        // Moderate rain
  65: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#1E90FF" }} />,        // Heavy rain
  66: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#1E90FF" }} />,        // Light freezing rain
  67: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#1E90FF" }} />,        // Heavy freezing rain
  71: <FontAwesomeIcon icon={faSnowflake} style={{ color: "#A9A9A9" }} />,        // Light snow
  73: <FontAwesomeIcon icon={faSnowflake} style={{ color: "#A9A9A9" }} />,        // Moderate snow
  75: <FontAwesomeIcon icon={faSnowflake} style={{ color: "#A9A9A9" }} />,        // Heavy snow
  77: <FontAwesomeIcon icon={faSnowflake} style={{ color: "#A9A9A9" }} />,        // Snow grains
  80: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#1E90FF" }} />,        // Light rain shower
  81: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#1E90FF" }} />,        // Moderate rain shower
  82: <FontAwesomeIcon icon={faCloudRain} style={{ color: "#1E90FF" }} />,        // Violent rain shower
  85: <FontAwesomeIcon icon={faSnowflake} style={{ color: "#A9A9A9" }} />,        // Light snow shower
  86: <FontAwesomeIcon icon={faSnowflake} style={{ color: "#A9A9A9" }} />,        // Heavy snow shower
  95: <FontAwesomeIcon icon={faThunderstorm} style={{ color: "#ff6347" }} />,     // Thunderstorm
  96: <FontAwesomeIcon icon={faThunderstorm} style={{ color: "#ff6347" }} />,     // Thunderstorm with light hail
  99: <FontAwesomeIcon icon={faThunderstorm} style={{ color: "#ff6347" }} />,     // Thunderstorm with heavy hail
};

export { fontAwesomeIconMap };
