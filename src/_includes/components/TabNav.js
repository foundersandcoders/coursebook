const { html } = require("htm/preact");

function Tabs({ children, ...rest }) {
  return html`
    <nav ...${rest}>
      <ul role="list" class="nav-tabs">
        ${children}
      </ul>
    </nav>
  `;
}

function Tab({ href, page, children, ...rest }) {
  return html`
    <li>
      <a
        ...${rest}
        class="nav-tab"
        aria-current="${href === page.fileSlug ? "page" : undefined}"
        href="${href ? `../${href}` : undefined}"
      >
        ${children}
      </a>
    </li>
  `;
}

module.exports = { Tabs, Tab };
