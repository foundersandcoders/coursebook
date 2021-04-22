const { existsSync, writeFileSync } = require("fs");
const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "db.json");
const initialData = { users: [] };

// create db.json if it doesn't exist yet
try {
  const fileExists = existsSync(dbPath);
  if (!fileExists) {
    writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  }
} catch (error) {
  console.error("Error creating db.json");
  console.error(error);
}

// helpers to make reading/writing JSON simpler
const db = {
  read: () => readFile(dbPath).then((contents) => JSON.parse(contents)),
  write: (contents) => writeFile(dbPath, JSON.stringify(contents, null, 2)),
};

// takes an email and returns the matching user
function getUser(email) {
  return db.read().then((data) => {
    const user = data.users.find((user) => user.email === email);
    if (!user) throw new Error(`${email} not found in users`);
    return user;
  });
}

// inserts a new user, enforcing uniqueness via email
function createUser(user) {
  return db
    .read()
    .then((data) => {
      const existingUser = data.users.find((u) => u.email === user.email);
      if (existingUser) throw new Error(`${user.email} already exists`);

      user.id = Date.now(); // rudimentary unique ID
      data.users.push(user);
      return db.write(data);
    })
    .then(() => user); // make sure we return the new user
}

module.exports = { getUser, createUser };
