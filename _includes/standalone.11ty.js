/**
 * Standalone layout
 * For pages without top nav (e.g. home)
 */

const { html } = require("htm/preact");
const RawContent = require("./RawContent");

exports.data = {
  layout: "_document",
};

exports.render = ({ collections, page, content }) => {
  return html`
  <main id="main" class="cover">
    <${RawContent}>${content}</${RawContent}>
  </main>
  `;
};
