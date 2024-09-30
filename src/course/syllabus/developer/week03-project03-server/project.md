# The Amazin' Quizzer API Backend

## Project Overview

Your project is to build the backend for a dynamic web application that combines a quiz generator with data from multiple external APIs. This backend will serve as the foundation for a future full-stack application, showcasing your skills in server-side development, API integration, and data manipulation.

## Core Requirements

1. **TypeScript Implementation:**:
   - The entire backend project must be written in TypeScript.
   - Utilize TypeScript's static typing for all modules, functions, and API interfaces.
   - Configure the TypeScript compiler (tsconfig.json) for the project's specific needs.

2. **Server-Side Setup**:
   - Initialize a Node.js project using Express.
   - Implement a RESTful API for quiz-related operations and external API interactions.

3. **JSON Endpoints**:
   - Create endpoints that fetch data from at least two external APIs and return it in JSON format.
   - Implement endpoints for quiz-related operations (e.g., get questions, submit answers, retrieve results).

4. **Quiz Functionality**:
   - Develop server-side logic to:
     - Generate quizzes with randomly selected questions based on a chosen subject area.
     - Process quiz answers and calculate results, including areas of strength and weakness.

5. **Data Management**:
   - Use a JSON object in a separate file as a mock database to store quiz questions.
   - Implement CRUD operations for managing quiz questions in this mock database.

6. **External API Integration**:
   - Integrate at least two external APIs to enhance the quiz experience or provide additional information related to quiz topics.
   - Implement proper error handling for failed API requests or unavailable data.

## Stretch Goals

- Implement more complex quiz generation algorithms (e.g., adaptive difficulty).
- Add a favourite count feature for questions and allow filtering by this criterion.
- Develop more sophisticated results analysis.
- Implement caching mechanisms for external API calls to improve performance.
- Create comprehensive API documentation using tools like Swagger.

## Project Phases

### Initial Spike Stage
- Set up the basic structure of your Express server.
- Implement a single endpoint that interacts with one external API.

### Core Project Development
- Develop the full set of RESTful endpoints for quiz operations.
- Integrate multiple external APIs.
- Implement the quiz generation and results calculation logic.

## API Suggestions

### Easier APIs
1. Open AI API - https://platform.openai.com/
2. JokeAPI - https://jokeapi.dev/
3. The Dog API - https://thedogapi.com/
4. The Cat API - https://thecatapi.com/
5. Unsplash it - https://unsplash.it/
7. REST Countries API - https://restcountries.com/
8. UK Police API - https://data.police.uk/docs/
9. Postcode Lookup - https://postcodes.io/

### More Challenging APIs
1. Twitter API - https://developer.twitter.com/en/docs/twitter-api
2. Google Maps API - https://developers.google.com/maps
3. Spotify API - https://developer.spotify.com/documentation/web-api/
4. Giphy API - https://developers.giphy.com/docs/api/
5. GitHub API - https://docs.github.com/en/rest
6. The Movie DB API - https://developers.themoviedb.org/3/getting-started/introduction
7. The Guardian API - https://open-platform.theguardian.com/documentation/
8. News API - https://newsapi.org/docs/endpoints
9. TfL API - https://api.tfl.gov.uk/

## Submission Guidelines

- Host your code in a Git repository with clear documentation.
- Deploy your project on GitHub Pages. Feel free to deploy it elsewhere as well if you prefer and have the time.
- Include a comprehensive README.md file detailing:
  - Project setup instructions
  - API endpoints and their usage
  - External APIs used and their purpose in the project
  - Any stretch goals implemented
- Ensure your server is deployable, even though a full deployment isn't required at this stage.

## Additional Considerations

- Design your API with future frontend integration in mind. The frontend part of this project will be added next week.
- Implement proper error handling and validation for incoming requests and external API responses.
- Securely store any API keys or sensitive information required by your server.
- Document your API structure and endpoints thoroughly for future development.

By completing this project, you will demonstrate your ability to create a robust backend application that combines original functionality with external data sources, showcasing your skills in API development, integration, and server-side logic implementation.

## Repository naming convention
Please name your repo following this template:
PRO03_BACK_Name1_Name2_Name3_Name4