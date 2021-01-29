/**
 * Base document for every page
 * Where all the head/scripts etc go
 */

const { html } = require("htm/preact");
const render = require("preact-render-to-string");
const RawContent = require("./RawContent");

function App({ title, styles = [], scripts = [], content, collections, page }) {
  return html`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link
          rel="preload"
          href="/assets/fonts/GT-Eesti-Text-Light-subset.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link href="/assets/css/styles.css" rel="stylesheet" />
        ${styles.map((href) => html`<link href="${href}" rel="stylesheet" />`)}
      </head>
      <body>
        <${RawContent}>${content}</${RawContent}>
        <script src="/assets/js/nav.js"></script>
        <script type="module" src="/assets/js/checkboxen.js"></script>
        ${scripts.map((src) => html`<script src="${src}"></script>`)}

      </body>
    </html>
  `;
}

exports.render = (data) => {
  const app = render(html`<${App} ...${data} />`);
  // Preact can't render the doctype, so that has to be a string
  return `<!DOCTYPE html>\n${app}`;
};
