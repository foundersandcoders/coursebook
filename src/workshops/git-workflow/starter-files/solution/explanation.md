# Accessibility solution explanation

## Lighthouse testing

The best place to start is a Chrome Lighthouse accessibility audit. This will tell us the obvious things to fix. There are 5 problems to fix.

1. ### Background and foreground colors do not have a sufficient contrast ratio.

   We should make the body color darker until we have at least a 4.5:1 contrast ratio. Otherwise it's difficult to read the text.

1. ### Document doesn't have a `<title>` element

   We should add a `<title>` containing a unique title for this page.

1. ### Image elements do not have `[alt]` attributes

   The `<h1>` contains an image of some text, and it doesn't have any alternative text. This means the title of the page is effectively hidden from screen readers.

   There are two possible solutions: either add an alt attribute containing the title text, or replace the image with actual text, using a web font to make it look correct.

   Cool trick: you can add `&text=mytitle` to a Google Font URL and it'll [only load the characters required for that text](https://developers.google.com/fonts/docs/css2#optimizing_your_font_requests). This is useful if you only need a custom font for a small piece of text like a heading.

1. ### Heading elements are not in a sequentially-descending order

   The headings on the page jump from `h1` to `h3`, then `h4`. We shouldn't skip the `h2` level just because we prefer smaller titles for the drinks. We should use the right sequential heading levels and style the `h2`s to be smaller.

1. ### `<html>` element does not have a `[lang]` attribute
   We should add a `lang="en"` attribute to the page so visitors know it's in English.

## Manual testing

There are more accessibility problems that Lighthouse cannot catch automatically.

1. ### The nav menu toggle is not usable with the keyboard

   We should use a `<button>` instead of a `<div>`, as they are focusable and usable with the keyboard by default. They're also announced as interactive by screen readers. It's possible to make this work with a div but you'd need to add a lot of custom JS.

1. ### The nav menu toggle has no label

   The SVG icons might be obvious to sighted users, but a screen reader user has no idea what the button does.
   There are lots of ways to add labels. We could put some visually-hidden text inside the button, or add an `aria-label` to it.

   In this case the simplest solution is to label the SVGs themselves, since we're already toggling them when the button is clicked.
   We can label an SVG by adding a `<title>` element inside.

1. ### The alternative text for the drink images is empty.

   Empty alt text is fine for purely decorative images, but you could argue that these images add important information. They show the user how the drink should look, what glass it is served in, what garnish it should have etc. We should add alt text describing these things.

1. ### Links have no interactive styles.

   There's no indication that the `<a>` tags are any different to the rest of the text. Links are styled blue and underlined by default—you need some way to indicate to users they can click them.

   The CSS also disables the focus outline for links. This makes it impossible for a keyboard user to know when they have focused a link. You may think the default focus styles are ugly, but it's important to replace them with your own styles rather than disable them entirely.

1. ### "Read more" links are repetitive

   There's no way for a screen reader user to know where each "Read more" link will take them (without listening to the entire `href` to figure it out). Link text should describe where the link will take the user—avoid generic "click here" or "read more" where possible.

   In this case it might make more sense for the link to just be the title, which contains the drink's name.

1. ### No way to scroll the carousel with the keyboard

   The horizontally scrolling drinks carousel is not controllable via the keyboard. Usually users can scroll the page with the arrow keys, but that doesn't work for scrollable containers.

   We can fix this by making the carousel focusable with `tabindex="0"`. Now users can tab to the carousel and use their arrow keys to scroll it.
