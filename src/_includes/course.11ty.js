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
    <aside>
      <${Nav}>
        <${Link} url=${url} href="/course/introduction">Introduction</${Link}>
        <${Link} url=${url} href="https://www.foundersandcoders.com/code-of-conduct/" target="_blank" rel="noreferrer">Code of Conduct</${Link}>
        <${Section} title="Handbook" url=${url} subpath="course/handbook">
          <li><${Link} url=${url} href="/course/handbook/system-requirements/">System Requirements</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/installation/">Installation Guide</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/course-rules/">Course Rules</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/pair-programming/">Pair programming</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/debugging/">Debugging</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/spikes/">Spikes</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/projects/">Projects</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/code-review/">Code review</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/retrospectives/">Retrospectives</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/user-manuals/">User manuals</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/mentor-guidance/">Mentoring</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/mentor-roles/">Mentor roles</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/coaching-groups/">Coaching groups</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/role-circles/">Role circles</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/project-team/">Project Roles</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/one-day-projects/">One Day Projects</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/project-management/">Project Management</${Link}></li>
        </${Section}>
        <${Section} title="Pre-apprenticeship" url=${url} subpath="course/syllabus/pre-apprenticeship">
          <li><${Link} url=${url} href="/course/syllabus/pre-apprenticeship/teamwork/schedule/">Teamwork</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/pre-apprenticeship/markup/schedule/">Markup</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/pre-apprenticeship/http/schedule/">HTTP</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/pre-apprenticeship/testing/schedule/">Testing</${Link}></li>
        </${Section}>
        <${Section} title="Apprenticeship" url=${url} subpath="course/syllabus/apprenticeship">
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/server/schedule/">Server</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/database/schedule/">Database</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/authentication/schedule/">Authentication</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/server-side-app/schedule/">Server-side app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/client-side-app/schedule/">Client-side app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/full-stack-app/schedule/">Full-stack app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/projects/design-1/schedule">Design Sprint</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/projects/build-1/schedule">Build Sprint 1</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/projects/build-2/schedule">Build Sprint 2</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/projects/design-2/schedule">Design Sprint (TFB)</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/projects/build-3/schedule">Build Sprint 1 (TFB)</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/apprenticeship/projects/build-4/schedule">Build Sprint 2 (TFB)</${Link}></li>
        </${Section}>
      </${Nav}>
    </aside>
    <main id="main">
      <${RawContent} class="flow">${content}</${RawContent}>
    </main>
  </div>
  `;
};
