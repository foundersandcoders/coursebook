const express = require("express");

const server = express();

let dogs = [
  { name: "Alphonso", breed: "German Shepherd" },
  { name: "Lassie", breed: "Golden Retriever" },
  { name: "Pongo", breed: "Dalmation" },
  { name: "Luna", breed: "Cocker Spaniel" },
];

const PORT = 3333;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
