# The Amazin' Quizzer App

Learners will develop an web application that dynamically generates quizzes for users in a specified subject area. These quizzes will have interfaces both for quiz creation and quiz taking. You can use a AI tool to generate questions or use the ones provided and should use a JSON object in a separate file as a mock database. 

## Spike

Before you start writing features you need to design the schema for your data and RESTful API. Think about what different things your app needs to store and how you will access them using your endpoints. Record your schema and endpoints in your `README.md` to make it easy for other developers to quickly get started using your API. 

### User Stories

As a **quizzer**, I want to:

- Select a subject area for my quiz.
- Begin a quiz session with randomly generated questions.
- View a summary of my quiz results, including areas of strength and weakness.
- Add, edit, and delete quiz questions and answers.
- Generate reports on quiz performance

### Acceptance Criteria

**The API should:**

- [ ] Dynamically generate quizzes with adaptive difficulty.
- [ ] Filter quiz questions by category
- [ ] Return any number of questions by the above criteria
- [ ] Add or delete questions from the 'database'
- [ ] Provide good documentation on the use of the API
- [ ] Have automated tests for backend functionality
- [ ] Be deployed to a EC2 instance on AWS


### Stretch
- [ ] Implement a favourite count on questions and allow filtering by this criteria
