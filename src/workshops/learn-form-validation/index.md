---
title: Form validation
description:
tags:
  - workshop
  - html
keywords:
  - html
  - forms
  - validation
---

In this workshop you'll learn how to validate user input in the browser and present error messages accessibly.

![Final solution](https://user-images.githubusercontent.com/9408641/90390317-09ebb000-e083-11ea-9bc5-06b465207690.png)

## Setup

1. Download starter files
1. Open `workshop/index.html` in your browser
1. This is the form we'll be adding validation to

## Why validate in the browser?

Client-side validation is important for a good user experience—you can quickly give the user feedback when they need to change a value they've entered. For example if passwords must be a certain length you can tell them immediately, rather than waiting for the form to submit to the server and receive an invalid response.

{% box %}

You **should not** rely entirely on client-side validation however. You can never trust anything that happens in the browser: users can use dev tools to mess with attributes and elements to bypass validation. You **always** need to validate user input on the server as well, for security.

{% endbox %}

## Communicating requirements

Our form has two inputs: one for an email address and one for a password. These are the requirements we need to validate:

1. Both values are present
1. The email value is a valid email address
1. The password contains at least one number, and is at least 8 characters long

Before we implement validation we need to make sure the user is aware of the requirements, by labelling the inputs. There's nothing more frustrating than trying to guess what you need to do to be able to submit a form.

### Required values

Users generally expect required fields to be [marked with an asterisk](https://www.nngroup.com/articles/required-fields/) (`*`). We can add one inside the `<label>`. However this will cause screen readers to read out the label as "email star", which is not correct. We should wrap the asterisk in an element with `aria-hidden="true"` to ensure it is ignored by assistive technology.

### Different types of value

If we don't list our password requirements users will have to guess what they are.

The simplest way to list requirements is in a `<div>` following the label. This is fine for visual users but won't be linked to the input, which means assistive tech will ignore it.

We need to use the [`aria-describedby`](https://developer.paciellogroup.com/blog/2018/09/describing-aria-describedby/) attribute on the input. This takes the IDs of other elements that provide additional info. It allows us to link the div to the input so screen readers read out the extra info as if it were part of the label.

#### Challenge

1. Add a visual required indicator to both inputs.
1. Add instructions containing our password requirements
1. Associate the instructions with the input using `aria-describedby`

{% disclosure %}

```html
<label for="password">
  Password
  <span aria-hidden="true">*</span>
</label>
<div id="passwordRequirements">
  Passwords must contain at least one letter and one number, and contain at
  least 8 characters.
</div>
<input id="password" aria-describedby="passwordRequirements" />
```

{% enddisclosure %}

If you inspect the password input in Chrome's devtools you should be able to see the accessible name (from the label) and description (from the div) in the "Accessibility tab".

![Accessibility tab example](https://user-images.githubusercontent.com/9408641/78671737-99b06f00-78d7-11ea-8afa-bf4c13fea6ae.png)

## HTML5 validation

Now we need to tell the user when they enter invalid values. Browsers support lots of different types of validation.

### Requiring values

The `required` attribute will stop the user submitting the form if they haven't entered this value yet.

```html
<input required />
```

### Types of values

Browsers will validate certain input `type`s to make sure the value looks correct. For example:

```html
<!-- checks the value is an email string -->
<input type="email" required />
<!-- checks the value is a URL string -->
<input type="url" required />
```

### Matching a pattern

We can specify a regex the value must match using the `pattern` attribute. For example this input will be invalid if it contains whitespace characters:

```html
<input type="text" pattern="\S" />
```

### Other validation

Here's a [full list of validation attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Intrinsic_and_basic_constraints).

You can even style inputs based on their validity using CSS pseudo-classes like `:invalid`, `:valid` and `:required`.

### Challenge

Ensure each input meets our validation requirements above. If you submit the form with invalid values the browser will automatically stop the submission and show a warning.

{% box  %}

**Hint**: Here's a regexp for validating that a string contains at least one number: `.*\d.*`

{% endbox %}

{% disclosure %}

```html
<input id="email" type="email" required />
<!-- ... labels etc -->
<input
  id="password"
  type="password"
  aria-describedby="passwordRequirements"
  required
  pattern=".*\d.*"
  minlength="8"
/>
```

{% enddisclosure %}

## Custom validation

Built-in validation is very simple to implement, and it works without JavaScript. However it has a few downsides. We cannot style the error message bubbles that pop up. The messages are [not properly exposed to most screen readers](https://adrianroselli.com/2019/02/avoid-default-field-validation.html). Required inputs are marked invalid as soon as the page loads (since they are empty). We can definitely improve this user experience by enhancing our validation with JS.

It's still useful to _start_ with the HTML5 validation attributes, so that if our JS fails to load or breaks the user at least gets basic validation.

### Hijacking the built-in validation

First we need to disable the native validation by setting the `novalidate` attribute on the form element. This prevents the built-in errors from appearing.

Then we can listen for the form's `submit` event and check whether any inputs are invalid using the form element's `.checkValidity()` method.

This method returns true if _all_ inputs are valid, otherwise it returns false. If any of the inputs are invalid we want to call `event.preventDefault()` to stop the form from submitting. Don't worry about showing error messages for now.

### Challenge

1. Open `workshop/index.js`
1. Disable the native form validation
1. Listen for submit events and check whether all the inputs are valid
1. Prevent the form from submitting if any inputs are invalid

{% disclosure %}

```js
const form = document.querySelector("form");
form.setAttribute("novalidate", "");

form.addEventListener("submit", (event) => {
  const allInputsValid = form.checkValidity();
  if (!allInputsValid) {
    event.preventDefault();
  }
});
```

{% enddisclosure %}

## Handling invalid inputs

We've managed to stop the form submitting invalid values, but we need to provide feedback to the user so they can fix their mistakes.

First we need to actually mark the input as "invalid". The `aria-invalid` attribute does this. Each input should have `aria-invalid="false"` set at first, since the user hasn't typed anything yet. Then we need to know when the input becomes _invalid_, so we can update to `aria-invalid="true"`.

We can listen for an input's `invalid` event to run code when it fails validation. The browser will fire this event for all invalid inputs when you call the form element's `checkValidity()` method. E.g.

```js
inputElement.addEventListener("invalid", (event) => {
  console.log(inputElement + " is now invalid");
});
```

The final step is showing a validation message depending on what type of validation error occurred. We can access the default browser message via the `input.validationMessage` property. E.g. for a `required` input this might be `"Please fill out this field"`.

### Challenge

1. Loop through all the inputs
1. Mark each as valid
1. For each input listen for the `invalid` event
   - Mark the input as _invalid_ when this event fires

{% box %}

**Hint**: you can use the `element.setAttribute` method to set ARIA attributes.

{% endbox %}

{% disclosure %}

```js
const inputs = form.querySelectorAll("input");

inputs.forEach((input) => {
  input.setAttribute("aria-invalid", false);
  input.addEventListener("invalid", () => {
    input.setAttribute("aria-invalid", true);
    console.log(input.validationMessage);
  });
});
```

{% enddisclosure %}

## Validation messages

We need to actually tell the user what their mistake was. The simplest way to do this is to grab the built-in validation message from the browser. This will be available as the `element.validationMessage` property. For example if the user typed "hello" into this input:

```html
<input type="email" />
<script>
  input.addEventListener("invalid", () => {
    console.log(input.validationMessage);
  });
</script>
```

The JS would log something like "Please include an '@' in the email address". These message vary across browsers.

We need to put the message on the page so the user knows what they did wrong. The message should be associated with the correct input: we want it to be read out by a screen reader when the user focuses the input.

We can achieve this using `aria-describedby` just like with our password requirements. This can take multiple IDs for multiple descriptions (the order of the IDs determines the order they will be read out).

```html
<label for="password">Password</label>
<div id="passwordRequirements">
  Please enter at least 8 characters containing at least 1 number
</div>
<input
  id="password"
  type="password"
  aria-describedby="passwordRequirements passwordError"
  required
/>
<div id="passwordError">{insert the right message in here}</div>
```

Whenever this input is focused a screen reader will read out the label first, then the type of input, then any ARIA descriptions.

### Challenge

1. Create divs to contain the error messages
1. Set attributes on the inputs and divs so they are linked together
1. Put the validation messages inside the divs so the user can read them

{% disclosure %}

```html
<!-- lots of stuff removed to simplify example -->

<input id="email" aria-describedby="emailError" />
<div id="emailError"></div>

<input id="password" aria-describedby="passwordRequirements passwordError" />
<div id="passwordError"></div>
```

```js
inputs.forEach((input) => {
  // ...
  input.addEventListener("invalid", () => {
    // ...
    const errorId = input.id + "Error";
    // find the div we're putting the error in
    const errorContainer = form.querySelector("#" + errorId);
    errorContainer.textContent = input.validationMessage;
  });
});
```

{% enddisclosure %}

## Re-validating

Right now it's a little confusing for the user as the input stays marked invalid even when they type something new. We should mark each input as valid and remove the error message when the user inputs something.

1. Add an event listener for `input` events
1. Mark the input valid and remove the error message

{% disclosure %}

```js
inputs.forEach((input) => {
  // ...
  input.addEventListener("input", () => {
    input.setAttribute("aria-invalid", false);

    const errorId = input.id + "Error";
    // find the div we're removing the error from
    const errorContainer = form.querySelector("#" + errorId);
    errorContainer.textContent = "";
  });
});
```

{% enddisclosure %}

## Styling

We have a functional, accessible solution now, but it could be improved with some styling. It's common to style validation messages with a "danger" colour like red, and sometimes to mark invalid inputs with a different coloured border. You could also use warning icons to make errors even more obvious.

### Challenge

1. Style the error messages
1. Style invalid inputs
1. Add any other styles you like to make it look good

{% box %}

**Hint:** you can target elements in CSS by their attributes:

```css
div[some-attribute="true"] {
  color: red;
}
```

{% endbox %}

{% disclosure %}

```css
input[aria-invalid="true"] {
  border-color: hsl(340, 70%, 50%);
}

.error {
  margin-top: 0.5rem;
  color: hsl(340, 70%, 50%);
}
```

{% enddisclosure %}

![initial solution](https://user-images.githubusercontent.com/9408641/90390223-e4f73d00-e082-11ea-8b29-19a208cbda95.png)

## Stretch goal: custom messages

The default browser messages could be better. They don't contain specific, actionable feedback. E.g. if a `pattern` doesn't match the user sees "Please match the requested format". It would be more useful to show "Please enter at least one number".

We need to know what _type_ of error occurred to show the right custom message. The input element's `.validity` property contains this information.

This interface has properties for every kind of error. For example an empty `required` input will show:

```js
{
  valueMissing: true,
  typeMismatch: false,
  patternMismatch: false,
  // ... etc
}
```

Here's a list of [all the validity properties](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState).

We can write an `if`/`else` statement to check whether each property we're interested in is true. If it is we can show a custom error on the page:

```js
let message = "";
if (validity.valueMissing) {
  message = "Please enter an email address";
} else if (validity.typeMismatch) {
  // ...
}
```

### Challenge

1. Edit your `invalid` handler to check the `validity` interface
1. Show custom error messages based on the input's ID and what validation failed.

![Final solution](https://user-images.githubusercontent.com/9408641/90390317-09ebb000-e083-11ea-9bc5-06b465207690.png)

## Resources

- [Constraint Validation | MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) (built-in HTML validation)
- [Native form validation—part 1](https://medium.com/samsung-internet-dev/native-form-validation-part-1-bf8e35099f1d) (the limitations of HTML/CSS-only validation)
- [Required attribute requirements](https://developer.paciellogroup.com/blog/2019/02/required-attribute-requirements/) (explains the JS/ARIA stuff we need for accessible validation)
- [Describing aria-describedby](https://developer.paciellogroup.com/blog/2018/09/describing-aria-describedby/) (summarises how `aria-describedby` works)
