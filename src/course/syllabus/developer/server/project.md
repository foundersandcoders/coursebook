Your project this week is to build a microblogging site. It should allow users to submit their own posts and view all the posts submitted by others.

**Note**: we aren't expecting the data to persist when the server restarts (we'll be looking at databases for this next week).

## Spike

Before you start implementing features you need to figure out how to deploy a Node app to Fly.io.

Fly is a "Platform-as-a-service" provider (PaaS). PaaS is a type of cloud computing service that provides users with a platform for deploying and managing apps. They provide a convenient way for developers to quickly get their apps up and running without having to worry about the technical details of the infrastructure and resources they need.

### Questions to consider

1. What are environment variables and why might we want to hide them?
2. How can we automatically deploy commits to our `main` branch?

### Useful resources

- [Deploying web apps to Fly.io](https://oliverjam.es/articles/deploying-to-fly) (you don't need to worry about the "Persistent Volumes" section for this week's spike)
- [Continuous Deployment with Fly and GitHub Actions](https://fly.io/docs/app-guides/continuous-deployment-with-github-actions/)

## User stories

### Core

- **As an opinionated person, I want to**: post my thoughts so others can read them
- **As a bored person, I want to**: read what other people have posted

### Stretch

- **As an impulsive person, I want to:** delete my posts so no one can see them anymore

## Acceptance Criteria

- [ ] Deployed to Fly.io
- [ ] A page with a form to submit posts, and a page showing all posts
- [ ] No `.html` files (all HTML responses should be created dynamically within Node)
- [ ] No client-side JavaScript (all logic should happen on the server)
- [ ] All static assets served correctly (CSS, favicon etc)
- [ ] Tests for each server route
- [ ] A responsive, mobile-first design
- [ ] Ensure your app is accessible to as many different users as possible
