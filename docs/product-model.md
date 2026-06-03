# ELLO Product Model

This is the working product model for the current PWA. It defines the entities needed before moving to a real database.

## Core Entities

### User

Represents login identity.

- `id`
- `email`
- `passwordHash`
- `role`: `client` or `professional`
- `profileId`
- `createdAt`
- `updatedAt`

Current local development uses a non-production password placeholder. Production must replace this with a real password hashing strategy and managed auth.

### Session

Represents a local development login session.

- `token`
- `userId`
- `createdAt`

### Client Profile

Represents a person hiring services.

- `id`
- `userId`
- `fullName`
- `birthDate`
- `city`
- `region`
- `interests`
- `avatarUrl`

### Professional Profile

Represents a service provider.

- `id`
- `userId`
- `publicName`
- `fullName`
- `specialty`
- `city`
- `coverage`
- `description`
- `basePrice`
- `chargeType`
- `availability`
- `materials`
- `verificationStatus`
- `profileStatus`
- `avatarUrl`
- `bannerUrl`

### Service

Represents a specific service sold by a professional.

- `id`
- `professionalId`
- `title`
- `description`
- `category`
- `basePrice`
- `chargeType`
- `active`

### Portfolio Item

Represents proof of work.

- `id`
- `professionalId`
- `title`
- `description`
- `imageUrl`
- `createdAt`

### Quote Request

Represents a customer request before a service is accepted.

- `id`
- `clientId`
- `professionalId`
- `description`
- `desiredDate`
- `location`
- `status`: `Novo pedido`, `Orcamento enviado`, `Aceito`, `Recusado`, `Cancelado`
- `createdAt`
- `updatedAt`

### Quote Response

Represents the professional answer to a request.

- `id`
- `quoteRequestId`
- `professionalId`
- `price`
- `estimatedDuration`
- `message`
- `expiresAt`

### Message

Represents chat inside a quote/service context.

- `id`
- `quoteRequestId`
- `senderUserId`
- `body`
- `createdAt`
- `readAt`

### Review

Represents post-service reputation.

- `id`
- `quoteRequestId`
- `clientId`
- `professionalId`
- `rating`
- `comment`
- `createdAt`

## Immediate Build Order

1. Auth and user identity.
2. Client/professional profile persistence.
3. Quote request creation and professional response.
4. Message thread attached to quote.
5. Portfolio uploads.
6. Reviews.
7. Payments/wallet.

## Storage Direction

Current development storage is JSON-file based. Production storage should move to Postgres with row-level ownership rules:

- clients can read/write their own profile;
- professionals can read/write their own profile;
- public professional fields can be read by clients;
- quote participants can read the quote and related messages;
- only the assigned professional can respond to a quote.
