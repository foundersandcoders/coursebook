## Intro

Learners with build a library in which to sort and share information (i.e. music, photos, recipes etc...). Potential users should be able to view, favourite and upload items as well as make collections and view ones created by other users.

The frontend of this project will be built using React. For the backend, it will use ASP.NET to handle server-side functionality. User accounts and item lists will be stored in a PostgreSQL or SQLite database.

## Project

Your project for the next 3 weeks will be to develop a .NET backend connected to a database and linked to a React frontend. This week you should start by building the backend and testing it with Swagger (.NET equivalent to Postman). Tests should cover the creation users and endpoints related to user content.

## Spike

Like the last project you will benefit by building a scheme for your database before you start. Hopefully with what you learned from last projects you are ready to think about how things will connect and consider what sorts of endpoints you will want. Finally, think about what you have done for stretch goals on previous projects and see if you can come up with a different sort of goal this time. For example if you've been stretching yourself by adding technical complexity try focusing on design or UX/UI instead.

### Questions to consider

1. What endpoints will you need for your app?
2. What sort of classes will you need to match your data and how will these be represented in OOP (object orientated programming)?


### Useful resources

- [Simple demo of react and .NET project](https://www.c-sharpcorner.com/article/a-react-front-end-with-a-net-web-api-back-end-application/)
- [Demo of a more complicated backend with a database](https://www.c-sharpcorner.com/article/building-a-powerful-asp-net-core-web-api-with-postgresql/)


### User stories

As a **user**, I want to:

- Login to an individual account
- See my collections of items and favourites
- Search and look at other users collections
- View individual items details
- Save items or collections from other users
- Upload and add items

### Stretch user stories

- Follow other users
- Make sure users can only edit their own collections and items
- Stop duplicate items being uploaded
- Suggest collections based on favourites

## Repository naming convention
Please name your repo following this template:
PRO05_Name1_Name2_Name3_Name4

## Acceptance criteria

- [ ] Backend is in a mostly completed state and attached to a rough draft front end
- [ ] Database persists user data
- [ ] Users can create collections and add their own or others items to them
- [ ] Users can search and filter collections, users and items
- [ ] Users can log in/out and have that data persist 


### Stretch
- [ ] Begin testing (it'll be different in .NET)