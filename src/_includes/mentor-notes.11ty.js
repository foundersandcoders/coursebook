const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");
const { Nav, Section, Link } = require("./components/SidebarNav");

exports.data = {
  layout: "base",
};

exports.render = ({ title, description, page: { url }, content }) => {
  return html`
  <div class="layout">
  <aside>
  <${Nav}>
      <${Section} title="Design week" url=${url}>
       <${Link} url=${url} href="/mentoring/discovery">Discovery</${Link}>
       <${Link} url=${url} href="/mentoring/definition">Definition</${Link}>
      </${Section}>
  </${Nav}>
  </aside>
  <main id="main">
  <header class="vstack gap-xl pad-xl stripes">
        <div class="vstack"  data-gap="md">
            <h1 class="highlight bg-primary">${title}</h1>
            ${
              description && html`<p class="highlight fz-lg">${description}</p>`
            }
        </div>
  </header>
  <${RawContent} style="margin: 4rem 0" class="flow">${content}</${RawContent}>
  </main>
  </div>
  `;
};
