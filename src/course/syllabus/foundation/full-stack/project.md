Your project is to build a dynamic web application that queries at least two APIs and presents useful and/or interesting information to the user. You will be using Node.js and Express, which will involve serving a static web page, creating JSON endpoints, and generating dynamic content through both server-side and client-side code.

## **Project Requirements**

### **Core Requirements**

1. **Server-Side Setup**:
    - Initialise a Node.js project using Express.
    - Serve a static web page that will be the front end of your application.
2. **Static Web Page**:
    - Create an **`index.html`** file within a public directory.
    - This page should include placeholders where dynamic content will be displayed.
3. **Creating JSON Endpoints**:
    - Implement routes in your Express server that respond to GET requests.
    - These routes will fetch data from external APIs and return it in JSON format.
4. **Dynamic Content**:
    - Write client-side JavaScript that makes requests to your server-side endpoints.
    - Dynamically update the static web page with the data received from these requests.
5. **Client-Server Interaction**:
    - Ensure that the server acts as an intermediary for API requests, handling data fetching and processing.
    - The client-side script should handle the presentation of data, updating the user interface based on server responses.

### Example structure

[API mash-up application structure example](https://foundersandcoders.notion.site/API-mash-up-application-structure-example-88b132ed805a4071859552cd6bc25399?pvs=4)

### **Stretch Goals**

- Implement error handling in both server-side and client-side code to manage failed API requests or unavailable data.
- Implement tests
- Enhance the user interface with CSS and interactive elements for a better user experience.
- Introduce additional client-side interactivity, such as user inputs to filter or customise the data displayed.

### **Additional Considerations**

- Ensure your application's design is responsive and accessible.
- Document the user journey and your application's functionality in a README file.
- Securely store any API keys or sensitive information required by your server.

### **Submission Guidelines**

- Host your code in a Git repository with clear documentation.
- Deploy your application to a cloud platform, ensuring it's publicly accessible.

## **Project Phases**

### Initial spike stage

<aside>
Set up the basic structure of your web application and make a call to a single API.

</aside>

### Core project development

<aside>
 After establishing the basic web app framework, you'll enhance the application by integrating more complex functionalities, including multiple API calls and/or incorporating OpenAI's API.

</aside>

### Some API examples


### **Easier**

1. **Open AI API** - https://platform.openai.com/
2. **JokeAPI** - https://jokeapi.dev/
3. **The Dog API** - https://thedogapi.com/
4. **The Cat API** - https://thecatapi.com/
5. **Unsplash it** - https://unsplash.it/
6. **Corporate Buzzword API** - https://corporatebs-generator.sameerkumar.website/
7. **REST Countries API** - https://restcountries.com/
8. **UK Police API** - https://data.police.uk/docs/
9. **Postcode Lookup** - https://postcodes.io/

### Harder

1. **Twitter API** - https://developer.twitter.com/en/docs/twitter-api
2. **Google Maps API** - https://developers.google.com/maps
3. **Spotify API** - https://developer.spotify.com/documentation/web-api/
4. **Giphy API** - https://developers.giphy.com/docs/api/
5. **GitHub API** - https://docs.github.com/en/rest
6. **The Movie DB API** - https://developers.themoviedb.org/3/getting-started/introduction
7. **The Guardian API** - https://open-platform.theguardian.com/documentation/
8. **News API** - https://newsapi.org/docs/endpoints
9. **TfL API** - https://api.tfl.gov.uk/

### **Non-AI API Mash-Up Project Ideas**

1. **Random UK Postcode Explorer**: Develop an application that jumps to a random UK postcode and collates various information about that location. Use the Postcodes.io API to generate a random postcode and then fetch data such as weather from the OpenWeatherMap API, local crime statistics from the UK Police API, and perhaps even demographic information if available. This app could serve as an interesting way to explore different parts of the UK, offering insights into the climate, safety, and other aspects of various locales.
1. **Entertainment and Social Media Buzz Tracker**: Use The Movie DB API and Twitter API to track social media buzz around movies. Develop a platform where users can see real-time tweets about movies, gauge popularity, and view movie details like ratings, casts, and synopses. This could serve as a guide for movie enthusiasts to discover trending movies.

### **AI-Enhanced Mash-Up Project Ideas with APIs and OpenAI**

1. **AI-Assisted Weather and News App**: Combine OpenWeatherMap API and NewsAPI. Optionally integrate OpenAI's API to summarize news articles or generate insights based on the current weather data, like suggesting indoor activities on rainy days or outdoor events when it's sunny.
1. **AI-Powered Social Media and Movie Insights**: Use the Twitter API and The Movie DB. Optionally enhance with OpenAI's API to analyze tweets for sentiment about movies, offering insights into which movies are most loved or creating thematic summaries of social media discussions.
1. **Intelligent Mapping and Transport Planner**: Merge Google Maps API with TfL API and optionally enhance with OpenAI's capabilities. The AI could predict traffic patterns, suggest optimal routes, or offer travel recommendations based on historical and real-time data.
1. **AI-Enhanced Recipe and Shopping Assistant**: Combine Recipe Puppy with a supermarket API. Optionally use OpenAI's API to suggest recipes based on user preferences or trends and generate optimized shopping lists considering dietary needs and ingredient availability.
1. **Community Safety App with AI Analysis**: Mashup the UK Police API with Postcodes.io, and optionally enhance with OpenAI's API for crime data analysis. The AI could identify safety trends, provide tailored alerts, or offer insights into community safety based on crime statistics and location data.