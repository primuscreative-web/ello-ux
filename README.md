# ELLO

ELLO is a premium mobile-first PWA marketplace for local services in Brazil.

## Structure

- `ello-frontend`: React + Vite PWA interface.
- `ello-backend`: Node.js + Express API boundary.

## Run Frontend

```powershell
cd ello-frontend
npm install
npm run dev
```

## Run Backend

```powershell
cd ello-backend
npm install
npm run dev
```

## Product Direction

The first version focuses on onboarding, role-based registration, client discovery, quote requests, and professional management surfaces. Payments, real identity verification, real-time chat, and native apps are future modules.

## Current API State

The backend now supports local write flows for client signup, professional signup, and quote requests. Development data is persisted to `ello-backend/data/ello-dev-store.json`, which is ignored by Git.

See:

- `docs/api-contract.md`
- `docs/product-model.md`

## Local NPM Note

This workspace includes project-level `.npmrc` files with `strict-ssl=false` because this Windows environment was unable to complete npm registry certificate revocation checks. Remove that setting if the development machine installs npm packages normally with strict SSL enabled.
