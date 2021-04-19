function layout(content) {
  return `
    <doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Error-handling workshop</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

module.exports = layout;
