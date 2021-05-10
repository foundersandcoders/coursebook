---
title: React & fetch
description: Learn how to fetch data from APIs in your React components
tags:
  - workshop
  - js
keywords:
  - js
  - react
  - fetch
  - effects
---

React doesn't have a built-in pattern designed for fetching data. This can make it a little confusing at first, so let's look at how we can combine `useState` and `useEffect` to create a GitHub profile page.

## Setup

1. Download starter files and `cd` in
1. `npm install`
1. `npm run dev`

The `index.html` file loads `workshop/index.jsx`. This imports `workshop/App.jsx` and renders the component using React.

## Part one: side effects

React components are designed to keep the DOM in-sync with your app's data. For example this component will re-render every time the `name` prop changes, ensuring the message is always correct:

```jsx
function Greeting({ name }) {
  return <div>Hello {name}!</div>;
}
```

However some parts of your app cannot be represented with JSX, as they are not part of the DOM. React calls these "effects"—they are extra things your component does (other than the primary task of rendering DOM elements).

In order to ensure React can keep track of these effects and re-run them when our app's data changes we pass them in to the `React.useEffect` function.

### Fetching data

Fetching data is one of these "effects". We run our `fetch` request inside `useEffect` so React can control when it runs (or re-runs).

```jsx
function Pokemon() {
  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then((res) => res.json())
      .then((data) => console.log(data));
  });

  return <div>Hello</div>;
}
```

We have a problem here: our API request could take 10 seconds to finish. However React components are synchronous—they must render something straight away. We cannot wait for the response to be done _before_ returning a value.

Instead we need to _update_ our component with the new data once the response finishes. We can make a component update by **setting state**. Remember that a component will re-run whenever its state values change.

```jsx
function Pokemon() {
  const [pokeData, setPokeData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then((res) => res.json())
      .then((data) => setPokeData(data));
  });

  return <div>Hello</div>;
}
```

We can't _use_ this data immediately, since the API request is asynchronous. Our component will render at least once with the initial state, which here is `null`.

The easiest way to make sure the data has loaded before we use it is to check whether the state variable is there:

```jsx
function Pokemon() {
  const [pokeData, setPokeData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then((res) => res.json())
      .then((data) => setPokeData(data));
  });

  if (!pokeData) {
    return <div>Loading...</div>;
  } else {
    return <div>{pokeData.name}</div>;
  }
}
```

Here's the flow of our component's updates:

1. The component is rendered (i.e. `<Pokemon />` somewhere)
1. React calls the `Pokemon` function
1. React creates the `pokeData` state (because we called `useState`)
1. React queues an effect to run (because we called `useEffect`)
1. `pokeData` is `null` so JS runs the first `if` branch
1. The component returns `<div>Loading...</div>`
1. The queued effect runs, which sends a `fetch` request

Some time passes...

1. The `fetch` request resolves with the response data
1. Our `.then` sets the `pokeData` state as the response object
1. React sees the state update and re-runs the component function
1. This time the `pokeData` state variable is the response object (not `null`)
1. So JS runs the second `if` branch and returns `<div>pikachi</div>`

### Avoiding infinite loops

There is one final problem to solve: our component currently _always_ queues a new effect. This means that after our component's state updates (and re-renders the component) it'll send a _new_ `fetch` request. When this request resolves it'll update the state, re-rendering the component. This will trigger _another_ `fetch`, and so on.

To avoid this infinite loop we need to constrain when the effect runs, by providing the dependencies array as the second argument. This tells React that the effect only needs to re-run if the things inside the array have changed.

In this case our effect has _no_ dependencies, since it doesn't use any values from outside the effect. So we can specify an empty array:

```jsx
React.useEffect(() => {
  // ...
}, []);
```

This tells React "you won't need to re-run this effect, since it doesn't depend on any values that might change and get out of sync".

### Challenge 1: user profile

You're going to build a `Profile` component that fetches a user from the GitHub API and renders their name, avatar image and any other details you like.

1. Create a new component in `workshop/Profile.jsx`
1. It should fetch your profile from `"https://api.github.com/users/{username}"`
1. It should render a loading message until the request is done
1. It should render at least your name & avatar image once the request completes

{% box %}

Don't forget to import and render this component in `workshop/App.jsx`.

{% endbox %}

{% disclosure %}

```jsx
// Profile.jsx

import React from "react";

const USER_URL = "https://api.github.com/users/";

function Profile({ name }) {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    fetch(USER_URL + "oliverjam")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar_url} alt="" width="128" height="128" />
    </div>
  );
}

export default Profile;
```

{% enddisclosure %}

## TBC

1. Amend `Profile` to take a `name` prop that changes which user is fetched
1. Create a `ReposList` component that uses `user.repos_url` to fetch
1. Amend App to add a search input to type the users name
