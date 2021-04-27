const fs = require("fs");
const path = require("path");

/*
 *
 *
 * CHALLENGE 2
 *
 *
 */

function readFilePromise(filePath) {
  //
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * TESTS
 * don't change these!
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
const test = require("tape");

test("readFilePromise returns a promise", (t) => {
  const testPath = path.join(__dirname, "test.txt");
  const result = readFilePromise(testPath);
  t.true(
    result instanceof Promise,
    "readFilePromise should return a Promise object"
  );
  if (result) {
    result.then((contents) => {
      t.equal(
        contents.toString(),
        "hello",
        `readFilePromise("./test/txt") should be should be 'hello', received '${contents}'`
      );
      t.end();
    });
  } else {
    t.end();
  }
});

test("readFilePromise rejects if an error occurs", (t) => {
  const result = readFilePromise("notReal.psd");
  if (result) {
    result
      .then(() => {
        t.fail("Nonexistent file should cause readFilePromise to reject");
        t.end();
      })
      .catch((error) => {
        t.ok(
          error instanceof Error,
          "readFilePromise should reject with an Error object"
        );
        t.equal(
          error.message,
          "ENOENT: no such file or directory, open 'notReal.psd'",
          `Error message should be "ENOENT: no such file or directory, open 'notReal.psd'", received "${error.message}"`
        );
        t.end();
      });
  } else {
    t.end();
  }
});
