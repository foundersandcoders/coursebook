const express = require("express");
const home = require("./routes/home.js");
const createUser = require("./routes/create-user.js");
const posts = require("./routes/posts.js");

const server = express();

const bodyHandler = express.urlencoded({ extended: false });

server.use(bodyHandler);

server.get("/", home.get);
server.get("/create-user", createUser.get);
server.post("/create-user", createUser.post);
server.get("/posts", posts.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
