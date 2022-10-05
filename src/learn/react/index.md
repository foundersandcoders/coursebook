---
title: Building client-side apps with React
description: Learn how to create client-side apps using React
tags:
  - workshop
keywords:
  - js
  - react
  - jsx
challenge: https://github.com/foundersandcoders/react-challenge
---

React makes dealing with the DOM in JavaScript more like writing HTML. It helps package up elements into "components" so you can divide your UI up into reusable pieces. You can try out the examples online by creating a new [React playground](https://react.new).

## Quick summary

A lot of React concepts are explained in detail below. If you just want to get started quickly here's a code sample with the most important features:

```jsx
import { useState } from "react";
import ReactDOM from "react-dom";

function Counter() {
  // Calling the `setCount` with a new value re-runs your component
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Any properties passed to the component are available on the `props` object
function Title(props) {
  return <h1 id={props.id}>{props.children}</h1>;
}

function App() {
  return (
    <div>
      <Title id="main-title">Hello world</Title>
      <Counter />
    </div>
  );
}

// React handles all DOM element creation/updates—you just call `render` once
ReactDOM.render(<App />, document.querySelector("#root"));
```

## React elements

Interacting with the DOM can be awkward when you just want to render an element:

```js
const title = document.createElement("h1");
title.className = "title";
title.textContent = "Hello world!";
```

This is frustrating because there is a simpler, more declarative way to describe elements—HTML:

```html
<h1 class="title">Hello world!</h1>
```

Unfortunately we can't use HTML inside JavaScript files. HTML is a static markup language—it can't create elements dynamically as a user interacts with our app. This is where React comes in:

```jsx
const title = <h1 className="title">Hello world!</h1>;
```

This variable is a _React element_. It's created using a special syntax called [JSX](https://reactjs.org/docs/introducing-jsx.html) that lets us write HTML-like elements within our JavaScript.

{% box %}

JSX is **not valid JavaScript**. It's a special syntax to make creating DOM elements more like writing HTML. Browsers don't understand it, so React code has to be processed using a tool like [Vite](https://vitejs.dev/) before it's run.

Some tools require the `.jsx` file extension to indicate non-standard syntax.

{% endbox %}

The example above will be transformed into a JS function call that returns an object:

```js
const title = _jsx("h1", { className: "title", children: "Hello world!" });
/*
 *  Over-simplified for examples sake:
    {
      type: "h1",
      props: {
        className: "title",
        children: "Hello world!",
      },
    }
*/
```

{% box "error" %}

### Important warning

Since JSX is closer to JS than HTML **we have to use the camelCase versions of HTML attributes**: `class` becomes `className`, `for` becomes `htmlFor` and `tabindex` becomes `tabIndex` etc.

Also self-closing tags (like `<img>`) **must** have a closing slash: `<img />`. This is optional in HTML but required in JSX.

{% endbox %}

## Templating dynamic values

JSX supports inserting dynamic values into your elements. It uses a similar syntax to JS template literals: anything inside curly brackets will be evaluated as a JS expression:

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

React elements aren't very useful on their own, since they're just static objects. To build an interface we need something reusable and dynamic, like functions.

A _React component_ is a function that returns a React element.

```jsx
function Title() {
  return <h1 className="title">Hello world!</h1>;
}
```

### Valid elements

Your components don't _have_ to return JSX. A React element can be JSX, or a string, number, boolean, or array of elements. Returning `null`, `undefined`, `false` or `""` will cause your component to render nothing.

Returning an array is especially useful for [rendering lists](https://beta.reactjs.org/learn/rendering-lists) from data:

```jsx
const fruits = ["apple", "orange", "banana"];

function FruitList() {
  const items = fruits.map((fruit) => <li key={fruit}>{fruit}</li>);
  return <ul>{items}</ul>;
}
```

Array items in JSX must have a special unique [`key` prop](https://beta.reactjs.org/learn/rendering-lists#keeping-list-items-in-order-with-key) so React can keep track of the order if the data changes.

{% box %}

Components are normal JS functions, which means they can **only return one thing**. The following JSX is invalid:

```jsx
// This won't work!
function Thing() {
  return (
    <span>Hello</span>
    <span>Goodbye</span>
  )
}
```

since the `Thing` function is trying to return _two_ objects. The solution to this is to wrap sibling elements in a parent `<div>` (or use a [Fragment](https://reactjs.org/docs/fragments.html)).

{% endbox %}

### Composing components

Components are useful because JSX allows us to compose them together just like HTML elements. We can use our `Title` component as JSX within another component:

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

**You have to capitalise your component names**. This is how JSX distinguishes between HTML and React components. E.g. `<img />` will create an HTML image tag, but `<Img />` will look for a component function named `Img`.

{% endbox %}

## Customising components

A component where everything is hard-coded isn't very useful. Functions are most useful when they take _arguments_. Passing different arguments lets us change what the function returns each time we call it.

JSX supports passing arguments to your components. It does this using the same syntax as HTML:

```jsx
<Title name="oli" />
/**
 * The above JSX is transformed into this:
 * _jsx(Title, { name: "oli" });
 */
```

Most people name this object "props" in their component function:

```jsx
function Title(props) {
  console.log(props); // { name: "oli" }
  return <div className="title">Hello world</div>;
}
```

We can use these props within your components to customise them. For example we can insert them into our JSX:

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
/**
 * <div class="page">
 *  <h1 class="title">Hello oli</h1>
 *  <h1 class="title">Hello sam</h1>
 * </div>
 */
```

### Non-string props

Since JSX is JavaScript it supports passing _any_ valid JS expression to your components, not just strings. To pass JS values as props you use **curly brackets**, just like interpolating expressions inside tags.

```jsx
function Page() {
  const fullname = "oliver" + " phillips";
  return (
    <div className="page">
      <Title name={fullname} />
      <Title name={5 * 5} />
    </div>
  );
}
/**
 * <div class="page">
 *  <h1 class="title">Hello oliver phillips</h1>
 *  <h1 class="title">Hello 25</h1>
 * </div>
 */
```

### Children

It would be nice if we could nest our components just like HTML. Right now this won't work, since we hard-coded the text inside our `<h1>`:

```jsx
<Title>Hello oli</Title>
/**
 * The above JSX is transformed into this:
 * _jsx(Title, { children: "hello oli" });
 */
```

JSX supports a special prop to achieve this: `children`. Whatever value you put _between_ JSX tags will be passed to the component function as a prop named `children`.

You can then access and use it exactly like any other prop.

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

You may be wondering how we get these components to actually show up on the page. React manages the DOM for you, so you don't need to use `document.createElement`/`.appendChild`.

React consists of two libraries—the main `React` library and a specific `ReactDOM` library for rendering to the DOM. We use the `ReactDOM.render()` function to render a component to the DOM.

It's common practice to have a single top-level `App` component that contains all the rest of the UI.

```jsx
import ReactDOM from "react-dom";

function App() {
  return (
    <Page>
      <Title>Hello world!</Title>
      <p>Welcome to my page</p>
    </Page>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

{% box %}

You only call `ReactDOM.render()` **once per app**. You give it the very top-level component of your app and it will move down the component tree rendering all the children inside of it.

{% endbox %}

{% disclosure "A bit more detail (if you're interested)" %}

The component functions return React elements, which are objects describing an element, its properties, and its children. These objects form a tree, with a top-level element that renders child elements, that in turn have their own children. Here is a small React component that renders a couple more:

```jsx
import ReactDOM from "react-dom";

function App() {
  return (
    <Page>
      <Title>Hello world!</Title>
      <p>Welcome to my page</p>
    </Page>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
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

---

## Event listeners

JSX makes adding event listeners simple—you add them inline on the element you want to target. They are always formatted as "on" followed by the camelCased event name ("onClick", "onKeyDown" etc):

```jsx
function Alerter() {
  return <button onClick={() => alert("hello!")}>Say hello</button>;
}
```

## React state

An app can't do much with static DOM elements—we need a way to create values that can _change_ and trigger updates to the UI.

React provides a special "hook" function called `useState` to create a stateful value. When you update the value React will automatically re-render the component to ensure the UI stays up-to-date.

When this button is clicked we want the count to go up one:

```jsx
function Counter(props) {
  const count = 0;
  return <button onClick={() => {}}>{count}</button>;
}
```

We need to use the `useState` hook. It takes the initial state value as an argument, and returns an array. This array contains the state value itself, and a function that lets you _update_ the state value.

```jsx
import { useState } from "react";

function Counter(props) {
  const stateArray = useState(0);
  const count = stateArray[0];
  const setCount = stateArray[1];
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

It's common to use destructuring to shorten this:

```jsx
import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

If we call `setCount(1)` React will re-run our `Counter` component, but this time the `count` variable will be `1` instead of `0`. This is how React keeps your UI in sync with the state.

{% box "error" %}

**Never change a state variable directly.** React needs to know about changes, otherwise it won't re-render the component. For example `count++` will change the old copy of the state value but won't re-run the component.

{% endbox %}

### Lifting state up

React components encapsulate their state—it lives inside that function and can't be accessed elsewhere. Sometimes however you need several components to read the same value. In these cases you should ["lift the state up"](https://beta.reactjs.org/learn/sharing-state-between-components) to a shared parent component:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <FancyButton count={count} setCount={setCount} />
      <FancyText>{count}</FancyText>
    </div>
  );
}

function FancyButton(props) {
  function increment() {
    props.setCount(props.count + 1);
  }
  return (
    <button className="fancy-button" value={props.name} onClick={increment}>
      + 1
    </button>
  );
}

function FancyText(props) {
  return <p className="fancy-text">{props.children}</p>;
}
```

Here `FancyButton` and `FancyText` both need access to the state, so we move it up to `Counter` and pass it down via props. That way both components can read/update the same state value.

### Updates based on previous state

Sometimes your update depends on the previous state value. For example updating the count inside an interval. In these cases you can [pass a _function_](https://beta.reactjs.org/apis/react/useState#updating-state-based-on-the-previous-state) to the state updater. React will call this function with the previous state, and whatever you return will be set as the new state.

```jsx
// ...
const [count, setCount] = useState(0);
// ...
setInterval(() => {
  setCount((previousCount) => {
    const nextCount = previousCount + 1;
    return nextCount;
  });
}, 1000);
// or more concisely:
// setInterval(() => setCount(c => c + 1), 1000);
```

We cannot just reference `count`, since this is `0` when the interval is created. It would just do `0 + 1` over and over (so the count would be stuck at `1`).

---

## Form fields

React apps still use the DOM, so forms work the same way:

```jsx
function ChooseName() {
  const [name, setName] = useState("");

  function updateName(event) {
    event.preventDefault();
    setName(event.target.username.value);
  }

  return (
    <form onSubmit={updateName}>
      <input name="username" aria-label="Username" />
      <button>Update name</button>
      <output>Your name is: {username}</output>
    </form>
  );
}
```

React tries to normalise the different form fields, so behaviour is consistent across e.g. `<input>` and `<select>`. If you need to keep track of values _as they update_ you can add an `onChange` listener and `value` prop.

```jsx
function ChooseRating() {
  const [rating, setRating] = useState(3);

  function updateRating(event) {
    setFruit(+event.target.value);
  }

  return (
    <form>
      <input
        type="range"
        value={rating}
        onChange={updateRating}
        min="1"
        max="5"
        aria-label="Rating"
      />
      <output>{"⭐️".repeat(rating)}</output>
    </form>
  );
}
```

---

## Side effects

So far we've seen how React keeps your UI in sync with your data. Your components describe the UI using JSX and React updates the DOM as required. However apps sometimes your app needs to sync with something else, like fetching from an API or setting up a timer.

These are known as "side effects", and they can't be represented with JSX. This means we need a different way to ensure our side effects stay in sync just like our UI.

{% box %}

Effects can be a little complicated, and devs [often use them unnecessarily](https://beta.reactjs.org/learn/you-might-not-need-an-effect). Try to prefer solving problems with state and event listeners, and save the Effects for things that cannot be done with JSX.

{% endbox %}

### Using effects

React provides another "hook" like `useState()` for running side-effects _after_ your component renders. It's called `useEffect()`. It takes a function as an argument, which will be run after every render by default.

Here's our counter, with an effect to sync the document title with the count:

```jsx
function Counter(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

Calling `setCount` will trigger a re-render, which will cause the Effect to re-run, so the title will stay in sync with our state.

![effect-example](https://user-images.githubusercontent.com/9408641/57864430-c9ecac00-77f3-11e9-8811-1242688c3e7d.gif)

{% box %}

We can't just put the `document.title` line directly in our component body, because [React components should be "pure"](https://beta.reactjs.org/learn/keeping-components-pure). This means they should just return JSX and have no side-effects as a result of rendering.

{% endbox %}

### Skipping effects

By default all the Effects in a component will re-run after **every** render of that component. This ensures the Effect always has the correct state values. However what if we had multiple state values? Updating unrelated state would re-run the Effect even if `count` hadn't changed.

`useEffect()` takes a second argument: an array of _dependencies_ for the Effect. Any variable used inside your Effect function should go into this array:

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

Now the Effect will only re-run if the value of `count` has changed.

### Effects with no dependencies

Sometimes your Effect will not be dependent on _any_ props or state. In this case you can pass an empty array, to signify that the Effect has no dependencies and shouldn't need to be re-run.

Here we want to show what key the user pressed, so we need an event listener on the window. This listener only needs to be added once:

```jsx
function KeyDisplay(props) {
  const [key, setKey] = useState("");

  useEffect(() => {
    function updateKey(event) {
      setKey(event.key);
    }
    window.addEventListener("keydown", updateKey);
  }, []);

  return <div>{key}</div>;
}
```

Without the empty dependency array we would end up adding a new event listener every time the Effect re-ran. This could cause performance problems.

### Cleaning up effects

It's important your Effects can clean up after themselves. Otherwise they might leave their side-effects around when the component is "unmounted" (e.g. if the user navigates to another page).

Our previous example needs to make sure the event listener is removed from the window. We can tell React to do this by returning a function from the Effect. React will call this function whenever it needs to clean up: both when the component is unmounted _and_ before re-running the Effect.

```jsx
// ...
useEffect(() => {
  function updateKey(event) {
    setKey(event.key);
  }
  window.addEventListener("keydown", updateKey);
  return () => window.removeEventListener("keydown", updateKey);
}, []);
// ...
```

React helps you remember to do this by [running Effects _twice_ during development](https://beta.reactjs.org/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development) (even if you pass an empty dependency array). This is designed to help you catch places where you forgot to clean up your Effect.
