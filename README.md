# Welcome to Nate DOM Parser

## Tech Stack & Rationale

- Node.js / Express server
1. Node enables to quickly develop an MVP.
2. Node is single-threaded and has an event-driven architecture to process multiple concurrent requests efficiently without clogging the RAM. 
3. Node scales vertically and horizontally.
4. Express makes Node.js development fast and easy - easy to configure and customize.
5. Express makes it easy to connect with databases such as MongoDB, Redis, MySQL

- React front-end (CRA)
1. Reusability / components - which are essentially code snippets that reflect part of a user interface that can repeated across different routes. saves time, and creates consistency which allows the developers to focus on more important functions and business logic.
2. Virtual DOM: React abstracts my interaction with DOM and lets me think of state changes throughout the render lifecycle
3. Uni-directional data flow keeps things simple, although it doesn't scale well.

## Distributed System Design & Improvements




## Running app

Inside root directory:
### `npm i & npm start`

Inside /client directory:
### `npm i & npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To run tests for server:
### `npm run test-dev`
or for coverage:
### `npm run test-coverage`

To run tests for client (make sure you're inside the /client directory):
### `npm run test`
or for coverage:
### `npm run test-coverage`

## Docker build & run

Inside root directory:
### `docker build . -t <your username>/nate-dom-parser-server:<version>`

### `docker run -p 3001:3001 -d <your username>/nate-dom-parser-server:<version>`

Inside /client directory:
### `docker build . -t <your username>/nate-dom-parser-client:<version>`

### `docker run -p 8080:3000 -d <your username>/nate-dom-parser-client:<version>`

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

