# Debugging

One of the most important programming skills to develop is how to figure out what went wrong with your code.

It can be frustrating to write a bunch of code and immediately get a big error, so here's some advice to bear in mind.

## You're not a bad developer

The most important thing is to remember that getting stuck doesn't say anything about you or your skill as a developer.

It's easy for your first reaction to be "I suck at this, no one else has these problems". _Everyone_ makes typos, forgets how things work or gets inscrutable errors in their terminal. The mark of a more experienced developer isn't avoiding errors entirely, it's reacting to them constructively.

## Understanding the problem

Make sure you stop and understand exactly what went wrong before you start trying to fix it. Otherwise you might go down an entirely wrong path, which will make it harder to figure out what the real original problem was later.

### Read the question

What were you actually trying to do? Do you have a good idea in your head of what the code you wrote _should_ do? If you're working on a specific project feature or workshop problem make sure you've read it properly and understood the edge-cases. If you're following some documentation make sure you've re-read exactly how it works.

E.g. What arguments does this function take? What type of thing does it return? Is it asynchronous?

### Read the error

It can be overwhelming to have 50 lines of error message dumped into the console. It's important to stay calm, take a deep breath and read what it says. Error messages are _usually_ quite useful, as long as you know where to look (hint: start at the top).

Try to figure out _where_ the error is coming from. Sometimes there will be unrelated logs you need to ignore from tools like npm. Find the part that looks like the real error message (this gets easier with practice).

JavaScript errors generally consist of an [error type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors), an error message, then a stack trace. Let's look at an example error and break it down:

```
Uncaught TypeError: arr.join is not a function
    at arrayToString (index.html:11)
    at run (index.html:14)
```

The first part tells us that our code encountered a "type error". This means we tried to use a value in an impossible way. E.g. accessing a property on `undefined` instead of an object.

The second part tells us we tried to call the `.join()` method of a variable named `arr`, but it was not a function (and so could not be called). Since `.join()` is a built-in method (and therefore all arrays will have it) this probably means `arr` is not actually an array.

Finally the stack trace shows us all the function calls that led up to the error. Here we can see the error occurred in a function named `arrayToString`, within a function named `run`. The `index.html:11` tells us the error occurred on line 11 in the `index.html` file. Most browsers allow you to click this to jump straight there.

### Google the error

If you can't figure out what's wrong from the error message/looking at your code your next step should be to search for the _exact error text_ on Google. You can put a search term in quotation marks to force Google to show you exact matches.

Learning to craft searches that return the most useful results is one of the most important skills to grow. As well as searching for the exact error message you can try including keywords for more context, like "JS", "npm", "React" etc. You can also limit your search to specific sites by adding their domain, e.g. "site:github.com".

Ideally this will return GitHub issues on the repo for the library you're using, or Stack Overflow questions from people who had the exact same problem. Try to prioritise recent stuff, since the JS ecosystem moves very fast. Usually a 2 year old issue won't be relevant anymore.

## Fixing the problem

Once you understand what's wrong you need to fix your code. If you found an easy solution to your problem this might be simple, but sometimes it will require experimentation.

### Change one thing

The biggest mistake beginners make when trying to fix a problem is changing multiple things at once. As with scientific experiments you should only ever change one thing at a time. This ensures that you know exactly what change was the right one.

This is a common issue when debugging CSS—you keep piling rules on until the page looks how you wanted, but you actually only needed one of the five you added. You'll probably have the 4 unnecessary rules in your code forever.

### Track attempted solutions

If you end up working on a more complex problem for some time it's worth keeping track of things you tried that didn't work. This will be helpful if you have to hand it off to another developer in your team, or ask someone else for help. It's frustrating for both you and them if they end up doing something you already tried.

### Ask for help

If you're totally stuck and can't find anyone else with the same problem online it's time to ask for help. The best person to ask is a team member, since they have all the context required for working within your codebase.

If you have access to a more experienced mentor that can be very helpful. There are whole classes of problem that are trivial once you've seen them a couple of times but almost impossible the first time you see them.

Finally you can try asking online. Stack Overflow can be quite hostile to new posters (they have pretty strict guidelines you're supposed to follow), but you will probably find someone who can fix your problem. If your issue is with a third party library you could ask on GitHub or (for bigger libraries) their online community (usually Slack or Discord).
