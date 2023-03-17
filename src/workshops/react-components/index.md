---
title: React components
description: Learn the basics of creating DOM elements using JSX and React components
tags:
  - workshop
  - js
keywords:
  - js
  - react
  - jsx
---

React makes dealing with the DOM in JavaScript more like writing HTML. It helps package up elements into "components" so you can divide your UI up into reusable pieces.

## React elements

Interacting with the DOM can be a frustrating experience. It requires lots of awkward lines of code where you tell the browser _exactly_ how to create an element with the right properties.

```js
const title = document.createElement("h1");
title.className = "title";
title.textContent = "Hello world!";
```

Even if we create our own function to handle some of the repetitive parts it's a little hard to read:

```js
const title = createEl("h1", { className: "title" }, "Hello world!");
```

This is frustrating because there is a simpler, more declarative way to create elements: HTML.

```html
<h1 class="title">Hello world!</h1>
```

Unfortunately we can't use HTML inside JavaScript files. HTML can't create elements dynamically as a user interacts with our app. This is where React comes in:

```jsx
const title = <h1 className="title">Hello world!</h1>;
```

This variable is a _React element_. It's created using a special syntax called [JSX](https://react.dev/learn/writing-markup-with-jsx) that lets us write HTML-like elements within our JavaScript.

{% box %}

JSX is **not valid JavaScript**. It's a special syntax to make creating DOM elements more like writing HTML. Since it isn't JS browsers don't understand it. React apps have to use a tool like [Babel](https://babeljs.io/) to turn this non-standard syntax into regular JS function calls.

Some devs like to use the `.jsx` extension to indicate that a file contains this non-standard syntax (and so can't be run in the browser directly).

{% endbox %}

The example above will be transformed into this normal JS:

```js
const title = React.createElement("h1", { className: "title" }, "Hello world!");
```

This function call returns an object that describes your element:

```js
// over-simplified for examples sake
const title = {
  type: "h1",
  props: {
    className: "title",
    children: "Hello world!",
  },
};
```

React builds up one big tree structure of all these element objects that represents your entire app. It then uses this tree to create the actual DOM elements for you. (This is called the virtual DOM, but you don't need to worry about that right now)

It can be helpful to remember that the HTML-like syntax is really normal function calls that return objects.

{% box "error" %}

### Important warning

Since JSX is closer to JS than HTML **we have to use the camelCase versions of HTML attributes**: `class` becomes `className`, `for` becomes `htmlFor` and `tabindex` becomes `tabIndex` etc.

Also self-closing tags (like `<img>`) **must** have a closing slash: `<img />`. This is optional in HTML but required in JSX.

{% endbox %}

## Templating dynamic values

JSX supports inserting dynamic values into your elements. It uses a similar syntax to JS template literals: anything inside curly brackets will be evaluated as a JS expression, and the _result_ will be rendered. For example:

```jsx
const title = <h1>Hello {5 * 5}</h1>;
// <h1>Hello 25</h1>
```

You can do all kinds of JS stuff inside the curly brackets, like referencing other variables, or conditional expressions.

```jsx
const name = "oli";
const title = <h1>Hello {name}</h1>;
// <h1>Hello oli</h1>
```

```jsx
const number = Math.random();
const result = <div>{number > 0.5 ? "You won!" : "You lost"}</div>;
// 50% of the time: <div>You won!</div>
// the other 50%: <div>You lost</div>
```

### Note on expressions

You can put any valid JS _expression_ inside the curly brackets. An expression is code that _resolves to a value_. I.e. you can assign it to a variable. These are all valid expressions:

```js
const number = 5 + 4 * 9;
const isEven = number % 2 === 0;
const message = isEven ? "It is even" : "It is odd";
```

This is _not_ a valid expression:

```js
const message = if (isEven) { "It is even" } else { "It is odd" };
// this is not valid JS and will cause an error
```

`if` blocks are _statements_, not expressions. The main impact of this is that you have to use ternaries instead of `if` statements inside JSX.

---

## React components

React elements aren't very useful on their own. They're just static objects. To build an interface we need something reusable and dynamic, like functions.

A _React component_ is a function that returns a React element.

```jsx
function Title() {
  return <h1 className="title">Hello world!</h1>;
}
```

### Valid elements

A React element can be a JSX element, or a string, number, boolean or array of JSX elements. Returning `null`, `undefined`, `false` or `""` (empty string) will cause your component to render nothing.

{% box %}

Components are normal JS functions, which means they can **only return one thing**. So the following JSX is invalid:

```jsx
// This won't work!
function Thing() {
  return (
    <span>Hello</span>
    <span>Goodbye</span>
  )
}
```

since the `Thing` function is trying to return _two_ objects. The solution to this is to wrap sibling elements in a parent `<div>` (or use a [Fragment](https://react.dev/reference/react/Fragment#returning-multiple-elements)).

{% endbox %}

### Composing components

Components are useful because JSX allows us to compose them together just like HTML elements. We can use our `Title` component as JSX within another component. It's like making your own custom HTML tags.

```jsx
function Title() {
  return <h1 className="title">Hello world!</h1>;
}

function Page() {
  return (
    <div className="page">
      <Title />
    </div>
  );
}
```

When we use a component in JSX (`<Title />`) React will find the corresponding `Title` function, call it, and use whatever element it returns.

{% box %}

**You have to capitalise your component names**. This is how JSX distinguishes between HTML and custom components. E.g. `<img />` will create an HTML image tag, but `<Img />` will look for a component function named `Img`.

{% endbox %}

## Customising components

A component where everything is hard-coded isn't very useful. It will always return the exact same thing, so there's almost no point being a function. Functions are most useful when they take _arguments_. Passing different arguments lets us change what the function returns each time we call it.

JSX supports passing arguments to your components. It does this using the same syntax as HTML:

```jsx
<Title name="oli" />
```

React component functions only ever receive _one_ argument: an object containing all of the arguments passed to it. React will gather up any `key="value"` arguments from the JSX and create this object.

This object is commonly named "props" (short for properties). Using an object like this means you don't have to worry the order of arguments. So in this case our `Title` function will receive a single argument: an object with a "name" property.

```jsx
function Title(props) {
  console.log(props); // { name: "oli" } (assuming <Title name="oli" /> was used)
  return <div className="title">Hello world</div>;
}
```

You can use these props within your components to customise them. For example we can interpolate them into our JSX to change the rendered HTML:

```jsx
function Title(props) {
  return <div className="title">Hello {props.name}</div>;
}
```

Now we can re-use our `Title` component to render different DOM elements:

```jsx
function Page() {
  return (
    <div className="page">
      <Title name="oli" />
      <Title name="sam" />
    </div>
  );
}
// <div class="page"><h1 class="title">Hello oli</h1><h1 class="title">Hello sam</h1></div>
```

### Non-string props

Since JSX is JavaScript it supports passing _any_ valid JS expression to your components, not just strings. To pass JS values as props you use **curly brackets**, just like interpolating expressions inside tags.

```jsx
function Page() {
  const customName = "oliver" + " phillips";
  return (
    <div className="page">
      <Title name={customName} />
      <Title name={5 * 5} />
    </div>
  );
}
// <div class="page"><h1 class="title">Hello oliver phillips</h1><h1 class="title">Hello 25</h1></div>
```

### Children

It would be nice if we could nest our components just like HTML. Right now this won't work, since we hard-coded the text inside our `<h1>`:

```jsx
<Title>Hello oli</Title>
```

JSX supports a special prop to achieve this: `children`. Whatever value you put _between_ JSX tags will be passed to the component function as a prop named `children`. You can then access and use it exactly like any other prop.

```jsx
function Title(props) {
  return <div className="title">{props.children}</div>;
}
```

Now this JSX will work as we expect:

```jsx
<Title>Hello oli</Title>
// <h1 class="title">Hello oli</h1>
```

This is quite powerful, as you can now nest your components to build up more complex DOM elements.

```jsx
// pretend we have defined Image and BigText components above
<Title>
  <Image src="hand-wave.svg" />
  <BigText>Hello oli</BigText>
</Title>
```

## Rendering to the page

You may be wondering how we get these React components to actually show up on the page.

React consists of two libraries—the main `React` library and a specific `ReactDOM` library for rendering to the DOM (since React can also to render Virtual Reality or Native mobile apps).

We use the `ReactDOM.render()` function to render a component to the DOM. It takes an element as the first argument and a DOM node as the second.

It's common practice to have a single top-level `App` component that contains all the rest of the UI.

```jsx
function App() {
  return (
    <Page>
      <Title>Hello world!</Title>
      <p>Welcome to my page</p>
    </Page>
  );
}

const rootNode = document.querySelector("#root");
ReactDOM.render(<App />, rootNode);
```

{% box %}

You only call `ReactDOM.render()` **once per app**. You give it the very top-level component of your app and it will move down the componen tree rendering all the children inside of it.

{% endbox %}

{% disclosure "A bit more detail (if you're interested)" %}

The component functions return React elements, which are objects describing an element, its properties, and its children. These objects form a tree, with a top-level element that renders child elements, that in turn have their own children. Here is a small React component that renders a couple more:

```jsx
function App() {
  return (
    <Page>
      <Title>Hello world!</Title>
      <p>Welcome to my page</p>
    </Page>
  );
}

const rootNode = document.querySelector("#root");
ReactDOM.render(<App />, rootNode);
```

`<App />` tells React to call the `App` function and pass in any child elements as `props.children`. This returns an object roughly like this:

```js
// React's actual internal representation is a bit more complex
{
  type: Page,
  props: {
    children: [
      {
        type: Title,
        props: {
          children: "Hello world!",
        },
      },
      {
        type: "p",
        props: {
          children: "Welcome to my page",
        },
      },
    ],
  },
}
```

This object is passed to `ReactDOM.render`, which will loop through every property. If it finds a string type (e.g. "p") it'll create a DOM node. If it finds a function type it'll call the function with the right props to get the elements that component returns. It keeps doing this until it runs out of elements to render.

This is the final DOM created for this app:

```html
<div class="page">
  <h1>Hello world!</h1>
  <p>Welcome to my page</p>
</div>
```

{% enddisclosure %}

## Challenge

Time to create some components! Open up `challenge.html` in your editor. You should see the components we created above. Open this file in your browser too to see the components rendered to the page.

{% box %}

It's a good idea to keep the console open. Since all rendering happens with JS the page will be blank if something goes wrong—the console will show you any errors.

{% endbox %}

Create a new component called `Card`. It should take 3 props: `title`, `image` and `children`, that render into `h2`, `img` and `p` elements respectively.

Replace the `p` in the `App` component with a `Card`. Pass whatever you like as the 3 props (although here's an image URL you can use: `https://source.unsplash.com/400x300/?burger`).

<img width="489" alt="task example" src="https://user-images.githubusercontent.com/9408641/58386359-a0ebc880-7ff6-11e9-8214-48b9206aa711.png">

{% box %}

**Hint:** This is how you'd use your `Card` component:

```jsx
function App() {
  return (
    <Page>
      <Title>Hello world!</Title>
      <Card
        title="Tasty burger"
        image="https://source.unsplash.com/400x300/?burger"
      >
        That is a good burger
      </Card>
    </Page>
  );
}
```

{% endbox %}

{% disclosure %}

```jsx
function Card(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <img src={props.image} alt="" />
      <p>{props.children}</p>
    </div>
  );
}
```

{% enddisclosure %}
