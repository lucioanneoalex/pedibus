// pages/api/position.js
import fs from "fs";
import path from "path";

export default async (req, res) => {
  if (req.method === "POST") {
    const { latitude, longitude } = req.body;
    const data = JSON.stringify({ latitude, longitude });
    fs.writeFileSync(path.resolve("./", "data.json"), data);
    res.status(200).json({ message: "Position received" });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
