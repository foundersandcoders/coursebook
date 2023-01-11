Your project next week will be to build a microblogging site. It should allow users to submit their own posts and view all the posts submitted by others.

**Note**: we aren't expecting the data to persist when the server restarts (we'll be looking at databases for this in week 2).

## Spike

Before you start implementing features you need to figure out how to deploy a Node app to Heroku.

### Questions to consider

1. What is Heroku?
1. What are environment variables and why might we want to hide them?
1. How can we automatically deploy commits to our `main` branch?

### Useful resources

- [How Heroku Works](https://devcenter.heroku.com/articles/how-heroku-works)
- [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
- [GitHub Integration (Heroku GitHub Deploys)](https://devcenter.heroku.com/articles/github-integration)

## User stories

### Core

- **As an opinionated person, I want to**: post my thoughts so others can read them
- **As a bored person, I want to**: read what other people have posted

### Stretch

- **As an impulsive person, I want to:** delete my posts so no one can see them anymore

### Acceptance Criteria

- Deployed to Heroku
- A page with a form to submit posts, and a page showing all posts
- No `.html` files (all HTML responses should be created dynamically within Node)
- No client-side JavaScript (all logic should happen on the server)
- All static assets served correctly (CSS, favicon etc)
- Tests for each server route
- A responsive, mobile-first design
- Ensure your app is accessible to as many different users as possible
