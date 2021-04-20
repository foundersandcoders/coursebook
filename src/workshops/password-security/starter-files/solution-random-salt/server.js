const express = require("express");
const home = require("./handlers/home");
const logIn = require("./handlers/logIn");
const signUp = require("./handlers/signUp");

const server = express();

server.use(express.urlencoded({ extended: false }));

server.get("/", home.get);
server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);
server.get("/log-in", logIn.get);
server.post("/log-in", logIn.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
