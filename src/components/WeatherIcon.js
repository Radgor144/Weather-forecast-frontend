import React from "react";
import { fontAwesomeIconMap } from "./WeatherIconMap1";

const WeatherIcon = ({ weatherCode }) => {
  if (fontAwesomeIconMap[weatherCode]) {
    return fontAwesomeIconMap[weatherCode];
  }
   
  return <div>No icon available</div>;
};

export default WeatherIcon;
