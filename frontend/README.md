# Note-Taking App Frontend

## Initialization

To get started with the frontend of the Note-Taking App, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Darshan-147/Note-Taking-App.git
   ```

2. Change to the frontend directory:
   ```sh
   cd note-taking-app/frontend
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Run the frontend application:
   ```sh
   npm run dev
   ```

## Software Requirements Specification (SRS)

### 1. Introduction

#### 1.1 Purpose
The purpose of this document is to provide a detailed description of the frontend of the Note-Taking App. It will cover the functionalities, user interactions, and the overall behavior of the application.

#### 1.2 Scope
This document covers the frontend part of the Note-Taking App, which includes user authentication, note management, and user interface components.

#### 1.3 Definitions, Acronyms, and Abbreviations
- **Frontend**: The part of the application that interacts with the user.
- **API**: Application Programming Interface.
- **JWT**: JSON Web Token.

### 2. Overall Description

#### 2.1 Product Perspective
The frontend is a single-page application built using React. It communicates with the backend API to perform CRUD operations on notes and handle user authentication.

#### 2.2 Product Functions
- User Signup
- User Login
- User Logout
- Create, Read, Update, Delete (CRUD) notes
- Search notes
- Speech-to-text note creation
- Image upload for notes

#### 2.3 User Classes and Characteristics
- **Registered Users**: Users who have signed up and logged in to the application.
- **Guests**: Users who have not logged in and have limited access.

#### 2.4 Operating Environment
The application runs in modern web browsers such as Chrome, Firefox, and Edge.

### 3. Specific Requirements

#### 3.1 Functional Requirements

##### 3.1.1 User Authentication
- **Signup**: Users can create a new account by providing their name, email, and password.
- **Login**: Users can log in using their email and password.
- **Logout**: Users can log out, which clears their session.

##### 3.1.2 Note Management
- **Create Note**: Users can create new notes with text or images.
- **Read Notes**: Users can view their notes.
- **Update Note**: Users can edit existing notes.
- **Delete Note**: Users can delete notes.
- **Search Notes**: Users can search for notes by title or content.

##### 3.1.3 Speech-to-Text
- Users can create notes using speech-to-text functionality.

#### 3.2 Non-Functional Requirements

##### 3.2.1 Performance Requirements
- The application should load within 3 seconds on a standard internet connection.

##### 3.2.2 Security Requirements
- User data should be protected using JWT for authentication.
- Passwords should be hashed before storing.

##### 3.2.3 Usability Requirements
- The application should be easy to navigate with a clean and intuitive user interface.

### 4. Interface Requirements

#### 4.1 User Interfaces
- **Login Page**: Allows users to log in.
- **Signup Page**: Allows users to create a new account.
- **Notes Page**: Displays user notes and allows CRUD operations.
- **Logout Page**: Logs out the user and redirects to the login page.

#### 4.2 API Interfaces
- **POST /api/auth/signup**: Endpoint for user signup.
- **POST /api/auth/login**: Endpoint for user login.
- **GET /api/notes**: Endpoint to fetch user notes.
- **POST /api/notes**: Endpoint to create a new note.
- **DELETE /api/notes/:id**: Endpoint to delete a note.

### 5. System Features

#### 5.1 User Authentication
- **Description**: Allows users to sign up, log in, and log out.
- **Priority**: High

#### 5.2 Note Management
- **Description**: Allows users to create, read, update, and delete notes.
- **Priority**: High

#### 5.3 Speech-to-Text
- **Description**: Allows users to create notes using speech recognition.
- **Priority**: Medium

### 6. Other Requirements

#### 6.1 Dependencies
- React
- Axios
- React Router
- FontAwesome

#### 6.2 Assumptions and Constraints
- The backend API is available and functional.
- Users have a stable internet connection.

### 7. Appendices

#### 7.1 References
- React Documentation: https://reactjs.org/docs/getting-started.html
- Axios Documentation: https://axios-http.com/docs/intro
- React Router Documentation: https://reactrouter.com/docs/en/v6
