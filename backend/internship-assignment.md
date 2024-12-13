# Reading List Manager - Full Stack Development Assignment

## Overview
Create a web application that helps users manage their reading list and track their reading progress. The application should include user authentication and basic analytics about reading habits.

## Requirements

### Functional Requirements
1. User Authentication
   - Users should be able to register and log in
   - Secure password storage
   - Protected routes for authenticated users

2. Book Management
   - Users can add books to their reading list
   - Each book should have: title, author, total pages
   - Users can mark books as "to-read", "in-progress", or "completed"
   - Users can track start and finish dates for books

3. Analytics Dashboard
   - Display total books read
   - Show reading progress over time
   - Calculate average reading completion rate

### Technical Requirements
1. Frontend
   - Use React for the application
   - Implement responsive design using Tailwind CSS
   - Create no more than 4 main screens
   - Implement loading states and error handling

2. Backend
   - Create a RESTful API using Node.js
   - Implement user authentication (JWT recommended)
   - Use PostgreSQL as the database
   - Implement an ORM of your choice

### Screens
1. Authentication (Login/Register)
2. Reading List Management
3. Book Progress Tracking
4. Analytics Dashboard

## Evaluation Criteria
- Code organization and structure
- Database design and relationships
- API design and implementation
- UI/UX implementation
- Error handling and input validation
- Code quality and best practices

## Example Database Schema

You can use this as a template and modify it, if needed.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  books     Book[]
  createdAt DateTime @default(now())
}

model Book {
  id          Int      @id @default(autoincrement())
  title       String
  author      String
  pages       Int
  status      String   // "to-read", "in-progress", "completed"
  startDate   DateTime?
  finishDate  DateTime?
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```

## Time Limit
- 1-2 days

## Submission
- Provide a GitHub repository with your code
- Include a README with:
  - Setup instructions
  - API documentation
  - Any assumptions or design decisions
  - Technologies used

## Bonus Points (Optional)
- Unit tests
- Docker configuration
- Input validation
- Search/filter functionality
