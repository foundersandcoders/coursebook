---
title: Installation guide
---

# Installation guide

This guide will explain how to install all the software you need to start the course.

Before you start you should read the [System Requirements](../system-requirements/) guide to make sure your computer is appropriate. This is especially true for Windows users, since you'll need a Linux environment for most of this guide to work.

If you hit any problems check the [troubleshooting section](#troubleshooting).

## Package managers

We'll be using a "package manager" to install most things. Package managers are software you use to install other software. They make it easier to install lots of things at once and keep track of everything you have. This is a more structured way than just going to a website, finding the right link and downloading an installer.

### Linux

If you're using Linux (even on Windows) you should have the `apt` package manager already, since it's the standard way to install things on most Linux distributions.

### macOS

Macs don't come with a package manager, so you'll need to install [Homebrew](https://brew.sh/) before anything else.

## The software

Here's a quick summary of the things we need. We'll cover what each one is and how to install it below.

- Git
- Node
- npm
- iTerm2 (Mac) or Windows Terminal
- VS Code (or your preferred editor)
- Chrome/Edge/Firefox

### Git

[Git](https://git-scm.com/) is a program for tracking changes to the code you write. Most systems come with this installed, but it's worth making sure you have a relatively recent version. You can run this in your terminal to check the version:

```bash
git --version
```

If you need to install Git you can use your package manager.

#### Mac

```bash
brew install git
```

#### Linux

```bash
apt-get install git
```

#### Configuring Git

You will need to tell Git your [username](https://docs.github.com/en/github/using-git/setting-your-username-in-git) and [email](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/setting-your-commit-email-address). It uses these to record who wrote each bit of code in a project.

You should make sure the email matches your email on GitHub, so that you don't end up with multiple versions of yourself committing to a project. If you want to keep your email private [GitHub can provide you](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/setting-your-commit-email-address) with a "no-reply" email for use with Git.

```bash
git config --global user.name "Example Name"
git config --global user.email "email@example.com"
```

We'd recommend going through GitHub's [Getting started](https://docs.github.com/en/github/using-git/getting-started-with-git-and-github), and [setting up an SSH connection](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) guides as there are some extra bits of setup you probably want to do.

### Node

Node is a version of JavaScript that you can run on your own computer. JS is usually limited to running on web pages inside of a web browser, but Node lets you run JS code anywhere.

You don't want to install this with a package manager, since it's a _language_ not a normal program. Most package managers have out-of-date versions.

#### Volta

We'll install Node with [Volta](https://volta.sh/), which is a tool for managing Node versions. This command will download their install script (with `curl`) then pass the script to `bash` to run it:

```bash
curl https://get.volta.sh | bash
```

You may have to restart your Terminal afterwards.

You can now use Volta to install different versions of Node:

```bash
volta install node
```

This will automatically pick the current "Long-Term Support" (LTS) version of Node, which is usually what you want.

#### npm

npm is yet _another_ package manager (it stands for "Node Package Manager"). It's used for installing JavaScript code inside your projects. Luckily npm comes with Node, so you don't have to install it.

If for some reason you don't have it, or it is very out-of-date, you can install it with Volta too:

```bash
volta install npm
```

### Terminal

You probably want to install a nicer Terminal program than the default. This is mostly down to personal preference, but you'll be spending a lot of time in the Terminal so it's worth finding something you like. We also recommend [customising your Terminal](https://oliverjam.es/blog/make-your-terminal-nicer/).

#### Mac

[iTerm2](https://iterm2.com/) is great on macOS. You can either install it manually from their website or with Homebrew:

```bash
brew install --cask iterm2
```

#### Windows

The new Windows Terminal is designed for Linux-on-Windows (WSL). They recommend you install it from [the Windows Store](https://www.microsoft.com/en-gb/p/windows-terminal/9n0dx20hk701).

### Code editor

You'll be writing a lot of code, so you'll want a nice editor. We recommend [VS Code](https://code.visualstudio.com/). It's probably easiest to install this via the website.

You may need to install the "command-line tools". This allows you to run `code .` in your Terminal to open the current folder in your editor (this is very useful!).

Try running `code --version`. If you get an error you need to open VS Code, hit `cmd-shift-p` (or `ctrl-shift-p` on Windows/Linux) to open the command-palette, then search for “shell”. Select the option that says: `Shell Command: Install ‘code’ command in PATH`.

### Web browser

As a web dev most of the software you write will run in a web browser. You'll need any modern browser—ideally [Chrome](https://www.google.com/intl/en_uk/chrome/), [Edge](https://www.microsoft.com/en-us/edge) or [Firefox](https://www.mozilla.org/en-GB/firefox/new/) (Safari doesn't have the best developer tools).

It's a good idea to have a few different browsers installed for testing your websites, as they don't always work in exactly the same way.

### Postgres

[PostgreSQL](https://www.postgresql.org/) is a database program. It's used by lots of websites to save user information. You won't need it until Database Week in the full-time course, but it's best to make sure it's installed earlier.

Postgres can be a bit complex, so we have a [full installation guide](https://github.com/coding-wiki/learn-sql/blob/master/postgresql/setup.md).

## Checking everything

You can copy/paste these commands into your Terminal to output all the version numbers, then compare those against the minimum-version-list below.

```
git --version
echo "node $(node --version)"
echo "npm $(npm --version)"
psql --version
echo "vs code $(code --version)"
```

This should output something like:

```bash
git version 2.28.0
node v14.15.1
npm 6.14.8
psql (PostgreSQL) 13.1
vs code 1.52.1
cd9ea6488829f560dc949a8b2fb789f3cdc05f5d
x64
```

You want at least these minimum versions:
Node: 14
npm: 6
psql: 11

## Troubleshooting

Every computer is different and has a different combination of operating system, version, etc. This means it's likely you'll encounter some problems installing at least one thing. This can be frustrating, but try to take a deep breath and work through the issue.

The most important skill to learn as a developer is how to carefully read an error message and figure out what went wrong. So in a way fixing problems at this stage is great practice starting out in your career!

### General steps

1. Read the error message. If it's very long make sure you scroll right to the top.
1. If the error message suggested a solution try that first. If it pointed out an obvious issue (like a mispelled command) try correcting it and running again.
1. If the error isn't self-explanatory google _the exact message_ plus the general technology. For example is Homebrew fails to install with a message like `Failed during git fetch...` then search for `Homebrew "Failed during git fetch"`. The quotes tell Google you want the results to include that exact string.
1. Don't be afraid to try suggestions off the internet. You'll find yourself copy/pasting things from Stack Overflow throughout your career. However bear in mind that Terminal commands _can_ be dangerous, so be a little cautious and make sure you read things before blindly pasting them.

### Known issues

Some problems come up again and again, so it's quicker to list them here than have everyone google them.

#### Volta command not found

Did your Volta install script succeed, but you cannot actually use it (e.g. you get `Command not found` when running `volta install node`)?

This means the Volta program was not added to your Terminal's `PATH` variable. `PATH` is a list of every command-line program that is installed. It's where your Terminal looks for available commands whenever you type anything (e.g. `ls` and `cd` are listed inside `PATH` somewhere).

Volta is supposed to automatically do this, but sometimes it does so in the wrong config file (e.g. if you have both Bash and Zsh configs). You can manually add the required lines. First determine which shell you're using with:

```bash
echo $SHELL
```

This will print something like `/bin/zsh` or `/bin/bash`. If your shell is Zsh (the default on modern Macs) then you want to edit the `.zshrc` config file. If it is Bash you either want the `.bashrc` or `.bash_profile` config files.

These config files live in your "home directory". The tilde symbol (`~`) is a shortcut for this directory. You can list everything inside of it with:

```bash
ls -a ~
```

You should be able to see the config file you need in there. Open it in your text editor with:

```bash
code ~/.zshrc
# or
code ~/.bashrc
# or
code ~/.bash_profile
```

and add the following lines (there might be existing config; you can add these lines anywhere):

```bash
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

Restart your Terminal and you should now be able to use the `volta` program.
