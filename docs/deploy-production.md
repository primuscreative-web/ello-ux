# ELLO Production Deploy

This is the first production deploy path for ELLO.

## 1. Create Supabase Project

1. Create a Supabase project.
2. Link the local workspace with the Supabase CLI.
3. Apply migrations:

```powershell
supabase migration list
supabase db push --linked --yes
```

4. Copy project values:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Keep the service role key server-side only.

## 2. Deploy Backend on Render

The backend deploy is described in:

```text
render.yaml
```

Required Render environment variables:

```text
NODE_ENV=production
ELLO_STORE_DRIVER=supabase
ELLO_ALLOWED_ORIGINS=https://your-frontend-domain
ELLO_SESSION_TTL_MS=2592000000
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

After deploy, test:

```text
https://your-api-domain/health
```

## 3. Deploy Frontend on Vercel

The frontend deploy is described in:

```text
ello-frontend/vercel.json
```

Required Vercel environment variable:

```text
VITE_ELLO_API_URL=https://your-api-domain
```

The Vite app is a SPA, so `vercel.json` rewrites routes to `index.html`.

## 4. Production Smoke Test

After both deploys:

1. Open the frontend URL.
2. Create a client test account.
3. Create a professional test account.
4. Verify the professional appears in discovery.
5. Send a quote.
6. Respond as the professional.
7. Accept as the client.
8. Send messages in the quote chat.

## 5. Before Public Launch

- Replace demo login shortcuts or hide them outside development.
- Confirm CORS only includes production domains.
- Confirm Supabase RLS policies are active.
- Configure backups and monitoring.
- Add privacy policy and terms.
