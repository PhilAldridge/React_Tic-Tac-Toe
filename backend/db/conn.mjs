import { MongoClient } from "mongodb";

//TODO this should read the ,env file!!
const connectionString = "mongodb+srv://00flibit:Ic3pPDEDyu9cmMnW@ultimate-tic-tac-toe.8xt5po1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("games");

export default db;