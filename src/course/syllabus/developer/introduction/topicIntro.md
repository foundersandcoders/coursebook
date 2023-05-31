# The Role of Servers in Web Development

Intro to servers, their relationship with web browsers, and the role they play in the wider context of web development.

## Understanding Servers and Browsers

At the heart of the internet, we find two key players: servers and browsers.

## What is a Server?

Any computer can act as a server. There's nothing inherently special about a server. In fact, your personal laptop could function as one. However, in practice, servers tend to be more powerful machines due to the demanding tasks they often perform. They are computers configured to run software that understands HTTP requests and provides data and services to other computers, known as clients, over a network.

## Server and HTTP Model

The server is the second half of the HTTP model. The client sends requests for resources, and the server receives these requests and sends responses. Here's a simple example:

_Client Request:_

```
GET /search?q=cats HTTP/1.1
accept: text/html
```

_Server Response:_

```
HTTP/1.1 200 Ok
content-type: text/html

<!doctype html>
<html>
  <body>
    <img src="funny-cat.jpg" alt="A very fat cat">
  </body>
</html>

```

In this example, the client is requesting a search for "cats," and the server responds with an HTML document containing an image of a cat.

## What is a Browser?

A web browser is a software application that executes untrusted code sent over the internet. To ensure security, browsers have strict limits on what they can do. This limitation is often referred to as the "sandbox." For example, they can't read files on your Desktop. As a web developer, you have no control over the browser environment - users can run any browser software, apply custom CSS, use extensions, or block specific parts of the page.

## Brief Foray Into the History of JavaScript

JavaScript, often abbreviated as JS, is a dynamic programming language that has significantly evolved since its inception and has become a cornerstone of modern web development.

## JavaScript's Humble Beginnings

JS started life as a basic scripting language for web pages. It was mostly used for simple tasks like showing and hiding elements, changing colours, and other rudimentary interactivity. Despite its initial simplicity, almost every web developer had to learn JavaScript as it was the _only_ dynamic language usable in the browser. This necessity led to a significant population of JavaScript developers.

## JavaScript Developers Yearn for More

As the number of JavaScript developers grew, so did their ambitions. They wanted to do more than just program web browsers. They desired to leverage their JavaScript knowledge to build more complex applications, but they were limited by the constraints of running JavaScript solely in the browser.

## The Advent of Node.js

A significant turning point came in 2009 when Ryan Dahl created Node.js. He extracted the JavaScript engine out of Chrome, creating a runtime that allowed developers to run JavaScript separately from the browser. This innovation meant that JavaScript could now be used for anything - web servers, Command Line Interface (CLI) programs, native apps, and even operating systems.

## Browser vs Server

The key difference between browsers and servers lies in the control and execution of code. In a browser, _your_ code is running on _their_ computer (i.e. the user’s computer). In contrast, on a server, _your_ code is running on _your_ computer.

## Practical Differences

1. **Servers have no DOM**: The Document Object Model (DOM) doesn't exist until a browser receives an HTML response and constructs it. This means **`window`** and **`document`** objects are undefined on the server.
2. **Servers are Secret**: In the browser, all code is sent to the user, and they can view it all in the developer tools. Users cannot see the code running on your server (assuming it is secured correctly). They will only see what you send in the HTTP response. This means it's safe to use API keys and other secrets on your server.
3. **Servers are Shared**: In the browser, your code runs separately on each user's computer, meaning one user can't see another user's data. You usually have one server for _all_ users, which means you can share variables between requests. However, be careful, as you could accidentally show one user's data to another.

## Understanding Node.js

Node.js is a runtime environment that allows JavaScript to run on the server-side. It comprises roughly two parts:

1. The JavaScript language, including syntax and general-purpose features like arithmetic, variables, functions, loops, and promises.
2. Ways to access the underlying computer that browsers don't have.

While browsers implement _Web APIs_ to provide useful features like **`document.querySelector`**, **`window.location`**, and **`element.clientWidth`**, Node doesn't implement these since they mostly don't make sense on a server. Instead, Node provides additional APIs for tasks like creating an HTTP server and accessing the computer's filesystem.
