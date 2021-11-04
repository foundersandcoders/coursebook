# Objects

Objects are used for storing data in key/value pairs. We can access properties and methods of objects.

Understanding how objects work is important when we're getting data from other sources for our website.

## Object structure

Example object w/ key-value pairs and methods
How to access particular pieces of data (spoiler tags?)
Nesting

## Capitalise keys

So we heard y'all like objects...

Write a function capitaliseKeys, which takes an object as an argument, and returns a new object with the same key-value pairs as the input object, except all the keys have been capitalised.

Example:
capitaliseKeys({ a: 1, b: 2, c: 3 }) //Expected: { A: 1, B: 2, C: 3 }

capitaliseKeys({ Hello: 'hi' }) //Expected: { HELLO: 'hi' }

capitaliseKeys({}) //Expected: {}

Note: your function needs to construct a new object and return the new object, not just mutate the old object that's passed in as an argument.

## String to object

Write a function stringToObject

stringToObject takes one parameter, a string. The string is made up of key-value pairs formatted as follows: "key1:value1,key2:value2,..."
stringToObject should return an object made up of the key-value pairs in the string. Assume all values are strings.

Example:
stringToObject("") // Expected {}

stringToObject("a:1,b:2,c:3") //Expected { a: "1", b: "2", c: "3" }

stringToObject("one:-1,two:hi there,three:what's that?") // Expected { one: "-1", two: "hi there", three: "what's that?" }

## Going shopping

Write a function shoppingList that accepts a single parameter, a string.
The string is a list of ingredients, separated by a comma, formatted as below:

"2 tomatoes, 1 egg, 3 pumpkins"

The function shoppingList should return an object where the keys are the ingredient names, and the values are the number of the ingredients needed.

Example:
shoppingList("2 tomatoes, 1 egg, 3 pumpkins");
// returns { tomatoes: 2, egg: 1, pumpkins: 3 }

shoppingList("");
// returns {}

shoppingList("2 tomatoes, 1 egg, 0 pumpkins");
// returns { tomatoes: 2, egg: 1 }

## Map Object

Write a function mapObject that takes two parameters: an object obj and a function fn.
mapObject should return a new object whose keys are the same as those of obj, and whose values are the result of calling fn with the values of obj.

Example:
mapObject({ a: 1, b: 2 }, (n) => n + 2);
// returns { a: 3, b: 4 }

mapObject({ greeting: 'hi there, ', goodbye: 'see you later, ' }), (s) => s + 'Yvonne');
// returns { greeting: 'hi there, Yvonne', goodbye: 'see you later, Yvonne' }
