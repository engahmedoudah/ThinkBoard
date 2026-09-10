# ThinkBoard Backend

A RESTful API for managing notes, built with Node.js, Express, and MongoDB.

## Features

- ✅ RESTful API endpoints for CRUD operations
- ✅ MongoDB database integration
- ✅ Input validation using express-validator
- ✅ Centralized error handling
- ✅ Security middleware (Helmet, CORS)
- ✅ Rate limiting
- ✅ Request logging with Morgan
- ✅ Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection URI)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and set your configuration values.

4. Start MongoDB
```bash
# Make sure MongoDB is running locally or use a MongoDB URI
mongod
```

5. Run the server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get a single note by ID |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note by ID |
| DELETE | `/api/notes/:id` | Delete a note by ID |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

## Request/Response Examples

### Create Note
```bash
POST /api/notes
Content-Type: application/json

{
  "title": "My First Note",
  "body": "This is the content of my note"
}
```

Response:
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Note",
    "body": "This is the content of my note",
    "createdAt": "2024-01-17T01:26:28.000Z",
    "updatedAt": "2024-01-17T01:26:28.000Z"
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   └── db.js        # Database connection
│   ├── controllers/     # Route controllers
│   │   └── noteController.js
│   ├── middlewares/     # Custom middleware
│   │   └── validateRequest.js
│   ├── models/          # Database models
│   │   └── noteModel.js
│   ├── routes/          # API routes
│   │   └── noteRoutes.js
│   ├── services/        # Business logic
│   │   └── noteService.js
│   ├── utils/           # Utility functions
│   │   └── errorHandler.js
│   ├── validators/      # Request validation schemas
│   │   └── noteValidator.js
│   ├── app.js           # Express app configuration
│   └── server.js        # Server entry point
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/notes |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

## Error Handling

The API uses centralized error handling and returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": []  // Optional: validation errors
}
```

## Validation

All input data is validated using express-validator:
- Title: Required, max 200 characters
- Body: Required, max 5000 characters
- ID: Must be a valid MongoDB ObjectId

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All inputs are validated and sanitized

## Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with auto-reload
```

## License

ISC
