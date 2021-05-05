---
title: Modules
description: Learn how to split your code up into separate modules using built-in JS features.
tags:
  - workshop
  - js
keywords:
  - js
  - modules
  - import
  - export
---

ES Modules are a way to isolate your JS files. This is similar to Node's `require` syntax, but build-in to the JS language (rather than a proprietary Node feature).

[Modern browsers](https://caniuse.com/#search=modules) support modules loaded from a script tag with `type="module"`. This tells the browser that this JS code may load additional code from other files.

```html
<script type="module">
  import { add } from "./maths.js";

  add(1, 2);
</script>
```

Generally (for wider browser support) apps use a tool called a "bundler" to parse all the imports and "bundle" them into a single file that older browsers will understand. For ease of learning we won't be using a bundler yet.

## Module scope

Modules help with JavaScript's global variable problem: usually variables defined in one file are able to be accessed (and changed) in any other. This can be confusing and dangerous, since you can't tell where things are defined/changed.

With modules variables defined in separate files are **not** accessible in another. This means you can have 100 variables named `x`, as long as they're all in different files.

The only way to use a value from another module is to explicitly export it from one file, then import it where you want to use it.

## Exports

Files can have two types of exports: "default" and "named". A file can only have **one** default export, but can have **many** named exports. This is conceptually similar to the difference between `module.exports = myFunction` and `module.exports = { myFunction, otherFunction }` in Node.

This is how you create a default export:

```js
const a = 1;
export default a;
```

And this is how you create a named export:

```js
const a = 1;
export { a };
```

You can only default export a single thing, but you can have as many named exports as you like:

```js
const a = 1;
const b = 2;
export { a, b };
```

You don't have to export things at the end of the file. You can do it inline:

```js
export const a = 1;
export const b = 2;
```

## Imports

There are also two kinds of imports: default and named. The way you import a value must match the way you exported it. A default-exported variable must be default-imported (and vice versa).

This is how you import something that was default-exported:

```js
// maths.js
const a = 1;
export default a;
```

```js
// index.js
import a from "./maths.js";
console.log(a); // 1;
```

{% box %}

When you import a default-export you can call it whatever you want. You're effectively creating a new variable and assigning the default-export to it.

{% endbox %}

Named-exports must be imported with curly brackets:

```js
// maths.js
export const a = 1;
export const b = 2;
```

```js
// index.js
import { a } from "./maths.js";
console.log(a); // 1;
```

You can import as many named-exports as you like on the same line:

```js
import { a, b } from "./maths.js";
console.log(a, b); // 1 2
```

{% box %}

Named-exports **must** be imported with the correct name—otherwise JS would have no idea which export you wanted.

{% endbox %}

Import paths must be valid URIs. They can be local to your machine (`"./maths.js"`) or on the web (`"https://cdn.pika.dev/lower-case@^2.0.1"`). This means you **must include the file extension** for local files. Node lets you ignore this, but it is mandatory in the browser.

{% box %}

Unlike Node's `require` ES Modules are not dynamic. This means you cannot put them inside your code and import things conditionally. You also cannot use a variable in an import path. Imports are static and should live at the top of a file before any other code.

{% endbox %}

## Challenge

To get started download the starter files, `cd` into the directory, then run `npx servor workshop` to start a dev server. ES Modules require a server to work, so you can't just open the `index.html` file directly.

1. Split up the JS code in `workshop/index.js` into 3 files:
   - `math.js` containing the operator functions
   - `calculate.js` containing the `calculate` function
   - `index.js` containing the DOM event handlers
1. Change each file so they export and import everything they need to
1. Don't forget browsers only support imports inside a script tag with `type="module"`
