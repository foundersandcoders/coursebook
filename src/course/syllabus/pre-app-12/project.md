Your project this week is to build a to-do list tracker. It should allow users to create, complete and delete tasks from a list.

You should have automated tests covering all the main user stories. Each story below has a test "shell". You have to fill out the body to create a failing test for each story. You should then see the tests pass as you add features to your app.

Writing tests _before_ code can be difficult. It means you have to plan in advance roughly what your implementation will look like. E.g. "find the todo input and add some example text" implies that you'll be using a text input in your final design. It's okay if you end up having to change your tests a bit when you implement the feature—you'll get better at predicting this with practice.

{% box %}

**This is the minimum amount of testing required**: you should write additional tests to cover the rest of your code as needed.

{% endbox %}

## User stories

### Core

**As a busy person, I want to:**

- Add tasks to a list so that I can keep track of them
  ```js
  test("Submitting a new task adds it to the list", () => {
    // test goes here
  });
  ```
- Check things off my list so that I can see what I’ve done
  ```js
  test("Checking an entry marks it as complete", () => {
    // test goes here
  });
  ```
- Delete things from the list if I don’t need to do them anymore
  ```js
  test("Deleting an entry removes it from the list", () => {
    // test goes here
  });
  ```

**As a motor-impaired user, I want to:**

- Use all the features of the app without a mouse

### Stretch

**As a busy person, I want to:**

- Filter out completed to-dos from my list so that I can focus on what's left to do
  ```js
  test("Toggling the filter hides completed tasks from the list", () => {
    // test goes here
  });
  ```

### Acceptance Criteria

- A working to-do list
- Tests for (at least) each user story
- A responsive, mobile-first design
- Ensure your app is accessible to as many different users as possible
