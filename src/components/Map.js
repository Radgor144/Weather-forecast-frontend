import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ latitude, longitude, onClickLocation }) => {
  if (!latitude || !longitude) {
    return <div>Loading map...</div>;
  }

  // Możesz dostosować wygląd markerów, żeby nie były rozmyte
  const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41], // Rozmiar markera
    iconAnchor: [12, 41], // Punkt zakotwiczenia markera
    popupAnchor: [1, -34], // Punkt wyświetlania popupu
    shadowSize: [41, 41], // Rozmiar cienia
  });

  // Funkcja do obsługi kliknięcia na mapie
  const ClickMapEvent = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        // Wywołanie funkcji przekazanej jako prop, aby przesłać dane do API
        onClickLocation(lat, lng);
      },
    });
    return null;
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]} icon={defaultIcon}>
          <Popup>Twoja lokalizacja</Popup>
        </Marker>
        {/* Dodanie eventu kliknięcia na mapie */}
        <ClickMapEvent />
      </MapContainer>
    </div>
  );
};

export default Map;
