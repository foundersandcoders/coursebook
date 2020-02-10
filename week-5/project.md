# The Project

This week's project will involve setting up a database which you connect to via a node.js server. You'll use your data to make a dynamic web app for your front-end.

Some suggested project ideas are below. Feel free to modify according to your interest, provided your idea has similar functionality.

We're expecting to see:

- A simple web app with a node server and a database
- A schema for your database, which should be documented in your readme (along with any other architectural decisions)
- Your database hosted on Heroku, or locally
- A build script for your database
- Security concerns appropriately considered (you must protect against script injections!)
- Dynamic content, but DOM manipulation kept to a minimum
- Mobile-first design
- Clear user journey (even if you take one of our suggested ideas, document the user journey in your readme)
- Test your server routes with supertest
- Test your pure functions both server and client side
- Set up a test database so that you can test your database queries

**Note** We don't expect you to authenticate users (i.e. have a login or signup page), or even to simulate this feature. We'll cover how to do that properly in next week. Since these ideas were designed with Founders & Coders users in mind, we'll rely on trust instead of authentication :)

## Suggested ideas

- Founders & Coders book sharing system
- Food / coffee recommendations around Founders & Coders
- Founders & Coders events calendar

## Getting started

Make sure you have a plan, and break the project down into manageable parts. Here are some things to consider:

- You will need to make the requests and update the DOM in response using client-side JavaScript.
- As well as serving static HTML and JS files, your server will also need to provide endpoints that return DB query results as JSON. You can query your server from the client using the fetch method.
- You'll need to be able to make both POST and GET requests to your server.
