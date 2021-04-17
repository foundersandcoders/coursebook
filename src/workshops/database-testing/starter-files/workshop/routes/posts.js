const db = require("../database/connection.js");

function get(request, response) {
  const SELECT_POSTS = `
    SELECT blog_posts.text_content, users.username
    FROM blog_posts INNER JOIN users
    ON blog_posts.user_id = users.id
    ORDER BY blog_posts.id DESC
  `;
  db.query(SELECT_POSTS).then((result) => {
    const posts = result.rows;
    let postItems = "";
    for (let post of posts) {
      postItems += `
        <li>
         <p>${post.text_content}</p>
         <p>${post.username}</p>
        </li>
      `;
    }
    response.send(`<ul>${postItems}</ul>`);
  });
}

module.exports = { get };
