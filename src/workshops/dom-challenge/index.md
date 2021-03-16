---
title: DOM manipulation challenge
description: Practice using various methods to update the DOM.
tags:
  - workshop
  - js
keywords:
  - js
  - dom
  - fundamentals
---

It's important to get comfortable manipulating the Document Object Model (DOM) using JavaScript. This includes creating new elements, updating content, toggling classnames and removing elements.

## Quick overview

Here is a quick overview of various DOM manipulation techniques. If you want to find out more about each one you can check their MDN articles.

### Accessing elements

You can access elements on the page with the `document.querySelector` method. This takes any valid CSS selector (like `"button"` or `"#my-id > .my-class:first-child"`) and searches the DOM for the first match. It returns a DOM element represented as a JS object.

You can access multiple elements with the `document.querySelectorAll` method. This works in the same way except it returns a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) of all matches.

A NodeList is similar to an array but missing most of the usual array methods (it only has `.forEach`). If you need to use `.map`/`.filter` etc you can turn it into an array with `Array.from(myList)`.

### Creating elements

You can create a new DOM element with `document.createElement`. This takes a tag string like `"button"` and returns the new DOM object.

It's important to note that this object isn't actually on the page yet—it just lives in memory in your JavaScript. To get the element to show up you have to put it inside another element on the page.

You can do this using the `parent.appendChild` or `parent.append` methods. The main difference between these is that `append` works for text and can take multiple items. E.g. `myDiv.append(myButton, "some text", myParagraph)`.

### Updating elements

#### Attributes

Most element attributes are reflected as JavaScript properties on the corresponding DOM object. For example the `id` attribute can be changed on a DOM object using dot-notation:

```js
const myButton = document.querySelector("button");
// myButton is an object representing the DOM element
// it has properties for all its attributes

myButton.id = "my-id";
// if we change a property the DOM element will be updated
```

Some attributes are not accessible as object properties. This notably includes ARIA attributes (like `aria-label`). To change these you must use [`myEl.setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) and [`myEl.removeAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute).

This works fine for simple stuff, but for attributes that are _lists_ of strings (like `className`) it can be awkward. You often want multiple classnames set on an element, but this requires you to manually concatenate strings together.

```js
const myButton = document.querySelector("button");

myButton.className = "btn btn--primary btn--large";
// whoops we overwrote any classes that were already applied
```

There is a nicer way to manipulate lists like this: the [`DOMTokenList`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList#methods) methods. E.g.

- `myElement.classList.add("my-class")`
- `myElement.classList.remove("my-class")`
- `myElement.classList.toggle("my-class")`
- `myElement.classList.contains("my-class")`

#### Content

You can change the text inside an element by setting the `textContent` property. Be careful though—this will override all existing content, including other DOM elements inside.

You can also use the `.append` method to add text inside an element. This will work even if there are already other elements inside.

#### Styles

You can directly add inline styles to an element by setting properties on the `myEl.style` object. This can get awkward for setting lots of styles, so a simpler way is to add a classname using JS and write the corresponding styles in the CSS instead.

```css
.highlight {
  background-color: yellow;
  padding: 0.5rem;
}
```

```js
myButton.classList.add("highlight");
// instead of:
// myButton.style.backgroundColor = "yellow"
// myButton.style.padding = "0.5rem" etc
```

## Challenge

Download the starter files and open `challenge/dom.js`. Your task is to complete as many of these functions as possible. Each should have a comment explaining what it should do.

You can check if each one is working by opening `challenge/index.html` in your browser. There's a section for each part of the challenge. Don't forget to check the console if something isn't working!
