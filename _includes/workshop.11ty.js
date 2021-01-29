const { html } = require("htm/preact");
const RawContent = require("./RawContent");

exports.data = {
  layout: "_document",
  styles: ["/assets/css/workshop.css"],
  scripts: ["/assets/js/copy-text.js"],
};

exports.render = ({ title, description, content, page }) => {
  return html`
    <div class="vstack" style="--gap: 2rem">
      <header class="vstack stripes" style="--gap: 1.5rem; --pad: 2rem">
        <div class="highlight" style="--bg: var(--primary)"><h1>${title}</h1></div>
        <div class="highlight">
          <p class="intro">${description}</p>
        </div>
        <${Copy} ...${page} />
      </header>
      <${RawContent} class="main-wrapper flow">${content}</${RawContent}>
    </div>
  `;
};

function Copy({ url, fileSlug }) {
  const command = `npx degit foundersandcoders/coursebook${url}#main ${fileSlug}`;
  return html`
    <div>
      <div class="highlight" style="--bg: var(--bg-400)">
        <label for="download-command">Download via CLI</label>
      </div>
      <copy-text class="hstack" style="--gap: 0; --align: stretch">
        <input id="download-command" readonly value="${command}" />
        <button aria-label="Copy" title="Copy" hidden>
          <svg
            data-copy
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <svg
            hidden
            data-success
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </copy-text>
    </div>
  `;
}
