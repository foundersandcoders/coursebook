# GitHub Workflow

A good GitHub workflow is essential to keeping a project organised and easy to maintain. The larger the project, the more important it becomes to track changes and be aware of who worked on what.

Some things to keep in mind:

- Make sure everyone has the same code formatter ([prettier](https://prettier.io/docs/en/install.html)) set up, so you can avoid merge conflicts due to weird spaces/extra commas etc.
- Never work on the main branch. Before you start work, make sure you pull main and create a new branch.

```git
   git checkout main
   git pull
   git checkout -b "fix-login-button"
```

- Commit often. This makes it easier to undo specific changes.

```git
   git add .
   git commit -m "fix bug with login button"
```

- Write meaningful commit messages. A good convention to follow for commit messages is that they should be imperative, i.e: "add tests for signup form"

- Your commit messages should make sense if read in this format:
  `"If applied, this commit will: <your commit message>"`

- If you've been coding for half a day and forgot to commit, VSCode lets you [stage selected lines](https://stackoverflow.com/questions/34730585/how-can-i-commit-some-changes-to-a-file-but-not-others-in-vscode) from the source control panel.

- When you pair, don't forget to co-commit! (you can find more information in the [GitHub Docs](https://docs.github.com/en/github/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors))

- When you finish working on your branch, make sure it's up-to-date with main before pushing

```git
   git pull origin main
   git push origin <type-current-branch-name-here>
```

- [Link PRs to issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue), and close issues as you finish working on them.

- Review PRs as a team, and merge together. In smaller weekly projects where there isn't time for code review on every PR, make sure the other pair has seen your work and any implications it has on their code.
