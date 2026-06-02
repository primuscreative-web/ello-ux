# ELLO PWA Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first premium mobile-first and desktop-responsive ELLO PWA shell with onboarding, role-based registration, client feed, professional profile, quote request flow, and professional central using mock data and API-shaped boundaries.

**Architecture:** Create a React + Vite frontend in `ello-frontend` and a minimal Node + Express backend in `ello-backend`. The frontend owns the first visible product experience with reusable route-level modules, design tokens, shared components, mock data, and service functions that can later point to the backend. The backend starts with health and mock read endpoints so the repository already has a clean API boundary.

**Tech Stack:** React, Vite, React Router, Tailwind CSS, Lucide React, Framer Motion, Node.js, Express, CORS, dotenv.

---

## File Structure

Create these folders and files:

- `ello-frontend/package.json`: frontend dependencies and scripts.
- `ello-frontend/index.html`: Vite entry HTML.
- `ello-frontend/vite.config.js`: Vite React config.
- `ello-frontend/tailwind.config.js`: Tailwind theme extension for ELLO tokens.
- `ello-frontend/postcss.config.js`: Tailwind/PostCSS config.
- `ello-frontend/src/main.jsx`: React root.
- `ello-frontend/src/App.jsx`: route composition only.
- `ello-frontend/src/styles/index.css`: global CSS, Tailwind layers, app background, focus styles.
- `ello-frontend/src/data/elloData.js`: categories, professionals, requests, onboarding slides, dashboard stats.
- `ello-frontend/src/services/elloService.js`: API-shaped async accessors backed by mock data first.
- `ello-frontend/src/components/ui/Button.jsx`: shared button component.
- `ello-frontend/src/components/ui/Input.jsx`: shared input component.
- `ello-frontend/src/components/ui/StatusPill.jsx`: shared status pill.
- `ello-frontend/src/components/layout/MobileShell.jsx`: bottom navigation shell.
- `ello-frontend/src/components/layout/DesktopShell.jsx`: desktop sidebar/topbar shell.
- `ello-frontend/src/features/onboarding/Onboarding.jsx`: three-slide first-open carousel.
- `ello-frontend/src/features/auth/RoleChoice.jsx`: client/professional choice.
- `ello-frontend/src/features/auth/ClientSignup.jsx`: client registration.
- `ello-frontend/src/features/auth/ProfessionalSignup.jsx`: multi-step professional registration.
- `ello-frontend/src/features/client/ClientFeed.jsx`: client feed with search/category filtering.
- `ello-frontend/src/features/client/ProfessionalCard.jsx`: professional card.
- `ello-frontend/src/features/client/ProfessionalProfile.jsx`: public professional profile and quote entry.
- `ello-frontend/src/features/client/QuoteRequest.jsx`: quote request flow.
- `ello-frontend/src/features/professional/ProfessionalCentral.jsx`: professional dashboard.
- `ello-frontend/src/features/professional/ProfessionalProfileEditor.jsx`: editable professional profile surface.
- `ello-frontend/src/features/professional/RequestsBoard.jsx`: request status list.
- `ello-backend/package.json`: backend dependencies and scripts.
- `ello-backend/server.js`: Express server.
- `ello-backend/src/data/mockData.js`: backend mock payloads.
- `ello-backend/src/routes/health.js`: health endpoint.
- `ello-backend/src/routes/professionals.js`: professionals endpoints.
- `README.md`: setup, run commands, and project direction.

---

### Task 1: Scaffold Frontend And Backend

**Files:**
- Create: `ello-frontend/*`
- Create: `ello-backend/*`
- Modify: `README.md`

- [ ] **Step 1: Create the Vite React app**

Run:

```powershell
npm create vite@latest ello-frontend -- --template react
```

Expected: Vite creates `ello-frontend` with React starter files.

- [ ] **Step 2: Install frontend dependencies**

Run:

```powershell
Set-Location ello-frontend
npm install
npm install @vitejs/plugin-react react-router-dom lucide-react framer-motion
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer
Set-Location ..
```

Expected: `ello-frontend/package.json` contains React, Vite, Router, Lucide, Framer Motion, and Tailwind tooling.

- [ ] **Step 3: Create backend package**

Run:

```powershell
New-Item -ItemType Directory -Force ello-backend
Set-Location ello-backend
npm init -y
npm install express cors dotenv
npm install -D nodemon
Set-Location ..
```

Expected: `ello-backend/package.json` exists with Express dependencies.

- [ ] **Step 4: Replace frontend package scripts**

Modify `ello-frontend/package.json` scripts to:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

Expected: `npm run dev` starts the frontend and `npm run build` creates a production build.

- [ ] **Step 5: Replace backend package scripts**

Modify `ello-backend/package.json` scripts to:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

Expected: `npm run dev` starts the backend with nodemon and `npm start` starts it normally.

- [ ] **Step 6: Create README**

Create `README.md`:

```markdown
# ELLO

ELLO is a premium mobile-first PWA marketplace for local services in Brazil.

## Structure

- `ello-frontend`: React + Vite PWA interface.
- `ello-backend`: Node.js + Express API boundary.

## Run Frontend

```powershell
cd ello-frontend
npm install
npm run dev
```

## Run Backend

```powershell
cd ello-backend
npm install
npm run dev
```

## Product Direction

The first version focuses on onboarding, role-based registration, client discovery, quote requests, and professional management surfaces. Payments, real identity verification, real-time chat, and native apps are future modules.
```

Expected: The repository has clear local setup instructions.

- [ ] **Step 7: Verify scaffold**

Run:

```powershell
cd ello-frontend
npm run build
cd ..
cd ello-backend
npm start
```

Expected: frontend build succeeds. Backend start is verified after Task 2 adds `server.js`.

- [ ] **Step 8: Commit scaffold**

Run:

```powershell
git add README.md ello-frontend ello-backend
git commit -m "chore: scaffold ELLO frontend and backend"
```

Expected: commit succeeds.

---

### Task 2: Add Backend API Boundary

**Files:**
- Create: `ello-backend/server.js`
- Create: `ello-backend/src/data/mockData.js`
- Create: `ello-backend/src/routes/health.js`
- Create: `ello-backend/src/routes/professionals.js`

- [ ] **Step 1: Add backend mock data**

Create `ello-backend/src/data/mockData.js`:

```js
const professionals = [
  {
    id: 'ana-manicure',
    name: 'Ana Martins',
    category: 'Beleza',
    city: 'Macae',
    neighborhood: 'Cavaleiros',
    rating: 4.9,
    responseTime: 'Responde em 20 min',
    price: 'A partir de R$ 45',
    chargeType: 'por atendimento'
  },
  {
    id: 'bruno-pintor',
    name: 'Bruno Azevedo',
    category: 'Construcao',
    city: 'Macae',
    neighborhood: 'Imbetiba',
    rating: 4.8,
    responseTime: 'Responde em 1h',
    price: 'A partir de R$ 18/m2',
    chargeType: 'por metro'
  }
]

module.exports = { professionals }
```

- [ ] **Step 2: Add health route**

Create `ello-backend/src/routes/health.js`:

```js
const { Router } = require('express')

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ELLO API',
    version: '0.1.0'
  })
})

module.exports = router
```

- [ ] **Step 3: Add professionals route**

Create `ello-backend/src/routes/professionals.js`:

```js
const { Router } = require('express')
const { professionals } = require('../data/mockData')

const router = Router()

router.get('/', (req, res) => {
  const search = String(req.query.search || '').toLowerCase()
  const category = String(req.query.category || '').toLowerCase()

  const filtered = professionals.filter((professional) => {
    const matchesSearch =
      !search ||
      professional.name.toLowerCase().includes(search) ||
      professional.category.toLowerCase().includes(search) ||
      professional.neighborhood.toLowerCase().includes(search)

    const matchesCategory =
      !category || professional.category.toLowerCase() === category

    return matchesSearch && matchesCategory
  })

  res.json({ data: filtered })
})

router.get('/:id', (req, res) => {
  const professional = professionals.find((item) => item.id === req.params.id)

  if (!professional) {
    res.status(404).json({ error: 'Profissional nao encontrado' })
    return
  }

  res.json({ data: professional })
})

module.exports = router
```

- [ ] **Step 4: Add server**

Create `ello-backend/server.js`:

```js
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const healthRoutes = require('./src/routes/health')
const professionalRoutes = require('./src/routes/professionals')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/health', healthRoutes)
app.use('/professionals', professionalRoutes)

app.get('/', (_req, res) => {
  res.json({ message: 'ELLO API rodando' })
})

app.listen(port, () => {
  console.log(`ELLO API running on http://localhost:${port}`)
})
```

- [ ] **Step 5: Verify backend**

Run:

```powershell
cd ello-backend
npm start
```

In another terminal:

```powershell
Invoke-RestMethod http://localhost:3001/health
Invoke-RestMethod http://localhost:3001/professionals
```

Expected: health returns `status: ok`; professionals returns a `data` array.

- [ ] **Step 6: Commit backend boundary**

Run:

```powershell
git add ello-backend
git commit -m "feat: add ELLO API boundary"
```

Expected: commit succeeds.

---

### Task 3: Add Frontend Design System

**Files:**
- Modify: `ello-frontend/tailwind.config.js`
- Modify: `ello-frontend/src/styles/index.css`
- Create: `ello-frontend/src/components/ui/Button.jsx`
- Create: `ello-frontend/src/components/ui/Input.jsx`
- Create: `ello-frontend/src/components/ui/StatusPill.jsx`

- [ ] **Step 1: Configure Tailwind**

Create or replace `ello-frontend/tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14213D',
        graphite: '#263238',
        muted: '#667085',
        line: '#E6E8EC',
        cloud: '#F7F9FC',
        card: '#FFFFFF',
        brand: '#0B7A75',
        brandDark: '#075E59',
        coral: '#FF6B5F',
        gold: '#F2B84B',
        sky: '#DDF3FF'
      },
      boxShadow: {
        premium: '0 18px 60px rgba(20, 33, 61, 0.12)',
        soft: '0 10px 30px rgba(20, 33, 61, 0.08)'
      },
      borderRadius: {
        shell: '28px',
        panel: '20px'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
```

- [ ] **Step 2: Configure PostCSS**

Create or replace `ello-frontend/postcss.config.js`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {}
  }
}
```

- [ ] **Step 3: Add global styles**

Create or replace `ello-frontend/src/styles/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import 'tailwindcss';

:root {
  color: #14213d;
  background: #f7f9fc;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  scroll-behavior: smooth;
}

body {
  min-height: 100%;
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(11, 122, 117, 0.12), transparent 34rem),
    linear-gradient(180deg, #ffffff 0%, #f7f9fc 45%, #eef4f6 100%);
}

button,
input,
textarea,
select {
  font: inherit;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 3px solid rgba(11, 122, 117, 0.35);
  outline-offset: 3px;
}
```

- [ ] **Step 4: Add shared Button**

Create `ello-frontend/src/components/ui/Button.jsx`:

```jsx
const variants = {
  primary: 'bg-brand text-white shadow-soft hover:bg-brandDark',
  secondary: 'bg-white text-ink border border-line hover:border-brand/50',
  ghost: 'bg-transparent text-muted hover:text-ink hover:bg-white/70'
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 5: Add shared Input**

Create `ello-frontend/src/components/ui/Input.jsx`:

```jsx
export function Input({ label, helper, className = '', ...props }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      <span>{label}</span>
      <input
        className={`min-h-12 rounded-2xl border border-line bg-white px-4 text-sm text-ink shadow-[0_1px_0_rgba(20,33,61,0.04)] transition placeholder:text-muted/70 focus:border-brand ${className}`}
        {...props}
      />
      {helper ? <span className="text-xs font-medium text-muted">{helper}</span> : null}
    </label>
  )
}
```

- [ ] **Step 6: Add status pill**

Create `ello-frontend/src/components/ui/StatusPill.jsx`:

```jsx
const toneMap = {
  neutral: 'bg-cloud text-muted',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  brand: 'bg-brand/10 text-brand'
}

export function StatusPill({ children, tone = 'neutral' }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${toneMap[tone]}`}>
      {children}
    </span>
  )
}
```

- [ ] **Step 7: Verify design system compiles**

Run:

```powershell
cd ello-frontend
npm run build
```

Expected: build succeeds with Tailwind and shared components.

- [ ] **Step 8: Commit design system**

Run:

```powershell
git add ello-frontend
git commit -m "feat: add ELLO frontend design system"
```

Expected: commit succeeds.

---

### Task 4: Add Mock Data And Frontend Services

**Files:**
- Create: `ello-frontend/src/data/elloData.js`
- Create: `ello-frontend/src/services/elloService.js`

- [ ] **Step 1: Add frontend data**

Create `ello-frontend/src/data/elloData.js`:

```js
export const onboardingSlides = [
  {
    title: 'Encontre quem resolve',
    text: 'Servicos perto de voce, com profissionais reais e informacoes claras antes do primeiro contato.',
    image: 'client'
  },
  {
    title: 'Mostre seu trabalho',
    text: 'Crie reputacao com perfil, portfolio, precos e disponibilidade em um espaco feito para autonomos.',
    image: 'professional'
  },
  {
    title: 'Combine com confianca',
    text: 'Solicite orcamentos, converse, acompanhe pedidos e avalie a experiencia no mesmo fluxo.',
    image: 'trust'
  }
]

export const categories = ['Todos', 'Beleza', 'Casa', 'Construcao', 'Mobilidade', 'Seguranca', 'Saude', 'Eventos']

export const professionals = [
  {
    id: 'ana-martins',
    name: 'Ana Martins',
    category: 'Beleza',
    city: 'Macae',
    neighborhood: 'Cavaleiros',
    rating: 4.9,
    jobs: 128,
    responseTime: '20 min',
    price: 'A partir de R$ 45',
    chargeType: 'por atendimento',
    bio: 'Especialista em unhas naturais, alongamento e acabamento delicado para eventos e rotina.',
    portfolio: ['Unhas gel minimalistas', 'Francesinha premium', 'Antes e depois'],
    availability: 'Hoje, 14h as 19h'
  },
  {
    id: 'bruno-azevedo',
    name: 'Bruno Azevedo',
    category: 'Construcao',
    city: 'Macae',
    neighborhood: 'Imbetiba',
    rating: 4.8,
    jobs: 94,
    responseTime: '1h',
    price: 'A partir de R$ 18/m2',
    chargeType: 'por metro',
    bio: 'Pintura residencial, pequenos reparos e acabamento limpo para apartamentos e casas.',
    portfolio: ['Sala renovada', 'Textura externa', 'Reparo de parede'],
    availability: 'Amanha, 8h as 17h'
  },
  {
    id: 'carla-santos',
    name: 'Carla Santos',
    category: 'Casa',
    city: 'Rio das Ostras',
    neighborhood: 'Costazul',
    rating: 5,
    jobs: 76,
    responseTime: '35 min',
    price: 'A partir de R$ 120',
    chargeType: 'por diaria',
    bio: 'Organizacao domestica, limpeza detalhada e apoio recorrente para familias.',
    portfolio: ['Cozinha organizada', 'Lavanderia', 'Limpeza pos-obra'],
    availability: 'Esta semana'
  }
]

export const professionalStats = [
  { label: 'Pedidos novos', value: '8' },
  { label: 'Orcamentos enviados', value: '14' },
  { label: 'Servicos ativos', value: '3' },
  { label: 'Avaliacao media', value: '4.9' }
]

export const requests = [
  {
    id: 'REQ-1042',
    client: 'Mariana Lopes',
    service: 'Manicure para evento',
    status: 'Novo pedido',
    date: 'Hoje',
    value: 'A definir'
  },
  {
    id: 'REQ-1038',
    client: 'Rafael Moura',
    service: 'Pintura de sala',
    status: 'Orcamento enviado',
    date: 'Ontem',
    value: 'R$ 620'
  },
  {
    id: 'REQ-1031',
    client: 'Bianca Reis',
    service: 'Limpeza pos-obra',
    status: 'Em andamento',
    date: '22 jun',
    value: 'R$ 280'
  }
]
```

- [ ] **Step 2: Add service facade**

Create `ello-frontend/src/services/elloService.js`:

```js
import { categories, onboardingSlides, professionalStats, professionals, requests } from '../data/elloData'

const wait = (ms = 180) => new Promise((resolve) => window.setTimeout(resolve, ms))

export async function getOnboardingSlides() {
  await wait()
  return onboardingSlides
}

export async function getCategories() {
  await wait()
  return categories
}

export async function getProfessionals({ search = '', category = 'Todos' } = {}) {
  await wait()
  const normalizedSearch = search.toLowerCase().trim()

  return professionals.filter((professional) => {
    const matchesCategory = category === 'Todos' || professional.category === category
    const matchesSearch =
      !normalizedSearch ||
      professional.name.toLowerCase().includes(normalizedSearch) ||
      professional.category.toLowerCase().includes(normalizedSearch) ||
      professional.neighborhood.toLowerCase().includes(normalizedSearch)

    return matchesCategory && matchesSearch
  })
}

export async function getProfessionalById(id) {
  await wait()
  return professionals.find((professional) => professional.id === id) || professionals[0]
}

export async function getProfessionalStats() {
  await wait()
  return professionalStats
}

export async function getRequests() {
  await wait()
  return requests
}
```

- [ ] **Step 3: Verify services compile**

Run:

```powershell
cd ello-frontend
npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Commit mock services**

Run:

```powershell
git add ello-frontend/src/data ello-frontend/src/services
git commit -m "feat: add ELLO mock data services"
```

Expected: commit succeeds.

---

### Task 5: Build App Routing And Onboarding

**Files:**
- Modify: `ello-frontend/src/main.jsx`
- Modify: `ello-frontend/src/App.jsx`
- Create: `ello-frontend/src/features/onboarding/Onboarding.jsx`
- Create: `ello-frontend/src/features/auth/RoleChoice.jsx`

- [ ] **Step 1: Wire main stylesheet**

Replace `ello-frontend/src/main.jsx` with:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 2: Add route composition**

Replace `ello-frontend/src/App.jsx` with:

```jsx
import { Navigate, Route, Routes } from 'react-router-dom'
import { RoleChoice } from './features/auth/RoleChoice'
import { Onboarding } from './features/onboarding/Onboarding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/comecar" element={<RoleChoice />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
```

- [ ] **Step 3: Add onboarding carousel**

Create `ello-frontend/src/features/onboarding/Onboarding.jsx`:

```jsx
import { ArrowRight, BriefcaseBusiness, CheckCircle2, MapPin, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onboardingSlides } from '../../data/elloData'
import { Button } from '../../components/ui/Button'

const iconMap = {
  client: MapPin,
  professional: BriefcaseBusiness,
  trust: CheckCircle2
}

export function Onboarding() {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const slide = onboardingSlides[active]
  const Icon = iconMap[slide.image]

  function next() {
    if (active < onboardingSlides.length - 1) {
      setActive((current) => current + 1)
      return
    }

    navigate('/comecar')
  }

  return (
    <main className="min-h-screen overflow-hidden px-5 py-6 text-ink sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-between rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-premium backdrop-blur md:grid md:grid-cols-[1fr_0.95fr] md:items-center md:gap-10 md:p-10">
        <section className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand via-brandDark to-ink p-8 text-white md:min-h-[38rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_18rem)]" />
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative grid w-full max-w-sm gap-6"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white/16 backdrop-blur">
              <Icon size={40} strokeWidth={1.8} />
            </div>
            <div className="grid gap-4 rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-bold text-white/75">
                <Sparkles size={16} />
                ELLO conecta
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4 text-ink shadow-soft">
                  <p className="text-xs font-bold text-muted">Cliente</p>
                  <p className="mt-2 text-lg font-extrabold leading-tight">precisa resolver</p>
                </div>
                <div className="rounded-2xl bg-coral p-4 text-white shadow-soft">
                  <p className="text-xs font-bold text-white/75">Profissional</p>
                  <p className="mt-2 text-lg font-extrabold leading-tight">quer aparecer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="flex flex-1 flex-col justify-end gap-8 pt-8 md:justify-center md:pt-0">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">ELLO</p>
            <motion.h1
              key={slide.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold leading-[1.02] md:text-6xl"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              key={slide.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl text-base font-medium leading-7 text-muted md:text-lg"
            >
              {slide.text}
            </motion.p>
          </div>

          <div className="flex items-center gap-2">
            {onboardingSlides.map((item, index) => (
              <button
                aria-label={`Ir para ${item.title}`}
                className={`h-2.5 rounded-full transition-all ${index === active ? 'w-9 bg-brand' : 'w-2.5 bg-line'}`}
                key={item.title}
                onClick={() => setActive(index)}
              />
            ))}
          </div>

          <div className="grid gap-3 sm:max-w-sm">
            <Button onClick={next}>
              {active === onboardingSlides.length - 1 ? 'Comecar' : 'Continuar'}
              <ArrowRight size={18} />
            </Button>
            <Button variant="ghost" onClick={() => navigate('/comecar')}>
              Ja tenho conta
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Add role choice**

Create `ello-frontend/src/features/auth/RoleChoice.jsx`:

```jsx
import { ArrowRight, Search, UserRoundCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function RoleChoice() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-5xl content-center gap-6">
        <div className="grid gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Comece pela sua jornada</p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Como voce quer usar a ELLO?</h1>
          <p className="max-w-2xl text-base font-medium leading-7 text-muted">
            Escolha o caminho certo agora. Voce pode explorar servicos como cliente ou montar sua presenca profissional.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            className="group grid min-h-64 gap-5 rounded-[1.75rem] border border-line bg-white p-6 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-premium"
            onClick={() => navigate('/cadastro/cliente')}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky text-brand">
              <Search size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Sou cliente</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-muted">Quero encontrar, comparar e solicitar servicos perto de mim.</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-brand">
              Entrar como cliente <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </button>

          <button
            className="group grid min-h-64 gap-5 rounded-[1.75rem] border border-line bg-ink p-6 text-left text-white shadow-premium transition hover:-translate-y-1"
            onClick={() => navigate('/cadastro/profissional')}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-gold">
              <UserRoundCheck size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Sou profissional</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-white/70">Quero divulgar meu trabalho, receber pedidos e construir reputacao.</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-gold">
              Entrar como profissional <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 5: Verify onboarding routes**

Run:

```powershell
cd ello-frontend
npm run build
```

Expected: build succeeds.

- [ ] **Step 6: Commit onboarding**

Run:

```powershell
git add ello-frontend
git commit -m "feat: add ELLO onboarding and role choice"
```

Expected: commit succeeds.

---

### Task 6: Build Registration Flows

**Files:**
- Modify: `ello-frontend/src/App.jsx`
- Create: `ello-frontend/src/features/auth/ClientSignup.jsx`
- Create: `ello-frontend/src/features/auth/ProfessionalSignup.jsx`

- [ ] **Step 1: Add registration routes**

Update `ello-frontend/src/App.jsx`:

```jsx
import { Navigate, Route, Routes } from 'react-router-dom'
import { ClientSignup } from './features/auth/ClientSignup'
import { ProfessionalSignup } from './features/auth/ProfessionalSignup'
import { RoleChoice } from './features/auth/RoleChoice'
import { Onboarding } from './features/onboarding/Onboarding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/comecar" element={<RoleChoice />} />
      <Route path="/cadastro/cliente" element={<ClientSignup />} />
      <Route path="/cadastro/profissional" element={<ProfessionalSignup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
```

- [ ] **Step 2: Add client signup**

Create `ello-frontend/src/features/auth/ClientSignup.jsx`:

```jsx
import { Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function ClientSignup() {
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  function submit(event) {
    event.preventDefault()
    setDone(true)
    window.setTimeout(() => navigate('/cliente/feed'), 500)
  }

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <form onSubmit={submit} className="mx-auto grid max-w-3xl gap-6 rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
        <div className="grid gap-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Cadastro cliente</p>
          <h1 className="text-3xl font-extrabold md:text-5xl">Seu acesso para encontrar servicos.</h1>
          <p className="text-sm font-medium leading-6 text-muted">Cadastro curto para entrar direto no feed de profissionais.</p>
        </div>

        <button className="flex min-h-28 items-center gap-4 rounded-[1.5rem] border border-dashed border-brand/40 bg-brand/5 p-4 text-left" type="button">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
            <Camera size={26} />
          </span>
          <span>
            <strong className="block text-sm">Foto de perfil</strong>
            <span className="text-sm font-medium text-muted">Adicione agora ou complete depois.</span>
          </span>
        </button>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Nome" placeholder="Seu nome completo" required />
          <Input label="Data de nascimento" type="date" required />
          <Input label="Email" type="email" placeholder="voce@email.com" required />
          <Input label="Senha" type="password" placeholder="Minimo 8 caracteres" required />
          <Input label="Confirmar senha" type="password" placeholder="Repita sua senha" required />
          <Input label="Bio curta" placeholder="Ex: moro em Macae e busco servicos para casa" />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          {done ? <CheckCircle2 size={18} /> : null}
          {done ? 'Cadastro criado' : 'Entrar no feed'}
        </Button>
      </form>
    </main>
  )
}
```

- [ ] **Step 3: Add professional signup**

Create `ello-frontend/src/features/auth/ProfessionalSignup.jsx`:

```jsx
import { ArrowRight, Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const steps = ['Dados', 'Perguntas', 'Confianca', 'Perfil']

export function ProfessionalSignup() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const isLast = step === steps.length - 1

  function submit(event) {
    event.preventDefault()

    if (!isLast) {
      setStep((current) => current + 1)
      return
    }

    navigate('/profissional/central')
  }

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <form onSubmit={submit} className="mx-auto grid max-w-4xl gap-6 rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
        <div className="grid gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Cadastro profissional</p>
          <h1 className="text-3xl font-extrabold md:text-5xl">Monte sua presenca na ELLO.</h1>
          <div className="grid grid-cols-4 gap-2">
            {steps.map((item, index) => (
              <span className={`h-2 rounded-full ${index <= step ? 'bg-brand' : 'bg-line'}`} key={item} />
            ))}
          </div>
        </div>

        {step === 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Nome" placeholder="Seu nome completo" required />
            <Input label="Data de nascimento" type="date" required />
            <Input label="Area de atuacao" placeholder="Ex: manicure, pintor, motorista" required />
            <Input label="Email" type="email" placeholder="voce@email.com" required />
            <Input label="Senha" type="password" required />
            <Input label="Confirmar senha" type="password" required />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Experiencia" placeholder="Ex: 5 anos" required />
            <Input label="Atende quais bairros?" placeholder="Cavaleiros, Centro, Imbetiba" required />
            <Input label="Tem materiais proprios?" placeholder="Sim, parcialmente ou nao" />
            <Input label="Disponibilidade" placeholder="Dias e horarios principais" />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="CPF ou CNPJ" placeholder="Digite seu documento" required />
            <Input label="Cidade" placeholder="Macae" required />
            <Input label="Bairro" placeholder="Seu bairro principal" required />
            <Input label="Nome publico" placeholder="Como clientes vao ver voce" />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <button className="flex min-h-28 items-center gap-4 rounded-[1.5rem] border border-dashed border-brand/40 bg-brand/5 p-4 text-left" type="button">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
                <Camera size={26} />
              </span>
              <span>
                <strong className="block text-sm">Foto, banner e portfolio</strong>
                <span className="text-sm font-medium text-muted">Adicione imagens para transmitir credibilidade.</span>
              </span>
            </button>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Descricao" placeholder="Conte o que voce faz melhor" required />
              <Input label="Preco base" placeholder="Ex: R$ 120" required />
              <Input label="Tipo de cobranca" placeholder="por hora, diaria, metro ou atendimento" required />
              <Input label="Portfolio" placeholder="Ex: antes e depois, obra finalizada" />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
            Voltar
          </Button>
          <Button type="submit">
            {isLast ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
            {isLast ? 'Abrir central' : 'Continuar'}
          </Button>
        </div>
      </form>
    </main>
  )
}
```

- [ ] **Step 4: Verify registration routes**

Run:

```powershell
cd ello-frontend
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit registration**

Run:

```powershell
git add ello-frontend
git commit -m "feat: add ELLO registration flows"
```

Expected: commit succeeds.

---

### Task 7: Build Client Feed, Profile, And Quote Flow

**Files:**
- Modify: `ello-frontend/src/App.jsx`
- Create: `ello-frontend/src/features/client/ClientFeed.jsx`
- Create: `ello-frontend/src/features/client/ProfessionalCard.jsx`
- Create: `ello-frontend/src/features/client/ProfessionalProfile.jsx`
- Create: `ello-frontend/src/features/client/QuoteRequest.jsx`

- [ ] **Step 1: Add client routes**

Add these imports and routes in `ello-frontend/src/App.jsx`:

```jsx
import { ClientFeed } from './features/client/ClientFeed'
import { ProfessionalProfile } from './features/client/ProfessionalProfile'
import { QuoteRequest } from './features/client/QuoteRequest'
```

```jsx
<Route path="/cliente/feed" element={<ClientFeed />} />
<Route path="/cliente/profissionais/:id" element={<ProfessionalProfile />} />
<Route path="/cliente/orcamento/:id" element={<QuoteRequest />} />
```

- [ ] **Step 2: Add professional card**

Create `ello-frontend/src/features/client/ProfessionalCard.jsx`:

```jsx
import { Clock, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function ProfessionalCard({ professional }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft">
      <div className="h-40 bg-gradient-to-br from-sky via-white to-brand/20 p-4">
        <div className="flex h-full items-end justify-between">
          <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-soft">
            <p className="text-xs font-bold text-muted">{professional.category}</p>
            <h2 className="text-xl font-extrabold text-ink">{professional.name}</h2>
          </div>
          <div className="rounded-2xl bg-ink px-3 py-2 text-sm font-bold text-white">{professional.price}</div>
        </div>
      </div>
      <div className="grid gap-4 p-4">
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-muted">
          <span className="inline-flex items-center gap-1"><Star size={16} className="fill-gold text-gold" /> {professional.rating}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={16} /> {professional.neighborhood}</span>
          <span className="inline-flex items-center gap-1"><Clock size={16} /> {professional.responseTime}</span>
        </div>
        <p className="text-sm font-medium leading-6 text-muted">{professional.bio}</p>
        <div className="grid grid-cols-2 gap-3">
          <Link to={`/cliente/profissionais/${professional.id}`}>
            <Button variant="secondary" className="w-full">Ver perfil</Button>
          </Link>
          <Link to={`/cliente/orcamento/${professional.id}`}>
            <Button className="w-full">Solicitar</Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Add client feed**

Create `ello-frontend/src/features/client/ClientFeed.jsx`:

```jsx
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { categories } from '../../data/elloData'
import { getProfessionals } from '../../services/elloService'
import { ProfessionalCard } from './ProfessionalCard'

export function ClientFeed() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    getProfessionals({ search, category: activeCategory }).then(setItems)
  }, [activeCategory, search])

  return (
    <main className="min-h-screen px-4 pb-24 pt-5 text-ink md:px-8 md:pb-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[18rem_1fr]">
        <aside className="hidden rounded-[1.75rem] bg-white p-5 shadow-soft md:block">
          <h2 className="text-lg font-extrabold">Filtros</h2>
          <div className="mt-4 grid gap-2">
            {categories.map((category) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-bold ${activeCategory === category ? 'bg-brand text-white' : 'bg-cloud text-muted'}`}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <section className="grid gap-5">
          <div className="sticky top-0 z-10 grid gap-4 bg-cloud/80 py-2 backdrop-blur md:static md:bg-transparent">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Feed</p>
              <h1 className="text-3xl font-extrabold md:text-5xl">Profissionais perto de voce</h1>
            </div>
            <label className="flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 shadow-soft">
              <Search size={20} className="text-muted" />
              <input className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-muted" placeholder="Buscar manicure, pintor, bairro..." value={search} onChange={(event) => setSearch(event.target.value)} />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
              {categories.map((category) => (
                <button
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${activeCategory === category ? 'bg-brand text-white' : 'bg-white text-muted'}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {items.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Add profile and quote pages**

Create `ello-frontend/src/features/client/ProfessionalProfile.jsx`:

```jsx
import { ArrowLeft, CalendarDays, MessageCircle, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { getProfessionalById } from '../../services/elloService'

export function ProfessionalProfile() {
  const { id } = useParams()
  const [professional, setProfessional] = useState(null)

  useEffect(() => {
    getProfessionalById(id).then(setProfessional)
  }, [id])

  if (!professional) {
    return <main className="min-h-screen p-6 text-ink">Carregando perfil...</main>
  }

  return (
    <main className="min-h-screen px-4 pb-24 pt-5 text-ink md:px-8 md:pb-8">
      <section className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1fr_22rem]">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-premium">
          <div className="h-56 bg-gradient-to-br from-brand via-sky to-gold p-5">
            <Link className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-ink" to="/cliente/feed">
              <ArrowLeft size={16} /> Voltar
            </Link>
          </div>
          <div className="grid gap-6 p-5 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <StatusPill tone="brand">{professional.category}</StatusPill>
                <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">{professional.name}</h1>
                <p className="mt-2 text-sm font-bold text-muted">{professional.neighborhood}, {professional.city}</p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-cloud px-4 py-3 text-sm font-bold text-ink">
                <Star size={18} className="fill-gold text-gold" />
                {professional.rating} em {professional.jobs} servicos
              </div>
            </div>

            <p className="max-w-3xl text-base font-medium leading-7 text-muted">{professional.bio}</p>

            <div className="grid gap-3 md:grid-cols-3">
              {professional.portfolio.map((item) => (
                <div className="min-h-32 rounded-[1.5rem] bg-gradient-to-br from-cloud to-sky p-4 text-sm font-extrabold text-ink" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="grid content-start gap-4 rounded-[2rem] bg-ink p-5 text-white shadow-premium">
          <div>
            <p className="text-sm font-bold text-white/60">Preco</p>
            <p className="mt-1 text-2xl font-extrabold">{professional.price}</p>
            <p className="text-sm font-semibold text-white/60">{professional.chargeType}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white/10 p-4">
            <p className="flex items-center gap-2 text-sm font-bold"><CalendarDays size={18} /> Disponibilidade</p>
            <p className="mt-2 text-sm font-medium text-white/70">{professional.availability}</p>
          </div>
          <Link to={`/cliente/orcamento/${professional.id}`}>
            <Button className="w-full">Solicitar orcamento</Button>
          </Link>
          <Button variant="secondary" className="w-full">
            <MessageCircle size={18} /> Conversar
          </Button>
        </aside>
      </section>
    </main>
  )
}
```

Create `ello-frontend/src/features/client/QuoteRequest.jsx`:

```jsx
import { CheckCircle2, ImagePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { getProfessionalById } from '../../services/elloService'

export function QuoteRequest() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [professional, setProfessional] = useState(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    getProfessionalById(id).then(setProfessional)
  }, [id])

  function submit(event) {
    event.preventDefault()
    setSent(true)
    window.setTimeout(() => navigate('/cliente/feed'), 700)
  }

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <form onSubmit={submit} className="mx-auto grid max-w-3xl gap-6 rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
        <div className="grid gap-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Solicitar orcamento</p>
          <h1 className="text-3xl font-extrabold md:text-5xl">
            {professional ? `Conte para ${professional.name} o que voce precisa.` : 'Conte o que voce precisa.'}
          </h1>
          <p className="text-sm font-medium leading-6 text-muted">Quanto mais claro o pedido, melhor o profissional consegue responder.</p>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          <span>Descricao do servico</span>
          <textarea className="min-h-36 rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand" placeholder="Ex: preciso pintar uma sala de 20m2 com pequenos reparos na parede." required />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Data desejada" type="date" required />
          <Input label="Bairro" placeholder="Onde o servico sera feito" required />
        </div>

        <button className="flex min-h-24 items-center gap-4 rounded-[1.5rem] border border-dashed border-brand/40 bg-brand/5 p-4 text-left" type="button">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
            <ImagePlus size={24} />
          </span>
          <span>
            <strong className="block text-sm">Fotos ajudam no orcamento</strong>
            <span className="text-sm font-medium text-muted">Nesta primeira versao, esse anexo fica representado na interface.</span>
          </span>
        </button>

        <Button type="submit" className="w-full md:w-auto">
          {sent ? <CheckCircle2 size={18} /> : null}
          {sent ? 'Pedido enviado' : 'Enviar pedido'}
        </Button>
      </form>
    </main>
  )
}
```

- [ ] **Step 5: Verify client flow**

Run:

```powershell
cd ello-frontend
npm run build
```

Expected: build succeeds and routes `/cliente/feed`, `/cliente/profissionais/ana-martins`, and `/cliente/orcamento/ana-martins` work.

- [ ] **Step 6: Commit client experience**

Run:

```powershell
git add ello-frontend
git commit -m "feat: add ELLO client discovery flow"
```

Expected: commit succeeds.

---

### Task 8: Build Professional Central

**Files:**
- Modify: `ello-frontend/src/App.jsx`
- Create: `ello-frontend/src/features/professional/ProfessionalCentral.jsx`
- Create: `ello-frontend/src/features/professional/ProfessionalProfileEditor.jsx`
- Create: `ello-frontend/src/features/professional/RequestsBoard.jsx`

- [ ] **Step 1: Add professional routes**

Add these imports and routes in `ello-frontend/src/App.jsx`:

```jsx
import { ProfessionalCentral } from './features/professional/ProfessionalCentral'
import { ProfessionalProfileEditor } from './features/professional/ProfessionalProfileEditor'
import { RequestsBoard } from './features/professional/RequestsBoard'
```

```jsx
<Route path="/profissional/central" element={<ProfessionalCentral />} />
<Route path="/profissional/perfil" element={<ProfessionalProfileEditor />} />
<Route path="/profissional/pedidos" element={<RequestsBoard />} />
```

- [ ] **Step 2: Add central**

Create `ello-frontend/src/features/professional/ProfessionalCentral.jsx`:

```jsx
import { BriefcaseBusiness, CalendarDays, ImagePlus, MessageCircle, Settings, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { getProfessionalStats } from '../../services/elloService'

const actions = [
  { label: 'Editar perfil', text: 'Atualize sua vitrine publica.', href: '/profissional/perfil', icon: BriefcaseBusiness },
  { label: 'Atualizar portfolio', text: 'Adicione fotos que vendem seu trabalho.', href: '/profissional/perfil', icon: ImagePlus },
  { label: 'Ver pedidos', text: 'Responda oportunidades recentes.', href: '/profissional/pedidos', icon: MessageCircle },
  { label: 'Configurar agenda', text: 'Mostre quando voce pode atender.', href: '/profissional/perfil', icon: CalendarDays }
]

export function ProfessionalCentral() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    getProfessionalStats().then(setStats)
  }, [])

  return (
    <main className="min-h-screen px-4 pb-24 pt-5 text-ink md:px-8 md:pb-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[17rem_1fr]">
        <aside className="hidden rounded-[1.75rem] bg-ink p-5 text-white shadow-premium md:block">
          <h2 className="text-2xl font-extrabold">ELLO Pro</h2>
          <nav className="mt-8 grid gap-2 text-sm font-bold">
            <Link className="rounded-2xl bg-white px-4 py-3 text-ink" to="/profissional/central">Central</Link>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/pedidos">Pedidos</Link>
            <span className="rounded-2xl px-4 py-3 text-white/45">Chat</span>
            <span className="rounded-2xl px-4 py-3 text-white/45">Carteira</span>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/perfil">Perfil</Link>
            <span className="rounded-2xl px-4 py-3 text-white/45">Configuracoes</span>
          </nav>
        </aside>

        <section className="grid gap-6">
          <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-5 shadow-premium md:flex-row md:items-end md:justify-between md:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Central</p>
              <h1 className="text-3xl font-extrabold md:text-5xl">Seu negocio em movimento.</h1>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-muted">Acompanhe pedidos, perfil, agenda e sinais de crescimento em um painel simples.</p>
            </div>
            <Button variant="secondary">
              <Wallet size={18} /> Carteira em breve
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article className="rounded-[1.5rem] bg-white p-5 shadow-soft" key={stat.label}>
                <p className="text-sm font-bold text-muted">{stat.label}</p>
                <p className="mt-3 text-3xl font-extrabold">{stat.value}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <Link className="group rounded-[1.75rem] bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-premium" key={action.label} to={action.href}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Icon size={24} />
                    </span>
                    <span>
                      <strong className="block text-lg">{action.label}</strong>
                      <span className="mt-1 block text-sm font-medium leading-6 text-muted">{action.text}</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <article className="rounded-[1.75rem] bg-gradient-to-br from-brand to-ink p-5 text-white shadow-premium">
            <div className="flex items-center gap-3">
              <Settings size={22} />
              <h2 className="text-xl font-extrabold">Dica de visibilidade</h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-white/75">Perfis com pelo menos 3 fotos, preco claro e resposta rapida tendem a receber mais pedidos.</p>
          </article>
        </section>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Add profile editor**

Create `ello-frontend/src/features/professional/ProfessionalProfileEditor.jsx`:

```jsx
import { Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function ProfessionalProfileEditor() {
  const [saved, setSaved] = useState(false)

  function submit(event) {
    event.preventDefault()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1200)
  }

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-6 rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
        <div className="grid gap-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Perfil profissional</p>
          <h1 className="text-3xl font-extrabold md:text-5xl">Ajuste como clientes veem seu trabalho.</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-[18rem_1fr]">
          <button className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-brand/40 bg-brand/5 text-center" type="button">
            <Camera size={32} className="text-brand" />
            <span className="text-sm font-bold">Foto, banner e galeria</span>
            <span className="max-w-44 text-xs font-medium text-muted">Interface preparada para uploads na proxima etapa.</span>
          </button>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Nome publico" defaultValue="Ana Martins" />
            <Input label="Categoria" defaultValue="Beleza" />
            <Input label="Servicos oferecidos" defaultValue="Manicure, alongamento e acabamento" />
            <Input label="Tipo de cobranca" defaultValue="por atendimento" />
            <Input label="Preco base" defaultValue="R$ 45" />
            <Input label="Cidade" defaultValue="Macae" />
            <Input label="Bairros atendidos" defaultValue="Cavaleiros, Centro, Imbetiba" />
            <Input label="Portfolio" defaultValue="Unhas gel, francesinha, antes e depois" />
          </div>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          <span>Descricao</span>
          <textarea className="min-h-32 rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand" defaultValue="Especialista em unhas naturais, alongamento e acabamento delicado para eventos e rotina." />
        </label>

        <Button type="submit" className="w-full md:w-auto">
          {saved ? <CheckCircle2 size={18} /> : null}
          {saved ? 'Alteracoes salvas' : 'Salvar perfil'}
        </Button>
      </form>
    </main>
  )
}
```

- [ ] **Step 4: Add requests board**

Create `ello-frontend/src/features/professional/RequestsBoard.jsx` using `getRequests` and `StatusPill`. Map statuses to tones:

```js
const statusTone = {
  'Novo pedido': 'brand',
  'Aguardando resposta': 'warning',
  'Orcamento enviado': 'neutral',
  Aceito: 'success',
  'Em andamento': 'brand',
  Concluido: 'success',
  Cancelado: 'danger'
}
```

Full file:

```jsx
import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { getRequests } from '../../services/elloService'

const statusTone = {
  'Novo pedido': 'brand',
  'Aguardando resposta': 'warning',
  'Orcamento enviado': 'neutral',
  Aceito: 'success',
  'Em andamento': 'brand',
  Concluido: 'success',
  Cancelado: 'danger'
}

export function RequestsBoard() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getRequests().then(setItems)
  }, [])

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <section className="mx-auto grid max-w-6xl gap-6">
        <div className="rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Pedidos</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">Oportunidades e servicos.</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-muted">Acompanhe pedidos desde a chegada ate a conclusao.</p>
        </div>

        <div className="grid gap-3">
          {items.map((request) => (
            <article className="grid gap-4 rounded-[1.5rem] bg-white p-5 shadow-soft md:grid-cols-[1fr_auto] md:items-center" key={request.id}>
              <div className="grid gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill tone={statusTone[request.status]}>{request.status}</StatusPill>
                  <span className="text-xs font-bold text-muted">{request.id} · {request.date}</span>
                </div>
                <h2 className="text-xl font-extrabold">{request.service}</h2>
                <p className="text-sm font-medium text-muted">{request.client} · {request.value}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Detalhes</Button>
                <Button>Responder</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 5: Verify professional flow**

Run:

```powershell
cd ello-frontend
npm run build
```

Expected: build succeeds and routes `/profissional/central`, `/profissional/perfil`, and `/profissional/pedidos` work.

- [ ] **Step 6: Commit professional experience**

Run:

```powershell
git add ello-frontend
git commit -m "feat: add ELLO professional central"
```

Expected: commit succeeds.

---

### Task 9: Responsive Polish, Motion, And PWA Metadata

**Files:**
- Modify: `ello-frontend/index.html`
- Create: `ello-frontend/public/manifest.webmanifest`
- Modify: `ello-frontend/src/styles/index.css`
- Modify: `ello-frontend/src/features/onboarding/Onboarding.jsx` if QA finds mobile overflow.
- Modify: `ello-frontend/src/features/client/ClientFeed.jsx` if QA finds feed overflow.
- Modify: `ello-frontend/src/features/professional/ProfessionalCentral.jsx` if QA finds dashboard overflow.

- [ ] **Step 1: Add metadata**

Update `ello-frontend/index.html` head:

```html
<meta name="theme-color" content="#0B7A75" />
<meta name="description" content="ELLO conecta clientes e profissionais locais com uma experiencia premium." />
<link rel="manifest" href="/manifest.webmanifest" />
```

- [ ] **Step 2: Add manifest**

Create `ello-frontend/public/manifest.webmanifest`:

```json
{
  "name": "ELLO",
  "short_name": "ELLO",
  "description": "Marketplace premium de servicos locais.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F7F9FC",
  "theme_color": "#0B7A75",
  "icons": []
}
```

- [ ] **Step 3: Add reduced motion support**

Add to `ello-frontend/src/styles/index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Verify desktop and mobile layouts**

Run frontend:

```powershell
cd ello-frontend
npm run dev
```

Check:

- `http://localhost:5173/` at mobile width around 390x844.
- `http://localhost:5173/cliente/feed` at desktop width around 1440x900.
- `http://localhost:5173/profissional/central` at desktop width around 1440x900.

Expected: no horizontal overflow, no clipped primary buttons, no unreadable text, and desktop uses additional space intentionally.

- [ ] **Step 5: Commit polish**

Run:

```powershell
git add ello-frontend
git commit -m "feat: polish ELLO responsive PWA shell"
```

Expected: commit succeeds.

---

### Task 10: Final Verification And Handoff

**Files:**
- Modify: only files needed to fix QA issues.

- [ ] **Step 1: Run frontend build**

Run:

```powershell
cd ello-frontend
npm run build
```

Expected: build succeeds.

- [ ] **Step 2: Run backend health check**

Run:

```powershell
cd ello-backend
npm start
```

In another terminal:

```powershell
Invoke-RestMethod http://localhost:3001/health
```

Expected: returns `status: ok`.

- [ ] **Step 3: Browser QA**

Use the Browser plugin or Playwright fallback to inspect:

- Onboarding carousel can advance through all 3 slides.
- Comecar opens role choice.
- Client signup navigates to feed.
- Professional signup advances through all 4 steps and opens central.
- Client feed search and category filters change visible cards.
- Professional profile and quote request routes render.
- Professional central and requests routes render.

- [ ] **Step 4: Fix QA issues**

If any route, visual state, or interaction fails, patch the responsible file and rerun:

```powershell
cd ello-frontend
npm run build
```

Expected: build succeeds after fixes.

- [ ] **Step 5: Commit final fixes**

Run:

```powershell
git add .
git commit -m "fix: resolve ELLO shell QA issues"
```

Expected: commit succeeds only if there are actual fixes.

---

## Self-Review

Spec coverage:

- First-open carousel: Task 5.
- Role choice: Task 5.
- Client registration: Task 6.
- Professional registration: Task 6.
- Client feed, search, filters, cards: Task 7.
- Professional profile and quote request: Task 7.
- Professional central, profile editor, requests: Task 8.
- Desktop responsive behavior: Tasks 7, 8, and 9.
- Backend/API boundary: Task 2.
- PWA metadata: Task 9.

Intentional first-cycle limits:

- Real payment gateway remains out of scope.
- Real identity verification remains out of scope.
- Real-time chat remains out of scope.
- Native app builds remain out of scope.

Plan scan result:

- Open product decisions from the spec are resolved for this first plan as frontend-first with mock data, minimal backend boundary, and simulated local auth navigation.

Type consistency:

- Professional objects consistently use `id`, `name`, `category`, `city`, `neighborhood`, `rating`, `responseTime`, `price`, `chargeType`, `bio`, `portfolio`, and `availability`.
- Request objects consistently use `id`, `client`, `service`, `status`, `date`, and `value`.
