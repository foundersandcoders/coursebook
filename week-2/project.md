## HTTP week project

Your project this week is to build an app that queries at least two APIs and uses the results to update the DOM.

What you choose to build and how you choose to display the data is entirely up to you!

During the planning phase we suggest you spend time on:

- Exploring APIs you are interested in working with
- Considering your user journey
- Deciding what you need to build for your Minimum Viable Product (MVP) and splitting up the tasks

### Requirements

- Your app queries at least two APIs using `fetch`
- Your app features some dynamic content (e.g. generated with JS)
- A clearly defined user journey, documented in your readme
- A responsive, mobile-first design
- Ensure your app is accessible to as many different users as possible
- Try not to push API keys up to GitHub (since anyone can see them there)

### Choosing your APIs

#### Things to check before you start:

- Does it support CORS (cross-origin requests)?
- Is there a high enough rate limit?
- Is a free API key available?
- Are you able to use the API without user authentication (oAuth)?
- Is good documentation available?

#### Recommended APIs

Here's a list of decent APIs to consider. You can choose to use other APIs if you prefer, but make sure to do your research and check that what you want to do with the API is possible before you start to code.

| Name                                                                                               | Info                                                                                                                                                       | API key required?                      | Rate limit?                                                      |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| [Giphy](https://api.giphy.com/)                                                                    | Lots and lots of GIFs                                                                                                                                      | Free, public API key for small apps    | Yes, but it's enough for your projects                           |
| [GitHub](https://developer.github.com/v3/)                                                         | Everything publically available on GitHub neatly presented and well documented!                                                                            | No, but required for higher rate limit | Yes                                                              |
| [The Movie DB](https://www.themoviedb.org/documentation/api)                                       | Lots of info about all kinds of movies, a bit like IMDB                                                                                                    | Yes, it's free                         | 40 requests every 10 seconds                                     |
| [MediaWiki (Wikipedia)](https://www.mediawiki.org/wiki/API:Main_page)                              | Everything on Wikipedia                                                                                                                                    | No                                     | [No](https://www.mediawiki.org/wiki/API:Etiquette#Request_limit) |
| [The Guardian](http://open-platform.theguardian.com/)                                              | Access to articles and media back to 1999!                                                                                                                 | Yes (free)                             | 12 requests per second                                           |
| [Game of Thrones](https://anapioficeandfire.com/)                                                  | Apparently the world's greatest source for data from the universe of Ice and Fire                                                                          | No                                     | 20,000 requests per day                                          |
| [Unsplash it](https://unsplash.it/)                                                                | Generates random images                                                                                                                                    | No                                     | Not clear                                                        |
| [Musixmatch](https://developer.musixmatch.com/documentation)                                       | Get song lyrics!                                                                                                                                           | Yes (free)                             | 2,000 requests per day                                           |
| [Recipe Puppy](http://www.recipepuppy.com/about/api/)                                              | Find recipes and ingredients                                                                                                                               | No                                     | 1,000 per day                                                    |
| [News API](https://newsapi.org/#documentation)                                                     | Get links to news articles from international news sources including BBC, CNN, BuzzFeed                                                                    | Yes                                    | No                                                               |
| [Corporate BS/Buzzword Generator API](https://github.com/sameerkumar18/corporate-bs-generator-api) | Corporate BS generator                                                                                                                                     | No                                     | No                                                               |
| [TFL](https://api-portal.tfl.gov.uk/docs)                                                          | Everything you need to know about transport in London (powers City Mapper etc.) The documentation is quite heavy, but the API allows you to do cool things | Optional, allows for higher rate limit | Yes                                                              |
| [Police API ](https://data.police.uk/docs/)                                                        | UK police data on crimes                                                                                                                                   | No                                     | 15 requests per second with a burst of 30                        |
| [Postcode lookup](https://postcodes.io/)                                                           | UK Postcode lookup and autocomplete                                                                                                                        | No                                     | No                                                               |
