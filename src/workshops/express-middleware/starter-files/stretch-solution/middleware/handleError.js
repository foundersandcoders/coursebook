const { STATUS_CODES } = require("http");

function handleErrors(error, req, res, next) {
  console.error(error);
  const status = error.status || 500;
  res.status(status);

  const isProd = process.env.NODE_ENV === "production";
  if (isProd) {
    const message = STATUS_CODES[status];
    res.send(message);
  } else {
    res.send(`<pre>${error.stack}</pre>`);
  }
}

module.exports = handleErrors;
