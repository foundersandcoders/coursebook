const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");

exports.data = {
  layout: "resources",
  scripts: ["/assets/js/copy-text.js"],
};

exports.render = ({
  title,
  description,
  keywords = [],
  page,
  content,
  starter = true,
  challenge,
}) => {
  return html`
    <header class="vstack gap-xl pad-xl stripes">
      <div class="vstack"  data-gap="md">
        <h1 class="highlight bg-primary">${title}</h1>
        ${description && html`<p class="highlight fz-lg">${description}</p>`}
        ${
          keywords &&
          html`
            <ul role="list" class="hstack gap-sm wrap">
              ${keywords.map(
                (tag) => html`
                  <li
                    class="highlight fz-sm fw-bold"
                    style="--bg: var(--bg-400)"
                  >
                    ${tag}
                  </li>
                `
              )}
            </ul>
          `
        }
      </div>
      ${starter && html`<${Copy} ...${page} />`}
      ${
        challenge &&
        html`
          <a
            href="${challenge}"
            target="_blank"
            rel="noopener"
            class="button"
            style="--bg: var(--primary); --bg-hover: var(--primary-dark)"
          >
            View challenge repo
            <svg
              viewBox="0 0 32 32"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M14 9 L3 9 3 29 23 29 23 18 M18 4 L28 4 28 14 M28 4 L14 18"
              ></path>
            </svg>
          </a>
        `
      }
    </header>
    <${RawContent} style="margin: 4rem 0" class="flow">${content}</${RawContent}>
  `;
};

function Copy({ url, fileSlug }) {
  const command = `npx degit 'foundersandcoders/coursebook/src${url}starter-files#main' ${fileSlug}`;
  return html`
    <div class="vstack gap-none">
      <label
        for="download-command"
        class="highlight fw-bold"
        style="--bg: var(--bg-400)"
        >Download files via CLI</label
      >
      <copy-text class="hstack gap-none ai-stretch">
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
