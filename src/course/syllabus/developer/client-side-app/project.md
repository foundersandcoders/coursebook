Your project this week is to build an interactive game-like thing using React.

## Spike

Now that you're using a framework there is a bit more initial environment setup involved before you can start writing code. Make sure you get this [setup](#setup) done and [deployed](#deployment) to Netlify at the beginning.

## Criteria

- Accept at least 2 kinds of user input
- Have some form of persistent state and interactivity, e.g.
  - Countdown timer
  - Score tracker
  - Previous guesses

### Stretch criteria

- Save your state to localstorage so you can leave the page and come back later
- Make it look great

## Examples

"Interactive game-like thing" is a bit vague, so here are some apps built previously:

- [GIT FIGHTER II](https://camko.netlify.app/)
- [Let's Go Pokémon Battle](https://lets-go-pokemon-battle.netlify.app/)
- [Oli's Tamagotchi](https://tamagotchi.netlify.com)
- [Zooey's Drake thing](https://fuckin-yolo.netlify.com/)

If you're struggling for inspiration consider adapting a simple board/card/arcade game that you like.

## Setup

We'll be using [Vite](https://vitejs.dev/) to handle bundling our app and providing a local dev server. You can quickly scaffold a new app using their CLI:

{% box %}

Do not create a new directory—Vite will do this for you

{% endbox %}

1. `npm create vite myapp -- --template react`
1. `cd myapp`
1. `npm install` to install the dependencies
1. `npm run dev` start the dev server

Open the project in your editor—you should see an example app. Feel free to delete the logo/CSS files that you won't be using.

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

That said, if you have a token you want to keep off GitHub, but don't mind people potentially finding using dev tools (i.e. **not** a token attached to your credit card!) you can use a `.env.local` file.

Vite will [automatically read any environment variables](https://vitejs.dev/guide/env-and-mode.html#env-files) prefixed with `VITE_` and make them available to your code on `import.meta.env`. E.g. if you have a `.env.local` file like this:

```
VITE_APP_API_KEY='123'
```

You can access that using `import.meta.env.VITE_APP_API_KEY`.

Vite also generates a `.gitignore` that stops `.local` files from ending up on GitHub.

You will also need to configure Netlify to inject this value when it deploys your site too (just like Heroku). You can do this under "Site settings" > "Build & deploy" > "Environment" > "Environment variables".
