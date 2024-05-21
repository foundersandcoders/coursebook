Your project this week is to add authentication and user specific interatctions

## Spike

Before you start writing features you need to create a security plan. This should a section in your `README.md` that describes how you will secure your app and mitigate different potential attacks.

### Questions to consider

- Will you store session info in a cookie (stateless) or in your database (stateful)?
- How will you check a user’s identity (authentication)?
- How will you control what actions a user can take (authorization)?
- How will you mitigate Cross-site Request Forgery (CSRF) attacks?

### Useful resources

- [What really is the difference between session and token based authentication](https://dev.to/thecodearcher/what-really-is-the-difference-between-session-and-token-based-authentication-2o39)
- [JSON Web Tokens suck](https://www.youtube.com/watch?v=JdGOb7AxUo0)
- [CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

### User stories

As a **shopper**, I want to:

- Log into my account using my email and password
- Have my user session persisted so I don't have to log in every time



#### These User Stories from last week should be updated to be linked to a shoppers account

- Add products to a shopping cart
- View and edit items in my shopping cart
- Complete the checkout process to "purchase" products in my cart
- See confirmation when an order is placed successfully
- View previous orders and order history
- Complete checkout and payments to simulate purchasing products

### Stretch user stories

As an admin, I want to:

- Log into an admin section of the site
- Add, edit and delete products
- View and export reports on site analytics
- Manage user accounts

## Acceptance Criteria

- [ ] Users must log in to use site
- [ ] Each user has their own session with unique carts and order history
- [ ] Information stored about users in database is visible on site
- [ ] Using the site updates information about users on database

### Stretch
- [ ] Site has admin functions

