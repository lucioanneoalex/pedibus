// components/LeafletMap.js
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

// Define icon settings
const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [50, 33], // size of the icon
  shadowSize: [41, 41], // size of the shadow
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  shadowAnchor: [14, 41], // the same for the shadow
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

const LeafletMap = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={18}
      style={{ height: "600px", width: "100%" }}
      id="map"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={icon}></Marker>
    </MapContainer>
  );
};

export default LeafletMap;
