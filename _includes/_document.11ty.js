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
        <div class="center">
          <div class="layout">
            <aside>
              <${Nav} collections=${collections} page=${page} />
            </aside>
            <!-- e.g. markdown pages will have string content -->
            <${RawContent} as="main" id="main">${content}</${RawContent}>
          </div>
        </div>
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

function Nav({ collections, page: { url } }) {
  return html`
    <nav id="globalNav" class="global-nav" style="--flow-space: 1.5rem">
      <a href="/" aria-label="Home">
        <img src="/assets/images/logo.svg" width="140" alt="" />
      </a>

      <button id="toggle-nav" class="toggle-nav" hidden>
        <svg viewBox="0 0 20 20" width="32" height="32" fill="currentColor">
          <path
            id="open"
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
          <path
            id="closed"
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div id="nav-content" class="nav-content flow">
        <${Section} title="Precourse" open=${url.includes("precourse")}>
          <${Links} url=${url} collection=${collections.precourse} />
        </${Section}>
        <${Section} title="Student Handbook" open=${url.includes("handbook")}>
          <${Links} url=${url} collection=${collections.handbook} />
        </${Section}>
        <${Section} title="Curriculum" open=${url.includes("curriculum")}>
          <${Link} url=${url} href="/curriculum/teamwork-and-toolkit/">Teamwork & Toolkit</${Link}>
          <${Link} url=${url} href="/curriculum/http/">HTTP</${Link}>
          <${Link} url=${url} href="/curriculum/testing/">Testing</${Link}>
          <${Link} url=${url} href="/curriculum/node/">Node</${Link}>
          <${Link} url=${url} href="/curriculum/databases/">Databases</${Link}>
          <${Link} url=${url} href="/curriculum/authentication/">Authentication</${Link}>
          <${Link} url=${url} href="/curriculum/rest-apis/">REST</${Link}>
          <${Link} url=${url} href="/curriculum/single-page-app/">SPA</${Link}>
          <${Link} url=${url} href="/curriculum/react/">React</${Link}>
        </${Section}>
        <${Section} title="Projects" open=${url.includes("project")}>
          <${Links} url=${url} collection=${collections.projects} />
        </${Section}>
      </div>
    </nav>
  `;
}

function Section({ open, title, children }) {
  return html`
    <details open=${open}>
      <summary style="margin-bottom: 0.5rem">
        <h2 class="nav-heading">${title}</h2>
      </summary>
      <ul>
        ${children}
      </ul>
    </details>
  `;
}

function Links({ url, collection }) {
  return collection.map((c) => {
    return (
      c.data.nav !== false &&
      html`<${Link} url=${url} href=${c.url}>${c.data.title}</${Link}>`
    );
  });
}

function Link({ href, url, children }) {
  return html`
    <li>
      <a
        class="nav-link"
        href="${href}"
        aria-current="${url.includes(href)
          ? url === href
            ? "page"
            : "true"
          : undefined}"
      >
        ${children}
      </a>
    </li>
  `;
}
