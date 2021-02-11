---
title: CSS layout
description: Learn how to create CSS layout primitives and compose them together to create complex designs.
tags:
  - workshop
  - css
keywords:
  - css
  - layout
  - fundamentals
---

Modern CSS has powerful tools for controlling where elements go on the page. We're going to learn how to create style "primitives" (single-purpose bits of CSS) to solve different layout requirements, then see how we can combine those primitives together to create more complex layouts.

## Layout fundamentals

Let's quickly review some of the ways we can control layout with CSS.

### Flow layout

[Flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout) is the default way elements behave. Block elements like `div`, `header` and `p` take up the full-width of the page. Inline elements like `span`, `strong` and `a` only take up as much horizontal space as they need, and can sit next to each other.

The viewport scrolls vertically by default, when there's too much content to fit on the screen. If the content is too _wide_ to fit the browser will wrap elements onto the next line.

You can go a surprisingly long way without writing much layout CSS, since the defaults are pretty good.

### Flexible box layout

[Flexible box layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) (usually called "flexbox") is an alternate layout context you can set using the `display: flex` rule.

This allows a parent element to control how its children are laid out. By default it puts elements all on a single line (as if they were inline elements). Unlike inline elements they won't wrap when there's not enough room. You have to enable wrapping with the `flex-wrap: wrap` rule.

Flexbox is usually used for _single-direction_ layouts. I.e. a row _or_ a column, but not both. It's also better for flexible layouts where you don't need exact control over where every element goes.

### Grid layout

[Grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) is another layout context that lets a parent element specify rows and columns for its children to slot into. You set this using `display: grid`.

Grid can be used to create very specific layouts using `grid-template-columns` and `grid-template-rows` to specify an exact layout grid. You can then place child elements into specific locations on the grid with `grid-column` and `grid-row`.

Grid is usually used for _two-direction_ layouts. I.e. rows _and_ columns. It works best when you have a specific grid in mind, but can be less flexible.

---

## The Stack: controlling vertical space

The most important layout primitive is one to control the space between elements. For re-usability and simplicity it's a good idea not to apply spacing rules to individual elements. E.g. if you put `margin-left` on a button you can only re-use it in places where left spacing makes sense.

It's better to use a parent element to apply spacing to its children. This is often called a "stack". There are lots of ways to implement this (e.g. using flexbox or grid), but for simplicity we're going to do it with margin.

Let's say we want `1rem` of space between each of these boxes:

```html
<div>
  <div class="box">Box 1</div>
  <div class="box">Box 2</div>
  <div class="box">Box 3</div>
</div>
```

<figure>
  <div class="border-xl">
    <div class="pad-xl bg-primary">Box 1</div>
    <div class="pad-xl bg-primary">Box 2</div>
    <div class="pad-xl bg-primary">Box 3</div>
  </div>
  <figcaption>Boxes with no space between them</figcaption>
</figure>

We _could_ add styles to our `.box` class, but then we couldn't re-use those boxes in other places where `margin-top` didn't work. Instead we can use the parent to add margin to its children:

```css
.stack > * {
  margin-top: 1rem;
}
```

```html
<div class="stack">
  <div class="box">Box 1</div>
  <div class="box">Box 2</div>
  <div class="box">Box 3</div>
</div>
```

<figure>
  <style>
    .example-stack > * {
      margin-top: 1rem;
    }
  </style>
  <div class="example-stack border-xl">
    <div class="pad-xl bg-primary">Box 1</div>
    <div class="pad-xl bg-primary">Box 2</div>
    <div class="pad-xl bg-primary">Box 3</div>
  </div>
  <figcaption>Boxes with space above all of them</figcaption>
</figure>

This isn't quite right: we've got space above _every_ child—we only want the space _between_ the children. This means no space above the first child.

There are a few ways to achieve this. We could add a rule disabling the margin for the first child:

```css
.stack > * {
  margin-top: 1rem;
}
.stack > *:first-child {
  margin-top: 0;
}
```

Or we could only apply the rule to elements that are _not_ the first child:

```css
.stack > *:not(:first-child) {
  margin-top: 1rem;
}
```

Or we could use the [adjacent sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator) to only apply the rule to elements that have a sibling before them:

```css
.stack > * + * {
  margin-top: 1rem;
}
```

<figure>
  <style>
    .example-stack-owl > * + * {
      margin-top: 1rem;
    }
  </style>
  <div class="example-stack-owl border-xl">
    <div class="pad-xl bg-primary">Box 1</div>
    <div class="pad-xl bg-primary">Box 2</div>
    <div class="pad-xl bg-primary">Box 3</div>
  </div>
  <figcaption>Boxes with space between them</figcaption>
</figure>

### Customising spacing

Our stack primitive is useful, but we're going to need different amounts of spacing to make a whole page. We can control this in a couple of ways.

First we could use a CSS variable for the size of the margin:

```css
.stack > * + * {
  margin-top: var(--space, 1rem);
}
```

This will default to `1rem` if no variable is set, but we can override it if needed.

```html
<div class="stack" style="--space: 4rem">
  <div class="box">Box 1</div>
  <div class="box">Box 2</div>
  <div class="box">Box 3</div>
</div>
```

<figure>
  <style>
    .example-stack-var > * + * {
      margin-top: var(--space, 1rem);
    }
  </style>
  <div class="example-stack-var border-xl" style="--space: 4rem">
    <div class="pad-xl bg-primary">Box 1</div>
    <div class="pad-xl bg-primary">Box 2</div>
    <div class="pad-xl bg-primary">Box 3</div>
  </div>
  <figcaption>Boxes with much more space between them</figcaption>
</figure>

The downside to this is nested stacks will break, since CSS variables are _inherited_ from their parents. E.g.

```html
<main class="stack" style="--space: 4rem">
  <section class="stack">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </section>
  <section class="stack">
    <div class="box">Box 4</div>
    <div class="box">Box 5</div>
    <div class="box">Box 6</div>
  </section>
</main>
```

We want `4rem` of space between the `section`s and `1rem` between the `div`s. However since the `div`s will inherit the same `--space` variable we end up with `4rem` between every element:

<figure>
  <div class="example-stack-var border-xl" style="--space: 4rem">
    <div class="example-stack-var">
      <div class="pad-xl bg-primary">Box 1</div>
      <div class="pad-xl bg-primary">Box 2</div>
      <div class="pad-xl bg-primary">Box 3</div>
    </div>
    <div class="example-stack-var">
      <div class="pad-xl bg-tertiary">Box 4</div>
      <div class="pad-xl bg-tertiary">Box 5</div>
      <div class="pad-xl bg-tertiary">Box 6</div>
    </div>
  </div>
  <figcaption>Nested stacks with too much space between them</figcaption>
</figure>

Instead we can define separate classes for each size of stack. This is nice because it allows us to choose a pre-set number of sizes, which keeps our layout consistent.

```css
.stack-sm > * + * {
  margin-top: 0.5rem;
}
.stack-md > * + * {
  margin-top: 1rem;
}
.stack-lg > * + * {
  margin-top: 2rem;
}
.stack-xl > * + * {
  margin-top: 4rem;
}
```

Now we can control the space more easily:

```html
<main class="stack-xl">
  <section class="stack-md">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </section>
  <section class="stack-md">
    <div class="box">Box 4</div>
    <div class="box">Box 5</div>
    <div class="box">Box 6</div>
  </section>
</main>
```

<figure>
  <style>
    .example-stack-md > * + * {
      margin-top: 1rem;
    }
    .example-stack-xl > * + * {
      margin-top: 4rem;
    }
  </style>
  <div class="example-stack-xl border-xl" style="--space: 4rem">
    <div class="example-stack-md">
      <div class="pad-xl bg-primary">Box 1</div>
      <div class="pad-xl bg-primary">Box 2</div>
      <div class="pad-xl bg-primary">Box 3</div>
    </div>
    <div class="example-stack-md">
      <div class="pad-xl bg-tertiary">Box 4</div>
      <div class="pad-xl bg-tertiary">Box 5</div>
      <div class="pad-xl bg-tertiary">Box 6</div>
    </div>
  </div>
  <figcaption>Nested stacks with differing space between them</figcaption>
</figure>

### Challenge 1: using the Stack

You're going to use the Stack to fix the layout of a web page. Download the starter files using the command at the start of the workshop, then open `challenge-1/index.html` in your editor.

<figure>
  <iframe src="starter-files/challenge-1/"></iframe>
  <figcaption>Challenge 1 preview</figcaption>
</figure>

Currently there's no space between anything. There should be `2rem` of space between each `section`. There should be `1rem` of space between the elements within each section. There should be `0.5rem` between each form field and its label.

Fix the layout by defining Stack CSS inside the `style` tag, then _only_ adding Stack classes to the HTML. Don't add or remove any elements or write any other CSS! You can create this whole layout using only Stacks.

<figure>
  <iframe src="starter-files/challenge-1/solution/"></iframe>
  <figcaption>Challenge 1 solution preview</figcaption>
</figure>

---

## The Row: placing elements next to each other

Another very useful layout primitive is a "row". Web interfaces often need elements placed next to each other. For example a horizontal list of links in a navigation bar, or the "Confirm" and "Cancel" buttons in a dialogue popup.

<figure>
  <div class="border-xl pad-xl">
    <div class="vstack pad-lg bg-body">
      <p>Are you sure you'd like to delete everything?</p>
      <div class="hstack" style="justify-content: flex-end">
        <button class="button bg-quarternary">Delete</button>
        <button class="button">Cancel</button>
      </div>
    </div>
  </div>
  <figcaption>Buttons sitting next to each other in a row</figcaption>
</figure>

Flexbox is designed for one-dimensional layouts, so it is perfect here. Setting `display: flex` on an element lets it control how its children are laid out. By default they will all be put in a single row.

```css
.row {
  display: flex;
}
```

<figure>
  <style>
    .example-row {
      display: flex;
      resize: horizontal;
      overflow: hidden;
      border: 0.5rem solid;
    }
    .box {
      
    }

  </style>
  <div class="example-row">
    <div class="pad-xl bg-primary">These boxes are as big as their content</div>
    <div class="pad-xl bg-tertiary">These boxes are as big as their content</div>
  </div>
  <figcaption>Flex container example</figcaption>
</figure>

#### Making it responsive

If you resize the container using the handle on the bottom right you'll see that this layout doesn't _adapt_. By default the flex children will shrink as much as their content allows, but they can't get smaller than the longest word inside them. Once the container gets narrower than this they stop shrinking and get cut off.

This means our layout isn't flexible enough to cope with different screen sizes. Generally when you put things in a row you want to make sure they can wrap when there's no more space.

```css
.row {
  display: flex;
  flex-wrap: wrap;
}
```

<figure>
  <div class="example-row" style="flex-wrap: wrap">
    <div class="pad-xl bg-primary">These boxes are as big as their content</div>
    <div class="pad-xl bg-tertiary">These boxes are as big as their content</div>
  </div>
  <figcaption>Flex wrap example</figcaption>
</figure>

Resizing this example shows the right-most child wrapping onto a new line when there isn't enough space for it.

#### What about media queries?

Note that we don't need to add media queries here. Those are great when you need really specific control over exactly how and when the layout should change. But this layout is _intrinsically_ responsive. It flows to fit whatever container it is inside based on its content. This tends to be simpler and more robust than trying to figure out exactly what breakpoints to add in media queries.

#### Spacing children out

Layouts usualy require some space between each element. CSS has a handy property for controlling this for flexbox and grid containers: `gap`. This is a shorthand for `row-gap` and `column-gap`, which allow you to control the vertical/horizontal spacing separately.

```css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

<figure>
  <div class="example-row" style="flex-wrap: wrap; gap: 1rem">
    <div class="pad-xl bg-primary">These boxes are as big as their content</div>
    <div class="pad-xl bg-tertiary">These boxes are as big as their content</div>
  </div>
  <figcaption>Flex gap example</figcaption>
</figure>

Note that the gap is maintained even when the children wrap. Unfortunately `gap` is not supported for flexbox in Safari yet (it works fine for grid). You can [approximate the same effect using margins](https://web.dev/flexbox-gap/#flexbox-gap), but it's more complex to make sure it handles wrapping.

### Alignment

Flexbox allows control over how children are aligned both horizontally and vertically. Most of the time you want things vertically centered, so that different height children line up. You can control vertical alignment with `align-items`:

```css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
```

<figure>
  <div class="example-row" style="flex-wrap: wrap; gap: 1rem; align-items: center">
    <div class="pad-sm bg-primary">Small box</div>
    <div class="pad-xl bg-tertiary">Tall box</div>
  </div>
  <figcaption>Flex vertical alignment example</figcaption>
</figure>

You can allow this value to be customised the same way we did for the Stack's space above. Either a CSS variable or modifier classes:

```css
.row {
  /* ... */
  align-items: var(--align, center);
}
```

```css
.row {
  /* ... */
  align-items: center;
}
.align-start {
  align-items: start;
}
.align-end {
  align-items: end;
}
/* etc */
```

You may also need to allow control of horizontal alignment using the `justify-content` property. This lets the container push its children apart, or to either end of the container.

```css
.row {
  /* ... */
}
.justify-end {
  justify-content: flex-end;
}
```

```html
<div class="row justify-end">
  <div class="box">Box 1</div>
  <div class="box">Box 2</div>
</div>
```

<figure>
  <div class="example-row" style="flex-wrap: wrap; gap: 1rem; justify-content: flex-end">
    <div class="pad-xl bg-primary">Box 1</div>
    <div class="pad-xl bg-tertiary">Box 2</div>
  </div>
  <figcaption>Flex horizontal alignment example</figcaption>
</figure>

### Challenge 2: using the Row

Open `challenge-2/index.html` in your editor. You should see a page with a header containing a logo and a nav.

<figure>
  <iframe src="starter-files/challenge-2/"></iframe>
  <figcaption>Challenge 2 preview</figcaption>
</figure>

You need to make the header layout work correctly. The logo should be on the far left, with the nav on the far right, and all the links in a row, like this:

<figure>
  <iframe src="starter-files/challenge-2/solution/"></iframe>
  <figcaption>Challenge 2 solution</figcaption>
</figure>

Again, _only_ add Row CSS to the style tag and classes to the HTML. Don't add any new HTML elements.

---

## Mindset

CSS tends to be tough for beginners because it requires a certain way of thinking. It's better to try and give the browser _hints_ about how a layout should work, rather than trying to control exactly where everything goes. Rules like `display: absolute` (where you have to manually place an element) should be a last resort.

The default browser layout (without any CSS) is accessible and responsive. When adding CSS to control where things go we should be careful not to break this. Always consider how your layout will adapt to changes: e.g. does your grid automatically wrap when the screen gets narrower?

Generally your styles will be less complex if you create single-purpose components. However identifying what these should be requires experience, and so beginners often end up writing tangled, overly-complex CSS that is harder to understand.
