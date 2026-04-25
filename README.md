# Bookshelf

A full-stack book management application built with React (Vite), Express, and MongoDB, featuring secure JWT-based authentication. Users can sign up, log in, add books to their personal collection, and view their saved items. The application is deployed using Vercel (frontend) and Render (backend), demonstrating end-to-end development and cloud deployment of a MERN stack project

## Features

- User signup and login
- JWT authentication using HTTP cookies
- Add books with title, author, and price
- View books added by the logged-in user
- Logout support
- Clean React UI styled with Tailwind CSS

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- cors

## Project Structure

```text
bookshelf/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
└── README.md
```

## How It Works

- Users sign up or log in from the frontend.
- The backend creates a JWT and stores it in a cookie named `token`.
- Protected routes use middleware to verify the cookie.
- Each book is stored with the authenticated user's `userId`.
- The app only shows books belonging to the logged-in user.

## API Routes

| Method | Route | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/signup` | Create a new user | No |
| `POST` | `/login` | Authenticate user and set cookie | No |
| `POST` | `/logout` | Clear auth cookie | No |
| `POST` | `/books` | Add a new book | Yes |
| `GET` | `/viewbooks` | Get all books for the logged-in user | Yes |

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd bookshelf
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `backend/` and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the backend

From the `backend/` folder:

```bash
npm run dev
```

The backend runs on `http://localhost:3000`.

### 5. Start the frontend

From the `frontend/` folder:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Available Scripts

### Backend

- `npm start` - start the Express server
- `npm run dev` - start the backend with Nodemon

### Frontend

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

## Notes

- The backend CORS configuration currently allows requests from `http://localhost:5173`.
- Authentication depends on cookies, so frontend requests use `withCredentials: true`.
- There are UI buttons for edit and delete in the books view, but those features are not implemented yet.
- There are no automated tests configured yet.

## Before Uploading To GitHub

- Make sure `backend/.env` is not committed.
- Make sure `node_modules/` folders are not committed.
- If needed, add a root `.gitignore` before pushing the project.

## Future Improvements

- Add edit and delete book functionality
- Add form validation and better error messages
- Add toast notifications
- Add protected frontend routes
- Add deployment configuration
- Add automated tests

## Author

Samala Rohan Sidharth 
