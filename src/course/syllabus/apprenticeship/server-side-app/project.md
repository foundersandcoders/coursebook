Your project this week is to build anything you like as long as it meets the technical criteria below. It should still be a Node/Express server-rendered application with a Postgres database, but feel free to get creative with the ideas.

This week is the culmination of your Express learning, so focus on doing everything as professionally as you can. Your app should have validation, error-handling, good user-experience etc.

## Technical spikes

Your project should include one of these four new topics. You'll have to spend some time researching them in your group, figuring out how exactly to implement them before you start working on your project. There are minimal examples provided, but they are only one way to approach it—you should look for tutorials/blog posts etc with alternative solutions and find one you like.

1. ### File uploads
   Allow users to upload files to your server (like images or audio clips).  
   [View file upload example](https://express-file-upload-example.glitch.me) | [View code](https://glitch.com/edit/#!/express-file-upload-example)
1. ### Social login (OAuth)
   Allow users to log in using 3rd party accounts like Google or GitHub.  
   [View GitHub login example](https://express-oauth-example.glitch.me) | [View code](https://glitch.com/edit/#!/express-oauth-example)
1. ### Session flash messages
   Show temporary messages after successful/failed form submissions to help the user understand what's happening. Note that this is a little complex to manage on your own: you may want to use session middleware from npm.  
   [View flash message example](https://express-flash-message-example.glitch.me) | [View code](https://glitch.com/edit/#!/express-flash-message-example)
1. ### Sending emails
   Send emails from your server for notifying the user. E.g. sign up success, to verify email addresses or reset passwords.  
   **Important:** since spam is a huge problem with email all email-sending services (like Mailgun or Sendgrid) require a credit card/your real address. Bear this in mind before you choose this option!

## Technical criteria

- Express server
- Postgres database
- Hosted on Heroku
- One of the above spike topics
- Handle errors and inform the user
