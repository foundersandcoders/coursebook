const { html } = require("htm/preact");

function Nav({ children }) {
  return html`
    <nav id="sidebar-nav" class="sidebar-nav">
      <toggle-button class="sidebar-nav__toggle">
        <button class="button icon" hidden>
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
      </toggle-button>

      <div class="sidebar-nav__content flow">${children}</div>
    </nav>
  `;
}

function Section({ url, subpath, title, children }) {
  return html`
    <details open=${url.includes(subpath)} class="disclosure flow">
      <summary>
        <h2 class="sidebar-nav__heading">${title}</h2>
      </summary>
      <ol
        class="vstack gap-md"
        style="--flow-space: 1rem; padding-left: 2rem; border-left: 1px solid var(--bg-400)"
      >
        ${children}
      </ol>
    </details>
  `;
}

function Link({ href, url, children, ...rest }) {
  return html`
    <a
      ...${rest}
      class="sidebar-nav__link"
      href="${href}"
      aria-current="${url.includes(href)
        ? url === href
          ? "page"
          : "true"
        : undefined}"
    >
      ${children}
    </a>
  `;
}

module.exports = { Nav, Section, Link };
