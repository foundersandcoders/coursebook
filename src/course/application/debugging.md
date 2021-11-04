# Debugging

When writing code, we'll run into problems and need to debug errors and bugs. Reading through our code and fixing problems is known as debugging.

## Dealing with errors

The first step in dealing with an error is always to read the error message. What is it telling you? Where is the error occurring in your code?

One you have a handle on what's going wrong, think about what might be causing it and how you can resolve the problem.

Changing one thing at a time is important when dealing with an error. Change something and observe whether the error still occurs.

Changing multiple things at once might bring you further from resolving the problem and in a more difficult position than where you started. If you change something and still have the same problem, you'll probably need to change it back before trying something else.

As always, if in doubt, google the error. Read through others' experiences of finding this error and what caused it in their code.

Hitting errors and learning to resolve them is all part of being a developer.

## Writing readable code

Your code should be readable for a human as well as the computer.

Writing clear and meaningful variable and function names can help explain what your code is doing at a glance. This can also help you keep track of what's going on in each part of your code.

Break the code you write into manageable chunks - each section should have a defined purpose.

When debugging your code, look out for the readability of it. Does it make sense when you read it back?

## Removing unnecessary code

As you write code for a website, it's easy to write more than you need.

In your CSS, check that each property and rule you've written is doing something specific. Are there rules which are duplicated? Can you apply a set of rules to multiple elements to avoid rewriting the same rules?

When writing code you might use comments to remind yourself what's happening in the code or as notes for later. When you're debugging and refactoring your code, try to remove unneccessary comments and `console.log()`s.

## Refactoring

You might find that you're performing the same action more than once in your code. Could this be written as a function which is called each time instead?

Are there ways we could rewrite our code to make it more efficient?

Could we restructure the code to make it clearer what is happening?
