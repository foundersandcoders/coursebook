const { html } = require("htm/preact");

exports.data = {
  title: "HTTP workshops",
};

exports.render = ({ collections }) => {
  return html`
    <ol>
      ${collections.workshop.map(
        (workshop) => html`<li>${workshop.data.title}</li>`
      )}
    </ol>
  `;
};
