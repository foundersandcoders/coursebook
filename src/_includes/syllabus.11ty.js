const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");
const { Tabs, Tab } = require("./components/TabNav");

exports.data = {
  layout: "course",
};

exports.render = ({
  section,
  topic,
  page,
  content,
  tabs = {},
  isApplicationPage = false,
  isFoundationPage = false,
  isDeveloperPage = false,
  isTechforBetterPage = false,
}) => {
  return html`
    <div class="vstack gap-xl">
      <header class="vstack gap-lg">
        <!-- visually hide section since it's duplicated in the tabs below -->
        <h1 class="highlight bg-primary">${topic} <span class="vh">${section}</span></h1>
        <${Tabs}>
          ${
            tabs.schedule !== false &&
            html`<${Tab} page=${page} href="schedule">Schedule</${Tab}>`
          }
          ${
            tabs.learnings !== false &&
            !isApplicationPage &&
            !isTechforBetterPage &&
            html`<${Tab} page=${page} href="learning-outcomes">Learnings</${Tab}>`
          }
          ${
            tabs.spikes !== false &&
            html`<${Tab} page=${page} href="spikes">Spikes</${Tab}>`
          }
          ${
            tabs.employability !== false &&
            !isDeveloperPage &&
            !isApplicationPage &&
            !isTechforBetterPage &&
            html`<${Tab} page=${page} href="employability">Employability</${Tab}>`
          }
          ${
            tabs.project !== false &&
            !isTechforBetterPage &&
            html`<${Tab} page=${page} href="project">Project</${Tab}>`
          }
          ${
            tabs.learnings !== false &&
            isApplicationPage &&
            html`<${Tab} page=${page} href="learning-outcomes">Learnings</${Tab}>`
          }
          ${
            tabs.content !== false &&
            !isApplicationPage &&
            !isFoundationPage &&
            !isDeveloperPage &&
            html`<${Tab} page=${page} href="content">Content</${Tab}>`
          }
          ${
            tabs.resources !== false &&
            !isFoundationPage &&
            html`<${Tab} page=${page} href="resources">Resources</${Tab}>`
          }
          
          ${
            tabs.topicIntro !== false &&
            !isApplicationPage &&
            !isFoundationPage &&
            !isTechforBetterPage &&
            html`<${Tab} page=${page} href="topicIntro">Topic Intro</${Tab}>`
          }
        </${Tabs}>
      </header>
      <${RawContent} class="flow">${content}</${RawContent}>
    </div>
`;
};
