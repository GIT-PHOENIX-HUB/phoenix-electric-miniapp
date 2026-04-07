# Archived: phoenix-command-app (removed 2026-03-22)

## What was removed
Employee app code (`phoenix-command-app/`) was embedded inside the customer-facing
`phoenix-electric-miniapp` repo. This included:

- Azure AD authentication config with hardcoded client/tenant IDs
- Internal employee tools (time tracking, daily logs, dispatch, AI chat)
- Internal API endpoints and configuration

## Why it was removed
- Security: Customer-facing repo must not contain internal employee tooling
  or Azure AD credentials viewable by customers
- Repo hygiene: Violates three-repo/three-lane separation rule

## Canonical source
The employee app lives in its own repo:
  github.com/shane7777777777777/phoenix-command-app

## Secrets flagged for rotation
The following were committed to git history and should be rotated:
- Azure AD Client ID: 8b78f443-e000-4689-ad57-71e4e616960f
- Azure AD Tenant ID: e7d8daef-fd5b-4e0b-bf8f-32f090c7c4d5

Removing from working tree does NOT remove from git history.
