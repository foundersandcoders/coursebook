Your project this week is to build a REST API that returns JSON data. It should have endpoints for creating, reading, updating and deleting whatever resource you choose (tweets, blog posts, pets etc).

## User stories

### Core

- **As an API user, I want to**: get a list of all available resources
- **As an API user, I want to**: get all the information on a specific resource
- **As an API user, I want to**: create a new resource
- **As an API user, I want to**: update an existing resource
- **As an API user, I want to**: delete an existing resource
- **As an API user, I want to**: only be able to change an existing resource if I am authenticated to do so
- **As an API user, I want to**: read the documentation so I can understand what endpoints are available

Since this project is open-ended you'll need to write your own more specific user stories once you know what you want to build.

### Acceptance Criteria

- [ ] An Express server that only returns JSON
- [ ] A Postgres database to store the data
- [ ] Endpoints for creating, reading, updating & deleting resources
- [ ] Token-based authentication so only the owner of a resource can change it
- [ ] Correct headers and response metadata
- [ ] Error-handling to make it easy to use the API to build something
- [ ] Tests for server routes and database access
- [ ] Not process user input as SQL commands
- [ ] Hidden environment variables (i.e. not on GitHub)
- [ ] Documentation that lists endpoints and what each is for

#### Stretch criteria

- [ ] GitHub Actions CI setup to run your tests when you push
