# Note-Taking App Backend

## Initialization

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```

2. Navigate to the backend directory:
    ```sh
    cd note-taking-app/backend
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the backend directory and add the following environment variables:
    ```
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    PORT=<your-port>
    ```

5. Start the server:
    ```sh
    npm start
    ```

## Routing Endpoints

### Authentication Routes

#### POST /api/auth/signup

- **Description**: Register a new user.
- **Request Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
        "token": "jwt-token",
        "userId": "user-id",
        "name": "John Doe",
        "email": "john@example.com"
    }
    ```

#### POST /api/auth/login

- **Description**: Login an existing user.
- **Request Body**:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
        "token": "jwt-token",
        "userId": "user-id",
        "name": "John Doe",
        "email": "john@example.com"
    }
    ```

### Note Routes

#### POST /api/notes

- **Description**: Create a new note.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer jwt-token"
    }
    ```
- **Request Body**:
    ```json
    {
        "title": "Sample Note",
        "content": "This is a sample note.",
        "type": "text"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "note-id",
        "userId": "user-id",
        "title": "Sample Note",
        "content": "This is a sample note.",
        "type": "text",
        "createdAt": "2023-10-01T00:00:00.000Z"
    }
    ```

#### GET /api/notes

- **Description**: Get all notes for the authenticated user.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer jwt-token"
    }
    ```
- **Response**:
    ```json
    [
        {
            "_id": "note-id",
            "userId": "user-id",
            "title": "Sample Note",
            "content": "This is a sample note.",
            "type": "text",
            "createdAt": "2023-10-01T00:00:00.000Z"
        },
        // ...other notes
    ]
    ```

#### DELETE /api/notes/:id

- **Description**: Delete a note by its ID.
- **Headers**:
    ```json
    {
        "Authorization": "Bearer jwt-token"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Note deleted successfully"
    }
    ```

## Models

### User Model

- **Schema**:
    ```json
    {
        "name": "String",
        "email": "String",
        "password": "String",
        "timestamps": true
    }
    ```

### Note Model

- **Schema**:
    ```json
    {
        "userId": "ObjectId",
        "title": "String",
        "content": "String",
        "type": "String",
        "createdAt": "Date"
    }
    