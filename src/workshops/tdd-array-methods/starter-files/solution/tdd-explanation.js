// TDD EXPLANATION

// these are the steps I would go through to solve the first challenge using "strict" TDD
// if you want to run this code you need to uncomment the <script> tag in index.html

// RED: a failing test
test("TDD explanation: map() should return an array with the same number of elements", () => {
  const result = map([1], () => {});
  equal(result.length, 1);
});

// to pass our test we need to return an array with the same length
// the simplest solution is to return the input array

// GREEN: the test now passes
// function map(array) {
//   return array;
// }

// REFACTOR: there's not really any change we can make to improve/simplify this

// RED: a failing test
test("TDD explanation: map() should transform a one element array using the fn argument", () => {
  const result = map([1], (x) => x + 1);
  equal(result[0], 2);
});

// to pass the test we need to transform the one item in the array using the callback argument
// the simplest solution is to pass the array item in to the function
// then return a new array with the transformed value in it

//   function map(array, fn) {
//     const item = array[0];
//     const mappedItem = fn(item);
//     const result = [mappedItem];
//     return result;
//   }

// REFACTOR: there's not really any change we can make to improve/simplify this

// RED: a failing test
test("TDD explanation: map() should transform a two element array using the fn argument", () => {
  const result = map([1, 2], (x) => x * 2);
  equal(result[0], 2);
  equal(result[1], 4);
});

// we now have a 2nd element in the array to transform
// we can use the same technique we used for the first element

// GREEN: the test now passes
// function map(array, fn) {
//   const item = array[0];
//   const mappedItem = fn(item1);
//   const item2 = array[1];
//   const mappedItem2 = fn(item2);
//   const result = [mappedItem, mappedItem2];
//   return result;
// }

// REFACTOR: it's clear that we are repeating ourselves here. We can see a series of steps to do for each element in the array:
// 1. get the element
// 2. transform it using the callback function argument
// 3. put it into a new array

function map(array, fn) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const mappedItem = fn(item);
    result.push(mappedItem);
  }
  return result;
}

// we probably want another test to make sure this refactor does work for more than 2 item arrays
test("TDD explanation: map() should transform every item in an array using the fn argument", () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = map(input, (x) => x * 2);
  equal(result[9], 20);
});

// we also haven't considered edge-cases like:
// 1. What happens if we don't pass an array?
// 1. What happens if we pass an empty array?
// 1. What happens if we don't pass a callback?
// it would be a good idea to test these to force yourself to consider them
