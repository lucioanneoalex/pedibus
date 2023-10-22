// pages/index.js
import React from "react";

const HomePage = () => {
  const sendPosition = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
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
          alert(data.message);
        } catch (error) {
          console.error("Error:", error);
        }
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  };

  return (
    <div>
      <button onClick={sendPosition}>Send Position</button>
    </div>
  );
};

export default HomePage;
