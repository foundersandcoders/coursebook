const db = require("../database/connection.js");

function get(request, response) {
  const select_posts = /*sql*/ `
    SELECT blog_posts.text_content, users.username
    FROM blog_posts INNER JOIN users
    ON blog_posts.user_id = users.id
    ORDER BY blog_posts.id DESC
  `;
  db.query(select_posts).then((result) => {
    const posts = result.rows;
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
