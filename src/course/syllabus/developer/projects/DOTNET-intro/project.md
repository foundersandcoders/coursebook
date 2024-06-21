## Intro

Learners will build a library sorting and sharing some sort of information music, photos recipes etc. Users will be able to make personal lists and view items and lists created by other users. Users can upload and favorite items.

The frontend of this project will be built using React. For the backend, it will use ASP.NET to handle server-side functionality. User accounts and item lists will be stored in a postgres  database.

## Project

Your project for the next 3 weeks will be to develop a .NET backend connected to a SQLite database and linked to a React frontend. This week you should start by building the backend and testing it with swagger to see that you can create users with libraries containing lists of items. See if you can create a database and make calls to find lists by usernames or to find or filter lists.

## Spike

Like the last project you will benefit this project by building a scheme for your database before you start. Hopefully with what you learned from last project you are already ready to think about how things will connect. For this week making the backend also be sure to consider what sorts of routes you will want. Finally think about what you have done for stretch goals on previous projects and see if you can come up with a different sort of goal this time ex. if you've been stretching yourself by adding technical complexity try stretching yourself by having a really nice looking site this time.

### Questions to consider

1. Routes will you need.
2. What sort of objects will you need to match these data types and what will these look like in dotnet.


### Useful resources

- [Simple demo of react and .NET project](https://www.c-sharpcorner.com/article/a-react-front-end-with-a-net-web-api-back-end-application/)
- [demo of a more complicated backend with a database](https://www.c-sharpcorner.com/article/building-a-powerful-asp-net-core-web-api-with-postgresql/)


### User stories

As a **peruser**, I want to:

- Login to an individual account
- See my lists of item and favorites
- Search and look at other users lists
- View individual items on lists and see detail
- Save items or lists from other users
- Upload and add item

### Stretch user stories

- Follow other users
- Make sure users can only edit own lists and items
- Stop duplicate items being uploaded
- Suggest lists based on favorites

## Acceptance criteria

- [ ] Backend is in a mostly completed state and attatched to a rough draft front end
- [ ] Database persists user data
- [ ] Users can create lists and add their own or others items to them
- [ ] Users can search and filter lists users and items
- [ ] Users can log in and sessions are created for them


### Stretch
- [ ] Begin testing (it'll be different in .NET)