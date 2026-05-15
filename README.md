# Info Skjerm 2026

An informational screen for Tiller VGS displaying weather, time, date, bus departures, announcements, and the Tiller Quest leaderboard.

## Team 2026

- [@Dragehelt](https://github.com/Dragehelt)
- [@Fredrik-WS](https://github.com/Fredrik-WS)
- [@OT44-0](https://github.com/OT44-0)
- [@catburger1230](https://github.com/catburger1230)
- [@ma6692](https://github.com/ma6692)

## Team 2025

- [@Marcus-Aastum](https://github.com/Marcus-Aastum) — Backend / Database design
- [@Hexcrow-k17](https://github.com/Hexcrow-k17) — Frontend / Visual design
- [@Sigdriv](https://github.com/Sigdriv) — Frontend
- [@JorgenMU](https://github.com/JorgenMU) — Backend

Additional bugfixes by [@Enderz420](https://github.com/Enderz420).

---

## Architecture

| Layer    | Technology                                                                                |
| -------- | ----------------------------------------------------------------------------------------- |
| Frontend | Vite · React 19 · TypeScript · React Router 7 · TanStack Query 5 · MUI 9 · Tailwind CSS 4 |
| Backend  | Express 5 · TypeScript · Prisma 7 · PostgreSQL                                            |
| Auth     | better-auth                                                                               |

The frontend is served at `http://site.example.com/*` and the backend API at `http://site.example.com/api/*`.

### Repository layout

```
/
├── Backend/                    # Express API server
│   ├── src/
│   │   ├── app.ts              # Entry point, route mounting
│   │   ├── controllers/        # Route handlers
│   │   ├── lib/                # Auth, Prisma client, server helpers
│   │   ├── models/             # TypeScript types/interfaces
│   │   └── utils/              # Shared helpers
│   └── prisma/
│       ├── schema.prisma       # Database schema
│       └── fill.sql            # Seed data
└── frontend/
    └── info-skjerm-2026/
        └── src/
            ├── components/     # Reusable UI components
            ├── pages/          # Route-level page components
            ├── hooks/          # Custom React hooks
            ├── lib/            # Auth client, Zod schemas
            └── types/          # Shared TypeScript types
```

---

## Getting started

### Prerequisites

- Node.js 20+
- A running PostgreSQL instance
- `.env` files in both `Backend/` and `frontend/info-skjerm-2026/` (see [Environment variables](#environment-variables))

### Backend

```bash
cd Backend
npm install
npm run setdb    # generate Prisma client and push schema
npm run dev      # start dev server (tsx)
```

### Frontend

```bash
cd frontend/info-skjerm-2026
npm install
npm run dev      # start Vite dev server
```

---

## Backend scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Dev server via `tsx`                     |
| `npm run build`      | Compile TypeScript                       |
| `npm run start`      | Run compiled output                      |
| `npm run setdb`      | `prisma generate` + `prisma db push`     |
| `npm run resetdb`    | `setdb` + seed SQL                       |
| `npm run filldb`     | Run seed SQL only                        |
| `npm run delfullydb` | **Destructive** — `prisma migrate reset` |

## Frontend scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Vite dev server          |
| `npm run build`   | Type-check + Vite build  |
| `npm run lint`    | ESLint                   |
| `npm run preview` | Preview production build |

---

## Environment variables

Both workspaces load from a local `.env` file. **Do not commit `.env` files.**

Backend requires at minimum:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
PORT=3000
BETTER_AUTH_SECRET=<random secret>
BETTER_AUTH_URL=http://site.example.com
```

---

## Commit convention

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <description>
```

Common types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `ci`, `style`, `perf`.

```
feat(weather): add hourly forecast endpoint
fix(bus): handle missing departure time gracefully
chore(deps): bump prisma to 7.9.0
```
