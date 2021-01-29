const { html } = require("htm/preact");
const RawContent = require("./RawContent");

exports.data = {
  layout: "base",
};

exports.render = ({ week, section, page, content }) => {
  return html`
    <${RawContent} class="main-wrapper flow">${content}</${RawContent}>
`;
};
