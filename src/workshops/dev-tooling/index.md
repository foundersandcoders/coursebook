---
title: Developer tooling
description: Learn how to use npm modules like linters to make writing code easier
tags:
  - workshop
  - js
keywords:
  - js
  - node
  - npm
---

There are lots of useful modules on npm that can help us when we're working. Writing code can be difficult and error-prone, when you're learning and even when you're experienced. There are certain parts that are worth automating so you can free up your brain to worry about more interesting problems.

## Formatting with Prettier

The JS ecosystem has mostly settled on using the [Prettier](https://prettier.io/) library to format their code. This ensures that everyone's code looks the same, which makes it easy to jump into new projects. It's nice to automate things like indentation or quote usage, since these are not really things you want to waste brainpower on while you are coding.

### Using Prettier

There are a couple of ways to use Prettier to format your code. The simplest is to install an extension for your editor. Here is the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). You can then configure your editor to "format on save", so your code is always formatted correctly.

You should _also_ install Prettier as a dependency in your project. This ensures anyone who contributes will get the same version. Otherwise someone with an older version of the editor extension might end up formatting some code differently to the rest.

You want to install it as a _development_ dependency, since it is not needed for your actual app code to work:

```shell
npm install -D prettier
```

The Prettier extension will automatically use the locally installed version, so everyone should end up with consistent code.

If you like you can use the Prettier CLI to format code as well. This command will format all files in your current directory:

```shell
node_modules/.bin/prettier --write .
```

### Configuring Prettier

Prettier is explicitly designed to be very opinionated—the whole point is to make all code consistently formatted. However there are some things you can configure (like using single vs double quotes).

Create a `.prettierrc.json` file and put any [config options](https://prettier.io/docs/en/options.html) in here. If you're happy with the default settings you can just use an empty object:

```json
{}
```

This will ensure that everyone's editor extension uses the defaults instead of whatever they might have configured for their personal settings.

## Linting with ESLint

[ESLint](https://eslint.org/) is the most popular JS _linter_. A linter is a program that looks at your code and tries to find mistakes. You can think of it like a spell/grammar checker for code.

This is incredibly useful as a linter can easily find problems that are quite difficult for a human to spot. For example here's a simple bug:

```js
function run(fileInput) {
  // imagine there are many lines in between here
  console.log(filelnput); // undefined 😱
}
```

ESLint would underline `console.log(fileinput)` in red, and tell you that `fiileinput` is undefined. Linters can also be helpful when you're learning, as some of their warnings will be about stuff you didn't know yet.

### Installing ESLint

Similar to Prettier you want to install both the ESLint editor extension and the command-line tool. Here is the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Again you'll want to install it as a development dependency:

```shell
npm install -D eslint
```

ESlint requires a bit more config, which you can automatically generate by running this command:

```shell
npm init @eslint/config
```

It will ask you some questions about your project, then generate a config file. Choose the JSON option—you should end up with a new file named `.eslintrc.json` that looks like this:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {}
}
```

This config "extends" the built-in recommended ruleset, which will catch common mistakes and problems. Later on if you need to you can add or disable specific rules in the `"rules"` object here.

### Using ESLint

You may need to restart your editor after installing the ESlint extension. Afterwards you should start seeing red underlines for mistakes in your code. Try referencing an undefined variable like this:

```js
console.log(xyz);
```

You should see a red underline—hover the variable and you'll see a popup with a message like `'xyz' is not defined. eslint(no-undef)`. The last bit is the specific rule being broken. If you ever don't understand a problem you can google this rule and read about it on ESLint's website for more information.

## Development server

It's useful to have a local dev server when working on projects. Whilst it's possible to just open an `.html` file in your browser to view a webpage locally, lots of newer browser features won't work (for security reasons). A proper dev server also has nice features like "live reload" to auto-reload the page whenever you save changes to a file.

The "Live Server" VS Code extension is popular for this, as it makes it quick and easy to start a local server. However this isn't ideal for shared projects as you don't have a centrally configured way to run the site—you're relying on each contributor to bring their own server.

[Browsersync](https://browsersync.io/) is a nice tool for creating dev servers. You should install it as a development dependency:

```shell
npm i -D browser-sync
```

You can then start a server for your local files:

```shell
node_modules/.bin/browser-sync --server --watch
```

This is annoying to type so you probably want to add an npm script to your `package.json`:

```json
{
  "scripts": {
    "dev": "browser-sync --server --watch"
  }
}
```

Now you can just run `npm run dev` to start the server.

Browsersync will watch all your files and auto-reload your browser tabs if you change them. It also synchronises browser state across all tabs/windows, so if you scroll or fill in a form in one tab it'll update all of them. This is handy for testing lots of viewport widths at once, for example.

It will also run the server on your local Wi-Fi network, so you can easily test your local work on a mobile device. When you start the server you'll see a log like: `External: https://192....`. Visit this IP address on any device on the same Wi-Fi network to see your local site.
