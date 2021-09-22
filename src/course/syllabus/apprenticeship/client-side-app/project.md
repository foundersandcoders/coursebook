The goal is to build an interactive game-like thing that uses data from an API.

## Criteria

- Accept some user input (e.g. a username)
- Query an API (e.g. the [Github API](https://developer.github.com/v3/), or any other [fun one](https://www.potterapi.com/))
- Populate the UI with API data
- Have some form of persistent state and interactivity, e.g.
  - A hunger bar that decreases over time and is topped up when you feed them stars
  - A button to add more users to your collection

### Stretch criteria

- Save your state to localstorage so you can leave the page and come back later
- Make it look great

## Examples

"Interactive game-like thing" is a bit vague, so here are some apps built previously:

- [GIT FIGHTER II](https://camko.netlify.app/)
- [Let's Go Pokémon Battle](https://lets-go-pokemon-battle.netlify.app/)
- [Oli's Tamagotchi](https://tamagotchi.netlify.com)
- [Zooey's Drake thing](https://fuckin-yolo.netlify.com/)

## Setup

We'll be using [Vite](https://vitejs.dev/) to handle bundling our app and providing a dev server. You can quickly scaffold a new app using their CLI:

1. `npm init @vitejs/app`
1. Follow the instructions in your Terminal (pick the `react` option)
1. `cd [my-app-name]`
1. `npm install` to install the dependencies
1. `npm run dev` start the dev server

Open the project in your editor—you should see an example app setup. Feel free to delete the logo/CSS files that you won't be using.

### Static assets

Vite supports [importing static assets](https://vitejs.dev/guide/assets.html) (like images or CSS). For example:

```jsx
import imgUrl from "./test.png";
import "./App.css";

function App() {
  return <img src={imgUrl} alt="" />;
}
```

CSS files will automatically be copied to the final built site and included on the page. Images and other assets will provide the URL of the final asset to use in your components.

### Linting

We strongly recommend you configure ESLint. This will help catch mistakes as you're coding and save you time debugging problems caused by simple typos.

You can use Oli's [minimal React config](https://github.com/oliverjam/eslint-config-react-minimal/) (follow the instructions in the readme to install).

### Deployment

We'll be deploying our apps to [Netlify](https://netlify.com).

1. Create your repo and push it to GitHub
1. Go to https://app.netlify.com and login with Github
1. Click the "New site from Git" button
1. Choose "Github" as your provider (and authorize it)
1. Choose the repo you want to deploy
1. Choose "Deploy site" (the build settings should be pre-filled)

Now every time you push to the `main` branch your site will redeploy.

### API secrets

{% box "error" %}

Since this app runs entirely client-side **you cannot keep secrets**. Everything your code accesses will be available to users in their browser.

{% endbox %}

That said, if you have a token you want to keep off GitHub, but don't mind people potentially finding using dev tools (i.e. **not** a token attached to your credit card!) you can use a `.env` file.

Vite will [automatically read any environment variables](https://vitejs.dev/guide/env-and-mode.html#env-files) prefixed with `VITE_` and make them available to your code on `import.meta.env`. E.g. if you have a `.env` like this:

```
VITE_APP_API_KEY='123'
```

You can access that using `import.meta.env.VITE_APP_API_KEY`.

Make sure you add `.env` to your `.gitignore` file so it doesn't end up on GitHub.

You will also need to configure Netlify to inject this value when it deploys your site too (just like Heroku). You can do this under "Site settings" > "Build & deploy" > "Environment" > "Environment variables".
