import { Navigate, Route, Routes } from 'react-router-dom'
import { ClientSignup } from './features/auth/ClientSignup'
import { ProfessionalSignup } from './features/auth/ProfessionalSignup'
import { RoleChoice } from './features/auth/RoleChoice'
import { ClientFeed } from './features/client/ClientFeed'
import { ProfessionalProfile } from './features/client/ProfessionalProfile'
import { QuoteRequest } from './features/client/QuoteRequest'
import { Onboarding } from './features/onboarding/Onboarding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/comecar" element={<RoleChoice />} />
      <Route path="/cadastro/cliente" element={<ClientSignup />} />
      <Route path="/cadastro/profissional" element={<ProfessionalSignup />} />
      <Route path="/cliente/feed" element={<ClientFeed />} />
      <Route path="/cliente/profissionais/:id" element={<ProfessionalProfile />} />
      <Route path="/cliente/orcamento/:id" element={<QuoteRequest />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
