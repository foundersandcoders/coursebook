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
        <${Section} title="SW Developer" url=${url} subpath="course/syllabus/developer">
          <li><${Link} url=${url} href="/course/syllabus/developer/week00-pre-course/overview/">Pre-course</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week01-project01-basics/overview/">W01→P1: Basics</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week02-project02-chatbot/overview/">W02→P2: Async</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week03-project03-server/overview/">W03→P3: Server</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week04-project03-frontend/overview/">W04→P3: Frontend</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week05-project03-test-deploy/overview/">W05→P3: Test & Deploy</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week06-project04-databases/overview/">W06→P4: Databases</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week07-project04-authentication/overview/">W07→P4: Auth</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week08-project04-test-deploy/overview/">W08→P4: Test & Deploy</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week09-reading-week/overview">W09: READING WEEK</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week10-project05-DOTNET-intro/overview">W10→P5: .NET</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week11-project05-DOTNET-testing/overview">W11→P5: .NET & Testing</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/week12-project05-DOTNET-deploy/overview">W12→P5: .NET & Test & Deploy</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-design/overview">W14→TFB: Design</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-build-1/overview">W15→TFB: Build</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-build-2/overview">W16→TFB: Build</${Link}></li>
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
