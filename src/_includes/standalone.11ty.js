/**
 * Standalone layout
 * For pages without top nav (e.g. home)
 */

const { html } = require("htm/preact");
const RawContent = require("./components/RawContent");

exports.data = {
  layout: "_document",
};

exports.render = ({ content }) => {
  return html`
  <main id="main" class="cover">
    <${RawContent}>${content}</${RawContent}>
  </main>
  `;
};
