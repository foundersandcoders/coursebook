Your project this week is to build a web app that stores data in a SQLite database.

## Spike

Before you start writing features you need to design the schema for your data. Think about what different things your app needs to store, how they relate to each other, and how you can avoid duplicating information. Record your schema in your `README.md` using Markdown tables. Consider embedding a [diagram](https://dbdiagram.io/) to help visualise the relationships.

### Questions to consider

1. What kinds of data relationships are there?
1. What's a foreign key? How can they help us design schemas with relational data?

### Useful resources

- [Database Relationships](https://www.lifewire.com/database-relationships-p2-1019758)
- [A beginner's guide to many-to-many relationships](https://support.airtable.com/hc/en-us/articles/218734758-A-beginner-s-guide-to-many-to-many-relationships)

## User stories

### Core

- **As a user, I want to**: submit information to your site for anyone to see
- **As a user, I want to**: come back to your site later and see what I posted is still there

Since this project is open-ended you'll need to write your own more specific user stories once you know what you want to build.

### Acceptance Criteria

- [ ] A form for users to submit data
- [ ] A page showing all the data
- [ ] Semantic form elements with correctly associated labels
- [ ] A SQLite database
- [ ] A schema describing your database in your README
- [ ] Tests for server routes and database access
- [ ] Not process user input as SQL commands
- [ ] Hidden environment variables (i.e. not on GitHub)

#### Stretch criteria

- [ ] A way to view filtered/sorted data, instead of just all of it
- [ ] GitHub Actions CI setup to run your tests when you push

## Example project ideas

- Founders & Coders book sharing system
- Food / coffee recommendations around Founders & Coders
- Founders & Coders events calendar
