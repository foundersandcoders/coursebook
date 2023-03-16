This week you'll be building an e-commerce shopping site for a fake brand. It doesn't need to actually take payments or have a checkout, but it should have product listings.

Here's a very polished example (with more features than you need to implement): https://demo.vercel.store/

{% box %}

Remember that Next doesn't work that differently to the Express apps you've built so far. You still have access to requests/responses and can talk to the DB and set cookies on the server.

{% endbox %}

## Acceptance criteria

- Server-rendered with Next.js
- Homepage with product listings
- Individual product pages, containing quantity/colour/variant pickers
- Data stored in a SQLite database

## Stretch criteria

- "Add to basket" button on product pages
- Basket page showing all saved items
- Basket contents persisted for future visits (local storage)
- Filter products by category
- Sort products by price
- End-to-end tests

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

## Stretch setup

### Testing

You can follow Next's guide to [testing with Playwright](https://nextjs.org/docs/testing#playwright) if you want to experiment with end-to-end tests.
