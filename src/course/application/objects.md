# Objects

Objects are used for storing data in key/value pairs. We can access properties and methods of objects.

Understanding how objects work is important when we're getting data from other sources for our website.

## Object structure

Objects are a type of JavaScript variable and are wrapped in curly brackets.

```js
const myPet = {
  type: "dog",
  name: "Spot",
  age: 6,
  calculateHumanAge: function () {
    return this.age * 7;
  },
};
```

To access the value `dog` we'd write `myPet.type` or myPet["type"].

We can run the `calculateHumanAge()` method by typing `myPet.calculateHumanAge()`.

We might also encounter _nested objects_ within other objects.

```js
const ingredients = {
  water: "500ml",
  carrots: "4",
  coriander: "a handful",
  spices: {
    cumin: "1 tsp",
    paprika: "2 tsp",
    cayenne: "1 tsp",
  },
};
```

## Capitalise keys

Write a function capitaliseKeys, which takes an object as an argument, and returns a new object with the same key-value pairs except all the keys have been capitalised.

Examples:

```js
capitaliseKeys({ a: 1, b: 2, c: 3 }); //Expected: { A: 1, B: 2, C: 3 }

capitaliseKeys({ Hello: "hi" }); //Expected: { HELLO: 'hi' }

capitaliseKeys({}); //Expected: {}
```

> Note: your function needs to construct a new object and return the new object, not just mutate the old object that's passed in as an argument.

## String to object

Write a function `stringToObject`

`stringToObject` takes one parameter, a string. The string is made up of key-value pairs formatted as follows: "key1:value1,key2:value2,..."

`stringToObject` should return an object made up of the key-value pairs in the string. Assume all values are strings.

Examples:

```js
stringToObject(""); // Expected {}

stringToObject("a:1,b:2,c:3"); //Expected { a: "1", b: "2", c: "3" }

stringToObject("one:-1,two:hi there,three:what's that?"); // Expected { one: "-1", two: "hi there", three: "what's that?" }
```

## Going shopping

Write a function `shoppingList` that accepts a single parameter, a string.
The string is a list of ingredients, separated by a comma, formatted as below:

"2 tomatoes, 1 egg, 3 pumpkins"

The function `shoppingList` should return an object where the keys are the ingredient names, and the values are the number of the ingredients needed.

Examples:

```js
shoppingList("2 tomatoes, 1 egg, 3 pumpkins");
// returns { tomatoes: 2, egg: 1, pumpkins: 3 }

shoppingList("");
// returns {}

shoppingList("2 tomatoes, 1 egg, 0 pumpkins");
// returns { tomatoes: 2, egg: 1 }
```

## Map Object

Write a function `mapObject` that takes two parameters: an object `obj` and a function `fn`.

`mapObject` should return a new object whose keys are the same as those of `obj`, and whose values are the result of calling `fn` with the values of `obj`.

Example:

```js
mapObject({ a: 1, b: 2 }, (n) => n + 2);
// returns { a: 3, b: 4 }

mapObject({ greeting: 'hi there, ', goodbye: 'see you later, ' }), (s) => s + 'Yvonne');
// returns { greeting: 'hi there, Yvonne', goodbye: 'see you later, Yvonne' }
```
