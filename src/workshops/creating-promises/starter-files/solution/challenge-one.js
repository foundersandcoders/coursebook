/*
 *
 *
 * CHALLENGE 1
 *
 *
 */

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
 *
 *
 * TESTS
 * don't change these!
 *
 *
 */
const test = require("tape");

test("`wait` function works correctly", (t) => {
  const start = Date.now();
  const result = wait(200);
  t.true(result instanceof Promise, "wait should return a promise");
  if (result) {
    return result.then(() => {
      const end = Date.now();
      const duration = end - start;
      // can't be too specific here as setTimeout is never exact
      t.true(duration > 199, "`wait(200)` should wait at least 200ms");
      t.true(duration < 250, "`wait(200)` shouldn't wait longer than 200ms");
      t.end();
    });
  } else {
    t.end();
  }
});
