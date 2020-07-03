# React game project

The goal is to build an interactive game-like thing that uses data from an API.

## Criteria

- Accept some user input (e.g. a username)
- Query an API (e.g. the [Github API](https://developer.github.com/v3/), or any other [fun one](https://www.potterapi.com/))
- Populate the UI with API data
- Have some form of persistent state and interactivity, e.g.
  - A hunger bar that decreases over time and is topped up when you feed them stars
  - A button to add more users to your collection
- Have integration tests using React Testing Library

### Stretch criteria

- Save your state to localstorage so you can leave the page and come back later
- Have a button to add more copies of the game
- Make it look sick

## Examples

"interactive game-like thing" is a bit vague, so here are two example apps:

[Oli's Tamagotchi](https://tamagotchi.netlify.com)  
[Zooey's Drake thing](https://fuckin-yolo.netlify.com/)

## Setup

We're using [Create React App](https://create-react-app.dev/docs/getting-started) to handle all our bundling, linting etc.

1. `npx create-react-app [my-app-name]` generate the project (might take a while)
1. `cd [my-app-name]`
1. `npm start` start the dev server

Open the project in your editor—you should see an example app setup. Feel free to delete the logo/CSS/service worker that you won't be using.

### Linting

Create React App includes a comprehensive ESLint config. You will see linting errors displayed in your terminal or browser console. If you have an ESLint editor plugin installed you should also see errors highlighted as you write.

### Testing

Create React App already has [a testing environment](https://create-react-app.dev/docs/running-tests) set up with Jest. You do not need to install Jest yourself—it's part of the `react-scripts` dependency. `npm test` will run any `*.test.js` files in your project. It even comes with React Testing Library installed, and an example test you can look at in `src/App.test.js`.

### Deployment

We'll be deploying our apps to [Netlify](https://netlify.com).

1. Go to https://app.netlify.com and login with Github
1. Click the "New site from Git" button
1. Choose "Github" as your provider (and authorize it)
1. Choose the repo you want to deploy
1. Choose "Deploy site" (the build settings for CRA should be pre-filled)

Now every time you push to the Master branch your site will redeploy.

### API secrets

If you have API tokens you want to prevent reaching Github you should use Create React App's [environment variable support](https://create-react-app.dev/docs/adding-custom-environment-variables).

1. Create a gitignored `.env` at the root of your project
1. Add your environment variables, prefacing them with `REACT_APP_`. e.g.
   ```bash
   REACT_APP_GITHUB_TOKEN=123456
   ```
1. Access the token in your code as `process.env.REACT_APP_GITHUB_TOKEN`

You will need to configure Netlify to inject this value when it deploys your site too (just like Heroku). You can do this under "Site settings" > "Build & deploy" > "Environment" > "Environment variables".

#### IMPORTANT!

Since all your code is client-side it will all be available in the browser. This means if someone looked inside your JS using dev tools they would be able to find this token. If you have an API key that absolutely _must_ stay secret you need to make your requests on a server instead. You may find [Netlify Functions](https://www.netlify.com/docs/functions/) useful for adding simple Node endpoints to a mostly-frontend app (but they're probably not necessary for this project).
