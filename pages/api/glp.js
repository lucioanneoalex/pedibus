// pages/api/GetLastPosition.js
import { globalState } from "../globalState";

export default async (req, res) => {
  if (req.method === "GET") {
    const { lastCoordinates } = globalState;
    res.status(200).json(lastCoordinates);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
