import React from "react";
import { fontAwesomeIconMap } from "./weatherIconMap";

const WeatherIcon = ({ weatherCode }) => {
  if (fontAwesomeIconMap[weatherCode]) {
    return fontAwesomeIconMap[weatherCode];
  }
   
  return <div>No icon available</div>;
};

export default WeatherIcon;
