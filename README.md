# Assignment: Frontend Development (Session 4)

This repository was created as part of assignments from the Frontend Module of the PowerX Programme and has two parts: App and accompanying Styleguide (Built with `react-styleguidist`)


## Live Links (Deployed on Netlify)
👉 [App] https://grumbeard-powerx-frontend-session-4.netlify.app
👉 [Style Guide] https://grumbeard-powerx-frontend-session-4-styleguide.netlify.app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Installation
To see it on LocalHost, run

### `npm install` and `npm start`

To see the styleguide on LocalHost, run

### `npm start:styleguide`


## Objectives
A couple of techniques were put into practice with this assignment
- Enforcing Authorization policies (logged in users can only delete their own comments while able to view all comments)
- React Query's `useQuery` and `useMutation` to manage caching of fetched data (including cache invalidation)
- Form validation and error handling (with `formik` and `yup`)
- Testing components with `@testing-library/react`

**Requirements**
- [X] Login page at path /login
- [X] Register page at path /register
- [X] Home page:
  - shows list of movies
  - has a 'Next' and 'Prev' button to show more movies
- [X] Movie details page at path /movie/<movieId>
- [X] Movie details page:
  - shows details and comments for movie
  - logged in users can add comments for movie
  - comment form should be validated
  - movie comment can be deleted by user that created it
- [X] Testing: minimum of 3 tests
- [X] Deployment: Netlify


## Extra Features
1. User is automatically logged in on successful account registration

2. UID is displayed at top of screen for debugging purposes (not a feature?)


## Main Learnings
- What useQuery is for and how to use it
- Using `{ keepPreviousData : true }` for smoother transition between stale and new data ('Loading' text no longer seen)
- Using `Redirect` from `react-router` to redirect users after successful login
- Testing React components (especially form components)
  - Mocking user interaction with `fireEvent` from `@testing-library/react`
  - Testing for observable changes due to async handlers (e.g. form submission involving API calls)