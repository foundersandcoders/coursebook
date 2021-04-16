const types = {
  default: "box-default",
  success: "box-success",
  error: "box-error",
};

function disclosure(content, label = "Toggle answer", type = "success") {
  return html`
    <div class="box ${types[type]} content">
      <details class="disclosure flow">
        <summary>${label}</summary>
        ${content}
      </details>
    </div>
  `;
}

function box(content, type = "default") {
  return html`<div class="box ${types[type]} content flow">${content}</div>`;
}

// removes line breaks, tabs, or pairs of spaces
// quick n dirty way to remove all indentation
// since Markdown relies on it for formatting
// https://github.com/11ty/eleventy/issues/402
function deindent(str) {
  return str.replace(/\n|\t|\s{2}/g, "");
}

// need to deindent HTML strings
// but NOT interpolated content
// since that needs linebreaks above/below
// so Markdown will process it lol
function html(strings, ...vars) {
  return strings
    .map((s, i) => {
      return deindent(s) + (vars[i] || "");
    })
    .join("");
}

module.exports = { disclosure, box };
