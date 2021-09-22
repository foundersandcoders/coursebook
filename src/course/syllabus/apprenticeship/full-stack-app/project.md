This week you'll be building an e-commerce shopping site for a fake brand. It doesn't need to actually take payments or have a checkout, but it should have product listings and the ability to add items to a shopping basket.

Here's a very polished example (with more features than you need to implement): https://demo.vercel.store/

You'll be provided with a Postgres database hosted on AWS RDS, so you don't have to worry about that. You can take the database URL and run any SQL you like to create your tables etc.

## Acceptance criteria

- Server-rendered with Next.js
- Hosted on Vercel
- Data stored in AWS Postgres
- Homepage with product listings
- Individual product pages, containing:
  - Quantity/colour/variant pickers
  - "Add to basket" button
- Basket page showing all items being purchased
  - Basket contents saved for future visits

## Stretch criteria

- Filter products by category
- Sort products by price
- "Featured" products on homepage

## Project setup

It's important to get your project setup done as early as possible, so your team have a stable base to build on. You should follow this list as a team, before you do any other work on the project.

### Generate project

Generate a Next app with:

```shell
npx create-next-app
```

{% box %}

This will create a new directory for you—you **do not** need to make one manually beforehand. Otherwise you'll end up with double-nested directories, which can make deployment difficult.

{% endbox %}

This command will scaffold a basic starting app structure in a new directory. You can `cd` in and run `npm run dev` to see what you've got.

### Push to GitHub

Now you can prepare your project to share on GitHub. Next will already have initialised your directory as a git repository and made an initial commit (you can verify this by running `git log`).

{% box %}

Certain versions of Git will default to creating a `master` branch. If this happens you can rename it to `main` with:

```shell
git branch -M main
```

{% endbox %}

You'll need an empty repository on GitHub to push this to. Go to GitHub, create a new repo and **do not** add a readme or gitignore. You need the repo to be empty.

GitHub should show you instructions for pushing an existing repo. It will be something like:

```shell
git remote add origin <your-git-url-here>
git push -u origin main
```

If you refresh the GitHub repo after pushing you should see your files and readme appear.

### Set up ESLint

ESLint is a very helpful tool for catching errors while you code. It will find typos, unused variables and other mistakes before they cause errors in your code.

You can use Oli's [minimal React config](https://github.com/oliverjam/eslint-config-react-minimal), which contains just the useful rules to catch common errors in React apps.

Install the config and ESLint plugins with:

```shell
npm install -D eslint eslint-config-react-minimal eslint-plugin-import eslint-plugin-react
```

Then create an `.eslintrc` file at the root of your project to enable the config:

```json
{
  "extends": ["eslint:recommended", "react-minimal"],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

{% box %}

We have to turn off the `react-in-jsx-scope` rule, since Next automatically includes React in our components (so we don't need to import it manually).

{% endbox %}

If you install the [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) you should now see errors highlighted in your editor.

You can also run the linter in your terminal using:

```shell
# lint everything
npx eslint .
# or lint one file
npx eslint ./pages/index.js
```

### Set up Prettier

It's important for your code to be formatted consistently across the project, regardless of who wrote it. Prettier helps with this by automating all formatting to one style.

You can rely on the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to auto-format when you save. However you should make sure to include a [Prettier config file](https://prettier.io/docs/en/configuration.html) in your project, otherwise each team member's extension will format according to their personal settings.

Create a `.prettierrc` file at the root of your project:

```json
{}
```

An empty config will make Prettier use the default rules. If you want to [customise any of them](https://prettier.io/docs/en/options.html) you can do so here. E.g.

```json
{
  "trailingComma": "es5"
}
```

### Set up tests

You should set your testing environment up early to ensure you don't put off writing tests until the end of the project.

Set up Cypress by following their [install guide](https://docs.cypress.io/guides/getting-started/installing-cypress), then run it to initialise all the Cypress files you need.

### Set up database

You should set up a local database on your machine to use during development. Reference this via a `DATABASE_URL` environment variable. This will allow you to provide the production DB on AWS when you deploy your app. You can read about [how Next.js works with `.env` files](https://nextjs.org/docs/basic-features/environment-variables).

If you want to automate this for each team member take a look at the DB setup/build scripts in [this example repo](https://github.com/oliverjam/express-postgres-example/tree/main/scripts).

Once you've written your schema SQL you'll need to run that against your production database to make sure that has all the right tables and initial data. You can connect to it using `psql` and run a SQL file like this:

```shell
psql postgres://user:pw@test.amazonaws.com/dbname -f "./database/init.sql"
```

{% box %}

Each team will be given their production DB URL on Discord, to keep the password secret.

{% endbox %}

### Deploy your app

You should make sure your app deploys correctly before starting to work on it.

We'll be hosting our app on [Vercel](https://vercel.com/) (the company that make Next.js). This platform is designed specifically for Next, but is otherwise very similar to Netlify.

Follow the [official deployment guide](https://nextjs.org/docs/deployment#vercel-recommended) to get started. You will also need to add your production `DATABASE_URL` as [an environment variable in your Vercel dashboard](https://vercel.com/docs/environment-variables).
