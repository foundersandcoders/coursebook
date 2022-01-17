## Deployment

How can we deploy our Node server to a cloud provider like Heroku?

### Questions to consider

1. What is Heroku?
1. What are environment variables and why might we want to hide them?
1. How can we automatically deploy merges to our Main branch?

### Useful resources

- [How Heroku Works](https://devcenter.heroku.com/articles/how-heroku-works)
- [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
- [GitHub Integration (Heroku GitHub Deploys)](https://devcenter.heroku.com/articles/github-integration)

## Client vs Server

What are the distinctions between a web client and web server?

### Questions to consider

1. What is a client and what is a server?
1. Can something be both a client _and_ a server?
1. What kind of code should be run on a server instead of a browser?

### Useful resources

- [What is a web server?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server)
- [Client-Server Overview](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview)
- [Client-side vs server-side validation](https://stackoverflow.com/a/162579)

## Node architecture

How does Node handle lots of requests despite running on a single processor thread?

### Questions to consider

1. What is the event loop?
1. Why should we prefer asynchronous code? What would happen if we had slow blocking code in our request handlers?
1. How does Node use callbacks to manage asynchronous code?

### Useful resources

- [The Node.js Event Loop](https://nodejs.dev/the-nodejs-event-loop)
- [What are callbacks?](https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/)
- [What are the error conventions?](https://nodejs.org/en/knowledge/errors/what-are-the-error-conventions/)
<!--

## Modules

How can we use modules in our Node apps?

### Questions to consider

1. What's the difference between our own, built-in, and 3rd party modules?
1. What is the `package.json` file for?
1. What is npm? Why are npm scripts useful? What does `npx` do?

### Useful resources

- [Expose functionality from a Node.js file using exports](https://nodejs.dev/expose-functionality-from-a-nodejs-file-using-exports)
- [The package.json guide](https://nodejs.dev/the-package-json-guide)
- [How to use or execute a package installed using npm](https://nodejs.dev/how-to-use-or-execute-a-package-installed-using-npm) -->
