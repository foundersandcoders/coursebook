// TDD EXPLANATION

// these are the steps I would go through to solve the first challenge using "strict" TDD
// if you want to run this code you need to uncomment the <script> tag in index.html

// RED: a failing test
test("map() requires array and fn arguments", () => {
  equal(map(), "Please pass an array");
  equal(map([]), "Please pass a mapping function");
});

// function map(array, fn) {
//   if (!Array.isArray(array)) return "Please pass an array";
//   if (typeof fn !== "function") return "Please pass a mapping function";
// }

// RED: a failing test
test("map() should return an array", () => {
  const result = map([], () => {});
  equal(Array.isArray(result), true);
});

// GREEN: make the test pass
// the simplest solution is to just return an empty array
// function map(array, fn) {
//   if (!Array.isArray(array)) return "Please pass an array";
//   if (typeof fn !== "function") return "Please pass a mapping function";
//   const result = [];
//   return result;
// }

// REFACTOR: there's no real way to improve this yet

// RED: a failing test
test("map() should transform an element using the fn argument", () => {
  const result = map([1], (x) => x + 1);
  equal(result[0], 2);
});

// to pass the test we need to transform the one item in the array using the callback argument
// the simplest solution is to pass the array item in to the function
// then return a new array with the transformed value in it

// function map(array, fn) {
//   if (!Array.isArray(array)) return "Please pass an array";
//   if (typeof fn !== "function") return "Please pass a mapping function";
//   const result = [];
//   const item = array[0];
//   const mappedItem = fn(item);
//   result.push(mappedItem);
//   return result;
// }

// REFACTOR: there's not really any change we can make to improve/simplify this

// RED: a failing test
test("map() should transform 2 elements using the fn argument", () => {
  const result = map([1, 2], (x) => x * 2);
  equal(result[0], 2);
  equal(result[1], 4);
});

// we now have a 2nd element in the array to transform
// we can use the same technique we used for the first element

// GREEN: the test now passes

// function map(array, fn) {
//   if (!Array.isArray(array)) return "Please pass an array";
//   if (typeof fn !== "function") return "Please pass a mapping function";
//   const result = [];
//   const item1 = array[0];
//   const mappedItem1 = fn(item1);
//   result.push(mappedItem1);
//   const item2 = array[1];
//   const mappedItem2 = fn(item2);
//   result.push(mappedItem2);
//   return result;
// }

// REFACTOR: it's clear that we are repeating ourselves here. We can see a series of steps to do for each element in the array:
// 1. get the element
// 2. transform it using the callback function argument
// 3. put it into a new array

function map(array, fn) {
  if (!Array.isArray(array)) return "Please pass an array";
  if (typeof fn !== "function") return "Please pass a mapping function";
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const mappedItem = fn(item);
    result.push(mappedItem);
  }
  return result;
}

// we probably want another test to make sure this refactor does work for more than 2 item arrays
test("map() should transform every item in an array using the fn argument", () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = map(input, (x) => x * 2);
  equal(result[8], 18);
  equal(result[9], 20);
});
