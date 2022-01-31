# Functions

This set of functions will give you an introduction to some key features in JavaScript. Use [Replit](../platforms) to code your solutions.

## Hello user

Write a function which greets the user. The function should receive one argument, a string. We can assume the string is a person's name. We'd like the function to return "Hello " and then the name. We should be able to see the output in the console.

Examples:

```js
console.log(greeter("Yvonne"));
// outputs to the console: Hello Yvonne

let myGreeting = greeter("gregor");
console.log(myGreeting);
// outputs: Hello gregor
```

## What type?

Write a function which returns the type of the argument we pass in.

```js
console.log(checkType(12));
// ouputs: number

let typeOf = "this is a string";
console.log(checkType(typeOf));
// outputs: string
```

> Bonus: Examine the output we get when we check the type of an array. Why does this happen?

## Check length

Write a function which returns the length of the string we pass in.

```js
const theLength = checkLength("Around the World");
console.log(theLength);
// outputs: 16

console.log(checkLength("One More Time"));
// outputs: 13
```

> Bonus: Can we use the length property on other types of variable? What else might this be useful for?

## Sum of two numbers

Write a function which accepts two numbers as arguments. The function should return the sum of the two numbers.

For example:

```js
console.log(addTwoNumbers(4, 6));
// Outputs to the console: 10

let result = addTwoNumbers(5, 15);
console.log(result);
// Outputs to the console: 20

let newNum = 12;

console.log(addTwoNumbers(result, newNum));
// Outputs to the console: 32;
```

## Add and multiply

Write a function that accepts four arguments, each will be a number. The function should add the first two numbers together; add the third and fourth numbers; and return the result of multiplying both sums together.

Examples:

```js
let result = addAndMultiply(2,3,4,5);

// Logging result outputs 45

console.log(addAndMultiply(1,1,1,1);

// Logs 4
```

## Return larger

Write a function which accepts two numbers. The function should return the larger number.

Examples:

```js
console.log(checkLarger(1, 2));
// Outputs 2

checkLarger(44, 33);
// Returns 44
```

## Sum of elements

Write a function which accepts an array as an argument. Each item in the array will be a number. The function should add all the numbers in the array and return the result.

```js
let total = addArrNums([4, 7, 12, 11]);

console.log(total);
// Logs 34

total = addArrNums([4, 5, 6, 7, 8, 9]);

console.log(total);
// Logs 39

console.log(total - total);
// Logs 0
```

## Squaring a number

Write a function which accepts one input, a number.

The function should return the square of that number.

## Odd or Even

Write a function which accepts a number as an argument.

The function should determine whether the number is even or odd.

Return 'Even' or 'Odd' based on the parity of the number.

## Sum of positive

Write a function which accepts an array as an argument.

The function should add up all the positive numbers from the array and return the sum.

If there are no positive numbers to sum, return zero.
