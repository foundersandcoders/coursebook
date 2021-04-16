---
title: Node & npm introduction
description: Learn how to use Node and npm to run JS on your machine
tags:
  - workshop
  - js
keywords:
  - js
  - node
  - npm
---

Node is a version of JavaScript that works outside of a web browser. It was created so web developers who already knew JS could use the same language to write HTTP servers, CLI programs and more.

## Node JS vs Browser JS

Node is basically the JS engine from the Chrome web browser, plus some extra features for things browsers cannot do, like making HTTP servers or accessing files on the computer.

Since Node uses the JS language it has the same syntax, keywords and features as JS in the browser. However (just like browsers) different versions of Node support different new language features. Something that was added to JS in Chrome may not be available in Node yet (and vice versa).

The main difference to browser-JS is that Node has no `window` or `document` global objects (and so none of the things inside them like `querySelector`), since those concepts don't exist on a server.

## Installation

You'll need to have Node installed on your computer to follow this workshop. Check whether it is already installed by running this in your Terminal:

```shell
node --version
```

You should see a version number printed. Ideally you want at least the current Long-term Support (LTS) version listed on [Node's homepage](https://nodejs.org/en/).

If you get an error that means Node isn't installed. Follow [our installation guide](/course/handbook/installation/#node) then try again.

## Using Node

The Node installation on your computer is a command-line program. You can use the `node` command in your Terminal to run JS code.

### REPL

The quickest way to try Node out is with the "REPL". This stands for "read, eval, print, loop" and is a quick playground for running code (most languages come with one).

Run this command in your Terminal to start the REPL:

```shell
node
```

You should see something like:

```
Welcome to Node.js v14.15.5.
Type ".help" for more information.
>
```

You can type JS code in here, then hit "Enter" to execute it (just like a browser console).

{% box %}

#### Try it

1. Use the REPL to define a function that adds two numbers
1. Call that function to add together `1234` and `4321`

{% endbox %}

### JS files

The REPL is mostly for playing around. To write a real program you need `.js` files. You can tell Node to run a JS file by passing its path as an argument:

```shell
node my-file.js
```

Node will parse the JS code in the file, execute it, and (if there are any logs) show the logs in the Terminal.

{% box %}

#### Try it

1. Create a folder called `node-intro`
1. Create a file inside named `add.js`
1. Copy over your `add` function from the REPL
1. Call the function and log the result
1. Run your file in your Terminal

{% disclosure %}

```shell
mkdir node-intro
cd node-intro
touch add.js
code .
```

```js
// add.js
function add(x, y) {
  return x + y;
}

console.log(add(4, 6)); // Logs: 10
```

```shell
node add.js
```

{% enddisclosure %}

{% endbox %}

### Modules

Modules are used to isolate code. In the browser by default all JS has access to the same global scope, even if loaded via separate script tags.

Although browsers do now have [Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) Node was created before they were added to JavaScript. This means it has its own system (called "CommonJS").

#### Exporting code

By default all files are self-contained in Node. Code in one file cannot access anything in another file.

To use something in another file you must "export" it. You can do so by assigning the value to `module.exports`:

```js
// messages.js
const message1 = "hello";
const message2 = "goodbye";

module.exports = message1;
```

#### Importing code

To access code that is exported from another file you must "import" it. You can do so by calling the `require` function with the path to the file:

```js
// index.js
const whateverNameWeWant = require("./messages.js");

console.log(whateverNameWeWant); // Logs: "hello"
console.log(message2); // Error: message2 is not defined
```

Note: the file extension is optional—if you leave it off Node will assume it's a `.js` file. This is quite common in the Node ecosystem.

#### Multiple exports

You can export multiple values by assigning an object to `module.exports`:

```js
// messages.js
const message1 = "hello";
const message2 = "goodbye";

module.exports = {
  message1: message1,
  message2: message2,
};
```

```js
// index.js
const messages = require("./messages.js");
// or using destructuring:
// const { message1, message2 } = require("./messages.js");

console.log(messages.message1); // Logs: "hello"
console.log(messages.message2); // Logs: "goodbye"
```

{% box %}

#### Try it

1. Amend your `add.js` file to export your function
1. Create a new file `index.js`, import the `add` function, call it and log the result
1. Run `node index.js` to test it
1. Add a second variable to `add.js`
1. Try to import and log it in `index.js`
1. Make sure you export it and import it to make this work

{% disclosure %}

```js
// add.js
function add(x, y) {
  return x + y;
}

const another = "hi";

module.exports = { add, another };
```

```js
// index.js
const { add, another } = require("./add.js");

console.log((add(2 + 4)); // Logs: 6
console.log(another); // Logs: "hi"
```

```shell
node index.js
```

{% enddisclosure %}

{% endbox %}

### Built-in modules

Node provides some extra built-in modules that provide features JS doesn't have. You can import these just like your own modules, only without the path (just using their name). For example to use the built-in "fs" (filesystem) module:

```js
const fs = require("fs");

fs.readFile("my-file.txt");
```

{% box %}

#### Try it

1. Use `require` to import the built-in `"os"` module
1. Use the `os.cpus()` method to log what processors your computers has

{% disclosure %}

```js
const os = require("os");

console.log(os.cpus());
```

```shell
node index.js
```

{% enddisclosure %}

{% endbox %}

## Node Package Manager

Node comes with a "package manager" called npm. This is a way to easily install and use code written by other people.

npm is a registry containing thousands of 3rd party modules. It's also a command-line program for managing those modules in your project. There are a few useful commands.

### `npm init`

This will "initialise" your project by asking you some questions then creating a `package.json` file. This file records information about the project, including which 3rd party modules it depends on.

You can pass the `-y` flag to skip all the questions and create the `package.json` with the defaults. You can edit the JSON file by hand later if you need to.

### `npm install`

This is how you install 3rd party modules to use in your code. For example to install the very useless `cowsay` module:

```shell
npm install cowsay
```

npm will list the module in the `"dependencies"` field in your `package.json`:

```json
{
  "dependencies": {
    "cowsay": "^4.1.2"
  }
}
```

Now if another developer clones your repo they can just run `npm install`, and npm will automatically download all the 3rd party modules required to run your code.

npm will also create a directory named `node_modules` and put all the 3rd party code in there. This will be quite large, since modules you install can have their own dependencies (and those dependencies can depend on _other_ modules...). Since this directory gets so big it's common to add it to the `.gitignore` file.

You can import these modules just like built-in Node modules. When you `require` a non-path Node will look in the `node_modules` folder to find the module to import.

```js
const cowsay = require("cowsay");
```

#### Development dependencies

Some 3rd party modules are only used for development purposes. E.g. a testing library or a linter. You can mark a module as a dev dependency with the `-D` flag when you install:

```shell
npm install -D cowsay
```

This will put it under the `"devDependencies"` field in the `package.json`. This helps during deployment—it's quicker not to install a bunch of modules that aren't actually needed for your production server.

#### Global modules

You can also install modules "globally" on your computer using the `-g` flag. This makes them available to use anywhere in your terminal, and so is sometimes used as an alternative to Homebrew or `apt-get`.

You shouldn't use global modules in your Node apps, since they aren't listed in the `package.json` and so won't be installed automatically if another developer clones your repo and runs `npm install`.

### npm scripts

npm installs packages that have command-line interfaces into `/node_modules/.bin/`. This means we can run the `cowsay` CLI in our terminal like this:

```shell
./node_modules/.bin/cowsay hello
```

However this is pretty awkward to type, especially if it's a command we need to use a lot (like "start the dev server"). Luckily npm scripts make this nicer.

npm automatically creates a field called `"scripts"` in your `package.json`. These are shortcuts for different tasks you might want to do while developing your app. They're like per-project command-line aliases.

You can reference dependencies directly in a script (without the `/node_modules/.bin/` bit). So we could add a "greet" script like so:

```json
{
  "scripts": {
    "greet": "cowsay hello"
  }
}
```

You can run npm scripts in your terminal with `npm run <name>`. So in this case `npm run greet`.

{% box %}

### Try it

1. Initialise your project to create a `package.json`
1. Install the `cowsay` module as a dev dependency
1. Look in the `node_modules` folder—can you see `cowsay`?
1. Run `./node_modules/.bin/cowsay hello` in your terminal
1. Add `"greet": "cowsay hello"` to your npm scripts
1. Run `npm run greet` in your terminal

You should see something like this:

```shell
 _______
< hello >
 -------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

{% endbox %}
