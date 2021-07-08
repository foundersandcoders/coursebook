Your project for this week is to continue working on your [digital agency website](../../pre-app-4/project).

You'll add a way to get in touch if they are interested in working with you. When the user clicks submit on the form, their request should be added to a visible backlog on the page. The backlog does not need to be preserved when the user refreshes the page.

Use what you've learnt in this week's DOM workshops to code an efficient and robust solution.

Your requests section should:

- Allow users to leave comments requesting to work with your agency
- Attach a visible user name to each request
- Ask the user to give an email address and validate the email
- Limit the length of requests to 149 characters

## User Stories

_**A [user story](https://www.visual-paradigm.com/guide/agile-software-development/what-is-user-story/) is a description of one or more features of a piece of software.**_

### Core Stories

Together, you and your partner should decide who will lead on each user story. You may need to rely on each other for parts of the project. Try to split the work evenly between you both.

**As a potential client, I want to:**

- Input my name, email address and a description of the job to complete (E1)
- Be notified if my email address doesn't look right (E2)
- Be notified if the content I'm writing is too long (E2)
- See my request on the page once I click a button (E3)

**Stretch Goals**

- Click a button to delete a request (E2)
- Click a button to mark a request as complete (E2)

**Additionally, as a visually impaired user, I want to:**

- Navigate your website using keyboard controls (E1)
- Hear my screen reader describe the content on your website (E1)

## Acceptance Criteria

_**User stories come with [acceptance criteria](https://blog.easyagile.com/how-to-write-good-user-stories-in-agile-software-development-d4b25356b604?gi=dc603f56ed77) - a detailed scope of a user’s requirements.**_

- Input boxes for name, email and request
- Visible feedback when inputs are not valid
- A submit button
- A user cannot submit a form without filling out all of the mandatory fields (name, email address, request)
- Information from the form appears on the page after clicking submit
