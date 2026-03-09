# Invoice Follow-up (Micro SaaS)

Invoice Follow-up helps businesses automatically remind clients about pending invoices.

## Features
- JWT-based user signup/login
- Create invoices with client name, email, amount, and due date
- Automated email reminders:
  - 3 days before due date
  - On due date
  - 3 days after due date
- Dashboard metrics (total, paid, overdue)
- Mark invoice as paid
- Docker-ready full stack setup
- Improved dashboard UX with responsive cards, loading/empty/error states, and status badges
- Branded UI assets (logo and empty-state illustration) for a more polished dashboard experience

## Project Structure
```
backend/    # Express API, auth, invoice workflows, reminder job
frontend/   # React dashboard
database/   # PostgreSQL schema
docker/     # Dockerfiles and docker-compose
```

## Backend Setup
1. Create environment variables (example):

```bash
cd backend
cp .env.example .env
```

Example `.env`:
```env
PORT=5000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/invoice_followup
JWT_SECRET=replace-with-strong-secret
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=billing@yourdomain.com
```

2. Install and run:
```bash
npm install
npm run migrate
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` if backend runs elsewhere.

## Docker Deployment
```bash
cd docker
docker compose up --build
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Database Schema
Schema is defined in `database/schema.sql` with:
- `users`
- `invoices`

## REST API Endpoints
Base URL: `/api`

### Auth
- `POST /auth/signup`
  - Body: `{ "name": "Alice", "email": "alice@company.com", "password": "password123" }`
- `POST /auth/login`
  - Body: `{ "email": "alice@company.com", "password": "password123" }`
  - Response: `{ "token": "...jwt..." }`

### Invoices (JWT required)
- `GET /dashboard`
  - Returns invoice totals and overdue counts
- `GET /invoices`
  - Lists current user invoices
- `POST /invoices`
  - Body: `{ "clientName": "Acme Inc", "clientEmail": "ap@acme.com", "amount": 1200, "dueDate": "2026-05-22" }`
- `PATCH /invoices/:id/pay`
  - Marks an invoice as paid

## Reminder Job
A daily cron job runs at 08:00 server time and sends reminders for pending invoices matching:
- Due in 3 days
- Due today
- Overdue by 3 days

## Notes
- In development, if SendGrid variables are absent, reminder emails are logged/skipped safely.
- Use a secure JWT secret and proper SMTP domain setup in production.
