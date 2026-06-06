# ELLO Launch Checklist

Use this checklist before any public test.

## Backend

- Supabase project created.
- `supabase db push --linked --yes` applied.
- Render service deployed from `render.yaml`.
- `ELLO_STORE_DRIVER=supabase`.
- `ELLO_ALLOWED_ORIGINS` contains only real frontend domains.
- `SUPABASE_SERVICE_ROLE_KEY` exists only in backend hosting.
- `/health` returns `storage: "supabase"`.

## Frontend

- Vercel project points to `ello-frontend`.
- `VITE_ELLO_API_URL` points to the Render API URL.
- PWA manifest loads.
- Service worker loads.
- Mobile onboarding, signup, feed, orders and chat render on production URL.

## Product Smoke Test

- Create client account.
- Create professional account.
- Professional appears in discovery.
- Client creates quote.
- Professional responds.
- Client accepts quote.
- Both participants exchange chat messages.

## Security

- CI is green.
- Backend audit has no critical vulnerabilities.
- Backend smoke test passes with `npm run test:smoke`.
- Demo shortcuts are only visible in development builds.
- Supabase RLS is enabled on all app tables.
- No `.env` files are committed.
