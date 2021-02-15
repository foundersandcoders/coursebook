# FAC Curriculum

This repo contains the source code and content for our open-source curriculum: learn.foundersandcoders.com.

To learn more about the curriculum, including whether you're allowed to use it, please read the curriculum's [about page](https://learn.foundersandcoders.com/about/).

## Running locally

This site is built using the [Eleventy](https://11ty.dev/) static site generator. It requires Git, Node and npm installed on your machine to start.

1. Clone this repo
1. Run `npm install` to install all the required dependencies
1. Run `npm run dev` to start an auto-reloading development server

Alternatively run `npm run build` to create the final production `_site` directory. You can serve this with any web server as it's just static HTML, CSS and JS.

### Git hooks

This package installs a custom pre-commit Git hook when you `npm install`. This hook automatically formats your changes using Prettier (with the default settings). This ensures all files have consistent style and formatting. So don't be surprised if you see things move around a bit after you commit a change.
