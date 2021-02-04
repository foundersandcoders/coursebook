const { html } = require("htm/preact");

module.exports = function RawContent({ as = "div", children, ...rest }) {
  if (typeof children === "string")
    return html`
      <${as} ...${rest} dangerouslySetInnerHTML=${{ __html: children }} />
    `;
  return html`<${as} ...${rest}>${children}</${as}>`;
};
