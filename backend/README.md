# LifeBuild - Backend

Express-based backend API service for the LifeBuild application.

## Prerequisites
- Node.js (v18+)
- npm

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
- `GET /api/health`: Service health check response
