Your project this week is to build a web app that authenticates users and stores user-specific data in a SQLite database.

## Spike

Before you start writing features you need to create a security plan. This should a section in your `README.md` that describes how you will secure your app and mitigate different potential attacks.

### Questions to consider

- Will you store session info in a cookie (stateless) or in your database (stateful)?
- How will you check a user's identity (authentication)?
- How will you control what actions a user can take (authorization)?
- How will you mitigate Cross-site Request Forgery (CSRF) attacks?

### Useful resources

- [What really is the difference between session and token based authentication](https://dev.to/thecodearcher/what-really-is-the-difference-between-session-and-token-based-authentication-2o39)
- [JSON Web Tokens suck](https://www.youtube.com/watch?v=JdGOb7AxUo0)
- [CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

## User stories

### Core

- **As a user, I want to**: submit information to your site for anyone to see
- **As a user, I want to**: come back to your site later and see what I posted is still there
- **As a user, I want to**: be the only person allowed to delete my stuff

Since this project is open-ended you'll need to write your own more specific user stories once you know what you want to build.

### Acceptance Criteria

- [ ] Forms for users to sign up and log in
- [ ] A form for users to submit data only accessible to logged in users
- [ ] A page showing all the data
- [ ] A way for logged in users to delete their own data
- [ ] Semantic form elements with correctly associated labels
- [ ] A SQLite database
- [ ] Hidden environment variables (i.e. not on GitHub)

#### Stretch criteria

- [ ] Tests for all routes
- [ ] A user page that shows everything posted by a single user
- [ ] GitHub Actions CI setup to run your tests when you push

## Example project ideas

- Founders & Coders book sharing system
- Food / coffee recommendations around Founders & Coders
- Founders & Coders events calendar
