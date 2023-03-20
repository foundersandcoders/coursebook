---
title: React state & effects
description: Learn how to use the useState and useEffect hooks to create dynamic interactions in React
tags:
  - workshop
  - js
keywords:
  - js
  - react
  - state
  - effects
---

React is designed to build dynamic apps with lots of interaction. A common difficulty with apps like this is keeping the DOM up-to-date as the user interacts. React has two concepts to help keep this manageable: "state" and "effects".

## React state

State is data that changes while your application is running. This might be in response to user actions, or after a `fetch` request finishes.

In React all stateful values are stored in JS as special variables. We can render our UI based on these variables—when they change React will automatically re-run the component function and update the DOM to reflect the new state value.

### Using state

Imagine we have a counter component. When the button is clicked we want the count to go up one:

```jsx
function Counter(props) {
  const count = 0;
  return <button>Count is {count}</button>;
}
```

We need some way to make our `Counter` function run again if this value changes.

The `React.useState` method can be used to create a "stateful" value. It takes the initial state value as an argument, and returns an array. This array contains two things: the state value, and a function that lets you _update_ the state value.

```jsx
function Counter(props) {
  const stateArray = React.useState(0);
  const count = stateArray[0];
  const setCount = stateArray[1];
  return <button>Count is {count}</button>;
}
```

It's common to use array destructuring to simplify this:

```jsx
function Counter(props) {
  const [count, setCount] = React.useState(0);
  return <button>Count is {count}</button>;
}
```

The `setCount` function lets us update our state value and tells React to re-run this component. E.g. if we called `setCount(10)` React will call our `Counter` component function again, but this time the `count` variable would be `10` instead of `0`.

This is how React keeps your UI in sync with the state.

{% box "error" %}

**Never change a state variable directly.** React needs to know about any changes to the value, otherwise it won't re-render the component correctly. For example `count++` will change the old copy of the state value but won't re-run the component.

{% endbox %}

<!-- ### Updates based on previous state

Sometimes you need access to the old value of the state in order to update. The state updater functions also accept a _function_ as an argument. React will call this function with the old state value, and whatever you return from it will be set as the new state.

E.g. instead of `setCount(10)` we could do `setCount(oldCount => oldCount + 1)` to update the count by one. You'll see an example of when this is necessary in the next section.

<details>
  <summary>A fake implementation that might help</summary>

```js
function useState(initialState) {
  // keep track of a state value
  let state = initialState;
  // create a function that can update the state
  function setState(update) {
    // if the user passed a function we call it with the old state
    // then set the return value of the function as the new state
    if (typeof update === "function") {
      const newState = update(state);
      state = newState;
    } else {
      // otherwise we just directly update the state
      state = update;
    }
    // some magic React internal that will cause your component function to re-run
    // this allows your component to get the updated value
    rerenderTheComponentSomehow();
  }
  // return the state and updater function in an array for convenience
  return [state, setState];
}
```

</details> -->

## Event listeners

We have a function that will let us update the state, but how do we attach event listeners to our DOM nodes?

```jsx
function Counter(props) {
  const [count, setCount] = React.useState(0);
  function increment() {
    setCount(count + 1);
  }`
  return <button onClick={increment}>Count is {count}</button>;
}
```

You can pass event listener functions in JSX like any other property. They are always formatted as "on" followed by the camelCased event name. So "onClick", "onKeyDown", "onChange" etc.

In this example we are passing a function that calls `setCount` with our new value of `count`.

![counter-example](https://user-images.githubusercontent.com/9408641/57850062-e9281100-77d4-11e9-81cc-befd42f1faf7.gif)

## Challenge 1

Time to add some state! Open up `challenge-1.html` in your editor. You should see the `Counter` component we just created. This is an example; you can delete it if you want.

Create a new component called `Toggle`. It should render a button that toggles a boolean state value when clicked. It should also render a div containing its children, but only when the boolean state value is true.

Example usage:

```jsx
function App() {
  return <Toggle>This text is hidden until the button is clicked</Toggle>;
}
```

![toggle-example](https://user-images.githubusercontent.com/9408641/57849940-98b0b380-77d4-11e9-86ef-315861f60489.gif)

{% box %}

**Hint:** remember you can use ternaries to do conditional logic inside JSX. Rendering `null` or an empty string tells React to put nothing on the page. E.g.

```jsx
<h2>{x > 5 ? null : <div>It's less than 5</div>}<h2>
```

{% endbox %}

{% disclosure %}

```jsx
function Toggle(props) {
  const [open, setOpen] = React.useState(false);
  function toggleOpen() {
    setOpen(!open); // !open gives us the opposite, e.g. true -> false or false -> true
  }
  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
      {open ? <div>{props.children}</div> : null}
    </div>
  );
}
```

{% enddisclosure %}

## Side effects

React is designed to make it easy to keep your application in sync with your data/state. Component functions render DOM elements and keep them in sync with any state values.

But most apps need more than just a UI—there are also things like fetching data from an API, timers/intervals, global event listeners etc. These are known as "side effects"—they can't be represented with JSX.

We need a way to ensure our effects reflect changes in state just like our UI does.

### Using effects

React provides another "hook" like `useState()` for running side-effects _after_ your component renders. It's called `useEffect()`. It takes a function as an argument, which will be run after every render (by default).

Let's say we want our counter component to also update the page title (so the count shows in the browser tab). There's no way to represent this update using the JSX our component returns. Instead we can use an effect:

```jsx
function Counter(props) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    document.title = `Count: ${count}`;
  });

  return <button onClick={() => setCount(count + 1)}>Count is {count}</button>;
}
```

![effect-example](https://user-images.githubusercontent.com/9408641/57864430-c9ecac00-77f3-11e9-8811-1242688c3e7d.gif)

React will run the arrow function we passed to `useEffect()` every time this component renders. Since calling `setCount` will trigger a re-render (as the state is updated) the page title will stay in sync with our state as the button is clicked.

### Skipping effects

By default all the effects in a component will re-run after **every** render of that component. This ensures the effect always has the correct state values.

If your effect does something expensive/slow like fetching from an API (or sorting a massive array etc) then this could be a problem.

`useEffect()` takes a second argument to optimise when it re-runs: an array of _dependencies_ for the effect. Any variable used inside your effect function should go into this array:

```jsx
function Counter(props) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Count is {count}</button>;
}
```

Now our effect will only re-run if the value of `count` has changed.

### Running effects once

Sometimes your effect will not be dependent on _any_ props or state, and you only want it to run once (after the component renders the first time). In this case you can pass an empty array as the second argument to `useEffect()`, to signify that the effect has no dependencies and never needs to be re-run.

For example if we wanted our counter to increment when the "up" arrow key is pressed:

```jsx
function Counter(props) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowUp") {
        setCount((prevCount) => prevCount + 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return <div>Count is {count}</div>;
}
```

We add an event listener to the `window`, and pass an empty array to `useEffect()`. This will keep us from adding new event listeners every time `count` updates and triggers a re-render.

{% box %}

#### Updates based on previous state

It's important to note that we're passing [a function](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state) instead of a number to `setCount`. React will call this function with the old state value, and whatever you return will be set as the new state.

This will ensure we always have the up-to-date current value of `count` when we update it. If we just referenced `count` directly (`setCount(count + 1)`) the value would always be `0`, since that's what it was when we created the event listener. So the count would update to `1`, then never change.

{% endbox %}

### Cleaning up effects

Some effects need to be "cleaned up" if the component is removed from the page. For example timers need to be cancelled and global event listeners need to be removed. Otherwise you'd have a bunch of code running in the background trying to update a component that doesn't exist anymore.

If you return a function from your effect React will save it and call it if the component is removed from the page. React will _also_ run it to clean up when a component re-renders (before the effects run again).

Let's clean up after our effect example from above:

```jsx
function Counter(props) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowUp") {
        setCount((prevCount) => prevCount + 1);
      }
    }
    // run handler function when keydowns happen
    window.addEventListener("keydown", handleKeyDown);
    // create fn that removes event listener
    function cleanup() {
      window.removeEventListener("keydown", handleKeyDown);
    }
    // react will run `cleanup` whenever it needs to remove this effect
    return cleanup;
  }, []);

  return <div>Count is {count}</div>;
}
```

The `cleanup` function we return will be called if the component unmounts (is removed from the page). That will ensure we don't keep running an unnecessary event listener and trying to update state that doesn't exist anymore.

## Challenge 2

We're going to enhance our `Toggle` component from Part 3. You can either keep working in the same file or open up `challenge-2.html` to start fresh.

1. Edit the Toggle component so that the page title (in the tab) shows whether the toggle is on or off.
1. Then create a new component called `MousePosition`. It should keep track of where the mouse is in the window and render the mouse x and y positions.

   {% box %}

   **Hint:** you can keep track of where the mouse is with a "mousemove" event listener on the `window`.

   ```js
   const handleMouseMove = (event) => {
     console.log(event.x, event.y);
   };
   ```

   {% endbox %}

1. Put `MousePosition` inside your `Toggle` so you can show and hide it. This is how your final `App` should look:

   ```jsx
   function App() {
     return (
       <Toggle>
         <MousePosition />
       </Toggle>
     );
   }
   ```

![effect-example](https://user-images.githubusercontent.com/9408641/58380308-758dbd00-7fa7-11e9-8e93-cdc945530d55.gif)

{% disclosure %}

```jsx
function MousePosition(props) {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    function handleMouseMove(event) {
      setX(event.x);
      setY(event.y);
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <pre>
      {x}:{y}
    </pre>
  );
}
```

{% enddisclosure %}
