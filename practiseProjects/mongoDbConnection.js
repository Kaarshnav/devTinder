const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  "mongodb+srv://valyrianjs_db_user:sOOViP70DOGfJtTM@ekcupchaihojaedb.0fvljk0.mongodb.net/?appName=ekCupChaiHoJaeDb";
const client = new MongoClient(url);

// Database Name
const dbName = "helloWorldData";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("chaiDrinkers");
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  const insertResult = await collection.insertMany([
    {
      name: "may",
      city: "1",
    },
    { name: "apr", city: "2" },
    { name: "june", city: "3" },
  ]);
  const findResult2 = await collection.find({}).toArray();
  console.log("Found documents 2 =>", findResult2);
  console.log("Inserted documents =>", insertResult);
  // the following code examples can be pasted here...

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
