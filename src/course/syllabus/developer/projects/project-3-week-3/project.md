## Project
Your task this week is to deploy and test the library app you have completed in the previous two weeks.

## Spike
Before you start you need to create a testing and deployment plan. We would like you to plan a testing strategy that will have broad coverage of your project. The tools we would like you to use to achieve this can include Cypress, Postman and the Node built in testing library.

We would also like you to deploy this project using an EC2 instance for you server and a S3 bucket to serve your static files using CloudFront. You should also utilise Github actions to allow you to automatically deploy changes on merges to your main branch.

### Questions to consider
- What parts of the application logic are the most critical to cover with unit tests?
- How will you mock external dependencies (like databases or APIs) during unit testing?
- What are the key user journeys and flows within the application that must be covered by end-to-end tests?
- Where will the code that represents your infrastructure live and how will it be organised?
- How will you manage configuration variables for different environments (development, staging, production)?
- What are the different AWS products you will need to configure to make your deployment successful?

## Acceptance Criteria
- [ ] Comprehensive Test coverage including unit, integration and end-to-end tests covering critical application logic and user flows.
- [ ] Successful deployment on AWS.
- [ ] Documentation clearly outlines setup, deployment, and usage instructions, including API endpoints and environmental requirements.

### Stretch
- [ ]  GitHub Actions CI setup to automatically re-deploy when you push to main.

