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
