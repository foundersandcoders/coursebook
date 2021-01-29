const { html } = require("htm/preact");
const RawContent = require("./RawContent");

exports.data = {
  layout: "_document",
  styles: ["/assets/css/workshop.css"],
  scripts: ["/assets/js/copy-text.js"],
};

exports.render = ({ title, description, tags = [], page, content }) => {
  return html`
    <div class="vstack" style="gap: 6rem">
      <header class="vstack gap-xl pad-xl stripes">
        <div class="vstack"  data-gap="md">
          <h1 class="highlight" style="--bg: var(--primary)">${title}</h1>
          <p class="highlight fz-lg">${description}</p>
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
      <label
        for="download-command"
        class="highlight fw-bold"
        style="--bg: var(--bg-400)"
        >Download files via CLI</label
      >
      <copy-text class="hstack gap-none align-stretch">
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
