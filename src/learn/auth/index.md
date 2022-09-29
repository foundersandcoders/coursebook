---
title: Authenticating users with sessions
description: Learn how to safely store passwords, and identify returning users with cookies
tags:
  - workshop
keywords:
  - js
  - express
  - auth
challenge: https://github.com/foundersandcoders/auth-challenge
---

Applications often store information specific to individual users. It is important to only allow access to the correct people, to avoid potentially malicious actors stealing or deleting private data. The term _authentication_ refers to the process of verifying the identity of a specific user; _authorization_ refers to verifying that this user is allowed to do something.

{% box "info" %}

Authentication is a complex topic with serious repercussions for getting it wrong. To keep this workshop focused we are going to focus on the necessary concepts to get a simple signup/login system working. This means we will be skipping over the "glue code" (e.g. the actual server, HTML forms etc).

{% endbox %}

## Verifying users with passwords

The simplest way to verify a user is by asking them for a secret when they create an account. They can then provide this secret when they want access—since only they should know it you can trust that they are who they say they are.

Early versions of password protection were simple:

1. Ask user for a password on account creation
1. Store the password in database
1. (later) Ask user for a password again on login
1. Read password from database and check they are the same

Unfortunately storing passwords in "plaintext" like this is problematic. Anybody with access to the DB can see every user's password—this includes employees of the business and any hackers who manage to connect to the DB.

Leaking passwords like this is especially bad because most users re-use the same password for many sites. You may not be too worried about the security of your dog-rating app, but some of your users probably gave you their bank password.

Ideally we need a way to verify passwords without actually storing the password.

## Hashing passwords

Hashing is when you use a mathematical process (algorithm) to convert a string into a different one. Hashes are:

- One-way: it should be impossible to reverse the process.
- Deterministic: hashing the same string always gives the same result.
- Unique: hashing a different string should never create the same result.

Here's a quick way to create a hash using Node:

```js
const crypto = require("node:crypto");

const password = "hunter2";

// Hash string with the SHA256 algorithm and output in hexadecimal format
const hashed = crypto.createHash("sha256").update(password).digest("hex");
// "f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7"
```

There is no way to turn the "f52fb..." hash back into "hunter2", so it's safe to store in our DB. A different password will never create the same hash, so there won't be conflicts.

Here's the flow from above updated to use hashing:

1. Ask user for a password on account creation
1. _Hash the password, then store the hash in database_
1. (later) Ask user for a password again on login
1. _Hash the provided password_
1. Read the hash from the DB and check they are the same

## Salting password hashes

There is still a security problem here: hashing the same password always creates the same output. This lets a hacker who has stolen your DB use something called a "rainbow table" to make finding passwords easier.

A rainbow table is a big list of pre-computed hashes for common passwords. This lets them quickly match pre-computed hashes to those in your DB to find out what password was used to create the hash. This is _much_ faster than hashing each password before comparing, since good hashing algorithms are deliberately slow to prevent this type of brute-force attack.

We can avoid this problem by ensuring each hash is truly unique. If we add a random string to the password before hashing then the result will always be different. We must then store the salt in the DB alongside the password, as we will need it to recreate the hash when we verify a user.

1. Ask user for a password on account creation
1. _Generate a random salt_
1. _Hash the password + salt, then store the hash and salt in database_
1. (later) Ask user for a password again on login
1. Read the hash and salt from the DB
1. _Hash the provided password + stored salt_
1. Check the hashes are the same

It is now impossible for any of these hashes to be pre-computed, since the hacker would need to know the salt in advance..

## Using BCrypt to hash passwords

Our sign up/log in process has gotten quite complex. There are many moving parts to get right, and any flaw could be exploited by a hacker. It is a good idea to rely on a popular battle-tested library to implement these features for us instead of trying to write them ourselves.

The `bcryptjs` npm library provides simple methods for hashing a password (with salt) and comparing a password to a hash. Let's try it out. First create a new directory and install Express and BCrypt:

```shell
mkdir learn-auth
cd learn-auth
echo "{}" > package.json
npm install express bcryptjs
```

Create a new file `auth.js` and try using BCrypt to hash a password:

```js
const bcrypt = require("bcryptjs");

const password = "hunter2";
const cost = 10; // How slow/hard to compute the hash should be

bcrypt.hash(password, cost).then((hash) => console.log(hash));
// $2a$10$n1etzOWCrAtJGQIDoaw0mun1ojnIjA2UaiJ8DkL76ljhGa/cZCQtq
```

Run this with `node auth.js` to see your hash logged. Since BCrypt is designed to be slow it returns a promise—you need to wait for this to resolve before you can access the hash.

Now try comparing the hash to passwords to see if they match:

```js
//...

bcrypt.hash(password, cost).then((hash) => {
  bcrypt.compare("hunter2", hash).then((result) => console.log(result));
  // true
  bcrypt.compare("incorrect", hash).then((result) => console.log(result));
  // false
});
```

The `.compare` method returns a promise that resolves with a boolean telling you whether the password matches the hash.

{% box %}

Make sure you pass the hash as the _second_ argument, otherwise the comparison won't work.

{% endbox %}
