Your project this week is TBC

## Intro

Learners will develop an end-to-end dynamic e-commerce web application where users can browse and purchase products online. 

The frontend of this project will be built using React. For the backend, it will use Node.js and Express to handle server-side functionality. User accounts and product data will be stored in a SQLite database.

## Project

Your project for the next 2 weeks will be to develop a Express backend connected to a SQLite database and linked to a React frontend. Your UI should provide methods so that users can search for and display information about items and add them to a shopping cart. It is up to you to determine the process and order you take to achieve this, but should plan this carefully and attempt to anticipate any hurdles you approach will encounter.

## Spike

Before you start writing features you need to design the schema for your data. Think about what different things your app needs to store, how they relate to each other, and how you can avoid duplicating information. Record your schema in your `README.md` using Markdown tables. Consider embedding a [diagram](https://dbdiagram.io/) to help visualise the relationships.

### Questions to consider

1. What kinds of data relationships are there?
2. What’s a foreign key? How can they help us design schemas with relational data?

### Useful resources

- [Database Relationships](https://www.lifewire.com/database-relationships-p2-1019758)
- [A beginner’s guide to many-to-many relationships](https://support.airtable.com/docs/airtable-s-guide-to-many-to-many-relationships)

### User stories

As a **shopper**, I want to:

- See a homepage with content when I log in
- Be able to navigate between different pages of the app
- View a list of products when I visit the products page
- Click on a product to view more details in a new page
- Search for products by name or description and view product listings with images, descriptions and reviews
- Add products to a shopping cart

### Stretch user stories

- View and edit items in my shopping cart
- Complete the checkout process to "purchase" products in my cart
- See confirmation when an order is placed successfully
- View previous orders and order history
- Complete checkout and payments to simulate purchasing products

## Repository naming convention
Please name your repo following this template:
PRO04_Name1_Name2_Name3_Name4

## Acceptance criteria

- [ ] Store product data in a database
- [ ] Follow React principles and best practices
- [ ] Alow users to search/filter products 
- [ ] Allow users to add products to a cart

### Stretch
- [ ] Track item stock and remove items that sell out