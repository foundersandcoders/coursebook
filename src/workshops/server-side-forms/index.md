---
title: Server-side forms
description: Learn how to build interactive websites using forms and Node
tags:
  - workshop
keywords:
  - js
  - html
  - http
---

Forms are the building blocks of interactivity on the web. Until client-side JavaScript gained the ability to make HTTP requests (in the early 2000s) forms were the only way to send user-generated data from the browser to the server. They're still the simplest and most robust way to send data, since they work even if your JS fails to load, is blocked, or errors.

## Setup

1. Download the starter files
1. `cd` into the `workshop/` directory
1. `npm install` to install the dependencies
1. `npm run dev` to start the server with [nodemon](https://github.com/remy/nodemon#nodemon). This is a helper that auto-restarts your server when you save changes

Before we get stuck into forms lets practice our Express basics. Open `workshop/server.js` in your editor. You should see a server that listens on port `3333`. There's also an array of objects containing data about different dogs.

### Challenge 1: server setup

1. Add a route for the homepage (`GET /`)
1. Return an HTML string containing a `<ul>`
1. Each `<li>` in the list should contain a dogs name

{% box "success" %}

#### Hint

You can generate a dynamic list by looping over the array:

```js
const dogs = ["rover", "spot"];
let items = "";
for (const dog of dogs) {
  items += `<li>${dog}</li>`;
}
const list = `<ul>${items}</ul>`;
```

You could also combine `array.map` and `array.join` to create the string.

{% endbox %}

When you're done you should be able to visit http://localhost:3000 and see the list of dogs rendered.

{% solution %}

```js
server.get("/", (request, response) => {
  let items = "";
  for (const dog of dogs) {
    items += `<li>${dog.name}</li>`;
  }
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dogs!</title>
    </head>
    <body>
      <ul>${items}</ul>
    </body>
  </html>
  `;
  response.end(html);
});
```

{% endsolution %}

## `GET` requests

Browsers support two types of HTTP requests (without JS): `GET` and `POST`. When a user navigates (either by clicking a link or typing a URL into the address bar) the browser will send a `GET` request, then render the response. There are also certain HTML tags that trigger `GET` requests for a resource to display _within_ the page, e.g. `<img>`.

Forms can also make `GET` requests. Here's an example form:

```html
<form>
  <input name="myMessage" />
  <button>Submit</button>
</form>
```

By default a form sends a `GET` request to the current page (when submitted). It will find all the inputs within the form and add them into the "search" part of the URL (the bit after the `?`). Assuming this form was rendered on `example.com` clicking the submit button would send this request:

```
GET example.com?myMessage=whatevertheusertyped HTTP/1.1
```

Each input is added to the search string in this format: `${inputName}=${inputValue}`. If you don't add a `name` attribute the input won't be submitted.

There's nothing special about the request: we could have achieved the same result by creating a link like this:

```html
<a href="?myMessage=whatevertheusertyped">Click me</a>
```

The advantage of a form is the search part of the URL is _dynamic_—it is typed by the user, not hard-coded into the HTML by the developer.

Forms like this are mostly used for implementing search functionality. The `GET` method is for _retrieving_ resources. It shouldn't be used for creating/updating/deleting things, since browsers treat `GET`s differently (e.g. they cache them).

## Challenge 2: search

Let's add some search functionality to our dogs page. Express automatically parses the "search" part of the URL for each request. You can access this object at `request.query`. For example our request above would result in a query object like:

```js
{ myMessage: "whatevertheusertyped", }
```

1. Add a search form to the homepage (with a single input)
1. Retrieve the user-submitted value on the server
1. Filter the list of dogs based on the user-submitted value
1. Make sure the full list still displays if there's no search value

E.g. if the user searches for "o" the list should only include "rover" and "spot" (since they both contain the letter "o").

{% box "success" %}

### Hint

You can use `string.includes` to check if a string contains a given substring. E.g.

```js
const search = "rov";
const dog = "rover"
if (dog.includes(search)) ...
```

Don't forget this is case sensitive!

{% endbox %}

When you're done you should be able to submit the form to filter the list of dogs on the page.

## `POST` requests

Forms can also send `POST` requests, which allows users to create or change data stored by the server. You can make a form send a `POST` by setting the `method` attribute.

```html
<form method="POST">
  <input name="myMessage" />
  <button>Submit</button>
</form>
```

{% box %}

**Note**: forms cannot use any other HTTP methods. This means we'll be using `POST` for creating, updating _and_ deleting things.

{% endbox %}

A `POST` request doesn't include information in the URL. Instead it puts it in the request _body_. This means it's not directly visible to the user, and won't be logged or cached by things that store URLs. The information will be formatted in the same way as a `GET`, it's just sent in a different place. E.g.

```
POST example.com HTTP/1.1

myMessage=whatevertheusertyped
```

Since request bodies are sent in lots of small chunks (as they can sometimes be very large) our server doesn't get it all in one go. This means you must use the built-in Express middleware for parsing request bodies. You can refer back to our [Express introduction workshop](/workshops/node-express-server/#request-body) to see exactly how.

### Challenge 3: add a dog

Let's add a form for submitting new dogs to the site. We aren't using a database to store our dogs persistently, so we'll just store new dogs by pushing them into the `dogs` array in-memory. This means the dogs will reset each time the server restarts.

{% box %}

**Note**: it's important to always redirect after a `POST` request. This ensures the user only ever ends up on a page rendered via a `GET`. Otherwise if the user navigated back to the results page their browser would resend the `POST` and you'd get a double-submission. This is why lots of sites say "Don't click back or you'll be charged twice"!

{% endbox %}

1. Add a new route `GET /add-dog`
1. It should render another form with inputs for each property of a dog
1. Add a new route for `POST /add-dog`
1. It should use the Express body-parsing middleware to access the submitted body
1. Push a new dog object to the `dogs` array containing the body data
1. Redirect back to the homepage so the user can see their new dog in the list

When you're done you should be able to visit http://localhost:3333/add-dog, submit the information for a new dog, then be redirected to the homepage and see that information in the list.

## Deleting resources

We've seen how to use forms to _create_ things on the server. They can also be used to _delete_ things. It's important to know that forms don't have to contain any user-editable inputs. For example if we wanted a delete button next to each dog's name we'd need each one to submit a different `POST` request. E.g. to delete "pongo":

```
POST /delete-dog HTTP/1.1

dogName=pongo
```

In this case the user shouldn't have to type the name into an input—we can hard-code that for each dog's delete form by including it in the HTML. That way they can just click a button to send the delete request.

There are two ways to hard-code data into a form. You can use inputs with `type="hidden"`. These aren't displayed to the user but will still be submitted to your server.

```html
<form action="/delete-dog" method="POST">
  <input type="hidden" name="dogName" value="pongo" />
  <button>Delete</button>
</form>
```

You can also set `name` and `value` attributes on directly on button elements. When that button is used to submit the form those values will be submitted in the request body.

```html
<form action="/delete-dog" method="POST">
  <button name="dogName" value="pongo">Delete</button>
</form>
```

It's like a little self-contained form. The only thing the user sees is the button to click.

### Challenge 4: removing dogs

Let's add delete buttons next to each dog in the list on the homepage. You can remove a dog from the `dogs` array by creating a new array using `dogs.filter`.

1. Add a delete form next to each dog's name
1. Each one should send a `POST` to `/delete-dog` with the name of the dog to remove in the body
1. Add a new route `POST /delete-dog`
1. It should get the name of the dog to remove from the request body
1. Use the name to remove the dog from the `dogs` array
1. Redirect back to the homepage so the user can see the dog is gone

When you're done you should be able to click the delete button next to each dog and see that dog disappear from the list.

## Stretch goal: dog pages

It would be nice if each dog had its own page that showed all the information about it. For example `GET /dogs/pongo` would show information about Pongo. You can achieve this with [dynamic route paths](/workshops/node-express-server/#dynamic-route-paths).

1. Add a single extra route that can render any dog's page
1. It should respond with HTML containing all the info about that dog
1. Add a link for each dog on the homepage so you can click through to each page

Once that's done it would be a better experience if the user was redirected to the relevant dog page after creating a new dog. For example if they created a new dog named "Bilbo" they should be redirected to `/dogs/bilbo` to see all the info about that dog.

1. Amend your `POST /add-dog` handler to redirect to the relevant dog's page

## Stretch goal: server-side validation

It's important to check user-submitted information. It could be missing, incomplete, or even malicious. For example right now you can submit the "add dog" form with empty inputs, which results in the other pages looking broken.

Client-side validation can help (e.g. adding `required` or `pattern` to inputs), however it's easy to bypass (e.g. by editing the elements in dev tools).

{% box "error" %}

You should **always** validate your data on the server, since that's the only place you can trust.

{% endbox %}

1. Amend your `POST` handlers to check your data is valid
1. If the data is not valid redirect the user to a generic error page
1. Create a generic error route that tells the user something went wrong

It would be a better user-experience to send the user back to the same page, but highlight which inputs had validation errors. Unfortunately that's a little more complex. HTTP requests are "stateless", which means we can't distinguish a normal `GET /add-todo` from a redirect to `GET /add-todo` after an error.

We can use cookies to store information between requests. We could store the validation errors in a cookie before redirecting, then use that info to render error messages in the form. We'll be looking at cookies in a later workshop, but feel free to attempt this now if you want a challenge.
