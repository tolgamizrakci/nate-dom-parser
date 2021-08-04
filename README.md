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

## Thoughts on Distributed System Design & Improvements

![alt text](https://github.com/tolgamizrakci/nate-dom-parser/blob/main/sd.jpeg)

1. URL frontier: To store the list of URLs to download and also prioritize which URLs should be crawled first.
2. HTML Fetcher: To retrieve a web page from the server.
3. Extractor: To extract links from HTML documents.
4. Duplicate Eliminator: To make sure the same content is not extracted twice unintentionally.
5. Datastore: To store retrieved pages, URLs, and other metadata.

We can assume our crawler is running on one server and all the crawling is done by multiple working threads where each working thread performs all the steps needed to download and process a document in a loop. For this, Java may be more appropriate server side choice.

The first step of this loop is to remove an absolute URL from the shared URL frontier for downloading. An absolute URL begins with a scheme (e.g., “HTTP”) which identifies the network protocol that should be used to download it. We can implement these protocols in a modular way for extensibility, so that later if our crawler needs to support more protocols, it can be easily done. Based on the URL’s scheme, the worker calls the appropriate protocol module to download the document. After downloading, the document is placed into a Document Input Stream (DIS). Putting documents into DIS will enable other modules to re-read the document multiple times.


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

