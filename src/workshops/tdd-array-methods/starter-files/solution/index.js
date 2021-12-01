// function map(array) {
//   return array;
// }

// function map(array, fn) {
//   const el = array[0];
//   const newEl = fn(el);
//   return [newEl];
// }

// function map(array, fn) {
//   const newArray = [];
//   for (let i = 0; i < array.length; i++) {
//     const el = array[i];
//     const newEl = fn(el);
//     newArray.push(newEl);
//   }

//   return newArray;
// }

function map(array, fn) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    const newEl = fn(el, i); // only change is passing i here
    newArray.push(newEl);
  }

  return newArray;
}

function filter(array, fn) {
  const filteredArray = [];
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    const shouldKeep = fn(el, i);
    if (shouldKeep) filteredArray.push(el);
  }
  return filteredArray;
}

// function every(array, fn) {
//   let result = true;
//   for (let i = 0; i < array.length; i++) {
//     const el = array[i];
//     result = fn(el, i);
//   }
//   return result;
// }

function every(array, fn) {
  let result = true;
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    result = fn(el, i);
    if (!result) break; // need to stop if an element fails
  }
  return result;
}

function some(array, fn) {
  let result = false;
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    result = fn(el, i);
    if (result) break; // need to stop if an element passes
  }
  return result;
}

function find(array, fn) {
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    const match = fn(el, i);
    if (match) {
      return el;
    }
  }
  return undefined;
}

// function reduce(array, fn, accumulator) {
//   for (let i = 0; i < array.length; i++) {
//     const el = array[i];
//     accumulator = fn(accumulator, el, i); // fn should return new acc each time
//   }
//   return accumulator;
// }

// Reduce is actually a little more complicated:
// you can optionally not pass an initial accumulator value
// in this case it will use the first array value as the start
// and skip the first iteration
// e.g. [1, 2, 3].reduce((total, x) => total + x)
// the total starts at 1 and the loop starts at the second index
function reduce(array, fn, initialAccumulator) {
  let accumulator = initialAccumulator;
  let i = 0;
  if (initialAccumulator == undefined) {
    accumulator = array[0]; // default to first value
    i = 1; // skip first loop
  }
  for (; i < array.length; i++) {
    const el = array[i];
    accumulator = fn(accumulator, el, i); // fn should return new acc each time
  }
  return accumulator;
}

// function flat(array) {
//   let flattened = [];
//   for (let i = 0; i < array.length; i++) {
//     const el = array[i];
//     if (Array.isArray(el)) {
//       flattened = flattened.concat(el); // concat merges two arrays
//     } else {
//       flattened.push(el);
//     }
//   }
//   return flattened;
// }

function flat(array, depth = 1) {
  let flattened = [];
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    // we need to deal with nested arrays (if we haven't hit our depth limit)
    if (Array.isArray(el) && depth > 0) {
      flattened = flattened.concat(flat(el), depth - 1); // recursively call flat again, and lower depth by 1 each time
    } else {
      flattened.push(el);
    }
  }
  return flattened;
}
