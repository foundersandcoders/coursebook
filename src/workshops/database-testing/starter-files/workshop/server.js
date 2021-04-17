const express = require("express");
const home = require("./routes/home.js");
const createUser = require("./routes/createUser.js");
const deleteUser = require("./routes/deleteUser.js");
const posts = require("./routes/posts.js");

const server = express();

const bodyHandler = express.urlencoded({ extended: false });

server.use(bodyHandler);

server.get("/", home.get);
server.get("/users/create", createUser.get);
server.post("/users/create", createUser.post);
server.post("/users/delete/", deleteUser.post);
server.get("/posts", posts.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
