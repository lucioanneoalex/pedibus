// pages/api/GetLastPosition.js
import fs from "fs";
import path from "path";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = fs.readFileSync(path.resolve("./", "data.json"), "utf-8");
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(405).send("Method Not Allowed");
  }
};

export default handler;
