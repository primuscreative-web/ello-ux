# ELLO Launch Checklist

Use this checklist before any public test.

## Backend

- Supabase project created.
- `supabase db push --linked --yes` applied.
- Render service deployed from `render.yaml`.
- `ELLO_STORE_DRIVER=supabase`.
- `ELLO_ALLOWED_ORIGINS` contains only real frontend domains.
- `SUPABASE_SERVICE_ROLE_KEY` exists only in backend hosting.
- Backend production env validation passes on startup.
- `/health` returns `storage: "supabase"`.
- `/health` records include `auditEvents`.
- Responses include `X-Request-Id` and backend logs include matching request IDs.

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
- Favorite a professional.
- Client creates quote.
- Professional responds.
- Client accepts quote.
- Both participants exchange chat messages.
- Client submits a review after an accepted/completed order.
- Trust/support page renders.
- Admin demo page renders and shows reports/professionals.

## Security

- CI is green.
- Backend audit has no critical vulnerabilities.
- Backend smoke test passes with `npm run test:smoke`.
- Audit events are created during signup, login, quote, quote response, status update and chat message flows.
- Demo shortcuts are only visible in development builds.
- Supabase RLS is enabled on all app tables.
- Supabase Storage policies are active for avatars, portfolio and quote attachments.
- No `.env` files are committed.
- Local demo fallbacks are replaced or backed by Supabase before public launch.
