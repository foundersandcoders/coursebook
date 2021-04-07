const { html } = require("htm/preact");

exports.data = {
  layout: "resources",
  title: "Resources",
};

exports.render = (data) => {
  const recentWorkshops = data.collections.workshop.reverse();
  return html`
    <section class="vstack">
      <h2>All workshops</h2>
      <ul>
        ${recentWorkshops.map((workshop) => {
          return html`
            <li>
              <a href=${workshop.url}>${workshop.data.title}</a>
            </li>
          `;
        })}
      </ul>
    </section>
  `;
};
