# ELLO Product Design

Date: 2026-06-01
Repository: primuscreative-web/ello-ux

## Vision

ELLO is a mobile-first marketplace for local services in Brazil. It connects clients who need trusted professionals with autonomous service providers who need visibility, requests, reputation, and eventually in-app payments.

The first market focus is Macae and nearby cities, with a long-term ambition to expand across Rio de Janeiro and then Brazil. The product should feel premium from the first version: refined visual design, strong responsive behavior, polished interactions, and a clean developer-grade architecture.

The product starts as a PWA built for web mobile and desktop web. This lets ELLO launch faster, avoid app store friction in the beginning, and still keep a future path open for Apple App Store and Google Play apps.

## Product Principles

- Mobile-first, not mobile-only.
- Premium first impression, even in an MVP.
- Fast path from discovery to service request.
- Professional profiles must build trust before contact.
- Provider tools should help autonomous workers manage demand, not just create a listing.
- Backend and frontend boundaries must be clean so native apps can reuse the API later.

## Users

### Client

A person who wants to find, compare, contact, and request services from local professionals.

### Professional

An autonomous service provider such as manicure, painter, builder, private driver, private security, cook, plumber, handyman, hairdresser, personal trainer, domestic worker, babysitter, and similar categories.

## Technical Direction

### Initial Stack

- Frontend: React + Vite PWA
- Styling: Tailwind CSS or equivalent token-driven CSS system
- Routing: React Router
- Backend: Node.js + Express
- Database target: PostgreSQL
- First implementation may use local mock data while preserving API-shaped boundaries

### Future Direction

- Native mobile apps can be built later with React Native or another mobile stack.
- The backend API should remain independent from the web frontend.
- Payment, verification, push notifications, and app-store release are future modules, not blockers for the first product surface.

## Approved First-Open Experience

When a user opens ELLO for the first time, they see a full-screen onboarding carousel with three slides. The carousel speaks to both clients and professionals together.

### Slide 1

Title: Encontre quem resolve

Purpose: Show clients that they can find nearby professionals, and show professionals that ELLO connects real demand with people who know how to do the work.

### Slide 2

Title: Mostre seu trabalho

Purpose: Show professionals that they can create a profile with portfolio, prices, and reputation. Show clients that they can inspect photos, reviews, and details before contacting someone.

### Slide 3

Title: Combine com confianca

Purpose: Show service requests, conversation, tracking, and evaluation. Payment can be hinted as a future direction only when it is implemented or clearly marked as coming soon.

### Actions After Carousel

- Primary action: Comecar
- Secondary action: Ja tenho conta
- After Comecar, the user chooses between Sou cliente and Sou profissional.

## Approved Entry And Registration Flow

### Role Choice

After onboarding, ELLO asks the user to choose:

- Sou cliente
- Sou profissional

### Client Registration

Client registration should be short:

- Name
- Birth date or age
- Profile photo
- Optional short bio
- Email
- Password
- Password confirmation

After registration, the client lands in the professional feed.

### Professional Registration

Professional registration happens in steps:

1. Basic data: name, birth date or age, work area, email, password.
2. Category-specific questions based on the selected work area.
3. Trust and identity: CPF or CNPJ, city, neighborhood, and future verification path.
4. Professional profile: profile photo, banner, description, price, charge type, portfolio photos, and service area.

After registration, the professional lands in the Professional Central.

The first MVP should avoid heavy document verification that blocks onboarding. CPF or CNPJ can be self-declared first. A verified badge can be introduced later.

## Approved Client Experience

The client's main screen is a professional feed.

### Mobile Client Feed

- Search bar at the top with suggestions while typing.
- Horizontal category rail: Beleza, Casa, Construcao, Mobilidade, Seguranca, Saude, Eventos.
- Vertical professional cards.
- Bottom navigation: Feed, Pedidos, Chat, Perfil.

### Professional Card

Each card shows:

- Portfolio image, banner, or service image
- Name
- Category
- Neighborhood and city
- Rating
- Base price or starting price
- Average response time
- Ver perfil action
- Solicitar orcamento action

### Professional Public Profile

The profile shows:

- Profile photo
- Banner
- Name
- Category
- Bio or description
- Prices and charge type
- Portfolio photos
- Reviews
- Basic availability
- Primary action: Solicitar orcamento
- Secondary action: Conversar

### Desktop Client Experience

- Main feed column.
- Side filters.
- Selected professional can open in a side panel so the user does not lose the feed context.

## Approved Professional Experience

After registration, the professional enters the Professional Central.

### Mobile Professional Navigation

Bottom navigation:

- Feed
- Central
- Pedidos
- Chat
- Perfil

### Mobile Professional Central

The Central shows:

- New requests
- Sent quotes
- Active services
- Average rating
- Estimated or future earnings
- Action cards for editing profile, updating portfolio, seeing requests, configuring prices, and setting availability.

### Desktop Professional Experience

Desktop uses a more complete management layout with a sidebar:

- Central
- Pedidos
- Chat
- Carteira
- Perfil
- Configuracoes

The main area shows:

- Monthly summary
- Recent requests
- Recent messages
- Profile status
- Visibility improvement tips

### Editable Professional Profile

The professional can edit:

- Profile photo
- Banner
- Category
- Bio
- Offered services
- Charge type
- Base price
- Gallery or portfolio
- City and serviced neighborhoods

### Request Statuses

Requests can have these statuses:

- Novo pedido
- Aguardando resposta
- Orcamento enviado
- Aceito
- Em andamento
- Concluido
- Cancelado

### Wallet

Carteira should appear in the information architecture, but it can start as coming soon or simulated data until real payments are integrated.

## First Implementation Scope

The first development cycle should build a polished, responsive PWA shell with:

- First-open carousel
- Role choice screen
- Client registration flow
- Professional registration flow
- Client feed
- Search and category filters
- Professional profile view
- Request quote flow
- Professional central
- Professional profile editing surface
- Requests list with statuses
- Desktop responsive layouts for client and professional modes
- Mock data and local state where backend persistence is not ready

## Out Of Scope For First Cycle

- Real payment gateway
- Real identity verification
- Real-time chat infrastructure
- Push notifications
- Native app builds
- App Store and Google Play release
- Production moderation and dispute workflows

These are important future modules, but they should not block the first premium product surface.

## Design Quality Requirements

- Mobile-first layout with desktop adaptation designed intentionally, not stretched.
- Premium visual language with consistent tokens, spacing, typography, shadows, radius, motion, and component states.
- No generic template feel.
- Strong onboarding imagery and short copy.
- Smooth transitions and microinteractions where they clarify state.
- Clear loading, empty, success, and error states.
- Accessible contrast, touch targets, focus states, and semantic structure.
- Reusable components for buttons, inputs, cards, navigation, panels, status tags, and profile media.

## Architecture Requirements

- Separate frontend and backend folders.
- Keep UI components reusable and small.
- Keep mock data separate from components.
- Preserve API-shaped service functions so real backend integration is straightforward.
- Avoid monolithic App components.
- Use route-level organization for onboarding, auth, client, and professional areas.
- Keep names and copy in Portuguese because the initial market is Brazil.

## Open Decisions For The Implementation Plan

- Exact visual brand direction: colors, typography personality, and imagery style.
- Whether the first cycle includes a real backend server or starts frontend-first with mock services.
- Whether authentication is simulated locally or implemented with real persistence in the first cycle.
- Which payment provider should be evaluated later for PIX and card support.
