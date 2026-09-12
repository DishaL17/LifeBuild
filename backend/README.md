# LifeBuild - Backend

Express-based backend API service with MongoDB (via Mongoose) for the LifeBuild application.

## Prerequisites
- Node.js (v18+)
- npm
- MongoDB Atlas account (free cloud cluster) or a local MongoDB server

## Setup & Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set `MONGODB_URI` in `.env` to your MongoDB connection string:
   - **MongoDB Atlas (Cloud)**: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/lifebuild?retryWrites=true&w=majority`
   - **Local MongoDB**: `mongodb://localhost:27017/lifebuild`

3. **Start development server** (with auto-reload):
   ```bash
   npm run dev
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## Default Endpoints
- `GET /`: API status message
- `GET /api/health`: Service & database health check response
