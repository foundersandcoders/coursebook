const dogs = require("../dogs.js");

function get(request, response) {
  const search = request.query.search || "";
  let items = "";
  for (const dog of Object.values(dogs)) {
    const match = dog.name.toLowerCase().includes(search.toLowerCase());
    // if we don't have a search submission we show all dogs
    if (match || !search) {
      items += `
        <li>
          <span>${dog.name}</span>
          <form action="/delete-dog" method="POST" style="display: inline;">
            <button name="name" value="${dog.name}" aria-label="Delete ${dog.name}">
              &times;
            </button>
          </form>
        </li>`;
    }
  }
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dogs!</title>
    </head>
    <body>
      <h1>Dogs!</h1>
      <form>
        <label id="search">Search dogs</label>
        <input id="search" type="search" name="search" placeholder="E.g. rover">
        <button>Search</button>
      </form>
      <ul>${items}</ul>
      <a href="/add-dog">Add dog +</a>
    </body>
  </html>
  `;
  response.end(html);
}

module.exports = { get };
