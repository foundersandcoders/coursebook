---
title: Real world fetch
description: Learn how to handle errors and submit data with the fetch method
tags:
  - workshop
  - js
keywords:
  - js
  - fetch
  - http
---

The browser's `fetch` method is deliberately low-level. This means there are certain things you'll almost always need to do to make requests in a real application.

## HTTP errors

`fetch` is only concerned with making HTTP requests. From this perspective as long as it receives a response it was successful, even if that response says something like `500 server error`. Most of the time in your application code you want to treat non-200 status codes as errors.

### Challenge

1. Open `workshop.html` in your editor
1. Add a `fetch` call to `"https://echo.oliverjam.workers.dev/status/404"` (this always returns a 404)
1. Add a `.then()` and `.catch()`. Which of these runs? What does the response look like?

{% disclosure %}

```js
fetch("https://echo.oliverjam.workers.dev/status/404")
  .then(console.log)
  .catch(console.error);
```

The `.then()` branch runs (not the `.catch()`), and logs the response object. This looks something like:

```js
{
  ok: false,
  status: 404,
  //...
}
```

{% enddisclosure %}

We need to handle HTTP responses we don't want. We can do this by checking the `response.ok` property. This will be `true` for successful status codes (like `200`) and `false` for unsuccessful ones (like `404` or `502`).

### Challenge

1. Edit your `.then()` to check the response's `ok` property
1. If the response is not okay throw a new error with the `status` property of the response
1. Now does your `.catch()` run?

{% disclosure %}

```js
fetch("https://echo.oliverjam.workers.dev/status/404")
  .then((response) => {
    if (!response.ok) {
      const error = new Error(response.status);
      throw error;
    }
    console.log(response);
  })
  .catch(console.error);
```

Now the `.then` branch runs, and sees that the response is not "ok". It creates a new error with the response's status code, then throws that error. Any error thrown inside a promise will cause that promise to reject. This means you can use the `.catch` branch to handle all the errors.

{% enddisclosure %}

## Submitting data

`fetch` allows us to make any kind of HTTP request we like. So far we have made `GET` requests, but those won't allow us to submit data to a server. To do that we'll need to configure some options by passing a second argument to `fetch`. E.g.

```js
fetch("example.com", {
  method: "POST",
});
```

This [options object](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) can include lots of properties. Here are some useful ones:

- `method`: to use methods other than `GET`
- `headers`: to send extra info about the request. e.g. if we're submitting JSON we should set the `"content-type"` header to `"application/json"`
- `body`: to send information to the server. If we're sending JSON we also need to `JSON.stringify` the data.

### Challenge

1. Edit your `fetch` to send a `POST` request to `"https://echo.oliverjam.workers.dev/json"`
1. Send a JSON body containing an object with whatever properties you like
1. Don't forget the `"content-type"`!

{% disclosure %}

```js
const data = { name: "oli" };

fetch("https://echo.oliverjam.workers.dev/json", {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "content-type": "application/json" },
})
  .then((response) => {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  })
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

This should log something like:

```json
{
  "name": "oli",
  "id": 499,
  "created": "2020-02-17T16:03:13.654Z"
}
```

{% enddisclosure %}

## User input

So far we've only hard-coded our requests. In reality they're usually triggered by a user submitting a form or clicking a button. There are several different ways we can access form data in our JavaScript.

### Forms

Forms are the semantically correct element for receiving user input. We should use them even when we're using JS to handle the request (rather than relying on the native browser submission).

We can add a handler for the submit event like this:

```js
const myForm = document.querySelector("form");

myForm.addEventListener("submit", event => {
  event.preventDefault();
  // handle the submission yourself here
}))
```

`event.preventDefault()` will stop the browser trying to send the request for you. We want to handle the request with `fetch` instead.

In order to send our request we have to get hold of the values the user entered. There are a few ways we could do this.

### Challenge: `querySelector`

We can use [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to directly access each input element, then get its value. For example `document.querySelector("#username").value`.

1. Create a form with two inputs and a submit button
1. Add a `"submit"` event handler to the form (don't forget `preventDefault`)
1. Use `querySelector` to get each input's value
1. Use `fetch` to `POST` the data as JSON to the same URL as before
1. Log the response you get from the server

{% disclosure %}

```html
<form>
  <label for="name">Name</label>
  <input id="name" />

  <label for="email">Email</label>
  <input type="email" id="email" />

  <button type="submit">Log in</button>
</form>

<script>
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const password = document.querySelector("#email").value;
    const data = { name, email };

    fetch("https://echo.oliverjam.workers.dev/json", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((json) => console.log(json))
      .catch((error) => console.error(error));
  });
</script>
```

{% enddisclosure %}

### Challenge: `new FormData()`

There is a built-in API that mirrors a form's native behaviour. We can use `new FormData(myForm)` to create a [`FormData` interface](https://developer.mozilla.org/en-US/docs/Web/API/FormData). This is what the form would send if we didn't call `preventDefault()`, and contains all the input values.

If we want to submit this as JSON we need to turn it into a normal object. You can do this with [`Object.fromEntries(data)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries). Note: `fromEntries()` is relatively new and isn't supported in older browsers.

#### Challenge

1. Edit your previous solution
1. Use `new FormData()` to get all the input values
1. Turn the FormData into an object to submit

{% disclosure %}

```html
<form>
  <label for="name">Name</label>
  <input id="name" name="name" />

  <label for="email">Email</label>
  <input type="email" id="email" name="email" />

  <button type="submit">Log in</button>
</form>

<script>
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fetch("https://reqres.in/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((json) => console.log(json))
      .catch((error) => console.error(error));
  });
</script>
```

The advantage of this solution is it will work for any number of inputs, without getting any longer. The previous two require a new line of code to access every input you add to the form.

{% enddisclosure %}

## Workshop

We're going to make a Pokémon search page using the [PokéAPI](https://pokeapi.co/).

1. Create a form with a search input and submit button
1. When the form is submitted request the Pokémon the user typed from `"https://pokeapi.co/api/v2/pokemon/NAME"`
1. If the request succeeds show the Pokémon's name and sprite
1. If the request fails show a relevant error to the user

### Stretch goals

If you have extra time try using some of the other data in the response body to show e.g. the pokémon's types or stats. Write some CSS to make it pretty!

<figure>
  <iframe
    src="starter-files/solution/"
    onload="
      this.contentWindow.document.querySelector('#pokemon').value = 'pikachu';
      this.contentWindow.document.querySelector('button').click();
    ">
    </iframe>
  <figcaption>Solution preview</figcaption>
</figure>
