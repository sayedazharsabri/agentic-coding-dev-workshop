# Full Stack Todo Application - Made with Antigravity

[You can watch here](https://www.youtube.com/playlist?list=PLIfcYFqzDXHmRDtE-YmMcgP2kjhG6D81g)

A modern, scalable, and responsive Todo application built with the MERN-Vite stack. It features a clean architecture, modular design, custom UI components, and a custom backend logger.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, MongoDB, Zod (Validations)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios
- **Styling:** Custom UI with Tailwind CSS (Blue Theme, No external component libraries)

---

## 📁 Folder Structure Overview

```text
todo-antigravity/
├── backend/                  # Node.js + Express Backend
│   ├── .env                  # Backend environment variables
│   ├── src/
│   │   ├── config/           # Database and logger configs
│   │   ├── controllers/      # Route controllers (CRUD logic)
│   │   ├── middlewares/      # Error and Validation middlewares
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API Endpoints
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utilities (AppError, logger)
│   │   └── validators/       # Zod validation schemas
│   └── package.json          # Backend dependencies & scripts
│
└── frontend/                 # React + Vite Frontend
    ├── .env                  # Frontend environment variables
    ├── index.html            # App entry HTML
    ├── src/
    │   ├── components/       # Reusable React components
    │   ├── hooks/            # Custom React hooks (useTodos)
    │   ├── pages/            # Page components
    │   ├── services/         # API integrations
    │   ├── types/            # TypeScript interfaces
    │   ├── App.tsx           # Main application setup
    │   └── index.css         # Global Tailwind styles
    └── package.json          # Frontend dependencies & scripts
```

---

## 🚀 Project Setup Instructions

### Prerequisites
Make sure you have the following installed on your local machine:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (running locally on default port `27017` or a Mongo Atlas URI)

---

### Backend Setup

1. **Navigate to the Backend directory:**
   ```bash
   cd backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Ensure `backend/.env` exists. The default looks like this:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   ```

4. **Available Scripts:**
   - `npm run dev` : Runs backend in development mode (Nodemon + TS)
   - `npm run build` : Compiles TypeScript to the `dist` folder
   - `npm start` : Runs compiled index.js
   - `npm run lint` : Lints backend codebase
   - `npm run format` : Formats backend code via Prettier

5. **Start the Backend:**
   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. **Navigate to the Frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Ensure `frontend/.env` exists. The default looks like this:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. **Available Scripts:**
   - `npm run dev` : Starts Vite development server
   - `npm run build` : Compiles and builds the React app for production
   - `npm run lint` : Lints frontend codebase
   - `npm run format` : Formats frontend code via Prettier
   - `npm run preview` : Previews the production build

5. **Start the Frontend:**
   ```bash
   npm run dev
   ```

The application will now be running. The Frontend will typically be available at `http://localhost:3000` (or another port output by Vite in your console).

---

### Testing (Backend)

We use Jest, Supertest, and MongoDB Memory Server for testing the backend API. The test suite is divided into unit tests (endpoint level) and integration tests (full CRUD lifecycle).

1. **Run Unit Tests:**
   ```bash
   cd backend
   npm run test:unit
   ```

2. **Run Integration Tests:**
   ```bash
   cd backend
   npm run test:integration
   ```

3. **Run All Tests (Unit & Integration):**
   ```bash
   cd backend
   npm run test
   ```

4. **Generate Coverage Report:**
   ```bash
   cd backend
   npm run test:coverage
   ```
