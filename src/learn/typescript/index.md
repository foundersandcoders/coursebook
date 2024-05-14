---
title: TypeScript
description: Learn how to use TypeScript to write more robust code
tags:
  - workshop
keywords:
  - js
  - typescript
starter: false
---

TypeScript is JavaScript with some additional syntax for describing what _types_ things are. Here's an example:

```ts
function add(x: number, y: number) {
  return x + y;
}
```

## What are types?

A type is something that tells the language what a piece of data is and how it's intended to be used. For example JavaScript has 7 "primitive" types:

1. Null
1. Undefined
1. Boolean
1. Number
1. BigInt
1. String
1. Symbol

Everything else is the Object type. Arrays are objects with number keys, and functions are objects that are also callable.

{% box %}

Note that the JS `typeof` operator can be misleading. For example `typeof null` is `"object"` for [legacy support reasons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null).

{% endbox %}

You don't really need to understand JS types in detail to use TypeScript, but if you're interested there's [more info on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

### What is static typing?

JavaScript is a dynamically typed language. This means the language figures out what a piece of data should be when your program runs.

There are benefits to this: the language doesn't have to be compiled before you can run your code, and it's friendlier to beginners because you don't have to think about types yourself.

There are also downsides: it's easy to mix up your types and try to do something like access an undefined value, which often results in strange bugs. You also don't get lots of helpful editor features as you write your code, like smart autocompletion and error highlighting when you try to do things you shouldn't.

Statically typed languages on the other hand try to understand what types things are before the code even runs, either by inferring obvious types or having the author explicitly write them.

Although this is more work upfront it often results in code that works the first time you run it, since the language has ensure everything is correct in advance.

## How does TypeScript work?

TypeScript lets you write normal JS with a bit of extra stuff to annotate what types things are (in places where TS can't figure them out automatically).

JS engines cannot execute TS code directly. Instead TS must be compiled to JavaScript before being run. This adds an additional step of complexity to any TS project, although certain runtimes like Deno and Bun make this simpler by automatically compiling TS code before executing it.

{% box %}

A runtime is the environment that is executing your code. Examples of runtimes include various web browsers, Node, Deno, and Bun. These environments use a JS _engine_ to actually execute the code. Chromium browsers (Chrome, Edge, Arc etc) and Node all use the V8 JS engine. Safari and Bun use JavascriptCore, and Firefox uses Spidermonkey.

{% endbox %}

Let's see how we can set up a basic Node project to compile TypeScript for us.

## Setting up a TypeScript project from scratch

### Initial setup

First we need a new directory to put our project in:

```shell
mkdir ts-workshop && cd ts-workshop
```

Then we need to initialise a JS project using `npm`:

```shell
npm init -y
```

Now we can use `npm` to install dependencies—3rd party code that our project relies on to work. First of all we will definitely need the TypeScript compiler. This is what will ensure our code works, and turn it into JS we can run.

```shell
npm i -D typescript
```

Note that we install it with the `-D` flag to mark it as a development dependency. That's because our final code won't use the `typescript` compiler—we just need it during development to compile TS to JS.

### Our first TypeScript

Let's try compiling some TS and running it. Open the project in your editor of choice. If you're using VS Code you should be able to do this with:

```shell
code .
```

Create a file named `index.ts` and add some TS code to check everything is working:

```ts
const message: string = "It's working!";
console.log(message);
```

You can try running this code:

```shell
node index.ts
```

Node will _attempt_ to run it, since it doesn't actually care what extensions your files have, but you should get a syntax error:

```
SyntaxError: Unexpected token ':'
```

That's because Node's V8 engine doesn't understand TypeScript syntax. We need to use the `typescript` library we installed to compile this TS to JS.

```shell
npx tsc index.ts
```

{% box %}

`npx` is a built-in `npm` command that lets you run modules you have installed locally.

{% endbox %}

If the compiler succeeds you should get nothing logged to your terminal. Instead you should now have an `index.js` file next to your `index.ts`. This will contain your compiled JS code:

```js
var message = "It's working!";
console.log(message);
```

The compiler has stripped out the special TS syntax, which means we can now run this code with Node:

```shell
node index.js
```

You should see `"It's working!"` logged to your terminal.

### Configuring the compiler

Since TypeScript needs to produce code for many different JS runtimes the compiler has lots of options. We can configure it directly from the command line. For example to change where our compiled JS code will go:

```
npx tsc --outDir build
```

This should create a `build/` directory and put `index.js` in there.

It can get cumbersome to do this as your project starts to need more and more configuration, so it's common to use a `tsconfig.json` file to contain all the options you need. Create a new file named `tsconfig.json` and add these options:

```json
{
  "compilerOptions": {
    "outDir": "build",
    "module": "NodeNext",
    "strict": true
  }
}
```

This tells our compiler 3 things:

1. We want our code to be compiled into the `build/` directory
1. We are targeting the modern Node module system
1. We want TS to be as [strict](https://www.typescriptlang.org/tsconfig/#strict) as possible with our code

Now we can just run the compiler with no arguments. It will autodetect the config and any TS files.

```shell
npx tsc
```

You should see one change in `build/index.js`: it now has `"use strict;"` at the top. This is because we enabled the `strict` option, so TS is ensuring our code opts in to JS's [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

### Watching for changes

Right now we have an awkward 3-step process for making changes. We have to save changes to a file, compile TS to JS, then run the JS with Node. Ideally we want a smoother development experience while we're working on code.

Both Node and TypeScript have a "watch mode", where they will automatically restart when you save changes to a file. There is a slight complication in that we need to run both at once: `tsc` to watch for changes to `.ts` files and Node to watch for changes to `build/index.js`. The simplest way is to open two panes/tabs in your terminal and run one command in each:

```shell
npx tsc --watch
```

```shell
node build/index.js --watch
```

Now whenever you edit a `.ts` file `tsc` will re-compile it into `build/`. This will cause Node to re-run your `.js` code automatically.

---

## Building an app with TypeScript

We're going to build a simple task management app—this will let us see how various TypeScript features help us write more robust code. We'll focus on just the business logic, without worrying about how the user interacts with the app for now.

We've already got our project set up compiling TypeScript, so we can start working in `index.ts`. You can see TS errors in two places:

1. Your terminal after you run `tsc`
1. Highlighted in VS Code as a red underline. Hover the underlined code to see the error in a popup

### Creating tasks

The first feature our app needs is task creation. We'll write a function that takes the task content and returns an object with the properties describing the task. We won't worry about where we're storing tasks yet.

```ts
let index = 0;

function create(content) {
  return {
    content,
    id: i++,
    status: "incomplete",
    createdAt: new Date(),
  };
}
```

You should see a type error highlighting the `content` parameter:

```
Parameter 'content' implicitly has an 'any' type.
```

#### Function parameter types

TypeScript is telling us that it cannot infer the type of `content`. Since we enabled the `strict` option this is an error that will stop our code from compiling. We want TS to always know what types our function parameters are so it can catch any mistakes we make inside the function.

We can fix the error by using a type annotation to tell TS what type `content` is:

```ts
function create(content: string) {
  // ...
}
```

#### Type annotations

Type annotations can also be used for normal variable definitions. We could add one to the `index` variable:

```ts
let index: number = 0;
```

However this is not necessary here as TS can infer the type, since we initialised it as a number. Generally you only need to annotate a variable if you aren't going to give it a value yet.

#### Function return types

If you hover the function name in VS Code you can see the type signature of `create`:

```ts
function create(content: string): {
  content: string;
  id: number;
  status: string;
  createdAt: Date;
};
```

Currently TS is inferring the return type, based on what we actually returned. This is handy, since we'll get autocompletion and mistake checking when we use it:

```ts
let task = create("Learn TypeScript");
task.id; // number
task.x; // Property 'x' does not exist on type '{ content: string; id: number; status: string; createdAt: Date; }'.
```

It is often useful to explicitly annotate function return types. You can do that with an annotation after the parameters:

```ts
function create(content: string): {
  content: string;
  id: number;
  status: string;
  createdAt: Date;
} {
  return {
    content,
    id: index++,
    status: "incomplete",
    createdAt: new Date(),
  };
}
```

For simple functions like this it can feel repetitive, but it can be helpful to be clear with your intentions before you write a function. That way TS will catch mistakes if you accidentally return something different.

{% box %}

#### Built-in types

Note that we used `Date` as a type. Our type values don't have to be primitives, any object like this can also be used as a type. We're effectively telling TS: "`createdAt` will be an instance of the `Date` object".

{% endbox %}

#### Literal types

Our `status` type is broader than it needs to be. Currently it's typed as `string`, when it can technically only ever be `"incomplete"`. It's usually a good idea for your types to be as strict as possible to prevent errors. You can broaden types as needed later on.

TS supports "literal types", which are literally a value instead of a primitive. Let's update our function's return type:

```ts
function create(content: string): {
  content: string;
  id: number;
  status: "incomplete";
  createdAt: Date;
} {
  // ...
}
```

### Completing tasks

The next feature our app needs is the ability to complete a task. Let's write a function that takes a task object and changes the `status` property:

```ts
function complete(task) {
  task.status = "complete";
}
```

TS will error here just like before, since we have not told it what type the `task` parameter is.

```
Parameter 'task' implicitly has an 'any' type.
```

We can fix this by adding a type annotation to the parameter:

```ts
function complete(task: {
  content: string;
  id: number;
  status: "incomplete";
  createdAt: Date;
}) {
  // ...
}
```

You may have noticed we are repeating ourselves here. Let's see how we can avoid this.

#### Type aliases

We've got two identical copies of the type representing a task object. In JS we would probably abstract this repeated value to a variable—in TS we can do something similar using "type aliases". These let you define a named type for re-use using the `type` keyword.

Let's define a new type called `Task` that we can use for both functions:

```ts
type Task = {
  content: string;
  id: number;
  status: "incomplete";
  createdAt: Date;
};

function create(content: string): Task {
  // ...
}

function complete(task: Task) {
  // ...
}
```

Type aliases are usually capitalised to distinguish them from normal JS variables. They can also be imported and exported just like JS values.

{% box %}

You may encounter TS code that uses the [`interface`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) keyword for object types like this. This is very similar to `type`, and so generally people stick to one or the other. We're going to use `type` as it can be a little simpler. The main difference is that interfaces can be extended or changed after being defined, whereas type aliases cannot.

{% endbox %}

#### Type unions

There is another type error in our code. The assignment to `task.status` is not allowed:

```
Type '"complete"' is not assignable to type '"incomplete"'.
```

This is because we defined `status` as a literal type. We need to update the definition to allow another possible value. TS supports something called "union types" to achieve this. You can specify multiple types separated by a `|` character (similar to a JS "logical or" operator). TS will check that values match one of the listed types.

Let's update our `Task` definition to allow another status type and fix our error:

```ts
type Task = {
  content: string;
  id: number;
  status: "incomplete" | "complete";
  createdAt: Date;
};
```

Note that type aliases don't have to be object types. For example we could define our `status` property as its own type if we felt it was too complicated to write inline:

```ts
type Status = "incomplete" | "complete";

type Task = {
  content: string;
  id: number;
  status: Status;
  createdAt: Date;
};
```

Types are just like normal variables, so you can compose them together in this way if it's helpful.

### Storing tasks

Right now our app doesn't really work, since we can only create single tasks. We need a place to store a list of tasks. Let's use a global array variable for this. We'll need to push tasks into it when we create them:

```ts
let tasks = [];

function create(content: string): Task {
  let task = {
    content,
    id: index++,
    status: "incomplete",
    createdAt: new Date(),
  };
  tasks.push(task);
  return task;
}
```

We'll see a new type error here highlighting the return value:

```
Type '{ content: string; id: number; status: string; createdAt: Date; }' is not assignable to type 'Task'.
  Types of property 'status' are incompatible.
    Type 'string' is not assignable to type '"complete" | "incomplete"'.
```

More complex TS errors like this can be a little confusing, so don't worry if they feel overwhelming. This one is complaining that the type of the `status` property in the object we're returning is not compatible with the `status` property of the `Task` type that we've explicitly said our function will return.

If you hover the `task` variable you will see that TS infers the type as:

```ts
{
  content: string;
  id: number;
  status: string;
  createdAt: Date;
}
```

The error is saying that our `task`'s status can be any string, rather than restricted to just `"incomplete"` or `"complete"`. This might seem weird considering we've set `status` to `"incomplete"`, but remember that JS objects are _mutable_. They can be changed as any time, so TS cannot rely on the initial value of a property. For example this would cause problems:

```ts
function create(content: string): Task {
  let task = {
    // ...
    status: "incomplete",
  };
  task.status = "aaaaaa";
  tasks.push(task);
  return task;
}
```

We can fix this by explicitly annotating the variable's type:

```ts
function create(content: string): Task {
  let task: Task = {
    // ...
    status: "incomplete",
  };
  tasks.push(task);
  return task;
}
```

### Marking complete by ID

Now that we have a list of tasks our `complete` function could be made more useful if it could mark tasks as complete with just the `id`.

```ts
function complete(id: number) {
  let task = tasks.find((task) => task.id === id);
  task.status = "complete";
}
```

Interestingly this will create 2 new type errors. The `tasks.find` call doesn't work because:

```
Variable 'tasks' implicitly has an 'any[]' type.
```

And `let tasks = []` is now also an error:

```
Variable 'tasks' implicitly has type 'any[]' in some locations where its type cannot be determined.
```

This wasn't a problem before because we never actually accessed anything inside the `tasks` array. Now that we are TS is asking us to explicitly say what type `tasks` is, since it cannot infer the type.

#### Collection types

We can define types for collections using a new piece of TS syntax:

```ts
let tasks: Array<Task> = [];
```

The angle brackets are a feature called ["generics"](https://www.typescriptlang.org/docs/handbook/2/generics.html). These are like types with parameters—the array type can't know what type of thing will be stored inside it, so it requires you to pass this type in, almost like a function argument.

Other JS collection types work in similar ways. For example: `Set<number>` or `Map<string, number>`.

Array types have a shorthand syntax that you will sometimes see: `Task[]`. We'll stick to using the long form though, since it is consistent with other types and can be less confusing for longer array types.

{% box %}

Note that arrays in TypeScript cannot change type once created. For example you can never push a number into an `Array<string>`.

TS also supports ["tuples"](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types): fixed length arrays of mixed types. For example: `[string, number, boolean]` must always contain 3 things: a string, a number and a boolean, in that order.

{% endbox %}

#### Function parameter type inference

It's worth noting here that we did not have to write type annotations for the inline function we passed to `tasks.find`.

```ts
tasks.find((task) => task.id === id);
```

TS can infer the type of `task` here, since it knows we are iterating over an array of `Task` objects. We get autocompletion and error checking for free.

#### Type narrowing

We have another type error. TS isn't happy that we're assigning to `task.status`:

```
'task' is possibly 'undefined'.
```

If you hover the `task` variable returned by `tasks.find` you'll see that its type is `Task | undefined`. That's because the `find` method on arrays is not guaranteed to find anything. If `complete` was passed an invalid `id` we'd end up with an undefined `task`. Trying to assign to the `status` property would cause a JS runtime error, which would crash our program.

All the compiler errors can seem annoying, but TS is really trying to save us from ourselves!

We can fix this by checking that we really did find a task before we attempt to assign to it:

```ts
function complete(id: number) {
  let task = tasks.find((task) => task.id === id);
  if (task) task.status = "complete";
}
```

This is called ["type narrowing"](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)—the TS compiler is smart enough to change types inside of conditionals. Inside of this `if` it is impossible for `task` to be `undefined`, so our assignment is allowed.

### Task removal

Let's write a function to remove tasks from our list. It should receive an `id` and remove the matching `Task` object from the `tasks` array. There are several ways to remove items from arrays, but we'll stick with `splice`:

```ts
function remove(id: number) {
  let index = todos.findIndex((t) => t.id === id);
  todos.splice(index, 1);
}
```

There is a bug in this code that TS has not caught: `findIndex` returns `-1` when it cannot find a match. Since `-1` is still a valid number the return type is just `number`. This means that unlike with `find`, which can return `undefined`, TS cannot force us to handle the "not found" case here.

If we passed this function an invalid `id` the `index` would be `-1`, so we would call `tasks.splice(-1, 1)`. A negative index causes `splice` to work _backwards_ from the end, incorrectly removing the final item from the array. We need to write a conditional to prevent this behaviour:

```ts
function remove(id: number) {
  let index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) tasks.splice(index, 1);
}
```

This emphasises that TypeScript cannot catch _every_ bug in your code. You still need to understand what you're writing and remain vigilant!

### New kinds of tasks

Let's imagine our users want to record birthdays in the task app. We'd need a way to distinguish a birthday from a normal task.

#### Optional properties

The simplest way would be to add an optional `birthday` property to the `Task` object:

```ts
type Task = {
  content: string;
  id: number;
  status: "incomplete" | "complete";
  createdAt: Date;
  birthday?: Date;
};
```

The [`?` operator](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#optional-properties) after a property tells TS that it is optional—it can be missing or set to `undefined`.

This new type might work for us. We can repurpose the `content` property as the birthday person's name. However birthdays don't really have "statuses"—they can't be completed. We should probably mark `status` as optional using a `?` as well.

```ts
type Task = {
  content: string;
  id: number;
  status?: "incomplete" | "complete";
  createdAt: Date;
  birthday?: Date;
};
```

We also need a `createBirthday` function to insert birthdays into the list:

```ts
function createBirthday(name: string, date: string): Task {
  let task: Task = {
    content: name,
    id: index++,
    createdAt: new Date(),
    birthday: new Date(date),
  };
  tasks.push(task);
  return task;
}
```

This works for now, but we'll soon see some issues caused by this structure.

### Listing tasks

Now we have two kinds of tasks we should write a function that prints a nicely formatted list:

```ts
function list() {
  for (let task of tasks) {
    let check = task.status === "complete" ? "[✔︎] " : "[ ] ";
    let birthday = task.birthday.toLocaleDateString("en-GB");
    console.log(check + task.content + " " + birthday);
  }
}
```

Unfortunately we've got an error:

```
'task.birthday' is possibly 'undefined'.
```

Since we made the `birthday` property optional we need to handle the case where a task doesn't have this property. We also probably want to log different formats for tasks vs birthdays.

Unfortunately the way we've structured our data has made this kind of difficult—tasks and birthdays aren't really that similar, so it would make more sense for them to be separate types. That would avoid the mess of having to check for optional properties all over the place.

Let's extract a new type alias to represent birthday objects:

```ts
type Birthday = {
  kind: "birthday";
  name: string;
  date: Date;
  id: number;
  createdAt: Date;
};
```

We can then update the `tasks` array to contain either `Task` object _or_ a `Birthday` object (using a union):

```ts
let tasks: Array<Task | Birthday> = [];
```

We'll also update the `Task` definition to make `status` a required property again.

```ts
type Task = {
  // ...
  kind: "task";
  status: "incomplete" | "complete";
};
```

We've also added a new property to both types: `kind`. This will allow us to check what type we're working with, and is generally a good way to structure type unions (it's known as ["discriminating unions"](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions)).

Finally we'll update our other functions to fit the new structure:

```ts
function create(content: string): Task {
  let task: Task = {
    kind: "task",
    // ...
  };
  // ...
}

function createBirthday(name: string, date: string): Birthday {
  let task: Birthday = {
    kind: "birthday",
    content,
    date: new Date(birthday),
    id: index++,
    createdAt: new Date(),
  };
  tasks.push(task);
  return task;
}

function complete(id: number) {
  let task = tasks.find((task) => task.id === id);
  if (task && task.kind === "task") task.status = "complete";
  // Birthdays don't have `status`
}
```

Our `list` function is now easier to write, since we can split the logic for each kind of task:

```ts
function list() {
  for (let task of tasks) {
    if (task.kind === "birthday") {
      let birthday = task.date.toLocaleDateString("en-GB");
      console.log("[★]" + task.name + " " + birthday);
    } else {
      let check = task.status === "complete" ? "[✔︎] " : "[ ] ";
      console.log(check + task.content);
    }
  }
}
```

TypeScript can narrow the type of `task` inside each branch of the `if` so that it knows what properties are available.

### Styling text

Our logs to the terminal are looking a little boring. Luckily as of Node version 20 we can apply styles to this text using the built-in [`util` module](https://nodejs.org/docs/latest-v20.x/api/util.html#utilstyletextformat-text).

```ts
import { styleText } from "node:util";
```

Unfortunately this will immediately cause an error:

```
Cannot find module 'node:util' or its corresponding type declarations.
```

#### Third party types

Node is not written in TypeScript, and so does not include built-in type definitions. TS needs us to provide these definitions, otherwise it has no idea what `node:util` exports.

When a library you want to use does not include its own types you can usually find them in the community project [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). You can install types from this project using `npm` in your terminal:

```shell
npm i -D @types/node
```

This will fix our error and let us use any Node built-ins without any problems.

Now we can use `styleText` to make our logs prettier:

```ts
console.log(styleText("dim", check) + styleText("bold", task.content));
```

## Bonus TypeScript features

There are some useful things that we didn't need to build this app. They're a little more advanced, but included here for reference as you may need them when building more complex things.

### Type assertions

Sometimes TS has no way to know what type a value is. For example when data is coming from outside the program (like the response to a `fetch` request). In these cases you may need to override the type system and just enforce a particular type using the `as` keyword.

For example when working with the DOM:

```ts
const el = document.querySelector("#test");
console.log(el.textContent); // 'el' is possibly 'null'.
```

TS has no way of knowing whether an element with this ID exists in the DOM, so it will force you to check to make sure the variable is not `null`. There are two ways to handle this. If you are sure there is an element with that ID you can [assert the type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) using `as`:

```ts
const el = document.querySelector("#test") as HTMLDivElement;
console.log(el.textContent);
```

Or you can actually check your assumption is correct using code to narrow the type:

```ts
const el = document.querySelector("#test");
if (el instanceof HTMLDivElement) {
  console.log(el.textContent);
}
```

{% box %}

For validating more complex types it is common to use an external validation library like [Valibot](https://valibot.dev/) or [Zod](https://zod.dev/) for this. They can check a value and also confirm the correct type to TS all in one go.

{% endbox %}

### Unknown types

Sometime you just cannot know the type of something. In these cases you have two options: `any` and `unknown`. The `any` type effectively turns off type-checking, which makes it very dangerous. You're telling TS: "any type is valid here, so don't both checking it". This can be a big source of bugs, so it's generally not advised to rely on `any`. If a type is [`unknown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown) TS will force you to narrow it before you can do anything with it. For example:

```ts
function stringify(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (Array.isArray(value)) return value.join(" ");
  return "Unknown type";
}
```

### Intersection types

We can use the [`&` operator](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types) to combined multiple types into one. This is like the inverse of a union, which makes a type more permissive. Instead it makes a type stricter. For example:

```ts
type Pet = {
  name: string;
};

type Dog = Pet & {
  says: "woof";
};

let fido: Dog = {
  name: "fido",
  says: "woof",
};
```

### Generics

Sometimes you might want to write dynamic types that depend on some later type. For example the built-in array type we saw earlier needs to know what type of thing it is going to hold (e.g. `Array<string>`). TS uses ["generics"](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content) for this—you can think of them like parameters for your types.

For example if we wanted to represent the return type of functions that can fail:

```ts
type Result<Type> = Type | Error;
// Can either be the type we pass in, or an error

function run(): Result<number> {
  // do some stuff that might not work
  let result = calculationThatMightFail();
  if (!result) {
    return new Error("Failed");
  } else {
    return result;
  }
}
```

Generics are an advanced topic so you probably won't need to write your own very often yet, but it's good to know what's happening when you see pointy brackets.
