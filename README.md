# Notes App with Authentication

A full-stack notes application built with:

- **Frontend**: Next.js (SSR) + React + Chakra UI
- **Backend**: Node.js + Express (TypeScript)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + Passport.js
- **Deployment**: Vercel (frontend) + Railway/Render (backend)
- **Testing**: React Testing Library, Mocha + Chai
- **Tooling**: ESLint + Prettier

## Goals
- Learn authentication best practices (JWT + refresh tokens)
- Work with a relational database (Postgres + Prisma)
- Explore SSR rendering in Next.js
- Practice secure password hashing & input validation

## Project Structure
notes-app/
frontend/ → Next.js app
backend/ → Express + Prisma

## Setup
1. Clone the repo
2. Create `.env` from `.env.example`
3. Install dependencies in `/frontend` and `/backend`

## Development Setup
### Backend
```bash
cd backend
npm install
npm run dev

### Frontend
```bash
cd frontend
npm install
npm run dev