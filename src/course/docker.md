# Docker

Learn how to use Docker to build applications in containers, then deploy them to AWS.

## Installation

1. Install [Docker](https://docs.docker.com/get-docker/)
1. Install [AWS CLI](https://aws.amazon.com/cli/)

## Intro talk

[A talk on the history of deploying web apps](https://fac-slides.netlify.app/slides/deployment/#0), and how Docker and AWS fit in.

## Learn Docker

Work through Docker's [introductory Node.js tutorial](https://docs.docker.com/language/nodejs/).

This covers Docker basics, integrating a database, configuring tests, running in GitHub Actions.

## Deploy to AWS

Follow the [AWS ECS deployment guide](https://docs.docker.com/cloud/ecs-integration/) to deploy your example app.

## Project

Create an app with 3 separate containers: a client (e.g. React), a backend API (e.g. Express), and a database (e.g. Postgres).

If you're feeling confident about Docker then feel free to pick interesting technologies. If you want to focus on the core learning then stick to stuff you already know (like React).

The client should send requests to the API (e.g. with `fetch`) and the API should send requests to the database.

Try to come up with something fun—there are no constraints on the app other than using the above 3 services.

Deploy this application to AWS ECS.

## Help each other

You don't have mentors to ask for help, so try to help each other. Use your Discord channels to stay in touch and solve problems.
