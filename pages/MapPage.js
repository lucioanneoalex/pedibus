// pages/MapPage.js
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicLeafletMap = dynamic(
  () => import("../components/LeafletMap"), // Adjust the path if necessary
  { ssr: false }
);

const MapPage = () => {
  const [position, setPosition] = useState(null);

  const fetchPosition = async () => {
    try {
      const response = await fetch("/api/glp");
      const data = await response.json();
      setPosition([data.latitude, data.longitude]);
    } catch (error) {
      console.error("Error fetching position:", error);
    }
  };

  useEffect(() => {
    fetchPosition(); // Fetch position initially

    const intervalId = setInterval(fetchPosition, 3000); // Set up interval to fetch position every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return <div>{position && <DynamicLeafletMap position={position} />}</div>;
};

export default MapPage;
