// pages/api/GetLastPosition.js
//import { MongoClient, ObjectId } from "mongodb";

const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://pedibus:Ped45fimi@cluster0.zfzxyjk.mongodb.net/pedibus?retryWrites=true&w=majority",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
      }
      const db = client.db("pedibus"); // replace with your database name
      const collection = db.collection("positions"); // replace with your collection name

      // Convert string id to ObjectId
      const id = "6537ff14064d2b65bd701ca4";

      const document = await collection.findOne({
        _id: id,
      });
      if (document) {
        res.status(200).json(document);
      } else {
        res.status(404).send("Document not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};

export default handler;
