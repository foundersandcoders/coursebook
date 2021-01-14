const { html } = require("htm/preact");

exports.data = {
  layout: "_document",
};

exports.render = ({ content }) => {
  return html`<div class="flow">${content}</div>`;
};
