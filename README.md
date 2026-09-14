# ThinkBoard

A full-stack note-taking application built with the MERN stack and TypeScript. ThinkBoard allows users to create, edit, view, and delete notes through a responsive web interface.

## Project Demo
[Screencast_20260912_123005.webm](https://github.com/user-attachments/assets/7a06568f-88ea-487f-97cb-32a209a643e1)


## Features

* Create new notes
* View note details
* Edit existing notes
* Delete notes
* Responsive user interface
* RESTful API integration
* MongoDB data persistence
* Client-side routing with React Router
* Reusable React components
* TypeScript for type-safe development

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* CSS

### Backend

* Node.js
* Express.js
* RESTful APIs

### Database

* MongoDB

## Architecture

ThinkBoard follows a client-server architecture:

```text
┌─────────────────────┐
│      React App      │
│   TypeScript        │
│   React Router      │
└──────────┬──────────┘
           │
           │ REST API
           ▼
┌─────────────────────┐
│   Node.js + Express │
│      REST API       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       MongoDB       │
└─────────────────────┘
```

## Project Structure

```text
ThinkBoard/
├── frontend/
│   └── ...
│
├── backend/
│   └── ...
│
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB

### Clone the Repository

```bash
git clone https://github.com/engahmedoudah/ThinkBoard.git
cd ThinkBoard
```

### Install Dependencies

Install the dependencies for both the frontend and backend.

```bash
npm install
```

If the frontend and backend have separate `package.json` files, install their dependencies separately:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Run the Application

Start the backend:

```bash
npm run dev
```

Then start the frontend in a separate terminal:

```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

## API

The backend provides RESTful endpoints for managing notes.

Example operations:

```text
GET    /api/notes
GET    /api/notes/:id
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id
```

These endpoints allow the React frontend to communicate with the backend and persist notes in MongoDB.

## Development

The project is organized into separate frontend and backend layers to keep the application maintainable and easy to extend.

The frontend handles:

* User interface
* Client-side routing
* API communication
* State management

The backend handles:

* API routes
* Request processing
* Note operations
* Database communication

## Future Improvements

* User authentication
* User-specific notes
* Search and filtering
* Note categories and tags
* Pagination
* Dark mode

## Author

**Ahmed Al Ghamdi**

GitHub: [engahmedoudah](https://github.com/engahmedoudah)
