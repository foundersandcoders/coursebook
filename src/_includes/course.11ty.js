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
        <${Section} title="Handbooks" url=${url} subpath="course/handbook">
        <li><${Link} url=${url} href="/course/handbook/software-foundation/">Software Foundation</${Link}></li>
        <li><${Link} url=${url} href="/course/handbook/software-developer/">Software Developer</${Link}></li>
        </${Section}>
        <${Section} title="Foundation" url=${url} subpath="course/syllabus/foundation">
          <li><${Link} url=${url} href="/course/syllabus/foundation/pre-course/schedule/">Pre-course</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/markup/schedule/">Markup</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/node/schedule/">Concurrency and Node.js</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/testing/schedule/">Testing</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/full-stack/schedule/">Full-Stack</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/post-course/schedule/">Post-course</${Link}></li>
        </${Section}>
        <${Section} title="Developer" url=${url} subpath="course/syllabus/developer">
          <li value="0"><${Link} url=${url} href="/course/syllabus/developer/introduction/schedule">Introduction</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/project-1-server/schedule/">Project 1: Server</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/database/schedule/">Project 1: Frontend</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/authentication/schedule/">Project 1: Test & Deploy</${Link}></li>
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
