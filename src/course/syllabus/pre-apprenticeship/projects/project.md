You'll be working on a solo project in your free time for the last 3 weeks. We expect you to focus primarily on employment—answering questions and completing take-home challenges. Any additional time you have left can be spent on your project.

These projects are designed to help you revise the fundamentals you have learnt during the first 9 weeks of the course. We recommend you pick one that involves something you are uncomfortable with. For example if you struggled using fetch and promises then pick a project that will force you to practice that.

## Technical requirements

- Configure dev tooling:
  - [ ] Prettier formatting
  - [ ] ESLint linting
  - [ ] Live-reloading local dev server
- Publish code to GitHub
- Deploy app to GitHub Pages

## Project options

1. ### Pomodoro timer

   A "[Pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique)" is a productivity tool that helps you time alternating periods of working and resting.

   <figure>
      <video style="aspect-ratio: 1440 / 808;" width="1440" height="808" src="/assets/videos/pomodoro.mp4" autoplay muted controls loop type="video/mp4"></video>
      <figcaption>An example of a Pomodoro timer</figcaption>
   </figure>

   #### Features

   - A "work" timer that counts down to zero (usually 25 minutes).
   - A second "break" timer that counts down to zero (usually 5 minutes).
   - Buttons to start a session, pause the timer, or cancel the session and restart.

   #### Stretch goals

   - Customisable lengths of time for work/break.
   - Save custom lengths to localStorage.
   - Play an alarm sound to make it obvious the time is up.

   #### Learning outcomes

   - [ ] Timers in JavaScript.
   - [ ] Coordinating event handlers.
   - [ ] Managing ongoing state.

1. ### Canvas painting

   A painting app using the HTML5 Canvas API to render "brush" strokes. You can see a simple example in [this video](https://www.youtube.com/watch?v=8ZGAzJ0drl0&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=10).

   #### Features

   - Draw coloured lines on a canvas when the user clicks and drags (or swipes if you want to support mobile).

   #### Stretch goals

   - Customise drawing settings: line width, line colour, line shape.
   - Download drawings as images.

   #### Learning outcomes

   - [ ] JS Canvas API
   - [ ] Drag/swipe event handlers

1. ### GitHub profile analyser

   Search for a GitHub username to see information about their profile. Figure out what interesting data you can pull out of a profile using the [GitHub API docs](https://docs.github.com/en/rest/).

   #### Features

   - Show their starred projects.
   - Show their [recent activity](https://docs.github.com/en/rest/reference/activity#events).
   - Figure out what their most popular repositories are.

   #### Stretch goals

   - Who have they collaborated with the most?
   - Visualise the data with a library like [D3.js](https://d3js.org) or [Chart.js](https://www.chartjs.org)

   #### Learning outcomes

   - [ ] Managing complex `fetch` requests/multiple promises
   - [ ] Efficiently processing large amounts of data

1. ### Snake game

   Recreate the classic mobile game [Snake](<https://en.wikipedia.org/wiki/Snake_(video_game_genre)>).

   <figure>
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Snake_can_be_completed.gif" style="aspect-ratio: 1;" width="299" height="299" src="/assets/videos/pomodoro.mp4" loading="lazy">
      <figcaption>An example of a Snake game</figcaption>
    </figure>

   #### Features

   - Control a snake using the keyboard.
   - Game ends if snake touches itself.
   - Touching "food" makes snake grow longer/score go up.

   #### Stretch goals

   - Save scores in localStorage to show best attempts.
   - Speed game up as score gets higher.

   #### Learning outcomes

   - [ ] Keyboard event handlers
   - [ ] Managing complex game state
   - [ ] Collision detection
