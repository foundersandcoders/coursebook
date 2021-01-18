const { html } = require("htm/preact");
const RawContent = require("./RawContent");

exports.data = {
  layout: "_document",
};

exports.render = ({ content }) => {
  return html`<${RawContent} class="main-wrapper flow">${content}</${RawContent}>`;
};
