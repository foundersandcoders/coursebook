# Managing software projects

## Scrum(TM)

Scrum is a widely-used software development method, that organises work into sprints. A sprint is a fixed period of development time during which the team will not respond to new change requests.

Two weeks is typical in the industry. During the pre-apprenticeship we will work in one-week sprints. During the full-time programme, each week we are going to do a single two-day sprint. For your final project, you will be doing one-week sprints.

### User stories

A user story is an action that a user wants to perform. Usually, they are written in the form:

_"As a...
I want...
So that..."_

### Estimate

The difficulty level of a user story, expressed in _points_.

_CONTROVERSY ALERT:_ Some people prefer to estimate in _absolute_ time, expressed in hours or half-days, but in order to develop a good sense of _relative_ time, we will estimate our user stories in _points_.

### Estimates

- `E1` - Short story, estimated
- `E2` - Story, estimated
- `E3` - Long story, estimated
- `E5` - Extra long story, estimated

### Actuals

- `A1` - Short story, actual
- `A2` - Story, actual
- `A3` - Long story, actual
- `A5` - Extra long story, actual

### Velocity

The team capacity, expressed in points, for each sprint.

### Backlog

All uncompleted user stories are listed in the project backlog. Each week, during _sprint planning_ the team reprioritises user stories and agrees the next _sprint backlog_. The sprint backlog is then a prioritised backlog of all the user stories that we estimate will be completed in the next sprint.

### Sprint retrospective

At the end of the sprint, the development team will hold a restrospective. On our full-time programme, we run these in the form of a [stop, go, continue](../retrospectives).

### Sprint review

On projects which are longer than one sprint - the team will compare how many story points they actually completed in that sprint with how many they estimated that they'd complete. This informs estimations for the next sprint.

### [Project board](https://help.github.com/en/github/managing-your-work-on-github/about-project-boards)

A _Kanban_ board can be used to track progress on your project. With labels for estimates and assignees for each issue.

The Kanban columns are usually something like:

- `backlog`
- `stretch`
- `todo`
- `doing`
- `done`

### Zero-point issues

Not all issues raised in the project board contribute to the velocity estimate. **Chores**, **bugs**, **refactors** and **spikes** are all zero-point issues, even though they will (seriously) impact your sprint velocity.

- **Chore** Something that needs to be done, not directly related to a user story
- **Bug** Something broken
- **Refactor** An improvement to the code that delivers no change to user experience
- **Spike** Researching a potential solution to a problem by creating the simplest possible implementation of it

_CONTROVERSY ALERT:_ Some people prefer to estimate chores, bugs, refactors and spikes just like user stories, however they might better be thought of as _non-negotiable_ and therefore outside the scope of the sprint planning process.

### Labels

Labels can be added to issues to give a clearer indication of the time estimate, the actual time that was needed, and what part of the project the issue relates to.
