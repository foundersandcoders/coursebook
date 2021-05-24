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

## Managing effects

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
1. So JS runs the second `if` branch and returns `<div>pikachu</div>`

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

{% box "error" %}

It's really important not to forget this dependency array: if you trigger an infinite fetching loop GitHub might temporarily ban you from their API!

{% endbox %}

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

function Profile() {
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

## Re-running effects

Our `Profile` component would be more useful and reusable if it could fetch _any_ user's GitHub information. Components can be customised by passing in props (just like function arguments). We want to be able to do this:

```jsx
<Profile name="oliverjam" />
```

and have the component fetch that user's profile.

### Challenge 2: re-usable profile

1. Amend `Profile` to take a `name` prop
1. Use this prop to fetch the right data from GitHub
1. Pass a `name` to `<Profile />` inside `App`

{% box %}

**Hint:** you'll need to tell `useEffect` about this new dependency, since it will need to re-run your fetch if/when the `name` prop changes.

{% endbox %}

{% disclosure %}

```jsx
const USER_URL = "https://api.github.com/users/";

function Profile(props) {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    fetch(USER_URL + props.name)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [props.name]);

  if (!user) return <div>Loading...</div>;
  return (...);
}

export default Profile;
```

Note that we had to pass `props.name` to `useEffect` inside the dependency array. Otherwise this would only ever fetch the first name passed in. Later we'll add a feature that lets the user type in a name, so we will need the effect to re-run.

{% enddisclosure %}

## Passing state down

Our `Profile` component can now fetch any user, but we still have to hard-code the prop when we render it in `App`. Ideally we'd let users type the name into a search input, then update the prop we pass down when they submit.

We can achieve this with a state value in `App` that keeps track of the current value of `name`. When the form is submitted you can update that state value, which will cause the `App` component to re-render. This will then cause `Profile` to re-render with the new value of `name` passed as a prop.

### Challenge 3: searching for users

1. Add a form with a search input to `App`
1. Add a `name` state value to `App`
1. When the form is submitted update the state value
1. Pass the state value to `Profile` so it knows which name to fetch

{% box %}

**Hint:** Don't forget to call `event.preventDefault()` in your submit handler to stop the form from refreshing the page.

{% endbox %}

{% disclosure %}

```jsx
function App() {
  const [name, setName] = React.useState("oliverjam");
  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setName(event.target.username.value);
        }}
      >
        <input
          type="search"
          aria-label="Search users"
          placeholder="Search users"
          name="username"
        />
      </form>
      <Profile name={name} />
    </main>
  );
}
```

Note that we did not need to change `Profile` at all. This is because we have divided up each component's responsibilities. `Profile` just takes a username and fetches that data—it doesn't care _how_ it gets the name.

{% enddisclosure %}

## Stretch goal: fetching repos

The user response object from GitHub contains a `repos_url` property. This is a URL from which you can fetch an array of the user's repositories. To display the user's repos underneath their other info we'll have to make _another_ fetch after the first one resolves.

The simplest way to achieve this is by creating a new component that takes the `repos_url` as a prop, fetches the data, then renders the list of repos.

1. Create a new component in `ReposList.jsx`
1. It should receive a URL as a prop and fetch the repos from it
1. When it receives a response it should render a list of repos
1. Amend `Profile` to render `ReposList` and pass in the right URL prop

{% disclosure %}

```jsx
// Profile.jsx

function Profile({ name }) {
  // ...
  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar_url} alt="" width="128" height="128" />
      <h2>Repos</h2>
      <ReposList url={user.repos_url} />
    </div>
  );
}
```

```jsx
// ReposList.jsx

import React from "react";

function ReposList({ url }) {
  const [repos, setRepos] = React.useState();

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, [url]);

  if (!repos) return <div>Loading repos...</div>;
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <a href={repo.url}>{repo.name}</a> | ⭐️ {repo.stargazers_count}
        </li>
      ))}
    </ul>
  );
}

export default ReposList;
```

{% enddisclosure %}
