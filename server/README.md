# Meeting Booking System - Backend
## Description
This repository hosts the backend component of a meeting booking system designed as a proof-of-concept (PoC). Built using NestJS and Redis, the system supports comprehensive CRUD operations for managing meeting bookings and includes a notification system to alert participants before a meeting begins.

## Prerequisites
- **Node.js**: Ensure you have Node.js installed. If not, you can download it from [here](https://nodejs.org/en).
- **Redis**: Needed for the notification system. Download and install Redis from [here](https://redis.io/download/).
- **MongoDB**: Required for local database operations. Install MongoDB from [here](https://www.mongodb.com/try/download/community).

## Installation

```bash
$ npm install
```
## Setting Up Environment Variables
- **Copy .env.example**: Duplicate the .env.example file in the root of your project.
- **Rename the File**: Remove the .example extension from the duplicated file so that it becomes .env.
- **Add Your Values**: Open the .env file in a text editor and fill in the required values for your MongoDB connection string and JWT token.
- **Save the File**: Save the .env file with your changes.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Design Choices and Future Considerations

- **NestJS**: A complete framework that provides a clear and defined structure for developing applications. It follows an MVC-like architecture, making it easier to organize code and separate concerns. NestJS is built on top of Node.js, which is known for its performance and scalability.
- **MongoDB**: A NoSQL database that offers a flexible schema, scalability, and performance. MongoDB's document-based structure and rich query language make it easy to work with data.
- **Mongoose**: A schema-based solution for modeling application data. Mongoose provides schema validation, middleware, query builders, population, and plugins.
- **Bull.js**: A powerful job queue library for Node.js. It provides a robust job queue, reliability, scalability, monitoring, and UI. Bull.js integrates seamlessly with NestJS, allowing for easy creation and management of job queues.

