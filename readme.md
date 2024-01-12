# Node.js CRM System with JWT Authentication

## Overview

The Node.js CRM System with JWT Authentication is a customer relationship management application built with Node.js and Express. It provides features for managing enquiries and allows employees/counselors to claim public enquiries as private. The system incorporates JWT authentication to secure the APIs and manage user sessions, and it utilizes MongoDB as the database.

## Features

- Employee registration and login
- Public enquiry form accessible without authentication
- API for claiming leads
- API for fetching unclaimed leads
- API for fetching leads claimed by logged-in users
- API for logging out

## Technologies Used

- Node.js
- Express
- MongoDB
- JSON Web Token (JWT)
- Cookie Parser
- nodemon
- Dotenv
- Bcrypt

## Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Set up the required environment variables (see the Configuration section)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/your_username/your_repository.git


```

## Install dependencies:

```shell
cd your_repository
npm install

```

## Set up the environment variables:

Create a .env file in the root directory.
Define the following environment variables in the .env file:

```shell

port = 9090
mongoURL = your_mongodb_url
key = your_jwt_secret
saltround = as per your need

```
- Replace your_mongodb_uri with the URI of your MongoDB database, and your_jwt_secret with your preferred secret key for JWT token.


## API Endpoints

#### Deployed Link - https://powerful-sombrero-hen.cyclic.app/
#### Video Link - https://drive.google.com/file/d/10ZqOxpzQAwVSHCBrMKxM37iFn2OmCSTO/view?usp=sharing

### Employee Registration
- POST /register
- Registers a new employee/counselor with the CRM.

Request Body:

```json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

```
### Employee Login

- POST /login
- Logs in an employee/counselor and generates a JWT token for authentication.

Request Body:

```json

{
  "email": "john@example.com",
  "password": "password123"
}

```

### Public Enquiry Form
- POST /enquiries
- Captures a prospective client's enquiry by submitting the enquiry form.

Request Body:

```json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "courseInterest": "Web Development",
  "phone" : 9999999
}

```
### Claim Lead

- POST /enquiries/:enquiryId/claim
- Claims a public lead and assigns it to the logged-in employee.

### Fetch Unclaimed Leads
- GET /enquiries/public
- Fetches all unclaimed public leads.

### Fetch Leads Claimed by User
- GET /enquiries/claimed
- Fetches all leads claimed by the logged-in user.

### Logout
- GET /logout
- Logs out the currently authenticated user by clearing the JWT token cookie.

### Author
- Hassan Khan (@allabovehassan)
