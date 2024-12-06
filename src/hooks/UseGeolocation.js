import { useState, useEffect } from "react";

export const UseGeolocation = (defaultLocation) => {
  const [location, setLocation] = useState(defaultLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        () => alert("Failed to retrieve the location. Using the default location.")
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  }, []);

  return [location, setLocation];
};
