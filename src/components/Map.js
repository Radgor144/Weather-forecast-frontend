import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/map.css';

const Map = ({ latitude, longitude, onClickLocation }) => {
  if (!latitude || !longitude) {
    return <div>Loading map...</div>;
  }

  const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41], 
  });

  const ClickMapEvent = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onClickLocation(lat, lng);
      },
    });
    return null;
  };

  return (
    <div className="map">
      <MapContainer className="map-container" center={[latitude, longitude]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]} icon={defaultIcon}>
          <Popup>Your position</Popup>
        </Marker>
        <ClickMapEvent/>
      </MapContainer>
    </div>
  );
};

export default Map;
