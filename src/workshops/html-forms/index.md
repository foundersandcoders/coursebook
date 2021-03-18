---
title: HTML Forms
description: Learn how to use forms to send requests and submit user data.
tags:
  - workshop
  - html
  - forms
keywords:
  - html
  - forms
  - fundamentals
---

Forms are the building blocks of interactivity on the web. They allow websites to send requests to servers without requiring any client-side JavaScript.

## How forms work

You create a form with the `<form>` element. This is a container for all the different types of inputs your users will interact with.

Forms can contain any number of elements that allow user input (e.g. `<input>`). Users can enter values into these fields, then submit the form. The browser will then make a request to a new page that you specify, sending all the data from the form.

### Inputs

The humble `<input>` element can be used to render many different types of input.

#### Different input types

There are many different types of input to cover all the various kinds of data you might want to collect from a user. You can see the full list and read more about each [in the MDN input article](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

- `<input type="text">`
  Basic single line text input.
- `<textarea></textarea>`
  Allows multiline text input.
- `<input type="email">`
  Shows a special keyboard with the `@` symbol on some phones. Also validates that the user entered an email on submission.
- `<input type="checkbox">`
  Used for turning specific values on or off.
- `<input type="radio">`
  Used for selecting one value out of a group of options.

### Form submission

Forms can also contain button elements. By default clicking them will submit the form. It's generally a good idea to explicitly add `type="submit"` to your submit buttons (even though it's the default). That way it's obvious to other developers what the button does.

#### The `action` attribute

When submitted a form will send a request to the URL in its `action` attribute. This can be a relative URL within the same site (e.g. `/submit`) or an external URL to another site (e.g. `https://example.com/submit`).

This request is a standard `GET` request, just like when you type a URL manually (or click a link). When the browser receives a response to the request it will render that as a new page (just like when you click a link).

#### Submitting user data

All inputs with a `name` attribute within your form will be submitted. By default they'll be sent as the "search" part of the URL (often called the "querystring". It's the bit after the `"?"` at the end).

It will be structured like this:

```
example.com/submit?name=value&other-input=other-value
```

Each field is represented with its name and value separated by an ampersand (`&`).

Some input types submit differently. For example a checkbox can either checked or not. If it is unchecked it won't be sent at all. If it is checked but has no `value` attribute then it will be sent as `name=on`. If it has a `value` attribute that will be used instead. E.g.

```
?marketing-consent=my-value
```

Radio buttons are designed to select one value out of a set of options. A group of radios should use the same `name` to link them together. They should each have unique `value` attributes. The `value` of the selected radio will be submitted. E.g.

```
?contact-method=email
```

## Workshop

## Part One: basic request

1. Open `workshop/index.html` in your editor
1. Add a form to the page containing a text input
   - This should submit a `name` value
   - Don't forget inputs need labels!
1. The form should submit to `"https://learn-forms.netlify.com/submit/part1"`
1. The response will tell you whether you successfully submitted a name

![example 1](https://user-images.githubusercontent.com/9408641/70389189-fe080400-19b3-11ea-8cb3-cacfc06690c4.gif)

## Part Two: different input types

1. Change your form to submit to `"https://learn-forms.netlify.com/submit/part2"`
1. Add fields for:
   - an email address
   - a telephone number
   - a textarea for a message
   - a marketing-consent checkbox
1. The data submitted should look something like this:
   ```
   name=Oli
   email=hello@oliverjam.es
   telephone=0123455678
   message=Hello this is a message!
   marketingConsent=on
   ```

![example 2](https://user-images.githubusercontent.com/9408641/70389175-bda88600-19b3-11ea-8ddc-751915a6da19.gif)

## Part Three: using radio groups

1. Change your form to submit to `"https://learn-forms.netlify.com/submit/part3"`
1. Add a group of three radios that allow the user to choose their preferred contact method (email, phone, post)
1. The extra data submitted should look like this (if email was selected):
   ```
   contact=email
   ```
1. You can read more [about radio groups on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Defining_a_radio_group)

![example 3](https://user-images.githubusercontent.com/9408641/70389223-753d9800-19b4-11ea-95ce-00198a1c9fc3.gif)
