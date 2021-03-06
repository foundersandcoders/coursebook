const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");
const { Tabs, Tab } = require("./components/TabNav");

exports.data = {
  layout: "course",
};

exports.render = ({ section, topic, page, content }) => {
  return html`
    <div class="vstack gap-xl">
      <header class="vstack gap-lg">
        <!-- visually hide section since it's duplicated in the tabs below -->
        <h1 class="highlight bg-primary">${topic} <span class="vh">${section}</span></h1>
        <${Tabs}>
          <${Tab} page=${page} href="schedule">Schedule</${Tab}>
          <${Tab} page=${page}><!-- href="learning-outcomes"-->Learnings</${Tab}>
          <${Tab} page=${page}><!-- href="spikes"-->Spikes</${Tab}>
          <${Tab} page=${page}><!-- href="project"-->Project</${Tab}>
          <${Tab} page=${page}><!-- href="resources"-->Resources</${Tab}>
        </${Tabs}>
      </header>
      <${RawContent} class="flow">${content}</${RawContent}>
    </div>
`;
};
