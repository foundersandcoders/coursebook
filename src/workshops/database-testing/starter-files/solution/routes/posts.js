const { getPosts } = require("../database/model.js");

function get(request, response) {
  getPosts().then((posts) => {
    const postItems = posts.map((post) => {
      return /*html*/ `
        <li>
        <p>${post.text_content}</p>
        <p>${post.username}</p>
        </li>
      `;
    });
    response.send(`<ul>${postItems.join("")}</ul>`);
  });
}

module.exports = { get };
