# Note Taking App Backend

This backend note taking application is built using Node.js and Express.js. It utilizes MongoDB as the database and provides a RESTful API for users to register, log in, create, read, update, and delete notes.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone "https://github.com/shamimshihab/Note-Taking-App-Backend/tree/main"
   ```

   ```
   cd backend
   ```

   ```
   npm install
   ```

2. **Set up environment variables::**

Create a `.env` file in the root directory and specify the following variables:

```plaintext
PORT=3000
MONGODB_URI=<your_MongoDB_URI>
```

2. **Run the application::**

```bash
npm start


```

## Features Added

- **User Authentication:** Allows users to register and log in securely using bcrypt for password hashing and JWT for authentication.
- **Note CRUD Operations:** Provides endpoints for creating, reading, updating, and deleting notes.
- **Note Sharing:** Allows users to share notes with other users of the application.

## API Endpoints

### Authentication Routes (`/auth`)

- `POST /auth/register`: Register a new user. Request body: { "username": "your_username", "password": "your_password" }
- `POST /auth/login`: Log in an existing user. Request body: { "username": "your_username", "password": "your_password" } Notes

### Notes Routes (`/notes`)

- `POST /notes`: Create a new note. Request body: { "title": "Note Title", "body": "Note Body" }
- `GET /notes`: Retrieve paginated notes for the authenticated user.
- `GET /notes/:id`: Get a specific note by ID for the authenticated user.
- `PUT /notes/:id`: Update a specific note by ID for the authenticated user. { "title": "Updated Title", "body": "Updated Body" }
- `DELETE /notes/:id`: Delete a specific note by ID for the authenticated user.
- `POST /notes/:id/share`: Share a specific note with another user.
