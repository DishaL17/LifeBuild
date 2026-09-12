# 🎮 LifeBuild — Pokémon Life RPG & Habit Tracker

> **Bridge the gap between mundane real-world tasks and instant gaming dopamine.**  
> LifeBuild transforms your daily habits, study routines, gym sessions, and chores into an epic retro Pokémon-themed Life RPG adventure with non-linear leveling, attribute growth, companion evolutions, and a real in-game economy.

---

## ⚡ Problem Statement & Solution

Traditional productivity tools and to-do lists suffer from the **"delayed gratification"** problem: the real-world results of reading a book, studying for exams, or lifting at the gym take months to materialize.

**LifeBuild** introduces:
- **Instant Dopamine Feedback Loops:** Checkmarks award instant XP, PokéCoins, retro 8-bit sound effects, and celebratory modal animations.
- **Genuine Full-Stack Persistence:** Zero reliance on fake `localStorage`-only persistence. Every quest, coin, badge, and inventory item persists in **MongoDB Atlas**.
- **Non-Linear RPG Progression:** Built on mathematical RPG curves where higher levels require exponentially greater effort.
- **Thematic Immersion:** A cohesive Pokédex interface with companion Pokémon evolutions, Pokémart shop, Trainer Backpack, and Gym Badge showcase.

---

## 🚀 Core Features Matrix

| System | Implementation Details |
| :--- | :--- |
| **Authentication & Security** | Secure password hashing via `bcryptjs`, 30-day signed JSON Web Tokens (JWT), route-level protection (`ProtectedRoute`), and automatic 401 token expiry interception. |
| **Database Persistence** | Real-time cloud synchronization with **MongoDB Atlas**. Relational references ensure users only access and modify their own quests and inventory. |
| **RPG Leveling Engine** | Non-linear leveling curve based on: $$\text{XP Needed} = \lfloor 100 \times \text{level}^{1.5} \rfloor$$ |
| **Attribute Progression** | Quests categorize into core attributes: 🥊 **STR** (Gym/Workouts), ⚡ **INT** (Coding/Study), 🔮 **WIS** (Reading/Focus), 💨 **AGI** (Habits/Consistency), ❤️ **HP** (Sleep/Wellness). |
| **Daily Streak System** | Tracks consecutive days of productivity and displays fire streak counters. |
| **Economy & Pokémart** | Earn PokéCoins from completed quests; spend them in the Pokémart to buy **Rare Candy**, **Hyper Potion**, **Evolution Stones**, and the **Master Ball**. |
| **Backpack & Inventory** | Purchased items are safely stored in your Backpack. "USE ITEM" consumes the item and applies permanent stat/XP boosts. |
| **Companion Evolutions** | Choose your starter Pokémon (Charmander, Pikachu, Squirtle, Bulbasaur). Watch them dynamically evolve at Level 5 (Stage 1) and Level 10 (Stage 2)! |
| **Gym Badges Showcase** | 8 unlockable Pokémon League Gym Badges evaluated live against your real Trainer stats. |
| **Tactile Audio Engine** | Pure client-side 8-bit chiptune sound synthesis via Web Audio API (Click, Level Up, Quest Complete, Evolution Fanfare) with audio toggle. |

---

## 🏗️ Tech Stack

- **Frontend:** React 18, React Router v6, Vite, Vanilla CSS (Micro-interactions, LED animations, retro Pokédex frames), Web Audio API.
- **Backend:** Node.js, Express.js, RESTful API design.
- **Database:** MongoDB Atlas (Cloud NoSQL), Mongoose ODM.
- **Security:** JSON Web Tokens (JWT), bcryptjs, CORS, environment isolation.

---

## 📁 Repository Structure

```text
LifeBuild/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB Atlas connection with DNS fallback
│   │   ├── controllers/     # Auth, Quest, and Shop business logic
│   │   ├── middleware/      # JWT authentication protection middleware
│   │   ├── models/          # Mongoose Schemas (User, Quest)
│   │   ├── routes/          # Express API Route definitions
│   │   └── server.js        # Express server entry point
│   ├── .env.example         # Backend environment template
│   └── package.json
├── frontend/
│   ├── public/              # Static assets & Netlify _redirects
│   ├── src/
│   │   ├── components/      # ProtectedRoute, Modals, Navbar, Cards
│   │   ├── context/         # UserContext & state management
│   │   ├── pages/           # Login, Signup, Dashboard, Character, Shop, Inventory, Badges
│   │   ├── services/        # Centralized authService with JWT session handling
│   │   ├── utils/           # Web Audio API 8-bit sound engine
│   │   ├── App.jsx          # Protected route declarations
│   │   └── main.jsx
│   ├── .env.example         # Frontend environment template
│   ├── vercel.json          # Vercel SPA rewrite configuration
│   └── package.json
├── .env.example             # Unified environment variable template
└── README.md
```

---

## 🛠️ Quickstart & Local Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Edit `backend/.env` with your credentials:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/lifebuild?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```
Run the backend development server:
```bash
npm run dev
# Server starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
```
Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```
Run the frontend development server:
```bash
npm run dev
# Vite runs on http://localhost:5173
```

---

## 🔑 Demo Credentials (For Hackathon Judges)

Judges can register a brand new account (which starts with clean 0 stats, empty quest board, and empty backpack), or use the instant pre-configured **Guest Trainer Pass**:

- **Email:** `ash.ketchum@liferpg.io`
- **Password:** `pikapassword123`
- *Or simply click the **"QUICK GUEST TRAINER PASS"** button on the Login page!*

---

## 📡 API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /api/auth/signup` — Register new trainer (starts with 0 stats, empty quest log, empty backpack)
- `POST /api/auth/login` — Authenticate and receive 30-day JWT Bearer token
- `GET /api/auth/me` — Fetch authenticated player profile and live attributes
- `PATCH /api/auth/companion` — Persist starter Pokémon selection

### Quests (`/api/quests`)
- `GET /api/quests` — Fetch authenticated user's quests
- `POST /api/quests` — Create new quest (`title`, `attribute`, `difficulty`)
- `PATCH /api/quests/:id/toggle` — Toggle completion, calculate non-linear leveling, increment attributes
- `DELETE /api/quests/:id` — Delete quest

### Shop & Economy (`/api/shop` & `/api/inventory`)
- `GET /api/shop/items` — Fetch Pokémart catalog
- `POST /api/shop/buy` — Purchase item with PokéCoins and deposit in Backpack
- `GET /api/inventory` — View items in Trainer Backpack
- `POST /api/inventory/use` — Consume item for permanent XP, HP, or attribute power-ups

---

## 🚢 Production Deployment

- **Frontend:** Ready for one-click deployment to **Vercel** or **Netlify** (includes `vercel.json` and `public/_redirects` for SPA client-side routing).
- **Backend:** Ready for deployment to **Render** or **Railway**.

---

## 🎥 Walkthrough Video
- **Video Demonstration Link:** *(Upload your 90-180 second screen recording to YouTube/Google Drive or embed in repo under 100MB)*
