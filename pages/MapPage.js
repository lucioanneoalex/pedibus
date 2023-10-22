// pages/MapPage.js
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapPage = () => {
  const [position, setPosition] = useState(null);

  const fetchPosition = async () => {
    try {
      const response = await fetch("/api/glp");
      const data = await response.json();
      setPosition({ lat: data.latitude, lng: data.longitude });
    } catch (error) {
      console.error("Error fetching position:", error);
    }
  };

  useEffect(() => {
    fetchPosition(); // Fetch position initially

    const intervalId = setInterval(fetchPosition, 3000); // Set up interval to fetch position every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div>
      {console.log(position)}
      {position && (
        <LoadScript googleMapsApiKey="AIzaSyDoxo0ARBIGc37GIp28XEvI8V4KN3oIMEI">
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={position}
            zoom={18}
          >
            <Marker position={position} />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default MapPage;
