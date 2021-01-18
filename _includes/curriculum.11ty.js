const { html } = require("htm/preact");
const RawContent = require("./RawContent");

exports.data = {
  layout: "_document",
};

exports.render = ({ week, section, page, content }) => {
  return html`
    <div class="vstack" style="--gap: 2rem">
    <header class="vstack" style="--gap: 1.5rem">
      <!-- visually hide title since it's duplicated in the tabs below -->
      <h1>${week} <span class="vh">${section}</span></h1>
      <nav>
        <ul class="nav-tabs">
          <li>
            <${Link} page=${page} href="">Intro</${Link}>
          </li>
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
  // gross branch cause the "intro" page is a bare path
  // all other pages are "one level down"
  if (page.filePathStem.includes("index")) {
    return html`
      <a
        class="nav-tab"
        href="${href}"
        aria-current=${href === "" ? "page" : undefined}
      >
        ${children}
      </a>
    `;
  }
  return html`
    <a
      class="nav-tab"
      href="../${href + href !== "" ? "/" : ""}"
      aria-current="${href === page.fileSlug ? "page" : undefined}"
    >
      ${children}
    </a>
  `;
}
