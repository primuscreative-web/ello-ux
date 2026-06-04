# ELLO API Contract

This document describes the current local API contract. The implementation is intentionally simple: Express routes with JSON-file persistence for development. The shape should remain stable when the storage layer moves to Postgres/Supabase.

## Base URL

Local development:

```text
http://localhost:3001
```

Frontend override:

```text
VITE_ELLO_API_URL=http://localhost:3001
```

## Security Defaults

The local API now applies baseline production-minded safeguards:

- restricted CORS via `ELLO_ALLOWED_ORIGINS` with localhost defaults;
- `64kb` JSON body limit;
- security headers such as `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`;
- general in-memory rate limit for local development;
- stricter login/signup rate limits;
- random session tokens with expiration controlled by `ELLO_SESSION_TTL_MS`;
- request trimming and maximum field lengths on public write endpoints.

## Storage Driver

Local development defaults to JSON:

```text
ELLO_STORE_DRIVER=json
```

Production can switch to Supabase after applying migrations and configuring:

```text
ELLO_STORE_DRIVER=supabase
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The backend storage boundary is:

```text
ello-backend/src/data/store.js
```

Routes should continue importing from that boundary instead of importing a driver directly.

Example allowed origins override:

```text
ELLO_ALLOWED_ORIGINS=https://ello.app,https://www.ello.app
```

## Health

```http
GET /health
```

Response:

```json
{
  "status": "ok",
  "service": "ELLO API",
  "version": "0.2.0",
  "storage": "json-file",
  "records": {
    "users": 0,
    "sessions": 0,
    "clients": 0,
    "professionalSignups": 0,
    "quotes": 0
  }
}
```

## Authentication

```http
POST /auth/login
GET /auth/me
```

Login payload:

```json
{
  "email": "user@example.com",
  "password": "12345678"
}
```

Successful login returns:

```json
{
  "data": {
    "token": "session-...",
    "user": {
      "id": "user-...",
      "email": "user@example.com",
      "role": "client",
      "profileId": "client-...",
      "createdAt": "2026-06-03T00:00:00.000Z"
    }
  }
}
```

Current user lookup:

```http
GET /auth/me
Authorization: Bearer session-...
```

## Client Signup

```http
POST /signups/clients
```

Required fields:

- `fullName`
- `birthDate`
- `city`
- `email`
- `password`
- `confirmPassword`

Optional fields:

- `region`
- `interests`

The API validates the payload and returns sanitized profile data plus a development session token. Password fields are not returned.

## Professional Signup

```http
POST /signups/professionals
```

Required fields:

- `fullName`
- `birthDate`
- `specialty`
- `email`
- `password`
- `confirmPassword`
- `experience`
- `city`
- `coverage`
- `document`
- `phone`
- `fiscalCity`
- `description`
- `basePrice`
- `chargeType`

Optional fields:

- `materials`
- `availability`
- `publicName`
- `paymentKey`
- `supportDocument`
- `portfolio`

The API creates a professional signup with:

- `verificationStatus: "pending"`
- `profileStatus: "draft"`

## Quotes

```http
POST /quotes
GET /quotes
PATCH /quotes/:id/response
PATCH /quotes/:id/status
GET /quotes/:id/messages
POST /quotes/:id/messages
```

Quote creation requires an authenticated session:

```http
Authorization: Bearer session-...
```

Required fields for quote creation:

- `professionalId`
- `description`
- `desiredDate`
- `location`

Created quotes currently start with:

```json
{
  "status": "Novo pedido"
}
```

Quote listing is scoped by session:

- client sessions see their own quote requests;
- professional sessions see quote requests available for response in the local development store.

Professional response payload:

```json
{
  "responsePrice": "R$ 180",
  "responseEta": "Amanha as 14h",
  "responseMessage": "Consigo fazer o servico com material incluso."
}
```

Responding changes the quote status to:

```json
{
  "status": "Orcamento enviado"
}
```

Quote message payload:

```json
{
  "body": "Ola, podemos alinhar o horario?"
}
```

Quote messages are scoped by session. Clients can read and send messages only in their own requests. Professional sessions can read and send messages in available local development requests.

Client status update payload:

```json
{
  "status": "Aceito"
}
```

Allowed client statuses:

- `Aceito`
- `Cancelado`

## Error Shape

Validation errors return:

```json
{
  "errors": {
    "fieldName": "Mensagem de erro."
  }
}
```

HTTP status:

```text
422
```

## Current Storage

Development data is stored in:

```text
ello-backend/data/ello-dev-store.json
```

This directory is ignored by Git because it may contain user data from local testing.
