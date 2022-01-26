# Projects

Each week, you will be split into teams of 4 for weekly projects. These teams will be change throughout the course, giving you a chance to work with every other member of your cohort.

The founders and coders learning environment is all about collaboration, and this is a great opportunity to practice your workflow in a development team.

Project teams for each week are posted in your cohort repo, under the pairs-and-teams folder.

Remember to read each other’s user manuals when you start working with a new team!

### Project Setup

Utilize your project setup time to do the following:

- Name your github repo in the format

  `week#-<topic>-<team members' names or initials>`

  for example:

  `week2-database-reuben-gregor-oli-dan`

- Decide on key user stories and finalise the end goal for the project
- Create a set of github issue labels to make it easier to plan your sprints
- Split up the user stories into issues, and assign your first day's work.
- Create a github project board. The simplest structure for this is three columns of to-do, in progress and done.
- From week 2, decide who takes on each [project role](https://learn.foundersandcoders.com/course/handbook/project-team/)

### Team workflow

- Pair program as much as possible - two brains are better than one, support each other!
- Decide how frequently you take breaks, and take them together!
- Don't always work on the same person's machine. Watching someone write code is very different to writing it yourself!
- Swap pairs every half-day. This means that you will break up work into more manageable chunks, but also that the team will work across different parts of the project, and with different people.
- Update your kanban board as you finish working on issues. Measuring your project velocity will be very beneficial during standups, so you can decide how to best use the remaining time in the sprint.
- Avoid focussing on a specific area too much (eg: if you're known as the CSS whiz, try not to find yourself single handedly fixing styling towards the end of the project). Challenge yourself, and pick tasks that make you uncomfortable!

### Github workflow

A good github workflow is essential to keeping a project organised and easy to maintain. The larger the project, the more important it becomes to track changes and be aware of who worked on what.

Some things to keep in mind:

- Make sure everyone has the same code formatter ([prettier](https://prettier.io/docs/en/install.html)) setup, so you can avoid merge conflicts due to weird spaces/extra commas etc.
- Never work on the main branch. Before you start work, make sure you pull main and create a new branch.

```git
   git pull
   git checkout -b "new-feature"
```

- Commit often. This makes it easier to undo specific changes. If you've been coding for half a day and forgot to commit, VSCode lets you [stage selected lines](https://stackoverflow.com/questions/34730585/how-can-i-commit-some-changes-to-a-file-but-not-others-in-vscode) from the source control panel.
- Write meaningful commit messages. A good convention to follow for commit messages is that they should be imperative, i.e: "add tests for signup form"

- Your commit messages should make sense if read in this format:
  `"If applied, this commit will: <your commit message>"`

- When you pair, don't forget to co-commit! (you can find more information in the [GitHub Docs](https://docs.github.com/en/github/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors))

- When you finish working on your branch, make sure it's upto date with main before pushing

```git
   git checkout main
   git pull
   git checkout "new-feature"
   git merge main
   git push
```

- Link PRs to issues, and close issues as you finish working on them.
- Review PRs as a team, and merge together. In smaller weekly projects where there isn't time for code review on every PR, make sure the other pair has seen your work and any implications it has on their code.
