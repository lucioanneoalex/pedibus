// pages/api/position.js
import { globalState } from "../globalState";

export default async (req, res) => {
  if (req.method === "POST") {
    const { latitude, longitude } = req.body;
    globalState.lastCoordinates = { latitude, longitude };
    res.status(200).json({ message: "Position received" });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
