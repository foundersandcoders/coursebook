/**
 * Default layout
 * Has main header with nav at the top
 */

const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");

exports.data = {
  layout: "_document",
};

exports.render = ({ page, content }) => {
  return html`
    <header class="hstack jc-between pad-lg">
      <a href="/" aria-label="Home">
        <img src="/assets/images/logo.svg" width="100" alt="" />
      </a>
      <nav id="global-nav">
        <ul role="list" class="hstack">
          <${Link} url=${page.url} href="/course">Course</${Link}>
          <${Link} url=${page.url} href="/resources">Resources</${Link}>
          <${Link} url=${page.url} href="/about">About</${Link}>
        </ul>
      </nav>
    </header>
    <${RawContent} class="center">${content}</${RawContent}>
  `;
};

function Link({ href, url, children }) {
  return html`
    <li>
      <a
        class="global-nav__link"
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
