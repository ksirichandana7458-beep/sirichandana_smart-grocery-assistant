# Smart Grocery Assistant

A full-stack JavaScript application for managing grocery shopping and meal planning.

## Tech Stack
- **Frontend:** Angular
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Authentication:** JWT

## Features
1. User authentication
2. Save favorite grocery items
3. Build weekly shopping lists
4. Recipe suggestions based on saved items
5. Budget tracking

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Angular CLI

### Database Setup
For MongoDB, you can use:
- **Local MongoDB:** Download from [mongodb.com](https://www.mongodb.com/try/download/community) and install.
- **MongoDB Atlas (Recommended for students):** Free cloud database.
  1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
  2. Create a free cluster
  3. Get connection string (replace `<password>` and `<dbname>`)
  4. Update `.env` with your Atlas URI

### Backend Setup
1. Navigate to `backend` folder
2. Run `npm install`
3. Create `.env` file with:
   ```
   MONGO_URI=mongodb://localhost:27017/smart-grocery  # or your Atlas URI
   JWT_SECRET=your-secret-key
   PORT=5000
   ```
4. Run `npm start`

### Frontend Setup
1. Navigate to `frontend` folder
2. Run `npm install`
3. Run `ng serve`

### Database
- Start MongoDB locally or use MongoDB Atlas

## Usage
- Register/Login
- Add favorite items
- Create shopping lists
- View suggestions

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/items
- POST /api/lists
- etc.

## Troubleshooting
- Ensure MongoDB is running
- Check console for errors
- Verify environment variables
