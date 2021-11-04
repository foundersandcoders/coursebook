# git and GitHub

This week, you'll practise with **git flow**. Follow these steps to connect a local repository to a remote one on GitHub. Before following these steps, you'll need to [install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Local repository

Create a folder on your computer and add files for HTML, CSS and JavaScript. Add some content to the HTML, link the CSS and add a script tag which points to your JS.

Open up your terminal and navigate to the folder where you've saved your files. Initialise this folder as a git repository. You can do this by running the command `git init` in the working direcotry.

## Staging and committing

Staging is a step before committing changes. When you stage changes you can continue to make changes in the working directory and control which files or changes you'd like to include in a commit.

```git
git add index.html
git add .
```

Commiting is like saving your progress. You are telling git that all the changes made should be tracked. The repository will be saved at the point in time you commit.

TODO: Add definitions

Stage and commit your changes.

## Remote repository

Create a remote repository on GitHub. The easiest way to set this up is without a README since GitHub will then give you instructions to connect with your local repository.

Connect your local and remote repositories. Push your changes from your local machine to the remote. :link:

## Host your site

Deploy your site to GitHub Pages.

## Making changes

Once you have a local and remote repository connected, you'll be able to keep both in sync by regularly staging, committing and pushing your changes to GitHub. Getting into the habit of doing this regularly will help you make sure your codebase is backed up and version-controlled.

There's no hard and fast rule for how often you should commit. This might be after every 20 lines of code; every 30 or 60 minutes; or after each feature you complete. Getting into the habit of small commits often will give you a good level of practice with _git flow_ as well as GitHub activity on your profile (green squares).

Once you have a local and remote repository connected, keep them in sync by regularly staging, commiting and pushing your changes.

After you've saved your changes, stage them using `git add`.

Commit your staged files using `git commit -m "What you did..."`.

Push your changes to your repository using `git push origin main`. You can batch multiple commits and push them all together.
