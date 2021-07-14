Your project for this week is to continue working on your [digital agency website](../../pre-app-4/project).

One of you will add a way to get in touch if a client is interested in working with you. When the user clicks submit on the form, their request should be added to a visible backlog on the page. The backlog does not need to be preserved when the user refreshes the page.

The other will add an option to add a member to the team. There should be an 'admin password' that must be entered in order to validate that the request to add someone is from a verified member of the team. The profile does not need to be preserved when the user refreshes the page.

Use what you've learnt in this week's DOM workshops to code an efficient and robust solution.

Your requests section should:

- Allow users to leave comments requesting to work with your agency
- Attach a visible user name to each request
- Ask the user to give an email address and validate the email
- Limit the length of requests to 149 characters

Your add a member section should:

- Allow administrators to add new members to the digital team
- Have a name, description and image to represent the team member
- Validate that the request has come from a member of the team
- Limit the length of requests to 149 characters

## User Stories

_**A [user story](https://www.visual-paradigm.com/guide/agile-software-development/what-is-user-story/) is a description of one or more features of a piece of software.**_

### Core Stories

Together, you and your partner should decide who will lead on each user story. You may need to rely on each other for parts of the project. Split the work evenly between you both.

We have estimated each user story to give you a rough idea of how long it might take. We are assuming each developer's velocity for this sprint is 10 story points. Use your velocity from last week to estimate how many points you will complete this week.

For more information and definitions of these terms, see our [project management page](/course/handbook/project-management).

**As a potential client, I want to:**

- Input my name, email address and a description of the job to complete (E1)
- Input a short phrase, listed on the page, to verify I am not a robot (E1)
- Be notified if my email address doesn't look right (E2)
- Be notified if the request I'm writing is too long (E2)
- See my request on the page once I click a button (E3)

**As a member of agency, I want to:**

- Input the name, an image of, and description of the new team member (E1)
- Input an admin password and see if this has been accepted or rejected (E1)
- Be notified if the email address doesn't look right (E2)
- Be notified if the description I'm writing is too long (E2)
- See the new member on the page once I click a button (E3)

**Additionally, as a visually impaired user, I want to:**

- Navigate your website using keyboard controls (E1)
- Hear my screen reader describe the content on your website (E1)

## Acceptance Criteria

_**User stories come with [acceptance criteria](https://blog.easyagile.com/how-to-write-good-user-stories-in-agile-software-development-d4b25356b604?gi=dc603f56ed77) - a detailed scope of a user’s requirements.**_

- Input boxes for name, email and description
- Input box for the admin password
- Visible feedback when inputs are not valid
- A submit button
- A user cannot submit a form without filling out all of the mandatory fields (name, email address, request)
- Information from the form appears on the page after clicking submit
