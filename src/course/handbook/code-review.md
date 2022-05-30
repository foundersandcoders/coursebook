# Code review

Reading other people's code is a good way to learn. You gain insight into how other people solve a problem, and you see what makes code readable and understandable to you.

While it may feel like the focus of the course is on _writing_ code, programmers generally spend more time _reading_ it. Remember the target audience of your code is other humans, not the computer.

## How we code review

### Before code review

Make sure your own project is ready to be reviewed:

- Push the latest changes to GitHub
- Make sure the code you want reviewed is merged into the main branch
- Deploy the latest version so it can be viewed online
- Make sure there's a `README.md` that describes the project
  - The readme must contain instructions on running the project locally
  - If there are required secrets share them privately with your cohort

{% box "error" %}

**Do not work on your own project during code review time.**

This makes the team you're reviewing miss out on valuable feedback, and it's hard to review your code if it keeps changing.

{% endbox %}

### The reviewing process

You'll be swapping with another team. They review your project and you review theirs.

- Open the repo on GitHub and read the readme
- Open the deployed version and play around with the UI
- Does the project meet the user stories for that week?
- Does it demonstrate the learning outcomes for that week?
- Can you see any obvious bugs or areas to improve?
- Clone the repo and follow the instructions to run it locally
- Does everything work as expected or were there missing instructions?
- Open the project in your editor
- Does the file structure make sense?
- Can you you follow the different paths the code might take?
- Do variables and functions have clear and descriptive names?
- Do you understand the code?

### Raising issues

- Check if the issue you want to raise already exists
- Use the search bar if there are lots of issues already
- Make sure your issue titles clearly summarise the content
- [Embed the code you're discussing in the issue](https://help.github.com/en/github/managing-your-work-on-github/opening-an-issue-from-code)
- Link to relevant documentation if you reference unfamiliar concepts
- Make your issues are clear and actionable
- Don't focus on subjective preferences like "use more line breaks"
- Focus on code that confused you, or might break unexpectedly. E.g. "I wasn't sure what `x` was, could you call it `descriptiveName` instead?"
- Ask questions about things you didn't understand

Don't feel like you have to look at all the code that's written. Take your time exploring fewer things in more detail.

### Review etiquette

- Phrase your issues in an open-minded way; _seek to understand_
- Don't assume you know better–you're missing the original context for why they wrote it that way
- If you _think_ you know a better way of solving a problem, phrase the issue as a question. E.g. "Would using `a` here instead of `b` be better because of xyz...?"
- Issues don't all have to be negative: if you spot something clever or elegant leave a compliment!

When _receiving_ reviews try to remember that the reviewer has your best interests at heart. They want to help you become a better developer, so assume they have good intent. You are not your code.

---

You should strive to write code that makes it obvious _what_ is happening. This means use descriptive variable names (`articles` is better than `data`). Try naming complex conditionals (`if (articles && articles.length > 1)` becomes `if (atLeastOneArticle)`).

It's harder to include _why_ something is necessary in the code. This is when comments are useful—they let you provide context you had at the time of writing that the person reading the code in the future might not.
