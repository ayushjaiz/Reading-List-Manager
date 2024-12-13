# RBAC

## The RBAC (Role-Based Access Control) project focuses on managing and enforcing access control in applications by assigning roles to users and associating permissions with those roles. The app uses Postgres as databse with Prisma as ORM. Redis is employed to implement a rate-limiting mechanism to prevent DDoS and bruteforce attack.

## Table of Contents

- [Project Features](#project-features)
- [Tech Stack](#tech-stack)
- [Libraries Used](#libraries-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints and Sample Requests](#api-endpoints-and-sample-requests)
- [Development Choices](#development-choices)
- [Deployment](#deployment)
- [Acknowledgements](#acknowledgements)

---

## Project Features

- **Authentication**: Implement secure user authentication using JWT
- **Access Control**: Enforce role-based restrictions across application endpoints to ensure secure operation.
- **Rate Limiting**: Prevent misuse by limiting request to API endpoint.

---

## Tech Stack

- **Backend**: NodeJs, Express, Typescript
- **Database**: Postgres, Redis

---

## Libraries Used

- **dotenv**: Loads environment variables from `.env` file.
- **express**: Fast, minimal web server framework.
- **nodemon**: Automatically restarts server on file changes..
- **typescript**: Used to write TypeScript code.
- **ts-node**: Execute typescript code.
- **jsonwebtoken**: Implement authentication and role based access control
- **redis**: Implement rate limiter mechanism.

---

## Setup and Installation

### Prerequisites

- NodeJS
- Postgres
- Redis

### Environment Variables

- Create a `.env` file in the backend directory and copy the content from `.env.example` into it.
- Get Postgres and Redis Dtabase url

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ayushjaiz/rbac-project
   cd rag-chatbot
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the Backend Application:**
   ```bash
   npm run build
   npm run start
   ```

---

## API Endpoints and Sample Requests

### POST `/api/auth/register`

Register as a user, admin or moderator

#### Request:

```http
POST /api/auth/register
```

#### Body

```json
{
  "email": "ayush301aj@gmail.com",
  "password": "12345"
}
```

#### Response:

```json
{
  "message": "User registered successfully",
  "user": {
    "email": "ayush301aj@gmail.com",
    "createdAt": "2024-12-03T14:22:39.012Z",
    "role": "USER"
  }
}
```

### POST `/api/auth/login`

Login route

#### Request:

```http
POST /api/auth/login
```

#### Body

```json
{
  "email": "ayush301aj@gmail.com",
  "password": "12345"
}
```

#### Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzMzMjM1OTAxLCJleHAiOjE3MzMyMzk1MDF9.cslgOSMg2_MA30FgZwqekVgVeKxebkjEtbnNSOx_X1I",
  "user": {
    "id": 10,
    "email": "ayush301aj@gmail.com",
    "role": "USER"
  }
}
```

### GET `/api/profile`

Access profile

#### Request:

```http
GET /api/profile
```

#### Response:

```json
{
  "message": "User Profile",
  "user": {
    "email": "ayush301aj@gmail.com",
    "createdAt": "2024-12-03T14:22:39.012Z",
    "role": "USER"
  }
}
```

### GET `/api/admin-dashboard`

Access admin dashboard

#### Request:

```http
POST /api/admin-dashboard
```

#### Response:

```json
{
  "message": "Forbidden: Insufficient permissions"
}
```

### GET `/api/moderator-dashboard`

Access moderator dashboard

#### Request:

```http
POST /api/moderator-dashboard
```

#### Response:

```json
{
  "message": "Forbidden: Insufficient permissions"
}
```

---

## Development Choices

### Why Node.js?

- Excellent package ecosystem
- Strong async/await support
- Easy deployment options

### Why Typescript?

- Prevent from errors during development phase
- Type security
- Faster code development

### Why Redis?

- In memory database
- Faster operations

---

## Deployment

This app is deployed on render: https://rbac-t47d.onrender.com

---

## Acknowledgements

This project was completed with the assistance of various online resources. I utilized the following tools and sources to support the development of this application:

- Google + Stack Overflow - for bugs and documentation of libraries
- Redis docs
- Some youtube tutorials understanding rate limiter
