---
title: Form validation
description: Learn how to validate user input in the browser and present error messages accessibly.
tags:
  - workshop
keywords:
  - html
  - forms
  - validation
challenge: https://github.com/foundersandcoders/form-validation-challenge
---

Client-side validation is important for a good user experience—you can quickly give the user feedback when they need to change a value they've entered. For example if passwords must be a certain length you can tell them immediately, rather than waiting for the form to submit to the server and receive an invalid response.

{% box %}

You **should not** rely entirely on client-side validation however. You can never trust anything that happens in the browser: users can use dev tools to mess with attributes and elements to bypass validation. You **always** need to validate user input on the server as well, for security.

{% endbox %}

## Communicating requirements

It's important to tell the user what you expect them to do. As always you need to present information visually and programmatically, so user's of assistive technologies like screen readers can access it. At a bare minimum this means each form field need an associated label.

```html
<!-- `for` attribute associates label with input by ID -->
<label for="name">What is your name?</label>
<input id="name" />
```

If the field will be validated you also need to communicate those requirements to the user ahead of time. There's nothing more frustrating than having a submission rejected for an unknown reason.

### Required fields

If the user _must_ provide a value the common convention is to put a `*` character after the label. You could also use the word "required".

It's important not to duplicate information for assistive technology users. For example if your field is already programmatically marked as required (e.g. via the `required` attribute), then hearing the `*` character read out is at best superfluous and at worst confusing. It's a good idea to hide this symbol from non-sighted users in this case:

```html
<label for="name">
  What is your name?
  <span aria-hidden="true">*</span>
</label>
<input id="name" required />
```

### More specific instructions

A field can have stricter validation than just "required"—for example a new password field might check the length and complexity of the value. In these cases you will need to provide the requirements after the label. To make sure this is available to assistive tech users you must also associate the element with the field. You can do this using the [`aria-describedby`](https://developer.paciellogroup.com/blog/2018/09/describing-aria-describedby/) attribute on the field—this should be set to the ID of the element containing the instructions:

```html
<label for="password">New password</label>
<p id="passwordHelp">Your password must be at least 10 characters long</p>
<input id="password" aria-describedby="passwordHelp" />
```

This description will be available to assistive tech users when they focus the input; screen readers will usually read it out after the label.

## HTML5 validation

Now we've communicated our requirements to the user we need to actually enforce them. We need a way to check the values the user entered match our expectations, and prevent the form from submitting if they don't. Luckily browsers natively support lots of different types of validation via different HTML attributes.

If a form containing invalid values is submitted the browser will prevent the request from being sent, and instead will show a message for each invalid field telling the user what they did wrong.

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

Some browsers (especially on smartphones) will even change their input method to match. For example the keyboard may show the `@` key for an `"email"` input.

### Matching a pattern

We can specify a regular expression the value must match using the `pattern` attribute. For example this input will be invalid if it contains whitespace characters:

```html
<input type="text" pattern="\S" />
```

### Other validation

There are several other [validation attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Intrinsic_and_basic_constraints), which work for different kinds of inputs.

---

## Enhancing with JavaScript

It's great that we can get a base level of client-side validation working with just HTML—if our JS fails to load (or breaks) the user gets basic validation. This makes it quick and simple to provide a helpful experience to users. However it has a few downsides:

- We cannot style the message bubbles that the browser shows for invalid fields.
- The messages are [not properly exposed to most screen readers](https://adrianroselli.com/2019/02/avoid-default-field-validation.html).
- Required inputs are marked invalid as soon as the page loads (since they are empty).

We can improve this user experience by enhancing our validation using JavaScript.

### Disabling default form behaviour

First we need to tell our form not to do its own validation, since we're going to trigger this ourselves using JS. We can do this by setting the `novalidate` attribute:

```js
const form = document.querySelector("form");
form.setAttribute("novalidate", "");
```

{% box "info" %}

Note that we're using JS for this, rather than setting the attribute in our HTML. This ensures that our enhancements only apply if JS runs—otherwise we might disable the native validation without our custom validation loading.

{% endbox %}

### Trigger validation from JS

To recreate the default behaviour we need to listen for the form's `submit` event, then prevent submission if there are any invalid fields. We can check all fields using the form element's `.checkValidity()` method. This returns true if _all_ fields are valid, otherwise it returns false.

```js
form.addEventListener("submit", (event) => {
  const allValid = form.checkValidity();
  if (!allValid) {
    event.preventDefault();
  }
});
```

### Marking invalid fields

Our "enhancement" is currently _worse_ than the default, since it prevents submission without telling the user which fields are invalid. We need to provide feedback to the user so they can fix their mistakes.

First we need to tell the browser/assistive tech whether the field is valid or not. We can use the `aria-invalid` attribute for this. Each field should have `aria-invalid="false"` set at first, since it can't be invalid until we check it.

```js
const fields = form.querySelector("input"); // you probably want to include <select>, <textarea> etc too
fields.forEach((field) => {
  field.setAttribute("aria-invalid", "false");
});
```

Now we need to know when the field fails validation, so we can update this attribute to `"true"`. Luckily calling `checkValidity()` causes invalid fields to fire an `"invalid"` event that we can listen for:

```js
fields.forEach((field) => {
  // ...
  field.addEventListener("invalid", () => {
    field.setAttribute("aria-invalid", "true");
  });
});
```

### Providing feedback

Marking fields as invalid isn't enough. We also need to provide the validation message that the browser previously showed. First we need to add this element to the DOM [after](https://developer.mozilla.org/en-US/docs/Web/API/Element/after) every field, and associate them using `aria-describedby` again. We want the DOM to end up like this before any validation runs:

```html
<p id="passwordHelp">Your password must be at least 10 characters long</p>
<input id="password" aria-describedby="passwordHelp passwordError" />
<p id="passwordError"></p>
```

```js
fields.forEach((field) => {
  // ...
  const feedback = document.createElement("p");
  const id = field.id + "Error";
  feedback.setAttribute("id", id);

  // don't overwrite any existing aria-describedby
  const prevIds = field.getAttribute("aria-describedBy");
  const describedBy = prevIds ? prevIds + " " + id : id;
  field.setAttribute("aria-describedBy", describedBy);

  field.after(feedback);
  // ...
});
```

Then when a field is invalid we need to grab the default message from the field's [`validationMessage`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#validationmessage) property and display it:

```js
fields.forEach((field) => {
  // ...
  field.addEventListener("invalid", () => {
    // ...
    const message = field.validationMessage;
    feedback.textContent = message;
  });
});
```

We have now replaced the default HTML experience, with all the problems we listed fixed.

---

## Even more enhancement

Since we're validating using JS we can add more features if they make sense. Right now our form only validates on submission. This means users will not get feedback as they fill in the form, and fields will not get _re_-validated until the user submits again.

### Re-validation

It would be nice to clear the invalid state when the user edits a field. We can do this by listening for the `"input"` event on the field and reversing the steps from before:

```js
fields.forEach((field) => {
  // ...
  field.addEventListener("input", () => {
    field.setAttribute("aria-invalid", "false");
    feedback.textContent = "";
  });
});
```

### Validating more often

On longer forms it might be helpful for the user to see validation as they fill in fields, rather than waiting until they submit at the end. There is a balance here though—many apps validate on _every key press_, which often leads to fields being marked as invalid while the user is halfway through typing a valid value.

It's usually less annoying to validate when the user's focus leaves the field. We can do this by listening for the `"blur"` event, then triggering the validation using the field's [`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity) method:

```js
fields.forEach((field) => {
  // ...
  field.addEventListener("blur", () => {
    field.checkValidity();
  });
});
```

---

## Styling

We have a functional, accessible solution now, but it could be improved with some styling. It's common to style validation messages with a "danger" colour like red. Relying on colour alone will not work for all users, so you should also mark invalid inputs with a visual change like a different coloured border or an icon.

You can target elements in CSS [using their attributes](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors), which is helpful for targetting invalid inputs:

```css
[aria-invalid="true"] {
  border-color: red;
}

/*
 * attr$="value" matches the _end_ of the attribute.
 * e.g. this matches id="passwordError"
 * but doesn't match id="passwordHelp".
 * You could also just add a className ¯\_(ツ)_/¯
 */
[aria-invalid="true"] + [id$="Error"] {
  color: red;
}

[aria-invalid="true"] + [id$="Error"]::before {
  content: "⚠️ ";
}
```
