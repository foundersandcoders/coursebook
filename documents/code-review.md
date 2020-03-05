# Code review

> “Any fool can write code that a computer can understand.  
> Good programmers write code that humans can understand.”
>
> \- Martin Fowler

## Why review code?

Reading other people's code is a good way to learn. Not only do you gain insight into how other people solve a problem, you also see what makes code readable and understandable (i.e. good code).

While it may feel like the focus of your first 8 weeks at Founders and
Coders is on learning to write code, programmers generally spend more time reading other people's code than writing their own.

## How we code review

### Before code review

Make sure your own project is ready to be reviewed:

- [ ] Push the latest changes to GitHub
- [ ] Make sure the code you want reviewed is merged into the Master branch
- [ ] If possible deploy the latest version so it can be viewed online
- [ ] Make sure there's a `README.md` that describes the project
- [ ] The readme should contain instructions on running the project locally

**Do not work on your own project during code review time.** This is unfair both to the team you should be reviewing, _and_ the team trying to review your changing project.

### Who reviews what?

Each team reviews one other team's project. Graduate mentors and/or FAC alumni will also review.

Make sure you share a link to your GitHub repo on Slack before code review begins. Try to include any extras the reviewers might need (like API secrets not included in the repo).

### Reviewing

Open the repo on GitHub and scan the readme. If the project is deployed online open it and play around. Does the project meet the user stories for that week? Does it demonstrate the learning outcomes for that week? Can you see any obvious bugs or areas to improve?

Clone the repo and follow the instructions to run it locally. Does everything work as expected? Often the different environment will highlight issues that the team missed.

Open the project in your editor. Does the file structure make sense? Can you you follow the different paths the code might take? Do variables and functions have clear and descriptive names?

### Raise issues

Check if the issue you want to raise already exists. Use the search bar if there are lots of issues already. Make sure your issue titles clearly summarise the content. If you're commenting on a specific section of code you can [embed it in the issue](https://help.github.com/en/github/managing-your-work-on-github/opening-an-issue-from-code). Link to relevant documentation if you're suggesting something they may not have seen before.

Try to make sure your issues are clear and actionable. Don't focus on small subjective preferences (e.g. "I would put a line break before this line of code"). Instead highlight code that confused you, or that has the potential to break unexpectedly (e.g. "I wasn't sure what `x` was, could you call it `descriptiveName` instead?").

Don't feel like you have to look at all the code that's written. Take your time exploring fewer things in more detail.

### Review etiquette

Phrase your issues in an open-minded way: use questions and _seek to understand_. Don't assume you know better–you're missing the original context and can't know exactly why they wrote the code in the way they did.

If you _think_ you know a better way of solving a problem, phrase the issue as a question:

> Would you consider using `this` here instead of `that` because of xyz reason...?

Issues don't all have to be negative: if you spot something particularly clever or elegant say so! It's nice to get occasional compliments as well as suggestion for improvement.

When _receiving_ reviews try to remember that the reviewer has your best interests at heart. They want to help you become a better developer, so assume they have good intent. You are not your code.

## Background reading

- [Is code for computers or humans?](http://stackoverflow.com/questions/522828/is-code-for-computers-or-for-people)
- [Writing code for humans](https://medium.com/@ilyothehorrid/writing-code-for-humans-5b80a89f439c)
