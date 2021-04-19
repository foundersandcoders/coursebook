// returns a promise that always rejects
function getPosts() {
  const error = new Error("Retrieving posts failed");
  return Promise.reject(error);
}

module.exports = { getPosts };
