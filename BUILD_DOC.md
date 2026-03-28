# Build Doc — phoenix-electric-miniapp
**Owner:** GIT-PHOENIX-HUB | **Last Updated:** 2026-03-27

## Objectives

1. Complete the JSX-to-TSX migration in the command app — remove legacy `main.jsx` and `App.jsx` so there is a single canonical entry point.
2. Move Azure OIDC client ID and tenant ID out of hardcoded fallback strings and into environment-only configuration.
3. Establish a test framework for the command app (at minimum, smoke tests for auth flow and API client).
4. Connect the mini app to the live Phoenix gateway and validate the full customer submission flow end-to-end.
5. Deploy the command app to Azure Static Web Apps with CI/CD from this repo.

## End State

**Mini App (miniapp/):** Fully deployed to `echo.phoenixelectric.life/miniapp/`. Customer service requests, generator leads, and maintenance bookings submit successfully to the gateway and relay formatted notifications to the Phoenix Electric Telegram channel. BotFather configuration is complete with all menu commands active.

**Command App (phoenix-command-app/):** Clean TypeScript-only codebase (no JSX legacy files). Deployed to Azure Static Web Apps. OIDC login via Azure AD works in production. Time clock, daily log, and AI query screens are functional and connected to live Azure Functions backend. PWA install works on mobile devices. Tests pass.

## Stack Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Mini app framework | Vanilla JS (no framework) | Telegram Mini Apps are lightweight WebViews — zero framework overhead is appropriate |
| Command app framework | React 18 + Vite 6 | Established, fast build, strong TypeScript support |
| Auth | MSAL / Azure AD OIDC | M365 tenant is the identity system — no separate auth layer needed |
| PWA | Service worker + manifest | Field technicians need offline resilience on job sites |
| i18n | Custom context (EN/ES) | Phoenix Electric serves bilingual workforce |
| State management | React Context only (no Redux) | App complexity does not justify Redux overhead |

## Architecture Targets

**Near-term:**
- Remove `main.jsx`, `App.jsx`, and all legacy JSX component files from `phoenix-command-app/src/`. The TSX versions are canonical.
- Remove hardcoded OIDC GUID fallbacks from `msalConfig.js` and `phoenix-api.js`. Environment variables must be set in deployment config (Azure Static Web Apps application settings + local `.env` for development). `.env` files must not be committed.
- Add `CLAUDE.md` / `AGENTS.md` to both `miniapp/` and `phoenix-command-app/` with behavioral rules for any agent working in this repo.

**Medium-term:**
- Establish GitHub Actions CI workflow: run TypeScript typecheck + lint on PRs targeting `main`.
- Add Vitest (or similar) test framework to command app. Write smoke tests for `msalConfig.js` and `phoenix-api.js`.
- Move `server-handler.js` and `bot-commands.js` integration into the Phoenix gateway repo (`phoenix-echo-bot`) — these files are integration stubs and belong with the gateway codebase.

**Long-term:**
- Evaluate whether both apps should remain in one repo or split into `phoenix-miniapp` and `phoenix-command-app` repos as they scale independently.
- Connect command app DailyLog and TimeClock screens to Service Fusion for automated job logging.

## Success Criteria

- [ ] No JSX files remain in `phoenix-command-app/src/` — TypeScript migration complete
- [ ] Azure OIDC identifiers removed from source; env-only in all environments
- [ ] Mini app end-to-end test: customer submits service request → gateway receives → Telegram notification fires
- [ ] Command app login works in production Azure Static Web Apps deployment
- [ ] TypeScript typecheck passes with zero errors (`tsc --noEmit`)
- [ ] At least one passing CI workflow on PR creation
- [ ] `CLAUDE.md` added to repo root documenting agent behavior rules

## Dependencies & Blockers

| Dependency | Status | Owner |
|-----------|--------|-------|
| Phoenix gateway (`phoenix-echo-bot`) running on VPS | Required for mini app submission flow | Shane / Echo |
| Azure Static Web Apps deployment slot | Not yet provisioned for command app | Shane |
| Azure Functions backend (`phoenix-command-func`) | Status unknown — may not be deployed yet | Shane |
| BotFather Mini App configuration | Steps in `BOTFATHER_SETUP.md` — completion status unknown | Shane |
| Environment variable provisioning (VITE_AZURE_CLIENT_ID etc.) | Not yet set in CI or Azure portal | Shane |

## Change Process

All changes to this repository follow the Phoenix Electric governance model:

1. **Branch:** Create feature branch from `main`
2. **Develop:** Make changes with clear, atomic commits
3. **PR:** Open pull request with description of changes
4. **Review:** Required approval from `@GIT-PHOENIX-HUB/humans-maintainers`
5. **CI:** All status checks must pass (when configured)
6. **Merge:** Squash merge to `main`
7. **No force push.** No direct commits to `main`. No deletion without `guardian-override-delete` label.

## NEEDS SHANE INPUT

- **Command app deployment:** Has Azure Static Web Apps slot been provisioned? What is the production URL?
- **Azure Functions backend:** Is `phoenix-command-func.azurewebsites.net` live and connected to Service Fusion / M365?
- **Mini app go-live status:** Has the `DEPLOYMENT.md` been executed on the VPS? Is the miniapp directory live?
- **JSX cleanup:** Confirm that the TSX files are the intended canonical versions before the JSX files are archived.
- **Repo split decision:** Should `miniapp/` and `phoenix-command-app/` eventually live in separate repos as they grow?
