Your task this week is to deploy and test the quiz app you have completed in the previous two weeks.

## Description

Before you start you need to create a testing and deployment plan. We would like you plan a testing strategy that will have broad coverage of your project. The tools we would like you to use to achieve this can include Cypress, Postman and the Node built in testing library. 

We would like you to deploy both the backend and frontend of your project. Before choosing a deployment platform, consider whether your application is static or dynamic, as this will influence your choice. Here are some options to consider:

- AWS EC2 Instance
- AWS Lambda (for serverless applications)
- Heroku (easy deployment for various application types)
- GitHub Pages
- AWS S3 Bucket (suitable for static websites)
- Vercel
- Netlify
- Firebase Hosting (suitable for static and dynamic sites)
- ...

Research these options and choose the ones that best fit your project's needs, considering factors like scalability, ease of use, and cost. Remember, the goal is to understand the deployment process and the considerations involved in choosing a hosting solution.

### Questions to consider

- What parts of the application logic are the most critical to cover with unit tests?
- How will you mock external dependencies (like databases or APIs) during unit testing?
- What are the key user journeys and flows within the application that must be covered by end-to-end tests?
- How will you manage test data and state for end-to-end testing?
- How will encrypted communication (HTTPS) be set up, and will you use a reverse proxy?
- How will you manage configuration variables for different environments (development, staging, production)?
- How will CORS policies be configured between the frontend on GitHub Pages and the backend on EC2?


### Acceptance Criteria

- [ ] Comprehensive Test coverage including unit, integration and end-to-end tests covering critical application logic and user flows.
- [ ] Successful deployment of backend and frontend.
- [ ] Documentation clearly outlines setup, deployment, and usage instructions, including API endpoints and environmental requirements.

### Stretch criteria

- [ ] GitHub Actions CI setup to run your tests when you push.
- [ ] Configure HTTPS for secure communication between the frontend and backend, using a tool like Let's Encrypt to obtain and manage SSL/TLS certificates.
