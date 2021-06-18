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
        <${Link} url=${url} href="/course/code-of-conduct/">Code of Conduct</${Link}>
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
          <li><${Link} url=${url} href="/course/handbook/learning-circles/">Learning circles</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/role-circles/">Role circles</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/project-team/">Project Roles</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/one-day-projects/">One Day Projects</${Link}></li>
        </${Section}>
        <${Section} title="Syllabus" url=${url} subpath="course/syllabus">
          <li><${Link} url=${url} href="/course/syllabus/pre-apprenticeship-1/schedule/">Pre-apprenticeship 1</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/precourse-2/schedule/">Pre-course 2</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/precourse-3/schedule/">Pre-course 3</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/precourse-4/schedule/">Pre-course 4</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/teamwork/schedule/">Teamwork</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/http/schedule/">HTTP</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/testing/schedule/">Testing</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/server/schedule/">Server</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/database/schedule/">Database</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/authentication/schedule/">Authentication</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/server-side-app/schedule/">Server-side app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/client-side-app/schedule/">Client-side app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/full-stack-app/schedule/">Full-stack app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/final-project/design/">Design Week</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/final-project/build-1/">Build Sprint 1</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/final-project/build-2/">Build Sprint 2</${Link}></li>
        </${Section}>
      </${Nav}>
    </aside>
    <main id="main">
      <${RawContent} class="flow">${content}</${RawContent}>
    </main>
  </div>
  `;
};
