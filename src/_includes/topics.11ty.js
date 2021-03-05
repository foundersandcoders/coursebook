const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");
const { Tabs, Tab } = require("./components/TabNav");

exports.data = {
  layout: "resources",
};

exports.render = ({ title, page, content }) => {
  return html`
    <div class="vstack gap-xl">
      <header class="vstack gap-lg">
        <!-- visually hide section since it's duplicated in the tabs below -->
        <h1 class="highlight bg-primary">${title}</h1>
        <${Tabs}>
          <${Tab} page=${page} href="introduction">Introduction</${Tab}>
          <${Tab} page=${page} href="workshops">Workshops</${Tab}>
          <${Tab} page=${page} href="guides">Guides</${Tab}>
        </${Tabs}>
      </header>
      <${RawContent} class="flow">${content}</${RawContent}>
    </div>
`;
};
