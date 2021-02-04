# Pair programming

## Learning Outcomes

- Learn a variety of techniques for how to pair programme
- Feel more comfortable with pairing
- Understand the benefits of pairing

## Task

1. Find a partner and work from one computer together (close the other laptop)
2. Choose a 8kyu kata on codewars, preferably one that neither of you have completed before
3. Read through the [different pair programming methods](#methods) & choose one that you want to try
4. Attempt the kata, using this pair programming method.
   - Pair for up to 30 minutes
   - Swap roles after 15 minutes
   - If in doubt, follow the coding questions [crib sheet](#coding-questions-crib-sheet)

Don't worry if you don't finish the kata. The aim is to learn the process. 15 minutes before the end, we will come together and discuss which method you chose and how you found it.

## Methods

**Ping pong.** _This is the preferred pairing method in FAC, but we advise you wait until after testing week (week 2) before trying it out._ One student starts by creating a single failing test and then each student takes it in turns to first write code to make the test pass and then to write a new failing test before passing the keyboard back to their partner.

**The driving test.** One student sits at the computer and the other student acts as examiner. the student being examined should explain their thinking as they work. Whenever the examiner thinks the other student is being too quiet or does not understand something, she can ask for more information, but otherwise should offer no advice nor provide any feedback.

**The back-seat driver.** This is similar to the driving test, but in this case the examiner sits at the keyboard and follows the instructions of the other student. Again, the examiner should provide no advice, but can request clarification or an explanation of why she is being asked to do something.

**The driving instructor.** In this case, the person not at the keyboard should lead a discussion about the code through a series of questions. If desired, she can use the coding questions crib sheet for assistance.

## Coding questions crib sheet

### Functions

- When defining a new function, are we using sensible names?
- Is it obvious at first glance what the procedure is for?
- What are the inputs for the function?
- And are these inputs reflected in the arguments?
- What do you expect the function return value to be?

### Variables

- Are you using sensible names for all your variables?
- Is it obvious at first glance what each of them is being used for?
- As you work through the problem, are you working from the outside in or are you trying to solve the problem in a linear sequence from top to bottom? (try working from the outside in, always thinking about the inputs and outputs of the code block you are working on)

### Tests

- What's a sensible first test for a function?
- Is this the simplest possible test that you can think of?
- As you work through the problem, are all your passing tests still passing? If not, why not?
- Are you adding tests as you go?
- What test are you going to add next?
