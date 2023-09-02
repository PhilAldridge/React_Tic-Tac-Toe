import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("games");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("games");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  const newId = findUniqueId();
  let initalPosition = [];
  for (let i = 0; i < 9; i++) {
    initalPosition.push(Array(9).fill(null));
  }
    
  const newGame = {
      _id: newId,
      state: initalPosition, //req.body.newGameState,
      time: Date.now(),
      lastMove: null,
      connected: false
  };
  let collection = await db.collection("games");
  let result = await collection.insertOne(newGame);
  res.send(result).status(204);
});

function findUniqueId() {
  const possibleLetters = "0123456789abcdefghijklmnopqrstuvwxyz";
  let newId = "";
  for(let i=0;i<5;i++){
      newId = newId + possibleLetters[Math.floor(Math.random()*possibleLetters.length)];
  }
  
  return newId;
}

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: req.body.id };
  let updates = { $set: { connected: true }};
  if(req.body.newState) {
    updates =  {
      $set: {
        state: req.body.newState,
        lastMove: req.body.lastMove
      }
    };
  }

  let collection = await db.collection("games");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});



// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("games");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});



export default router;