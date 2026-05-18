# Info Skjerm — CLAUDE.md

Project context for AI agents and automated tooling.

## Project overview

An informational screen (info skjerm) for Tiller VGS, displaying weather, time, date, bus departures, announcements, and the Tiller Quest leaderboard.

## Monorepo structure

```
/
├── Backend/          # Express + TypeScript API server
└── frontend/
    └── info-skjerm-2026/  # Vite + React + TypeScript SPA
```

## URL layout

| Traffic     | URL                             |
| ----------- | ------------------------------- |
| Frontend    | `http://site.example.com/*`     |
| Backend API | `http://site.example.com/api/*` |

The backend is reverse-proxied behind the same origin as the frontend. The frontend never needs CORS headers.

## Backend (`Backend/`)

- **Runtime**: Node.js, ESM (`"type": "module"`)
- **Framework**: Express 5
- **Language**: TypeScript, compiled with `tsc` / run in dev with `tsx`
- **Database ORM**: Prisma 7 with PostgreSQL (`pg` adapter)
- **Auth**: `better-auth` — mounted at `/api/auth/*splat` before `express.json()`
- **Path aliases** (defined in `tsconfig.json`):
  - `@controllers` → `src/controllers`
  - `@models` → `src/models`
  - `@helpers` → `src/utils`
  - `@lib/*` → `src/lib/*`
  - `@prismaclient` → `src/lib/prisma.ts`
  - `@generated/*` → `prisma/generated/*`

### Key routes

| Route                      | Description                   |
| -------------------------- | ----------------------------- |
| `ALL /api/auth/*`          | better-auth handler           |
| `GET /api/auth`            | returns current session       |
| `GET/POST /api/AdminTable` | admin data (requires session) |
| `/weather`                 | WeatherController             |
| `/database`                | DatabaseController            |
| `/busdepartures`           | BusController                 |

### Database schema (Prisma)

Models: `AdminTable`, `earlyerweatherdays`, `User`, `Session`, `Account`, `Verification`.
Auth models (`User`, `Session`, `Account`, `Verification`) are managed by `better-auth` — do not modify their shape manually.

### Backend scripts

```bash
npm run dev        # tsx src/app.ts (dev server)
npm run build      # tsc
npm run start      # node dist/app.js
npm run setdb      # prisma generate + db push
npm run resetdb    # setdb + seed SQL
npm run filldb     # seed SQL only
npm run delfullydb # prisma migrate reset (destructive)
```

## Frontend (`frontend/info-skjerm-2026/`)

- **Bundler**: Vite 8
- **Framework**: React 19 + TypeScript
- **Routing**: React Router 7
- **Data fetching**: TanStack Query (React Query) 5
- **UI**: Material UI 9, Tailwind CSS 4, Emotion
- **Forms**: React Hook Form + Zod
- **Auth client**: `better-auth` client (`src/lib/auth-client.ts`)

### Pages

| Path               | File                           |
| ------------------ | ------------------------------ |
| `/`                | `src/pages/Home.tsx`           |
| Infoscreen display | `src/pages/Infoscreen.tsx`     |
| Admin dashboard    | `src/pages/AdminDashboard.tsx` |
| Login              | `src/pages/Login.tsx`          |

### Frontend scripts

```bash
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run lint     # eslint
npm run preview  # vite preview
```

## Commit convention

All commits **must** follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <description>

Examples:
feat(auth): add session refresh endpoint
fix(bus): handle missing departure time
chore(deps): bump prisma to 7.9.0
refactor(weather): extract polling logic to hook
```

Common types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `ci`, `style`, `perf`.

## Environment variables

Both workspaces read from a `.env` file in their own root directory. Variables needed by the backend include `DATABASE_URL`, `PORT`, and any `BETTER_AUTH_*` secrets. Do not commit `.env` files.
