# Array Methods

Build a front-end which interacts with a set of functions. Each function focuses on using a different _array method_.

Below is a suggested approach, you're encouraged to experiment with other approaches to build a similar tool.

### Set-up

Open a new project in Stackblitz or VS Code. Set up HTML, CSS and JavaScript files and ensure they are connected with one another.

In your HTML, you'll need to have:

- An `<input>` tag which accepts a string
- A set of radio buttons which indicate which function the user will run
- Labels for each `input`
- A `button` for the user to click
- Somewhere to output the result

### JavaScript

Add JavaScript so that when the user clicks the button, one of the functions is run and the result is shown on the page.

The input should be given in the first input box as a string. The user should be able to enter numbers, separated by commas. In JavaScript, you'll convert this string to an array of numbers.

Based on which radio button is selected, choose which function to run. Pass an array as an argument to the particular function.

Finally, return the result from the function and display it on the page.

### User experience

Add CSS to give the user an intuitive experience

Think about and constrain what inputs can be given. The user may be inconsistent in the string they give, for example using spaces or not. How can we account for this, in JavaScript or HTML?
