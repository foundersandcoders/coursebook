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
    if (result) break; // need to stop if an element fails
  }
  return result;
}

function find(array, fn) {
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    const match = fn(el, i);
    if (match) {
      return el;
    } else {
      return undefined;
    }
  }
}

// function reduce(array, fn, initialAccumulator) {
//   let newAccumulator = initialAccumulator; // starting value
//   for (let i = 0; i < array.length; i++) {
//     const el = array[i];
//     newAccumulator = fn(newAccumulator, el, i); // fn should return new acc each time
//   }
//   return newAccumulator;
// }

function reduce(array, fn, initialAccumulator) {
  let newAccumulator = initialAccumulator || array[0]; // starting value
  let startCount = initialAccumulator ? 0 : 1; // if no acc passed we skip first iteration
  for (let i = startCount; i < array.length; i++) {
    const el = array[i];
    newAccumulator = fn(newAccumulator, el, i); // fn should return new acc each time
  }
  return newAccumulator;
}

function flat(array) {
  let flattened = [];
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (Array.isArray(el)) {
      flattened = flattened.concat(el); // concat merges two arrays
    } else {
      flattened.push(el);
    }
  }
  return flattened;
}

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
