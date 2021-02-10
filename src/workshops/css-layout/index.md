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

Modern CSS has powerful tools for controlling where elements go on the page. We're going to learn how to create basic style "primitives" (single-purpose bits of CSS) to solve different layout requirements, then see how we can combine those primitives together to create more complex layouts.

## Layout fundamentals

Let's quickly review some of the ways we can control layout with CSS.

### Flow layout

[Flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout) is the default way elements behave. Block elements like `div`, `header` and `p` take up the full-width of the page. Inline elements like `span`, `strong` and `a` only take up as much horizontal space as they need, and can sit next to each other.

You can go a surprisingly long way without writing much layout CSS, since the defaults are pretty good.

### Flexbox layout

Setting `display: flex` on an element lets it control how its children are laid out. By default they will all be put in a single row.

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

If you resize the container using the handle on the bottom right you'll see that this layout doesn't _adapt_. By default the flex children will shrink as much as their content allows, but they can't get smaller than the longest word inside them. Once the container gets narrower than this they stop shrinking and overflow their container.

Overflow is not good. It usually means your layout isn't flexible enough to cope with different screen sizes. Generally when you put things in a row you want to make sure they can wrap when there's no more space.

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

## Mindset

CSS tends to be tough for beginners because it requires a certain way of thinking. It's better to try and give the browser _hints_ about how a layout should work, rather than trying to control exactly where everything goes. Rules like `display: absolute` (where you have to manually place an element) should be a last resort.

The default browser layout (without any CSS) is accessible and responsive. When adding CSS to control where things go we should be careful not to break this. Always consider how your layout will adapt to changes: e.g. does your grid automatically wrap when the screen gets narrower?

Generally your styles will be less complex if you create single-purpose components. However identifying what these should be requires experience, and so beginners often end up writing tangled, overly-complex CSS that is harder to understand.
