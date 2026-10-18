# ResumeForge — Professional Resume Builder

A production-grade resume builder: split-screen live editor, 6 ATS-friendly templates,
secure auth, MongoDB persistence, autosave, and one-click PDF export.

**Live site:** *(deployed on Vercel)*

## Tech stack

| Layer     | Tech                                                             |
| --------- | ---------------------------------------------------------------- |
| Frontend  | Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4    |
| Language  | TypeScript (strict)                                              |
| Backend   | Next.js Route Handlers (Node.js runtime)                         |
| Database  | MongoDB Atlas (M0 Free, AWS Mumbai) via Mongoose 9               |
| Auth      | Auth.js / NextAuth v5 (credentials, JWT sessions, bcryptjs)      |
| Validation| Zod v4 (server-side, every endpoint)                             |
| Reorder   | dnd-kit (drag-to-reorder list items)                             |
| PDF       | html2pdf.js (A4 canvas render) + browser print fallback          |
| Tests     | Vitest (schemas, rate limiter, template SSR)                     |

## Features

- **Account system** — register/login, bcrypt(12) hashing, 7-day JWT sessions
- **Resume CRUD** — create, edit, duplicate, delete; owner-only access enforced server-side
- **Split-screen editor** — form rail on the left, pixel-accurate A4 preview on the right
- **Autosave** — debounced (1.2 s) with visible status; flush-on-unload safety net
- **6 templates** — ATS Minimal, Modern Clean, Classic Serif, Compact One-Column,
  Two-Column Sidebar, Executive Elegant — switch instantly, content carries over
- **Sections** — Profile, Summary, Experience, Education, Skills, Projects,
  Certifications, Languages + unlimited Custom sections
- **Drag reorder** — every list reorders with a grip handle (keyboard accessible)
- **PDF export** — one-click A4 PDF (print-perfect), plus a Print button fallback

## Security

- Server-side Zod validation on every write endpoint (no mass assignment — unknown keys stripped)
- Owner-scoped queries (`_id + userId`); non-owners get 404 (no existence leak)
- bcryptjs cost factor 12; passwords `select: false` in the schema
- In-memory sliding-window rate limits: register 5/min/IP, login 10/min/email, saves 120/min
- Security headers on every response: CSP, X-Frame-Options DENY, nosniff, referrer policy
- Edge middleware gates `/dashboard` + `/resume/*`; session re-verified server-side per request
- `.env.local` git-ignored; `.env.example` documents required vars

## Getting started

```bash
cp .env.example .env.local   # fill MONGODB_URI + AUTH_SECRET
npm install
npm run dev                  # http://localhost:3000
```

## Scripts

| Command             | What it does                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Dev server (Turbopack)             |
| `npm run build`     | Production build                   |
| `npm run start`     | Serve the production build         |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | `tsc --noEmit`                     |
| `npm test`          | Vitest unit/SSR tests              |

## Project structure

```
src/
├── app/                    # Routes: landing, auth, dashboard, editor, API
│   ├── api/                # /auth/*, /resumes (CRUD)
│   ├── dashboard/          # Resume list + actions
│   ├── resume/new/         # Create flow
│   └── resume/[id]/        # Edit flow
├── components/
│   ├── editor/             # Split-pane editor, sortable lists
│   └── templates/          # 6 template components + registry
├── lib/                    # db, auth, models, rate limiter
├── types/                  # Zod schemas + TS types (single source of truth)
└── middleware.ts           # Route protection
```

---

Built by **Shaik Mohammed Hafizulla**
