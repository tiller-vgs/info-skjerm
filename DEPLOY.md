# Deployment Guide

This guide covers setting up the info-skjerm service on a Debian 13 LXC container, exposed to the internet via a Cloudflare Tunnel with automatic deploys on every push to `main`.

## Overview

```
Internet
  └── Cloudflare Edge
        └── cloudflared (outbound-only, no port forwarding needed)
              └── nginx:80
                    ├── /api/* → backend:3000  (Express + TypeScript)
                    └── /*     → frontend:80   (Vite build served by nginx)
                  db:5432 (PostgreSQL, data persisted in a Docker volume)
```

Auto-deploy works through a **self-hosted GitHub Actions runner** installed on the LXC. It connects outbound to GitHub — no inbound ports required.

---

## Prerequisites

- A Debian 13 LXC container with internet access
- A GitHub account with access to this repository
- A Cloudflare account with a domain configured

---

## Step 1 — Install Docker

Run on the LXC container:

```bash
curl -fsSL https://get.docker.com | sh
```

Add your user to the `docker` group so the GitHub Actions runner can call Docker without `sudo`:

```bash
sudo usermod -aG docker $USER
newgrp docker          # apply without logging out
docker run hello-world # verify it works
```

---

## Step 2 — Clone the repository

```bash
git clone https://github.com/tiller-vgs/info-skjerm.git
cd info-skjerm
```

---

## Step 3 — Create the `.env` file

Copy the example and fill in real values:

```bash
cp .env.example .env
nano .env
```

| Variable             | Description                                      |
| -------------------- | ------------------------------------------------ |
| `POSTGRES_DB`        | Database name (e.g. `infoskjerm`)                |
| `POSTGRES_USER`      | PostgreSQL username                              |
| `POSTGRES_PASSWORD`  | A strong password                                |
| `BETTER_AUTH_SECRET` | Long random string — run `openssl rand -hex 32`  |
| `BETTER_AUTH_URL`    | Your public URL, e.g. `https://site.example.com` |

> The `.env` file is only needed for the first manual deploy. After that the GitHub Actions workflow writes it from repository secrets on every deploy.

## Step 4 — Set up the GitHub Actions self-hosted runner

The runner connects outbound to GitHub and triggers redeploys when `main` is pushed. No inbound ports are needed.

### 4a. Download and configure the runner

Go to your GitHub repository → **Settings → Actions → Runners → New self-hosted runner**

Select **Linux / x64** and run the commands shown on that page. They look like:

```bash
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/download/v<version>/actions-runner-linux-x64-<version>.tar.gz
tar xzf ./actions-runner-linux-x64.tar.gz
./config.sh --url https://github.com/tiller-vgs/info-skjerm --token <YOUR_REGISTRATION_TOKEN>
```

Use the defaults for every prompt.

### 4b. Install it as a system service

```bash
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status   # should show "active (running)"
```

The runner now starts automatically on boot.

### 4c. Verify

Go to **Settings → Actions → Runners** in GitHub. The runner should appear with a green **Idle** status.

---

## Step 5 — Add GitHub Actions secrets

Go to your repository → **Settings → Secrets and variables → Actions → New repository secret**

Add one secret for each variable:

| Secret name               | Value                  |
| ------------------------- | ---------------------- |
| `POSTGRES_DB`             | Same as in your `.env` |
| `POSTGRES_USER`           | Same as in your `.env` |
| `POSTGRES_PASSWORD`       | Same as in your `.env` |
| `BETTER_AUTH_SECRET`      | Same as in your `.env` |
| `BETTER_AUTH_URL`         | Same as in your `.env` |
| `CLOUDFLARE_TUNNEL_TOKEN` | The token from Step 4  |

These are injected into the `.env` file by the deploy workflow on every run.

---

## Step 6 — First deploy

From the cloned repository directory on the LXC, run:

```bash
docker compose up --build -d
```

This builds all images, starts every service, and runs `prisma db push` to create the database schema. It takes a few minutes on the first run.

Check that everything is up:

```bash
docker compose ps
```

All five services (`db`, `backend`, `frontend`, `nginx`, `cloudflared`) should show **running**.

Check the logs if something looks wrong:

```bash
docker compose logs -f backend
docker compose logs -f cloudflared
```

Visit your domain — the info screen should load.

---

## How auto-deploy works

Every push to `main`:

1. GitHub notifies the self-hosted runner (outbound connection — no port forwarding needed)
2. The runner checks out the latest code
3. Writes `.env` from the repository secrets
4. Runs `docker compose up --build -d` — only changed images are rebuilt
5. Runs `prisma db push` to apply any schema changes
6. The site is updated with zero manual steps

The PostgreSQL data is stored in a named Docker volume (`db_data`) and is **not** affected by redeploys.

---

## Day-to-day operations

### View logs

```bash
docker compose logs -f           # all services
docker compose logs -f backend   # backend only
```

### Restart a single service

```bash
docker compose restart backend
```

### Manual redeploy (without pushing to GitHub)

```bash
docker compose up --build -d
```

### Stop everything

```bash
docker compose down
```

### Stop and wipe the database (destructive)

```bash
docker compose down -v
```

### Open a database shell

```bash
docker compose exec db psql -U $POSTGRES_USER -d $POSTGRES_DB
```

### Run a Prisma command

```bash
docker compose exec backend npx prisma studio   # opens Prisma Studio (port 5555)
docker compose exec backend npx prisma db push  # manual schema sync
```
