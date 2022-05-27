---
title: Git introduction
description: This workshop is an introduction to using Git for version control; GitHub for hosting a codebase and deploying a website; and the terminal for creating files and moving between directories.
tags:
  - workshop
  - git
keywords:
  - git
  - introduction
starter: false
---

This workshop will help you practise with Git on the terminal. Follow these steps to connect a local repository to a remote one on GitHub. Before following these steps, you'll need to [install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

This workshop is an advancement on concepts covered in [our Git introduction](../applicant-git-1/). Completing that workshop is not a requirement to understand this one, however you might prefer to focus on the fundamentals there before diving into this workshop.

This workshop assumes you have a working knowledge of [using the terminal](https://www.joshwcomeau.com/javascript/terminal-for-js-devs/).

## Getting started

Create a folder on your computer and add files for HTML, CSS and JavaScript. Add some content to the HTML, link the CSS and add a script tag which points to your JS file.

Open up your terminal and navigate to the folder where you've saved your files.

Initialise this folder as a Git repository. You can do this by running the command `git init` in the working directory.

## Staging

Staging defines which files we'd like to add to our next commit. When staging, you can specify files to stage, or using the `.` you can stage all the files in your current directory.

To stage our `index.html` only:

```
git add index.html
```

To stage all files in the directory:

```
git add .
```

## Committing

Committing is like saving your progress at a point in time. You are telling Git that all the changes staged should be tracked.

Running the command without the `-m` flag will open up an editor in your terminal where you can write a commit message. Exit this by hitting `esc` and typing `:wq`. You can [update your default editor](https://oliverjam.es/blog/make-your-terminal-nicer/#set-your-default-editor) to avoid this.

```
git commit
```

The `-m` flag allows you to write a commit message in the command line.

```
git commit -m "Create HTML, CSS and JavaScript files"
```

{% box %}

It's conventional to use the imperative verb - for example "change this" rather than "changing this".

Aim for your commit history to describe precisely and concisely what you did in that change. Someone reading your commit history should be able to identify at a glance what changes were made.

{% endbox %}

## Remote repository

Create a new repository on GitHub. You can do so by navigating to your repositories and clicking the green 'new' button.

The easiest way to set this up is without a README to avoid conflicts in the Git history. When you land on the repository page, Git will give you commands for connecting your local repository to the remote; renaming your main branch; and pushing your changes.

```
git remote add origin <url>
git branch -M main
git push -u origin main
```

First, you're pointing Git to the url of your remote repository.

Second, you're renaming your branch to `main`. [GitHub updated their naming convention](https://github.com/github/renaming) in 2020 to dissociate from using the term `master` which can have negative connotations.

The `-u` flag here will set the default remote branch so when you make your next push, you'll only need to type `git push`. You can batch multiple commits and push them all together.

## Host your site

Deploy your site to GitHub Pages in the repository settings. You'll receive a link to the live version of your site.

Add this url to your `README.md` and repository description.

It can take a few minutes for GitHub to deploy the repository for the first time. You might need to wait a little while before you see your changes live.

## Making changes

Once you have a local and remote repository connected, you'll be able to keep both in sync by regularly staging, committing and pushing your changes to GitHub.

You should commit once you have completed a change or feature, not after writing certain amount of code, and don't wait until a project is complete. Getting into the habit of making small commits often will give you a good level of practice with Git. Regularly pushing your changes will ensure your codebase is backed up and version-controlled. Additonally, you'll have GitHub activity on your profile (green squares).

Once you have a local and remote repository connected, keep them in sync by regularly staging, committing and pushing your changes.

After you've saved your changes, stage them using `git add`.

Commit your staged files using `git commit -m "What you did..."`.

Push your changes to your repository using `git push`.
