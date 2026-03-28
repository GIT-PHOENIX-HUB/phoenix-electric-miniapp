# Product Bible — phoenix-electric-miniapp
**Owner:** GIT-PHOENIX-HUB | **Last Updated:** 2026-03-27

## Purpose
This repo houses two customer-facing Phoenix Electric applications: the **Phoenix Mini App** (Telegram Mini App for customer service requests, generator sizing, and maintenance booking) and the **Phoenix Command App** (React/TypeScript internal management interface for field technicians). The mini app serves customers directly through the Telegram bot channel; the command app serves Phoenix Electric employees — primarily field technicians — for time tracking, daily log submission, and AI-assisted queries.

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime (mini app) | Vanilla JS / Browser | — |
| Runtime (command app) | Node.js (Vite build) | — |
| Framework (command app) | React | 18.3.1 |
| Build (command app) | Vite | 6.0.5 |
| Language (command app) | TypeScript / TSX (migration in progress, JSX legacy present) | — |
| Auth (command app) | MSAL — Azure AD OIDC | @azure/msal-browser ^4.27.0, @azure/msal-react ^3.0.23 |
| Icons | Lucide React | 0.468.0 |
| Test | None configured | — |
| CI/CD | GitHub Actions (inherits CODEOWNERS) | — |
| Deploy Target (mini app) | VPS static files at `/opt/phoenix-echo-gateway/miniapp/` via Nginx | echo.phoenixelectric.life |
| Deploy Target (command app) | Azure Static Web Apps (PWA, service worker present) | — |

## Architecture

The repo is split into two self-contained directories with no shared build system.

```
phoenix-electric-miniapp/
├── miniapp/                         # Telegram Mini App — customer-facing
│   ├── index.html                   # App shell + all screen markup
│   ├── style.css                    # Phoenix red/black theme
│   ├── app.js                       # Frontend logic — navigation, generator sizing engine,
│   │                                #   form submission, Telegram WebApp API integration
│   ├── server-handler.js            # Express route handler — POST /api/miniapp/submit
│   ├── bot-commands.js              # Telegram bot command router (/start, /service, etc.)
│   ├── BOTFATHER_SETUP.md           # BotFather configuration reference
│   └── DEPLOYMENT.md                # VPS deployment steps + Nginx config
│
├── phoenix-command-app/             # Internal management PWA — field technicians
│   ├── index.html                   # Vite SPA root
│   ├── package.json                 # Manifest: phoenix-command v0.1.0
│   ├── vite.config.js               # Vite build config
│   ├── tsconfig.json                # TypeScript config
│   ├── public/
│   │   ├── manifest.json            # PWA manifest
│   │   ├── sw.js                    # Service worker (offline support)
│   │   ├── offline.html             # Offline fallback page
│   │   ├── app-init.js              # Pre-React initialization
│   │   └── staticwebapp.config.json # Azure Static Web Apps routing rules
│   └── src/
│       ├── main.tsx                 # Canonical entry point (TSX)
│       ├── main.jsx                 # Legacy entry — migration artifact, not canonical
│       ├── App.tsx                  # Canonical app root (TSX)
│       ├── App.jsx                  # Legacy app root — migration artifact
│       ├── auth/msalConfig.js       # MSAL OIDC config — reads from env vars
│       ├── api/phoenix-api.js       # Phoenix Gateway + Azure Functions API client
│       ├── screens/                 # 6 TSX screens: Dashboard, DailyLog, TimeClock,
│       │                            #   Teams, Files, Splash
│       ├── components/              # Mixed JSX/TSX components — layout + chat subdirs are TSX;
│       │                            #   legacy screens (Dashboard, TimeClock, etc.) still JSX
│       ├── context/                 # AppContext.tsx, TimerContext.tsx
│       ├── hooks/useAuth.ts         # Auth hook
│       ├── theme/                   # tokens.ts, styles.ts — design tokens
│       ├── i18n/                    # EN + ES translations (i18n context)
│       └── types/index.ts           # Shared TypeScript types
│
├── CODEOWNERS                       # GitHub branch protection + review routing
├── PRODUCT_BIBLE.md                 # This file
└── BUILD_DOC.md                     # Roadmap and change process
```

## Auth & Security

**Mini App:** No authentication on the customer-facing mini app. Form submissions POST to the Phoenix gateway at `echo.phoenixelectric.life/api/miniapp/submit` with the Telegram `initData` header for server-side validation. Bot token is read from `TELEGRAM_BOT_TOKEN` environment variable — never hardcoded.

**Command App:** Authentication uses Azure AD OIDC via MSAL browser library. Auth config (`src/auth/msalConfig.js`) reads client ID and tenant ID from environment variables (`VITE_AZURE_CLIENT_ID`, `VITE_AZURE_TENANT_ID`). Hardcoded fallback GUIDs exist in the current source as a migration artifact — this is flagged in Known Issues. These are non-secret identifiers but their presence in source should be resolved. The Azure Functions backend uses bearer token validation; the optional `VITE_FUNCTION_KEY` env var passes a function key header if configured.

No secrets, credentials, or tokens are committed to this repo.

## Integrations

| Integration | Purpose |
|------------|---------|
| Telegram Bot API | Mini app form submissions relay through Telegram bot; bot commands launch mini app WebView |
| Phoenix Gateway (echo.phoenixelectric.life) | Mini app POSTs service requests, generator leads, and maintenance requests to the gateway API |
| Azure Active Directory | OIDC identity provider for the command app — field technician login |
| Azure Functions (phoenix-command-func.azurewebsites.net) | Backend API for time clock, daily log, and AI orchestration endpoints |
| Microsoft Graph API | `User.Read` scope for employee profile |
| Phoenix AI Orchestrator | `askPhoenixAI()` sends queries to the `/orchestrate` Azure Function endpoint |

## File Structure

| Path | Purpose |
|------|---------|
| `miniapp/index.html` | App shell + all Telegram Mini App screen markup |
| `miniapp/app.js` | Generator sizing engine, form logic, Telegram WebApp API wiring |
| `miniapp/server-handler.js` | Server-side route handler for mini app form submissions (integrates into gateway) |
| `miniapp/bot-commands.js` | Bot command router — routes `/start`, `/service`, `/generator`, `/maintenance` to mini app |
| `miniapp/style.css` | Phoenix Electric theme — red/black color scheme |
| `miniapp/DEPLOYMENT.md` | VPS deployment guide, Nginx config, BotFather link |
| `phoenix-command-app/src/auth/msalConfig.js` | MSAL OIDC config — client ID, tenant ID, redirect URIs |
| `phoenix-command-app/src/api/phoenix-api.js` | API client — clock in/out, daily log, AI query |
| `phoenix-command-app/src/screens/` | 6 screen components: Dashboard, DailyLog, TimeClock, Teams, Files, Splash |
| `phoenix-command-app/public/sw.js` | Service worker — enables offline PWA mode |
| `CODEOWNERS` | Branch protection — routes PRs to maintainers |

## Current State

- **Status:** Active (miniapp), Semi-active (command app)
- **Last Commit:** 2026-03-27 — `Add CODEOWNERS for Phoenix Electric governance`
- **Prior Significant Commit:** `cfd5170` — `Initial commit: Phoenix Mini App and Command App`
- **Open PRs:** 0 (on main)
- **Open Branches:** 2 remote — `claude/phoenix-parallel-build-8tcBF`, `feature/phoenix-apps-hardening-20260322-r2`
- **Known Issues:**
  - **MEDIUM — Azure OIDC client ID and tenant ID committed as hardcoded fallbacks** in `src/auth/msalConfig.js` and `src/api/phoenix-api.js`. These are non-secret GUIDs but identify the tenant. Env-only configuration is the target; fallbacks should be removed.
  - **MEDIUM — Dual JSX/TSX coexistence** in command app. Both `main.jsx` and `main.tsx` exist; same for `App`. The TSX files are canonical but the JSX versions have not been removed. Migration is mid-flight.
  - **LOW — No tests configured.** `test` script exits without running. No test framework is installed.
  - **LOW — No linter configured.** `lint` and `typecheck` scripts are stubs. Code quality is not enforced.
  - **LOW — No CLAUDE.md / AGENTS.md** present. Any agent entering cold has no repo-specific behavioral instructions.

## Branding & UI

Phoenix Electric brand colors:
- Primary red: `#E63946` (used as `--phoenix-red` or `--primary` in CSS variables)
- Black / dark background: `#0a0a0a`, `#111`
- Gold accent: referenced in other Phoenix repos; not yet confirmed in this repo's CSS
- Theme: Dark-first, adapts to Telegram theme for mini app (`tg-theme-light` class applied on light mode)

## Action Log

| Commit | Date | Description |
|--------|------|-------------|
| 9a348bd | 2026-03-27 | Add CODEOWNERS for Phoenix Electric governance |
| cfd5170 | 2026-03-14 | Initial commit: Phoenix Mini App and Command App |

## Key Milestones

| Date | Milestone |
|------|-----------|
| 2026-03-14 | Repo created — initial mini app and command app committed together |
| 2026-03-27 | CODEOWNERS added; governance docs added |
