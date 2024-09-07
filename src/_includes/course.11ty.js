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
        <${Section} title="Developer" url=${url} subpath="course/syllabus/developer">
          <li><${Link} url=${url} href="/course/syllabus/foundation/pre-course/schedule/">Pre-course</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/week01/overview/">W01/P1: Basics</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/foundation/week02/overview/">W02.P2: Async</${Link}></li>
  

        
          
        
          <li><${Link} url=${url} href="/course/syllabus/developer/project-1-server/schedule/">W03_P3: Server</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/project-1-frontend/schedule/">W04_P3: Frontend</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/project-1-test-deploy/schedule/">W05_P3: Test & Deploy</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/project-2-week-1/schedule/">W06_P4: Databases</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/project-2-week-2/schedule/">W07_P4: Authentication</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/project-2-week-3/schedule/">W08_P4: Test & Deploy</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/">W09: READING WEEK</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/DOTNET-intro/schedule">W10_P5: .NET</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/dotnet-with-testing/schedule">W11_P5: .NET With Testing</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/project-3-week-3/schedule">W12_P5: Test and Deploy</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-design/schedule">W14.TFB: Design</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-build-1/schedule">W15.TFB: Build</${Link}></li>
          <li><${Link} url=${url} href="/course/syllabus/developer/projects/TFB-build-2/schedule">W16.TFB: Build</${Link}></li>
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
