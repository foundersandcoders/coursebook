# Programming Paradigms

A programming paradigm is a way of thinking and structuring code that provides guidelines and patterns for solving problems. It encompasses a set of principles and techniques that determine how software is designed, organized, and executed.

## The different programming Paradigms

- Imperative
- Procedural
- Object-Oriented
- Declarative
- Functional
- Logical
- Reactive
- Event-driven
- Concurrent
- Parallel
- Domain-Specific

This is not an exhaustive list of all the paradigms that exist, however they are some of the more popular ones.

We will be focusing on the following 3:

- Imperative
- Declarative
- Reactive

## Imperative Programming

Imperative programming is a programming paradigm where programs consist of a sequence of instructions that explicitly state how to achieve a desired outcome. It focuses on changing the program's state through direct manipulation of variables and control flow structures.

### Real-world Example

Let's say you have a recipe for making a sandwich. In an imperative programming paradigm, you would follow a sequence of steps explicitly stated in the recipe to achieve the desired outcome of making the sandwich.

- Gathering the necessary ingredients (bread, lettuce, tomatoes and mayonnaise)
- Spread mayonnaise on the bread
- Add the lettuce and tomatoes
- Assemble the sandwich.

In this example, the recipe serves as the sequence of instructions, and you are following those instructions step by step to achieve the specific outcome of making the sandwich. Each action changes the state of the sandwich (adding ingredients, spreading condiments) until the desired state (a complete sandwich) is reached. This illustrates the imperative programming paradigm's characteristic of explicitly stating and executing a sequence of instructions to accomplish a specific task.

### Coding Example

Let's look at a simple coding example that calculates the factorial of a number

```js
function factorial(n) {
  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

const number = 5;
const factorialResult = factorial(number);
console.log(`The factorial of ${number} is ${factorialResult}`);
```

In this example, the **factorial()** function calculates the factorial of a given number using an iterative approach. It initializes a **result** variable to 1 and then uses a **for** loop to multiply **result** by each number from 1 to **n**.

The code follows a sequence of steps explicitly defined in the function, executing each instruction in order to achieve the desired outcome of calculating the factorial. It represents the imperative programming paradigm by explicitly stating how to accomplish the task and manipulating the program state (the result variable) to achieve the desired result.

## Declarative Programming

Declarative programming is a programming paradigm where programs specify the desired outcome or goal without explicitly stating the control flow or steps to achieve it. It focuses on describing what should be done rather than how to do it.

### Real-world Example

Consider a shopping list. Instead of specifying the exact steps to go to the store, navigate through aisles, pick up items, and pay at the counter, a declarative approach would be to simply list the items needed and let someone else handle the implementation details.

- Milk
- Eggs
- Bread
- Orange Juice

### Coding Example

Let's look at a simple coding example that filters even numbers from an array

```js
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter((num) => num % 2 === 0);

console.log(evenNumbers);
```

In this example, the **filter()** method is used to declaratively specify the desired outcome of extracting even numbers from the **numbers** array. By providing a callback function that checks if a number is even **(num % 2 === 0)**, the **filter()** method takes care of iterating over the array, executing the logic, and returning a new array with the filtered results.

The code expresses the desired outcome (filtering even numbers) without explicitly stating how to perform the iteration or filtering. The declarative programming paradigm allows us to focus on the "what" (filtering) rather than the "how" (iteration and condition), letting the underlying implementation handle the details.

## Declarative vs Imperative Programming

** Imperative **

```js
function Box() {
  const div = document.createElement("div");
  div.classList.add("box");
  div.append("Hello world");
  return div;
}
```

Here you're giving the function specific instructions to create a div with the class "box" and contain a "Hello World" message.

** Declarative **

```js
function Box() {
  return <div className="box">Hello world</div>;
}
```

Whereas, with declarative programming you define the div element's className as "box" yourself, without giving instructions on how that div should be created.

## The Pro and Cons of Declarative Programming

Pros:

- Simplicity: Declarative programming simplifies code by focusing on the desired outcome rather than the detailed steps, making it easier to read, understand, and reason about.
- Abstraction: Declarative code promotes abstraction and encapsulation, allowing for reusable and modular components that can be composed to solve complex problems.

Cons:

- Learning Curve: Declarative programming may require a shift in thinking and understanding higher-level abstractions, which can initially be challenging for developers more familiar with imperative paradigms.
- Limited Control: Declarative code abstracts away control flow and implementation details, which can be limiting in certain scenarios where fine-grained control or performance optimizations are required.

## The Pro and Cons of Imperative Programming

Pros:

- Control: Imperative programming provides fine-grained control over the execution flow, allowing developers to explicitly define the sequence of steps to achieve a desired outcome.
- Flexibility: Imperative code can be more flexible and adaptable, as it allows for direct manipulation of program state and detailed control over low-level operations.

Cons:

- Complexity: Imperative code can become complex and harder to reason about as programs grow in size and complexity. The explicit control flow and mutable state can lead to code that is harder to understand and maintain.
- Code Reusability: Imperative code often tightly couples the logic with the specific implementation, making it less reusable in different contexts or for different tasks.

## Reactive programming

Reactive programming is a way of writing code that focuses on how data changes and flows over time. It allows developers to easily define and handle data streams in a way that is responsive and event-driven.

## How does it work?

Here are two example of some code that take a name as a parameter and will output a h1 message "Hello, {name}".

```jsx
import React from "react";

// JSX component
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;

// Usage in JSX
const App = () => <Greeting name="John" />;
```

In the above example, we utilize **JSX syntax**, which is commonly associated with **React**. JSX allows us to write **HTML-like code within JavaScript**, making it easier to define and render components. The Greeting component is defined as a function that receives a name prop and returns an HTML element. The App component renders the Greeting component with the name prop set to "John".

```js
// Vanilla JavaScript equivalent
const Greeting = ({ name }) => {
  const element = document.createElement("h1");
  element.textContent = `Hello, ${name}!`;
  return element;
};

// Usage in vanilla JavaScript
const App = () => {
  const greetingElement = Greeting({ name: "John" });
  document.body.appendChild(greetingElement);
};
```

The above code example is written using **vanilla JavaScript** but achieves the same result as the JSX example. The Greeting component is defined as a function that creates a new HTML element, sets its text content, and returns it. The App component creates an instance of the Greeting component, appends the returned HTML element to the document body.

Comparatively, the JSX approach provides a more intuitive and concise syntax, resembling HTML, and simplifies the process of creating components.

In vanilla JavaScript, the equivalent code requires manual element creation, manipulation, and appending to the DOM.

JSX, with the help of a tool like Babel, transpiles the code into plain JavaScript, but it enhances the readability and maintainability of the code for developers working with React or JSX-based frameworks.


## DevOps

- ## [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/)
  Amazon CloudWatch is a monitoring tool used to collect and visualise real-time logs, metrics, and event data in automated dashboards.
  

## Further reading

- ### [Programming Paradigms – Paradigm Examples for Beginners](https://www.freecodecamp.org/news/an-introduction-to-programming-paradigms/)
  A quick overview of different programming paradigms with code examples.
- ### [Introduction of Programming Paradigms](https://www.geeksforgeeks.org/introduction-of-programming-paradigms/)
  An overview of programming paradigms with coding examples in different languages such Visual Basic, C and Fortran.
- ### [Programming Paradigms Explained](https://www.youtube.com/watch?v=H5uA6p_pK-Y)
  A fun little video explaining some of the programming paradigms not covered in this section.