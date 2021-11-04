# git and GitHub

This week, you'll practise with **git flow**. Follow these steps to connect a local repository to a remote one on GitHub. Before following these steps, you'll need to [install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Local repository

Create a folder on your computer and add files for HTML, CSS and JavaScript. Add some content to the HTML, link the CSS and add a script tag which points to your JS.

Open up your terminal and navigate to the folder where you've saved your files. Initialise this folder as a git repository. You can do this by running the command `git init` in the working directory.

## Staging and committing

Staging is a step before committing changes. When you stage changes you can continue to make changes in the working directory and control which files or changes you'd like to include in a commit.

When staging, you can specify files to stage, or using the `.` you can stage all the files in your current directory.

```
git add index.html
git add .
```

Commiting is like saving your progress. You are telling git that all the changes made should be tracked. The repository will be saved at the point in time you commit.

Running the command without the `-m` flag will open up an editor in your terminal where you can write a commit message. Exit this by hitting `esc` and typing `:wq`.

```
git commit
```

The `-m` flag allows you to write a commit message in the command line.

```
git commit -m "Add HTML, CSS and JavaScript"
```

## Remote repository

Create a new repository on GitHub. You can do so by navigating to your repositories and clicking the green 'new' button.

The easiest way to set this up is without a README to avoid conflicts in the git history. When you land on the repository page, git will give you commands for connecting your local repository to the remote; renaming your main branch; and pushing your changes.

```
git remote add origin <url>
git branch -M main
git push -u origin main
```

## Host your site

Deploy your site to GitHub Pages in the repository settings. You'll receive a link to the live version of your site.

Add this url to your README and repository description.

It can take a few minutes for GitHub to deploy the repository for the first time. You might need to wait a little while before you see your changes live.

## Making changes

Once you have a local and remote repository connected, you'll be able to keep both in sync by regularly staging, committing and pushing your changes to GitHub. Getting into the habit of doing this regularly will help you make sure your codebase is backed up and version-controlled.

There's no hard and fast rule for how often you should commit. This might be after every 20 lines of code; every 30 or 60 minutes; or after each feature you complete. Getting into the habit of small commits often will give you a good level of practice with _git flow_ as well as GitHub activity on your profile (green squares).

Once you have a local and remote repository connected, keep them in sync by regularly staging, commiting and pushing your changes.

After you've saved your changes, stage them using `git add`.

Commit your staged files using `git commit -m "What you did..."`.

Push your changes to your repository using `git push origin main`. You can batch multiple commits and push them all together.
