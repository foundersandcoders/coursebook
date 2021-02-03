const { html } = require("htm/preact");
const RawContent = require("./RawContent");

exports.data = {
  layout: "course",
};

exports.render = ({ section, topic, page, content }) => {
  return html`
    <div class="vstack gap-xl">
    <header class="vstack gap-lg">
      <!-- visually hide section since it's duplicated in the tabs below -->
      <h1 class="highlight bg-primary">${topic} week <span class="vh">${section}</span></h1>
      <nav>
        <ul role="list" class="nav-tabs">
          <li>
            <${Link} page=${page} href="schedule">Schedule</${Link}>
          </li>
          <li>
            <${Link} page=${page} href="learning-outcomes">Learnings</${Link}>
          </li>
          <li>
            <${Link} page=${page} href="spikes">Spikes</${Link}>
          </li>
          <li>
            <${Link} page=${page} href="project">Project</${Link}>
          </li>
          <li>
            <${Link} page=${page} href="resources">Resources</${Link}>
          </li>
        </ul>
      </nav>
    </header>
    <${RawContent} class="main-wrapper flow">${content}</${RawContent}>
    </div>
`;
};

function Link({ page, href, children }) {
  return html`
    <a
      class="nav-tab"
      href="../${href}"
      aria-current="${href === page.fileSlug ? "page" : undefined}"
    >
      ${children}
    </a>
  `;
}
