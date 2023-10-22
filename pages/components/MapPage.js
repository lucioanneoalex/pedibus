// pages/MapPage.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const MapPage = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    fetch("/api/glp")
      .then((response) => response.json())
      .then((data) => setPosition([data.latitude, data.longitude]));
  }, []);

  return (
    <div>
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}></Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapPage;
