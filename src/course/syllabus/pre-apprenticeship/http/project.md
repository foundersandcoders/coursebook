Your project this week is to build an app that queries at least _two_ APIs and uses the results to update the DOM. There should be a way for the user to search, filter, sort or otherwise affect what is displayed.

What you choose to build and how you choose to display the data is entirely up to you!

## User Stories

_**A [user story](https://www.visual-paradigm.com/guide/agile-software-development/what-is-user-story/) is a description of one or more features of a piece of software.**_

### Core Stories

**As a user, I want to:**

- See an interesting mashup of different data
- Input information to change the displayed result
- View the app on all of my devices

Since your app will be unique you will need to create your own user stories for more specific features.

### Stretch stories

- As an impatient user, I want to see some indication that data is loading
- As a confused user, I want to be told when something goes wrong

### Acceptance Criteria

- Query at least two APIs using `fetch`
- Dynamic content generated with JS
- A clearly defined user journey, documented in your readme
- A responsive, mobile-first design
- Ensure your app is accessible to as many different users as possible

## Planning

During the planning phase we suggest you spend time on:

- Exploring APIs you are interested in working with
- Considering your user journey
- Deciding what you need to build for your Minimum Viable Product (MVP) and splitting up the tasks

### API keys

Some APIs require a key or token so they can identify who is making a request. This allows them to block people who abuse the API (or charge people if it's not a free service).

Usually you want to avoid including this API key in your client-side code, since anyone can see it using the browser developer tools. However this requires having your own server, which we're learning next week, so for now try to either use APIs that don't require a token, or free APIs so it doesn't matter too much if someone steals your token.

### Choosing your APIs

#### Things to check before you start:

- Does it support CORS (cross-origin requests)?
- Is there a high enough rate limit?
- Is a free API key available?
- Are you able to use the API without user authentication (OAuth)?
- Is good documentation available?

Some APIs are badly documented or almost impossible to use. If you don't manage to get a successful response within 20 minutes of reading their documentation we **strongly** recommend moving on to another one. This week is about practicing `fetch`, not using the coolest API.

#### Recommended APIs

Here's a list of decent APIs to consider. You can choose to use other APIs if you prefer, but make sure to do your research and check that what you want to do with the API is possible before you start to code.

| Name                                                                                  | Info                                                    | API key required?   | Rate limit?             |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------- | ----------------------- |
| [Giphy](https://api.giphy.com/)                                                       | Lots and lots of GIFs                                   | Free for small apps | Yes                     |
| [GitHub](https://developer.github.com/v3/)                                            | Everything publically available on GitHub               | No                  | Yes                     |
| [The Movie DB](https://www.themoviedb.org/documentation/api)                          | Lots of info about all kinds of movies, a bit like IMDB | Yes, it's free      | 40 requests per 10s     |
| [The Guardian](http://open-platform.theguardian.com/)                                 | Access to articles and media back to 1999!              | Yes (free)          | 12 requests per 1s      |
| [Game of Thrones](https://anapioficeandfire.com/)                                     | Data from the universe of Ice and Fire                  | No                  | 20,000 requests per day |
| [Unsplash it](https://unsplash.it/)                                                   | Generates random images                                 | No                  | Not clear               |
| [Recipe Puppy](http://www.recipepuppy.com/about/api/)                                 | Find recipes and ingredients                            | No                  | 1,000 per day           |
| [News API](https://newsapi.org/#documentation)                                        | Get links to articles from international news sources   | Yes                 | No                      |
| [Corporate Buzzword API](https://github.com/sameerkumar18/corporate-bs-generator-api) | Corporate BS generator                                  | No                  | No                      |
| [TFL](https://api-portal.tfl.gov.uk/docs)                                             | Everything you need to know about transport in London   | Optional            | Yes                     |
| [Police API ](https://data.police.uk/docs/)                                           | UK police data on crimes                                | No                  | 15 requests per 1s      |
| [Postcode lookup](https://postcodes.io/)                                              | UK Postcode lookup and autocomplete                     | No                  | No                      |
