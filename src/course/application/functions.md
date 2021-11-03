# Functions

**Week 1: Functions**

:one: Write a function which greets the user. The function should receive one argument, a string. We can assume the string is a person's name. We'd like the function to return "Hello " and then the name. We should be able to see the outputs in the console.

Examples

```js
console.log(greeter("Yvonne"));
// outputs to the console: Hello Yvonne

let myGreeting = greeter("gregor");
console.log(myGreeting);
// outputs: Hello gregor
```

:two: Write a function which returns the type of the argument we pass in.

```js
console.log(checkType(12));
// ouputs: number

let typeOf = "this is a string";
console.log(checkType(typeOf));
// outputs: string
```

:star: Bonus: Examine the output we get when we check the type of an array. Why does this happen?

:three: Write a function which returns the length of the string we pass in.

```js
const theLength = checkLength("Around the World");
console.log(checkLength(theLength));
// outputs: 16

console.log(checkLength("One More Time"));
// outputs: 13
```

:star: Bonus: Can we use the length property on other types of variable? What else might this be useful for?
