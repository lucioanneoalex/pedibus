// pages/api/position.js
//import { MongoClient } from "mongodb";
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
  if (req.method === "POST") {
    const { latitude, longitude } = req.body;

    try {
      if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
      }
      const db = client.db("pedibus"); // replace with your database name
      const collection = db.collection("positions"); // replace with your collection name

      //await collection.insertOne({ latitude, longitude });
      // Define a constant _id value to always update the same document
      const documentId = "6537ff14064d2b65bd701ca4";
      await collection.updateOne(
        { _id: documentId },
        {
          $set: { latitude, longitude },
        },
        { upsert: true } // This option creates a new document when no document matches the query criteria.
      );

      res.status(200).json({ message: "Position updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
