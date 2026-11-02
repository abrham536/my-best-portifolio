# Abrham Mesfin's portfolio

The project is split into two independent apps:

- `frontend/` — React and Vite website
- `backend/` — Express API

## Run locally

Install Node.js 20.19 or newer. Open the project in VS Code, then open two
terminals using **Terminal → New Terminal**.

### Terminal 1: backend

```powershell
cd backend
npm install
npm run dev
```

The API starts at `http://localhost:3001`. Keep this terminal running.

### Terminal 2: frontend

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Keep this
terminal running too. The frontend proxies `/api` requests to the backend.

You only need to run `npm install` once in each folder, or again after
dependencies change.

## Supabase PostgreSQL setup

1. Create a Supabase project.
2. In its SQL Editor, run the contents of `backend/supabase/schema.sql`.
3. Copy `backend/.env.example` to `backend/.env`.
4. In Supabase project settings, copy the PostgreSQL connection string into
   `DATABASE_URL`, replacing `[YOUR-PASSWORD]` with your database password.
   If the password contains special URL characters, percent-encode them (for
   example, `@` becomes `%40`). Supabase's session pooler connection string is
   recommended if your network cannot connect to the direct database host.

Keep `DATABASE_URL` private in `backend/.env`; never put it in frontend code or
commit it. The contact form stores submissions in the `contact_messages` table.
Email notifications are optional; add a Resend API key and verified sender
address to the same backend `.env` file to enable them. `CONTACT_EMAIL` sets
the inbox that receives notifications and defaults to `abrhammesfn1@gmail.com`.
If a database password was shared in chat or another public place, reset it in
Supabase before use.

## API routes

- `GET /api/health` — API and database health check
- `GET /api/projects` — portfolio projects
- `GET /api/skills` — skills
- `POST /api/contact` — validates and saves a contact message to Supabase

To build the frontend for deployment, run `npm run build` from `frontend/`.
Start the production API with `npm start` from `backend/`. Deploy the frontend
and backend separately and configure the frontend host to proxy `/api` to the
backend, or set `API_PORT` for the local Vite proxy and `PORT` for the backend.
