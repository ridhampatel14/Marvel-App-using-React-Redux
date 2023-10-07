# React-Redux Marvel API

A Marvel Character collecting application that incorporates Express, Redis, and Redux/Context API. This project allows you to explore Marvel characters, collect them, and manage your collection.

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)

## Project Description

In this assignment, you will create a Marvel Character collecting application using React, Redux/Context API, Express for the server, and Redis for caching Marvel API data.

1. **Express Server**: You will set up an Express server with routes to query the Marvel API. The React application will make Axios calls to these server routes instead of directly calling Marvel API endpoints. The server will check if the requested data is in the Redis cache. If found, it will respond with the cached data; otherwise, it will fetch the data from the Marvel API, store it in the cache, and then respond.

2. **Redux/Context API**: You will use Redux or the Context API (your choice) to manage the collector/Marvel Character states within your React application.

To use the Marvel API, you must sign up for an API key and follow the authorization process mentioned in the [Marvel Developer Documentation](https://developer.marvel.com/documentation/authorization).

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone <repository_url>

2. Install dependencies:

```bash
cd react-redux-marvel-api
npm install

3. Create a .env file and add your Marvel API keys:

MARVEL_PUBLIC_KEY=your_public_key
MARVEL_PRIVATE_KEY=your_private_key

4. Start the server:

npm start

5. Start the React application:

cd client
npm start

6. Access the application at http://localhost:3000.
