# **1. You are going to create a chatbot that you will deploy in a Discord channel**

[Discord Preparations](https://discordjs.guide/preparations/)

### Core user stories:

1. **Project Setup with Libraries**: As a back-end developer, I want to set up a new Node.js project in VS Code with the **`discord.js`** and **`openai`** libraries using **`require('discord.js')`** and **`require('openai')`** after installing them with **`npm`**, so I can start building my bot with all necessary functionalities.
2. **Secure Configuration**: As a back-end developer, I want to configure my bot securely by using **`require('dotenv/config')`** to load my API keys from a **`.env`** file, ensuring they are not hard-coded into my project, using a **`.gitignore`** file.
3. **Bot Initialisation**: As a back-end developer, I want to initialise my Discord bot and log in to Discord using the **`new Discord.Client()`** constructor and **`client.login`** method with my Discord token, to start listening for messages.
4. **Message Handling**: As a back-end developer, I want to handle incoming messages by setting up a message event listener using **`client.on('messageCreate', callback)`** to process messages received in Discord and respond to them with a “hello” message.
5. **Optimisation**:  As a developer, I want the bot to optimise its performance by efficiently handling events, so that it does not consume excessive resources. This may involve writing efficient callback functions for **`client.on`** and **`client.once`**, ensuring they execute tasks quickly and without unnecessary resource consumption.
6. **OpenAI Chat Integration and Response Generation**: As a back-end developer, I want to integrate OpenAI into my bot and send chat prompts to the API to generate responses. This would involve using the **`openai.chat.completions.create()`** method with my OpenAI API key. I aim to pass conversation history and other necessary parameters to this method to receive context-aware chat completions. This will enable the bot to generate dynamic, intelligent responses based on ongoing conversations, enhancing user interaction and experience.
7. **Response Management**: As a back-end developer, I want to manage the OpenAI response returned by **`openai.chat.completions.create()`** using either **`fetch`** or **`async/await`** and sending the response back to the Discord channel.
8. **Command Processing**: As a back-end developer, I want to process commands directed at my bot by using string matching or a command prefix to distinguish between general messages and commands meant for the bot.
9. **Error Handling**: As a back-end developer, I want to implement error handling in my bot interactions using either **`.catch`** or  **`try...catch`** within my **`fetch`** or **** **`async`** functions to manage exceptions and provide error messages if something goes wrong.

### Stretch user stories:

1. **Messaging Users Directly**:
    
    **Hint**: Utilise the **`user.send()`** method in Discord.js to send direct messages to users. Retrieve the user object through events or commands that the bot receives.
    
2. **Dialogue Boxes and Interactive Responses**:
    
    **Hint**: Implement Discord's message components like buttons and select menus using **`MessageActionRow`** and **`MessageButton`** or **`MessageSelectMenu`** classes from Discord.js. Handle interactions with **`client.on(Events.InteractionCreate, callback)`**.
    
3. **Creating Private Chats (Channels)**:
    
    **Hint**: Use **`guild.channels.create()`** to create new private channels and manage access using permission overwrites in Discord.js.
    
4. **Automated Moderation Features**:
    
    **Hint**: Monitor messages for specific keywords or patterns using **`client.on(Events.MessageCreate, callback)`**. Implement moderation actions like **`message.delete()`** for removing inappropriate content and **`guildMember.timeout()`** for muting users.
    
5. **Multimedia Responses (Images, GIFs, Audio Clips)**:
    
    **Hint**: Send multimedia content using **`message.channel.send()`** with the **`files`** option. For audio, explore Discord.js voice modules for handling voice channels and streaming.


# **2. You are going to integrate testing into your Discord chatBot project.**

The following user stories are designed to guide you as you integrate testing into your Discord chatBot project. If there are some which are not appropriate to your project, you do not have to integrate these. You can create your own tests that are relevant to your project.

### Possible user stories:
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

## Repository naming convention
Please name your repo following this template:
PRO02_Name1_Name2_Name3_Name4