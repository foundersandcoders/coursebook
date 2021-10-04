function layout(title, content) {
  return /*html*/ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
    }
    ul {
      padding-left: 0;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    .inline {
      display: inline;
    }
    form > button:only-child {
      border: 0;
      background: none;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
  `;
}

module.exports = layout;
