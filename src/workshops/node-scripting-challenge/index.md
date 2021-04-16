---
title: Node scripting challenge
description: Write custom Node scripts to automate tasks in your terminal
tags:
  - workshop
keywords:
  - node
  - shell
  - scripting
starter: false
---

Node isn't just used for HTTP servers—it's a fully-fledged programming language that can do almost anything. Let's see how we can use it to create useful scripts we can run in our terminal.

We could recreate the built-in `ls` program using Node's filesystem module:

```js
// ls.js
const fs = require("fs/promises");

const currentDir = process.cwd();

fs.readdir(currentDir).then((files) => {
  files.forEach((file) => console.log(file));
});
```

We're importing `"fs/promises"` because Node's standard `"fs"` module uses callbacks. We get the directory the script was run from using `process.cwd()` ("current working directory"). Finally we use `fs.readdir` to get the names of every file in the directory and log them.

You can run this script using `node ./path/to/ls.js`. It should list the contents of whatever directory you're currently inside in your terminal.

We're currently running it by passing the file to our `node` program. However we can make the script directly executable by doing two things:

First we must add a ["shebang"](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) to the top of the file. This is a special comment that tells the terminal which program it should use to run a script.

```js
#! /usr/bin/env node

// ...
```

Second you need to change the file's permissions to make it "executable". You can do so with:

```shell
chmod +x ls.js
```

You can now run this script with `./path/to/ls.js`. You actually don't even need the `.js` extension anymore, since the shebang tells your terminal that it's a Node file. So you could rename it to just `ls` and run it with `./path/to/ls`.

## Challenge

Write a Node script that creates a new HTML file containing all the boilerplate code you normally need. The filename should be passed in as an argument. E.g. running this command:

```shell
./create-html hello-world
```

should create a new file named `hello-world.html` containing:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>hello world</title>
  </head>
  <body>
    <h1>hello world</h1>
  </body>
</html>
```

{% box %}

You can access the arguments passed to a script using `process.argv`.

{% endbox %}

{% box %}

You can create new files using `fs.writeFile`:

```js
fs.writeFile("my-file-name.txt", "hello world").then(() => {
  console.log("finished");
});
```

{% endbox %}

{% disclosure %}

```js
#! /usr/bin/env node

const fs = require("fs/promises");

const filename = process.argv[2];
const title = filename.replace(/-/g, " ");

const contents = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body>
    <h1>${title}</h1>
  </body>
</html>`;

fs.writeFile(filename + ".html", contents).then(() => {
  console.log(`Created ${filename}.html successfully!`);
});
```

{% enddisclosure %}
