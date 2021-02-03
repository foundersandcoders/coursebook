/**
 * Default layout
 * Has main header with nav at the top
 */

const { html } = require("htm/preact");
const RawContent = require("./RawContent");

exports.data = {
  layout: "base",
  scripts: ["/assets/js/toggle-button.js"],
};

exports.render = ({ page: { url }, content }) => {
  return html`
  <div class="layout">
    <aside>
      <${Nav}>
        <${Link} url=${url} href="/course/introduction">Introduction</${Link}>
        <${Link} url=${url} href="/course/code-of-conduct/">Code of Conduct</${Link}>
        <${Section} title="Handbook" url=${url} subpath="course/handbook">
          <li><${Link} url=${url} href="/course/handbook/course-rules/">Course Rules</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/pair-programming/">Pair programming</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/debugging/">Debugging</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/spikes/">Spikes</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/projects/">Projects</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/code-review/">Code review</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/retrospectives/">Retrospectives</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/user-manuals/">User manuals</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/mentor-guidance/">Mentoring</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/coaching/">Coaching</${Link}></li>
        </${Section}>
        <${Section} title="Syllabus" url=${url} subpath="course/syllabus">
          <li><${Link} url=${url} href="/course/syllabus/teamwork-and-toolkit/schedule/">Teamwork & Toolkit</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/http/schedule/">HTTP</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/testing/schedule/">Testing</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/node/schedule/">Node</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/databases/schedule/">Databases</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/authentication/schedule/">Authentication</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/rest-apis/schedule/">REST</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/single-page-app/schedule/">SPA</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/react/schedule/">React</${Link}></li>
        </${Section}>
        <${Section} title="Projects" url=${url} subpath="course/projects">
          <li><${Link} url=${url} href="/course/projects/roles/">Roles</${Link}></li>
          <li><${Link} url=${url} href="/course/projects/student-projects/">Student projects</${Link}></li>
          <li><${Link} url=${url} href="/course/projects/tech-for-better/">Tech For Better</${Link}></li>
        </${Section}>
      </${Nav}>
    </aside>
    <main id="main">
      <${RawContent} class="main-wrapper flow">${content}</${RawContent}>
    </main>
  </div>
  `;
};

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

function Link({ href, url, children }) {
  return html`
    <a
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
