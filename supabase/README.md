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

## Security Direction

The schema enables RLS for all app tables. Public read access is limited to professional/service/portfolio/review data that is intentionally visible. Quote and message data is scoped to the participating client and professional.
