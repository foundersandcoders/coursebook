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
      <div class="hstack wrap">
        ${starter && html`<${Copy} ...${page} />`}
        ${
          challenge &&
          html`
          <${Challenge} url=${challenge}>View challenge repo</${Challenge}>
        `
        }
        <${Feedback} url=${page.url}>Leave feedback</${Feedback}>
      </div>
    </header>
    <${RawContent} style="margin: 4rem 0" class="flow">${content}</${RawContent}>
    ${
      challenge &&
      html`
        <footer class="vstack gap-md pad-xl stripes">
          <h2>Next step</h2>
          <${Challenge} url=${challenge}>Complete the challenge</${Challenge}>
        </footer>
      `
    }
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

function Challenge({ url, children }) {
  if (!url) {
    return "";
  }
  return html`
    <a
      href="${url}"
      target="_blank"
      rel="noopener"
      class="button"
      style="--bg: var(--primary); --bg-hover: var(--primary-dark)"
    >
      ${children}
      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
        <path
          fill-rule="evenodd"
          d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  `;
}

function Feedback({ url, children }) {
  if (!url) {
    return "";
  }
  const href = new URL(
    "https://github.com/foundersandcoders/coursebook/issues/new"
  );
  const slug = url.replace(/^\/|\/$/g, "");
  href.searchParams.set("title", "[" + slug + "]");
  href.searchParams.set("labels", "feedback");
  return html`
    <a href="${href.toString()}" target="_blank" rel="noopener" class="button">
      ${children}
      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
        <path
          fill-rule="evenodd"
          d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  `;
}
