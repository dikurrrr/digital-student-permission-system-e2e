# Muhi — Digital Student Permission System (E2E Tests)

End-to-end test suite for **Muhi**, the digital student permission system used by
boarding schools. The suite is built with [Cypress](https://www.cypress.io/) and
TypeScript, and covers authentication, admin user management, class setup, and
report downloads for the web front end.

Tests run against a deployed environment (mobile viewport, 390x844) and log in as
one of the application's roles: **Siswa** (student), **Musyrif/Ustadz** (supervisor),
or **Admin**.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Custom Commands](#custom-commands)
- [Test Suites](#test-suites)
- [Configuration](#configuration)
- [Known Limitations](#known-limitations)
- [License](#license)

---

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [Cypress](https://www.cypress.io/) `^14.5.2` | E2E test runner |
| TypeScript `^5.8.3` | Type-safe specs and custom commands |
| [cypress-xpath](https://github.com/cypress-io/cypress-xpath) `^2.0.1` | XPath selectors |
| [dotenv](https://github.com/motdotla/dotenv) `^17.2.1` | Loads `.env` credentials into the Cypress config |
| [cypress-dotenv](https://github.com/morficus/cypress-dotenv) `^3.0.1` | Installed; credentials are currently wired manually in `cypress.config.ts` |

## Requirements

- Node.js **18 or newer** (20 LTS recommended)
- npm
- Network access to the target environment (staging or production URL)
- Valid test accounts for each role you intend to test

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env

# 3. Fill in the URL and role credentials (see below)

# 4. Open the Cypress app
npm run cy:open
```

`.env` is git-ignored — never commit real credentials.

## Environment Variables

`cypress.config.ts` loads `.env` through `dotenv` and maps the values into
`Cypress.env()`:

```dotenv
# Target application (login page)
URL=https://your-environment.example.com

# Siswa (student)
CYPRESS_USER_SISWA=student@example.com
CYPRESS_PASS_SISWA=secret

# Musyrif / Ustadz (supervisor)
CYPRESS_USER_MUSYRIF=musyrif@example.com
CYPRESS_PASS_MUSYRIF=secret

# Admin
CYPRESS_USER_ADMIN=admin@example.com
CYPRESS_PASS_ADMIN=secret

# Optional: loading indicator used by cy.waitForLoading()
LOADING_SELECTOR=.loading-spinner
LOADING_TIMEOUT=10000
```

The config exposes these to tests as:

| Config key | Source | Used by |
| --- | --- | --- |
| `LOGIN_URL` | `URL` | `cy.URL()`, all login commands |
| `USERNAME_SISWA` / `PASSWORD_SISWA` | `CYPRESS_USER_SISWA` / `CYPRESS_PASS_SISWA` | `cy.loginSISWA()` |
| `USERNAME_MUSYRIF` / `PASSWORD_MUSYRIF` | `CYPRESS_USER_MUSYRIF` / `CYPRESS_PASS_MUSYRIF` | `cy.login_UST_ENV()` |
| `USERNAME_ADMIN` / `PASSWORD_ADMIN` | `CYPRESS_USER_ADMIN` / `CYPRESS_PASS_ADMIN` | `cy.loginAdmins()`, `cy.login_ADMIN_ENV()` |
| `LOADING_SELECTOR` | `LOADING_SELECTOR` | `cy.waitForLoading()` |
| `LOADING_TIMEOUT` | `LOADING_TIMEOUT` | `cy.waitForLoading()` |

If `URL` is empty, `cy.URL()` falls back to `http://localhost:3000`.

## Running Tests

| Script | Command | Description |
| --- | --- | --- |
| `npm run cy:open` | `cypress open` | Interactive runner — pick specs, watch mode |
| `npm run cy:run` | `cypress run` | Headless run of all matching specs |
| `npm run cy:run:headed` | `cypress run --headed` | Run in a visible browser |
| `npm run cy:run:auth` | `cypress run --spec "cypress/e2e/auth/**/*.cy.ts"` | Auth specs only |
| `npm run cy:run:admin` | `cypress run --spec "cypress/e2e/Admin/**/*.cy.ts"` | Admin specs only |
| `npm test` | `cypress run` | Alias for a full headless run (CI-friendly) |

For anything else, call the CLI directly:

```bash
# Single spec
npx cypress run --spec "cypress/e2e/auth/login_admin_env.cy.ts"

# Override the target URL for one run
URL=https://staging.example.com npm run cy:run

# Headed browser
npx cypress run --browser chrome --headed
```

Cypress writes screenshots, videos, and downloaded report files under
`cypress/screenshots`, `cypress/videos`, and `cypress/downloads`.

## Project Structure

```
.
├── .env.example               # Template for local credentials (copy to .env)
├── cypress.config.ts          # Cypress + dotenv config, timeouts, mobile viewport
├── tsconfig.json              # TypeScript config (Cypress + Node types)
├── cypress/
│   ├── e2e/
│   │   ├── auth/              # Login/logout flows per role
│   │   └── Admin/
│   │       ├── Laporan/       # Report download
│   │       ├── Setting Kelas/ # Class creation and bulk upload
│   │       └── User management/ # Create Musyrif/Satpam/Admin, search & filter
│   ├── fixtures/              # Static test data
│   ├── support/
│   │   ├── commands.ts        # Custom Cypress commands
│   │   ├── declare.ts         # TypeScript declarations for custom commands
│   │   └── e2e.ts             # Support file loaded before every spec
│   └── downloads/             # Generated artifacts (e.g. report .xlsx)
└── package.json
```

## Custom Commands

Defined in `cypress/support/commands.ts` and typed in `cypress/support/declare.ts`.

### Navigation and login

| Command | Description |
| --- | --- |
| `cy.URL()` | Visits `LOGIN_URL` (falls back to the default dev URL) |
| `cy.loginSISWA()` | Logs in with the student credentials |
| `cy.login_UST_ENV()` | Logs in with the Musyrif/Ustadz credentials |
| `cy.login_ADMIN_ENV()` | Logs in with the admin credentials |
| `cy.loginAdmins()` | Admin login used by the admin test suites |
| `cy.profile()` | Opens the profile menu |
| `cy.logout()` | Clicks logout |
| `cy.confirmLogout()` | Confirms the logout dialog |

All login commands fail fast with a clear error when credentials are missing, and
type passwords with `{ log: false }` so they are redacted from the runner output.

### Waits and stability

| Command | Description |
| --- | --- |
| `cy.waitForLoading()` | Waits for the loading selector to disappear (only if present) |
| `cy.waitShort()` | 500 ms pause |
| `cy.waitMiddle()` | 500 ms pause |
| `cy.waitLong()` | 500 ms pause |
| `cy.UncaughtException()` | Ignores `Uncaught:exception` errors and waits for loading |

### Admin flows

| Command | Description |
| --- | --- |
| `cy.AdminCreateMusyrif()` | Creates a Musyrif user from User Management |
| `cy.AdminCreateSecurity()` | Creates a Satpam/security user |
| `cy.AdminCreateAdmin()` | Creates an admin user |
| `cy.searchUser()` | Searches users and cycles every role filter |
| `cy.settingKelas()` | Creates a class with a random name |
| `cy.UploadClass()` | Creates a class used by the bulk-upload test |

> These commands contain hard-coded sample data (names, emails, phone numbers).
> Update them if the test environment rejects duplicate records.

## Test Suites

| Spec | Area | What it verifies |
| --- | --- | --- |
| `auth/login_admin_env.cy.ts` | Auth | Admin login → profile → logout |
| `auth/login_musyrif_env.cy.ts` | Auth | Musyrif login → profile → logout |
| `auth/login_siswa_env.cy.ts` | Auth | Student login → profile → logout |
| `Admin/User management/AdminCreateMusyrif.cy.ts` | User management | Create a Musyrif |
| `Admin/User management/AdminCreateSatpam.cy.ts` | User management | Create a security user |
| `Admin/User management/AdminCreateAdmin.cy.ts` | User management | Create an admin |
| `Admin/User management/AdminfiltersearcUser.cy.ts` | User management | Search and role filters |
| `Admin/Setting Kelas/AdminSettingClass.cy.ts` | Classes | Create a class |
| `Admin/Setting Kelas/AdminUploadClass.cy.ts` | Classes | Create a class for bulk upload |
| `Admin/Laporan/AdminLaporan.cy.ts` | Reports | Download the night-permission report |

## Configuration

Key settings in `cypress.config.ts`:

| Setting | Value | Why |
| --- | --- | --- |
| `viewportWidth` / `viewportHeight` | `390` / `844` | The app is tested as a mobile experience |
| `defaultCommandTimeout` | `60000` ms | Slow staging responses |
| `pageLoadTimeout` | `60000` ms | Initial app load |
| `requestTimeout` | `45000` ms | API calls during login |
| `redactLogData` | `true` | Keeps credentials out of logs |

XPath support is enabled by `require('cypress-xpath')` in `commands.ts` and the
`cypress-xpath` entry in `tsconfig.json`.

## Known Limitations

- Specs must match Cypress's default pattern `**/*.cy.{js,jsx,ts,tsx}`. The legacy
  files `auth/loginSiswa.ts`, `auth/loginUstadz.ts`, and `auth/loginAdmin.ts` do not,
  so they are not picked up by `cypress run`. They also call `cy.loginSiswa()`,
  `cy.loginUstadz()`, and `cy.loginAdmin()`, which are commented out in
  `commands.ts`. Use the `*_env.cy.ts` specs instead.
- `Admin/Laporan/AdminLaporan.cy.ts` calls `cy.AdminLaporan()`, which is declared in
  `declare.ts` but not implemented in `commands.ts`.
- `cypress-dotenv` is installed but not registered in `setupNodeEvents`; `dotenv`
  is called directly instead.
- The suite runs against a real environment, so tests depend on network
  availability, seed data, and unique emails/phone numbers for user creation.
- The JSON fixture in `cypress/fixtures/` is the Cypress starter example and is not
  currently used by any spec.

## License

ISC
