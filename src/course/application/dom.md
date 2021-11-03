# DOM Manipulation

This set of prompts will guide you to create a _Codename validator_. This project will build on your knowledge of DOM Manipulation and give you experience of managing input from a user.

## Set-up

Open a new StackBlitz project with HTML, CSS and JavaScript files. Check everything is set up as you expect it - is your CSS linked in your HTML? Does your JavaScript file run?

Add an input box, a label, and a button to the HTML. Your input will be a string.

## Functions

Write a function that checks the length of the string. The function should output `true` if the string more than 5 characters long. Otherwise, return `false`.

Write a function that checks the string contains at least one lowercase letter; and at least one uppercase letter. If both are present, the function should return `true` - and if either are missing, it should return `false`.

Write a function which checks whether the string has at least two numbers in it. If it does, then return `true` and otherwise return `false`.

## DOM Manipulation

Use DOM Manipulation to tie everything together. You'll need to check the value of the input when the user clicks the button. When the button is clicked, verify the input gives `true` when given as an argument to each of the functions.

If both functions return `true` give visual feedback to the user that the codename is valid. If either or both functions return `false` then give the user feedback that the codename is not valid. How you implement this is up to you.

## Examples

`Gregor23` is a valid username, and so is `a88aFan`.

An invalid input would be `d0g` as it's too short and has no uppercase letters or numbers; or `902101` since it has no letters. `HELLOworld` is not since it doesn't contain numbers
