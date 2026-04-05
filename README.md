# Phoenix Electric Telegram Mini App

**Phoenix Electric's customer-facing Telegram Mini App** — service requests, Generac generator sizing, maintenance booking, and AI-assisted customer intake.

**Status:** Active | **Visibility:** Public | **License:** Proprietary

---

## Overview

This repository contains the Phoenix Electric Telegram Mini App, a web application integrated with Telegram's Bot API that enables customers to:

- Submit service requests for electrical work
- - Use the Generac generator sizing calculator
  - - Book maintenance appointments
    - - Interact with Phoenix Echo Bot for AI-assisted intake
     
      - Phoenix Electric is an **authorized Generac dealer** and **Colorado Licensed Electrical Contractor (#101501)**.
     
      - ## Repository Structure
     
      - ```
        phoenix-electric-miniapp/
        ├── miniapp/                    # Telegram Mini App (primary application)
        │   ├── index.html              # Entry point
        │   ├── app.js                  # Application logic
        │   ├── styles.css              # Styling
        │   └── ...
        ├── phoenix-command-app/        # ⚠️ DUPLICATE — see note below
        │   └── ...
        ├── BUILD_DOC.md                # Build documentation
        ├── PRODUCT_BIBLE.md            # Product bible
        ├── CODEOWNERS                  # Code ownership
        └── README.md                   # This file
        ```

        ### About `phoenix-command-app/`

        > **Note:** The `phoenix-command-app/` directory in this repository is a **duplicate** of the standalone [phoenix-command-app](https://github.com/GIT-PHOENIX-HUB/phoenix-command-app) repository. The standalone repository is the **canonical version** (10 commits vs 3 here, with its own README, i18n support, and active development). This subfolder exists from the initial commit and should be treated as a reference copy only.
        >
        > ## Tech Stack
        >
        > - **Frontend:** HTML, CSS, JavaScript, TypeScript
        > - - **Platform:** Telegram Mini App (WebApp API)
        >   - - **Bot Integration:** Phoenix Echo Bot (@PhoenixElectricBot)
        >     - - **Hosting:** Azure Static Web Apps
        >      
        >       - ## Branches
        >      
        >       - | Branch | Purpose | Status |
        >       - |--------|---------|--------|
        >       - | `main` | Production | Active |
        > | `feature/phoenix-apps-hardening-20260322-r2` | Security hardening + decontamination | PR #1 — has significant improvements |
        > | `claude/phoenix-parallel-build-8tcBF` | Config + design system + mock data | Review needed |
        > | `governance-docs` | Governance documents | PR #2 |
        > | `integration/repo-transformation-20260328` | Triage + verification | PR #3 |
        >
        > ## Related Repositories
        >
        > - [phoenix-command-app](https://github.com/GIT-PHOENIX-HUB/phoenix-command-app) — Internal operations dashboard (canonical version)
        > - - [phoenix-echo-bot](https://github.com/GIT-PHOENIX-HUB/phoenix-echo-bot) — Telegram bot backend
        >   - - [Phoenix-ECHO](https://github.com/GIT-PHOENIX-HUB/Phoenix-ECHO) — Echo's identity and operational home
        >    
        >     - ## Authorship
        >    
        >     - This application was built by **Browser Echo (BBB)** — Phoenix Electric's browser-based AI agent. 100% of the initial application code was authored by Browser Echo during the Phoenix Electric product build cycle.
        >    
        >     - ## Phoenix Electric AI Ecosystem
        > 
        Part of the [GIT-PHOENIX-HUB](https://github.com/GIT-PHOENIX-HUB) organization — Phoenix Electric's AI-powered business automation platform.

        ---

        *Phoenix Electric — Colorado Licensed Electrical Contractor #101501 | Authorized Generac Dealer*
