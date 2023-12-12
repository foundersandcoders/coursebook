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
          <li><${Link} url=${url} href="/course/handbook/safeguarding/">Safeguarding</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/inclusion/">Equality, Diversity and Inclusion</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/wellbeing/">Wellbeing</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/course-rules/">Course Rules</${Link}></li>
           <li><${Link} url=${url} href="/course/handbook/user-manuals/">User manuals</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/debugging/">Debugging</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/asking-for-help/">Asking for help</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/pair-programming/">Pair programming</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/spikes/">Tech Spikes</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/projects/">Projects</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/github-workflow/">GitHub Workflow</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/project-presentations/">Project Presentations</${Link}></li>
          <ul>
            <li><${Link} url=${url} href="/course/handbook/in-house-project-presentations/">In-house Project Presentations</${Link}></li>
          </ul>
          <li><${Link} url=${url} href="/course/handbook/project-team/">Project Roles</${Link}></li>
           <li><${Link} url=${url} href="/course/handbook/role-circles/">Role circles</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/code-review/">Code review</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/retrospectives/">Retrospectives</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/mentor-guidance/">Mentoring guidance</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/mentor-roles/">What to expect of mentors</${Link}></li>
          <li><${Link} url=${url} href="/course/handbook/progress-logs/">Progress Logs</${Link}></li>
        </${Section}>
        <${Section} title="Foundation" url=${url} subpath="course/syllabus/foundation">
          <li><${Link} url=${url} href="/course/syllabus/foundation/pre-course/schedule/">Pre-course</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/markup/schedule/">Markup</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/node/schedule/">Concurrency and Node.js</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/testing/schedule/">Testing</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/projects/schedule/">Projects</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/post-course/schedule/">Post-course</${Link}></li>
        </${Section}>
        <${Section} title="Developer" url=${url} subpath="course/syllabus/developer">
          <li value="0"><${Link} url=${url} href="/course/syllabus/developer/introduction/schedule">Introduction</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/server/schedule/">Server</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/database/schedule/">Database</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/authentication/schedule/">Authentication</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/server-side-app/schedule/">Server-side app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/client-side-app/schedule/">Client-side app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/full-stack-app/schedule/">Full-stack app</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/in-house-design/schedule">Design Sprint</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/in-house-build-1/schedule">Build Sprint 1</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/in-house-build-2/schedule">Build Sprint 2</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-design/schedule">TFB Design Sprint</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-build-1/schedule">TFB Build Sprint 1</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-build-2/schedule">TFB Build Sprint 2</${Link}></li>
        </${Section}>
        <${Section} title="Tech for Better" url=${url} subpath="course/syllabus/tfb">
        <li><${Link} url=${url} href="/course/syllabus/tfb/week 1/content">Week 1: Introduction </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 2/content">Week 2: Product Pitches and Discovery </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 3/content">Week 3: Research Analysis & Definition </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 4/content">Week 4: Mapping the user journey </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 5/content">Week 5: Figma 1 </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 6/content">Week 6: Figma 2 </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 7/content">Week 7: Product Pitches and Selection </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 8/content">Week 8: No TFB </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 9/content">Week 9: No TFB </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 10/content">Week 10: Design Sprint </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 11/content">Week 11: Build Sprint </${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/tfb/week 12/content">Week 12: Build Sprint </${Link}></li>
        </${Section}>
      </${Nav}>
    </aside>
    <main id="main">
      <${RawContent} class="flow">${content}</${RawContent}>
    </main>
  </div>
  `;
};
