This week you'll be building an e-commerce shopping site for a fake brand. It doesn't need to actually take payments or have a checkout, but it should have product listings.

Here's a very polished example (with more features than you need to implement): https://demo.vercel.store/

Rather than worry about your own database, instead create a free one on https://www.elephantsql.com. It will provide a connection string you can connect to.

{% box %}

Remember that Next doesn't work that differently to the Express apps you've built so far. You still have access to requests/responses and can talk to the DB and set cookies on the server.

{% endbox %}

## Acceptance criteria

- Server-rendered with Next.js
- Hosted on Vercel
- Data stored in ElephantSQL Postgres
- Homepage with product listings
- Individual product pages, containing:
  - Quantity/colour/variant pickers

## Stretch criteria

- "Add to basket" button on product pages
- Basket page showing all saved items
  - Basket contents persisted for future visits
- Filter products by category
- Sort products by price
- "Featured" products on homepage

## Project setup

It's important to get your project setup done as early as possible, so your team have a stable base to build on. You should follow this list as a team, before you do any other work on the project.

### Generate project

Generate a Next app with:

```shell
npx create-next-app --use-npm
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

Since version 11 [Next has ESLint built in](https://nextjs.org/docs/basic-features/eslint). Make sure you have an npm script to run it:

```json
"scripts": {
  "lint": "next lint"
}
```

When you run this script for the first time it'll ask you what config you want to use.

If you have the [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed you should also see errors highlighted in your editor.

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

You should set up a local database on your machine to use during development. Reference this via a `DATABASE_URL` environment variable. This will allow you to provide the production DB when you deploy your app to Vercel. You can read about [how Next.js works with `.env` files](https://nextjs.org/docs/basic-features/environment-variables).

If you want to automate this for each team member take a look at the DB setup/build scripts in [this example repo](https://github.com/oliverjam/express-postgres-example/tree/main/scripts).

Once you've written your schema SQL you'll need to run that against your production database to make sure that has all the right tables and initial data. You can connect to it using `psql` and run a SQL file like this:

```shell
psql postgres://user:pw@test.amazonaws.com/dbname -f "./database/init.sql"
```

### Deploy your app

You should make sure your app deploys correctly before starting to work on it.

We'll be hosting our apps on [Vercel](https://vercel.com/) (the company that makes Next.js). This platform is designed specifically for Next, but is otherwise very similar to Netlify.

Follow the [official deployment guide](https://nextjs.org/docs/deployment#vercel-recommended) to get started. You will also need to add your production `DATABASE_URL` as [an environment variable in your Vercel dashboard](https://vercel.com/docs/environment-variables).
