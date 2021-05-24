---
title: Refactor React classes
description: Learn how to rewrite older React classes to use the newer hooks
tags:
  - workshop
  - js
keywords:
  - js
  - react
  - class
---

Hooks like `useState`, `useEffect` (and more) were added to React a couple of years ago. Before that stateful components had to be created using JavaScript classes. It's important to be able to read class-based code since you might encounter it out in the world.

## Classes

Classes were added to JS with ES6. They're a special syntax for creating reusable objects with methods and properties.

They can also "extend" other classes to inherit their properties.

```js
class Dog {
  sayName() {
    return this.name;
  }
}

class Fido extends Dog {
  name = "Fido";
}

const myFido = new Fido();
myFido.sayName(); // "Fido"
// Note the Fido class didn't define a sayName method. It was inherited from Dog
```

Don't worry too much about classes—they're rarely used in React anymore, and even when they were hardly any of their features were used.

### Syntax

React class components are created by _extending_ the `React.Component` base class:

```jsx
class Counter extends React.Component {
  render() {
    return <button>Count is 0</button>;
  }
}
```

The `render()` method is the equivalent of a function component body. You return React elements from here to render them to the DOM.

### Updating state

We can set a class property named `state` to tell React to keep track of some values. This property is always an object.

```jsx
class Counter extends React.Component {
  state = {
    count: 0,
  };
  render() {
    return <button>Count is {this.state.count}</button>;
  }
}
```

We can access the state object via `this.state`.

If we want to update state we call `this.setState()` and pass in a new object. React will merge this object with the existing state:

```jsx
class Counter extends React.Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count is {this.state.count}
      </button>
    );
  }
}
```

We can also store methods as properties on the class so they're reusable:

```jsx
class Counter extends React.Component {
  state = {
    count: 0,
  };
  increment = () => this.setState({ count: this.state.count + 1 });
  render() {
    return (
      <button onClick={this.increment}>Count is {this.state.count}</button>
    );
  }
}
```

`this.setState()` can take a function instead of an object if you need to access the previous state value (the same as with `React.useState()`).

```jsx
class Counter extends React.Component {
  state = {
    count: 0,
  };
  increment = () =>
    this.setState((oldState) => {
      return { count: oldState.count + 1 };
    });
  render() {
    return (
      <button onClick={this.increment}>Count is {this.state.count}</button>
    );
  }
}
```

### Effects

Classes don't have a built-in way to deal with side-effects. Instead you have to hook into their "lifecycle" using specially named methods. These function are called at various points by React as it creates your component, puts it into the DOM, updates it or removes it.

For example to run some code when React is ready to render your component to the page we use `componentDidMount`:

```jsx
class Pokemon extends React.Component {
  state = {
    data: null,
  };
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  }
  render() {
    if (!data) return <div>Loading...</div>;
    return <div>{data.name}</div>;
  }
}
```

To run some code when your component updates (i.e. is passed new props or `setState` is called) you can use `componentDidUpdate()`. To clean up after your component (i.e. cancelling timers or removing global event listeners) you can use `componentDidUnmount()`. There are [quite a lot of these](https://reactjs.org/docs/react-component.html#the-component-lifecycle) and you probably won't need them all.

## Exercise

1. Download the starter files and `cd` in
1. Run `npm install`
1. `npm test` to start the test watcher
1. Rewrite `src/Counter.js` to use hooks instead of classes
1. Rewrite `src/Keyboard.js` to use hooks instead of classes
1. Rewrite `src/Pokemon.js` to use hooks instead of classes
1. Keep all the tests passing!
