# ELLO Supabase

This folder contains the production database foundation for ELLO.

## Apply Migrations

```powershell
supabase migration list
supabase db push --linked --yes
```

## Main Tables

- `profiles`
- `client_profiles`
- `professional_profiles`
- `services`
- `portfolio_items`
- `quote_requests`
- `quote_messages`
- `reviews`
- `audit_events`

## Storage Buckets

- `avatars`
- `portfolio`
- `quote-attachments`

Expected object paths:

- `avatars/{user_id}/avatar.webp`
- `portfolio/{professional_profile_id}/{asset_name}.webp`
- `quote-attachments/{quote_request_id}/{asset_name}`

## Security Direction

The schema enables RLS for all app tables. Public read access is limited to professional/service/portfolio/review data that is intentionally visible. Quote and message data is scoped to the participating client and professional.

## Backend Driver Plan

The backend now has a storage boundary:

```text
ello-backend/src/data/store.js
```

Local development still defaults to:

```text
ELLO_STORE_DRIVER=json
```

The next implementation step is replacing the placeholder `supabaseStore` with the real Supabase Auth/PostgREST adapter and then switching:

```text
ELLO_STORE_DRIVER=supabase
```
