/**
 * Default layout
 * Has main header with nav at the top
 */

const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");
const { Nav, Section, Link } = require("./components/SidebarNav");

exports.data = {
  layout: "base",
  scripts: ["/assets/js/toggle-button.js"],
};

exports.render = ({ page: { url }, content }) => {
  return html`
  <div class="layout">
    <aside></aside>
    <!-- <aside>
      <${Nav}>
        <${Link} url=${url} href="/resources/introduction/">Introduction</${Link}>
        <${Link} url=${url} href="/resources/teamwork/introduction/">Teamwork</${Link}>
        <${Link} url=${url} href="/resources/http/introduction/">HTTP</${Link}>
        <${Link} url=${url} href="/resources/testing/introduction/">Testing</${Link}>
        <${Link} url=${url} href="/resources/server/introduction/">Server</${Link}>
        <${Link} url=${url} href="/resources/database/introduction/">Database</${Link}>
        <${Link} url=${url} href="/resources/authentication/introduction/">Authentication</${Link}>
        <${Link} url=${url} href="/resources/api/introduction/">API</${Link}>
        <${Link} url=${url} href="/resources/app/introduction/">App</${Link}>
        <${Link} url=${url} href="/resources/react/introduction/">React</${Link}>
      </${Nav}>
    </aside> -->
    <main id="main">
      <${RawContent}>${content}</${RawContent}>
    </main>
  </div>
  `;
};
