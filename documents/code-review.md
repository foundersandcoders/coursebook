# A beginners guide to code review

![](https://media.giphy.com/media/zOvBKUUEERdNm/giphy.gif)

---

> “_Any fool can write code that a computer can understand.  
> Good programmers write code that humans can understand_.”
> ~ Martin Fowler

## Why review code? :sunglasses:

Reading other people's code is the **_fastest way to learn_**,
not only do you gain insight into how other people solve a problem,
you also gain experience in what makes code **_readable_** (_and thus_ **_maintainable_**).

While it may _feel_ like the focus of your first 8 weeks of Founders &
Coders is on learning to _write_ code, as a coder you will spend _considerably_ more time _reading_ other people's code than writing your own. (_get used to that idea... embrace it! if you can write less code by reading other people's modules and using existing solutions, you save everyone time!_)

## How we conduct code reviews :sparkles:

### 1. Locate the GitHub repository you are planning to review :mag:

- Students are responsible for:
  - sharing a link to their repo in their cohort's gitter channel prior to 10am, so that all code reviewers (students, mentors, alumni) know where to go
  - organising which student group will be code reviewed by which other group in the cohort
  - Clone the repo of the project you're reviewing and run the app from your local machine, to check whether it runs as expected.
    - Chances are, if you run the app, you will do something slightly different than what the author tried when testing their change. You may discover important cases they missed.

Mentors of your week will organise code reviews from other mentors/alumni :sparkles:

---

### 2. Overview of Files in the repo :file_folder:

Have a quick read through the list of files in the repo.

- is there a **README.md** or other documentation?
  - Understand the purpose of the project through the documentation
  - Follow any instructions that are in the README.

---

### 3. Raise issues :space_invader:

- Use the search bar to see whether the issue you want to raise already exists
  ![Looking at issues](https://files.gitter.im/Jen-Harris/zjN6/image.png)

- Raise issues on their repo if you spot any gaps in clarity in the code or documentation.

- Make sure these have clear titles and and useful commentary. Consider linking to relevant documentation or the lines of code that you're talking about, using screen shots or even gifs! See how to add in line comments [here]( https://help.github.com/articles/commenting-on-the-diff-of-a-pull-request/ so that your feedback is contextual. )

- We like using emojis as well. [This](https://www.webpagefx.com/tools/emoji-cheat-sheet/) has a list of all the emojis in a markdown friendly form :boom:

---

### 4. Explore the code :eyes:

- Are there alternative implementations or refactors that increase readability/understandability and/or maintainability?
- Could a comment be removed if your function was better named?
- Is the flow of the program clear? (are there too many branches?)
- Don't feel like you have to look at all the code that's written. Take your time exploring fewer things in more detail  
  ![](https://media.giphy.com/media/naXyAp2VYMR4k/giphy.gif)

---

### A quick note on etiquette :innocent:

- As the person reviewing code, always phrase your issues in an open-minded way (avoid _"this is bad code"_ type issues) use questions and _seek to understand_.

- If you (_think_ you) know a "better way" of solving a problem, phrase the issue as a question: e.g:

  > _Would you consider using `this` here instead of `that` because of xyz reason...?_

- If you are referring to a section of code, provide a full link to the line(s) including the branch/commit id. e.g: https://github.com/foundersandcoders/beekeeper/blob/e92ef2d3625ea5e5f7cf29e7daa11c86fa3741bd/test/auth.test.js#L20

---

## Background Reading :books:

- "Is code for computers or humans?""
  http://stackoverflow.com/questions/522828/is-code-for-computers-or-for-people
- "Writing code for humans" https://medium.com/@ilyothehorrid/writing-code-for-humans-5b80a89f439c
- ""**_Maintainable_** JavaScript"
  https://github.com/jasonzhuang/tech_books/blob/master/js/Oreilly.Maintainable.JavaScript.May.2012.pdf
