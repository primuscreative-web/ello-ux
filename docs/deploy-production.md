# ELLO Production Deploy

This is the first production deploy path for ELLO. The app is wired to the real Supabase project and currently published on Vercel.

Current validated status:

- GitHub repo: `primuscreative-web/ello-ux`
- Supabase project: `ello-production`
- Supabase ref: `qqrkchlxztdxxxvetxau`
- Supabase region: `sa-east-1`
- Supabase URL: `https://qqrkchlxztdxxxvetxau.supabase.co`
- Production API: `https://ello-api.vercel.app`
- Production frontend: `https://ello-ux.vercel.app`
- Local backend smoke test: passing with `storage: "supabase"`
- Frontend production build: passing

## 1. Create Supabase Project

1. Supabase project is already created.
   - Current ELLO project: `ello-production`
   - Project ref: `qqrkchlxztdxxxvetxau`
   - Region: `sa-east-1`
2. Link the local workspace with the Supabase CLI if a new machine is used.
3. Apply migrations when schema changes are added:

```powershell
supabase migration list
supabase db push --linked --yes
```

4. Copy project values from Supabase Dashboard > Project Settings > API:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Keep the service role key server-side only.

For local Windows verification, if Node cannot validate the Supabase TLS certificate, run:

```powershell
npm run test:smoke:ca
npm run start:ca
```

## 2. Deploy Backend on Vercel

The backend can run as a Vercel serverless Node/Express API through:

```text
ello-backend/api/index.js
ello-backend/vercel.json
```

Current Vercel project:

```text
primuscreative-webs-projects/ello-api
```

Required Vercel backend environment variables:

```text
NODE_ENV=production
ELLO_STORE_DRIVER=supabase
ELLO_ALLOWED_ORIGINS=https://ello-ux.vercel.app
ELLO_SESSION_TTL_MS=2592000000
SUPABASE_URL=https://qqrkchlxztdxxxvetxau.supabase.co
SUPABASE_ANON_KEY=<copy from Supabase API settings>
SUPABASE_SERVICE_ROLE_KEY=<copy from Supabase API settings, backend only>
```

Deploy:

```powershell
cd C:\Users\Yan Gabriel\Documents\ELLO\ello-backend
$env:NODE_OPTIONS='--use-system-ca'
vercel deploy --prod --yes
```

After deploy, test:

```text
https://ello-api.vercel.app/health
```

The backend validates production envs at startup. If any required Supabase or CORS variable is missing, Vercel should fail instead of serving a broken API.
Responses include `X-Request-Id`; keep that ID in support reports so logs can be correlated quickly. The Supabase driver also writes business audit events to `audit_events`.

## 3. Alternative Backend on Render

The backend deploy is described in:

```text
render.yaml
```

Recommended Render setup:

- New Web Service from GitHub repo `primuscreative-web/ello-ux`
- Root Directory: `ello-backend`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`

Required Render environment variables:

```text
NODE_ENV=production
ELLO_STORE_DRIVER=supabase
ELLO_ALLOWED_ORIGINS=https://your-frontend-domain
ELLO_SESSION_TTL_MS=2592000000
SUPABASE_URL=https://qqrkchlxztdxxxvetxau.supabase.co
SUPABASE_ANON_KEY=<copy from Supabase API settings>
SUPABASE_SERVICE_ROLE_KEY=<copy from Supabase API settings, backend only>
```

After deploy, test:

```text
https://your-render-api-domain/health
```

The backend validates production envs at startup. If any required Supabase or CORS variable is missing, Render should fail fast instead of serving a broken API.
Responses include `X-Request-Id`; keep that ID in support reports so logs can be correlated quickly. The Supabase driver also writes business audit events to `audit_events`.

## 4. Deploy Frontend on Vercel

The frontend deploy is described in:

```text
ello-frontend/vercel.json
```

Required Vercel environment variable:

```text
VITE_ELLO_API_URL=https://ello-api.vercel.app
```

The Vite app is a SPA, so `vercel.json` rewrites routes to `index.html`.

If a custom domain is added later, include both domains separated by comma:

```text
ELLO_ALLOWED_ORIGINS=https://ello.app,https://www.ello.app,https://your-vercel-domain
```

Redeploy the backend after changing CORS.

## 5. Production Smoke Test

After both deploys:

1. Open the frontend URL.
2. Create a client test account.
3. Create a professional test account.
4. Verify the professional appears in discovery.
5. Send a quote.
6. Respond as the professional.
7. Accept as the client.
8. Send messages in the quote chat.
9. Confirm `/health` shows `storage: "supabase"` and `records.auditEvents` increasing.

## 6. Before Public Launch

- Replace demo login shortcuts or hide them outside development.
- Confirm CORS only includes production domains.
- Confirm Supabase RLS policies are active.
- Configure backups and monitoring.
- Add privacy policy and terms.

## 7. What Requires the Owner

These steps should be done by the project owner in the provider dashboards:

- Confirm any paid Render/Vercel plan before creating a paid service.
- Copy `SUPABASE_SERVICE_ROLE_KEY` only into backend hosting environment variables.
- Never paste `SUPABASE_SERVICE_ROLE_KEY` into the frontend project, frontend env vars, or browser code.
- Connect or buy the final domain.
- Add Apple Developer and Google Play accounts when mobile packaging starts.

## 8. Local Production Verification Commands

Run these before every deploy:

```powershell
cd C:\Users\Yan Gabriel\Documents\ELLO\ello-backend
npm run test:smoke:ca
npm audit --audit-level=critical

cd C:\Users\Yan Gabriel\Documents\ELLO\ello-frontend
npm run build
```
