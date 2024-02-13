You are going to integrate testing into your Discord chatBot project.

The following user stories are designed to guide you as you integrate testing into your Discord chatBot project. If there are some which are not appropriate to your project, you do not have to integrate these. You can create your own tests that are relevant to your project.

### Core user stories:
As a back-end developer, I want to...

- verify Discord.js integration by creating a test function that creates a new Discord client

- ensure that the OpenAI library is correctly integrated by creating a test function that attempts to use the OpenAI API to create a simple chat completion or query 

- test that my bot securely loads API keys from the .env file, confirming that no sensitive information is hard-coded

- ensure that my bot initialises and logs into Discord successfully

- simulate receiving a message and verify that my bot responds with a "hello" message, testing the message event listener's functionality

- simulate commands directed at my bot to check if it accurately processes these commands from general messages

- introduce faults or exceptions in bot interactions to verify that my bot's error handling mechanisms effectively manage and log errors

- mock the process of sending responses back to the Discord channel, verifying that my bot formats and dispatches messages correctly

- ensure my bot can send direct messages to users, testing the user.send() method's functionality

- test my bot's ability to send multimedia responses under specified conditions, ensuring it can handle images, GIFs, and audio clips effectively