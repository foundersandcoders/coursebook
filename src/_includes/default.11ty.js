const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");

exports.data = {
  layout: "base",
};

exports.render = ({ content }) => {
  return html`
    <${RawContent} class="flow">${content}</${RawContent}>
`;
};
