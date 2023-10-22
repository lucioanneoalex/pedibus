// pages/index.js
import React, { useEffect } from "react";

const HomePage = () => {
  const sendPosition = async () => {
    console.log("Sending position...");
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch("/api/position", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          });
          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.error("Error:", error);
        }
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  };

  useEffect(() => {
    // Set up an interval to send the position every 3 seconds
    const intervalId = setInterval(sendPosition, 3000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <button onClick={sendPosition}>Send Position</button>
    </div>
  );
};

export default HomePage;
