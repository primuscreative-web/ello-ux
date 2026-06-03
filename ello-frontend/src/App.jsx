import { Navigate, Route, Routes } from 'react-router-dom'
import { ClientSignup } from './features/auth/ClientSignup'
import { Login } from './features/auth/Login'
import { ProfessionalSignup } from './features/auth/ProfessionalSignup'
import { RoleChoice } from './features/auth/RoleChoice'
import { ClientFeed } from './features/client/ClientFeed'
import { ProfessionalProfile } from './features/client/ProfessionalProfile'
import { QuoteRequest } from './features/client/QuoteRequest'
import { Onboarding } from './features/onboarding/Onboarding'
import { ProfessionalCentral } from './features/professional/ProfessionalCentral'
import { ProfessionalProfileEditor } from './features/professional/ProfessionalProfileEditor'
import { RequestsBoard } from './features/professional/RequestsBoard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/comecar" element={<RoleChoice />} />
      <Route path="/entrar" element={<Login />} />
      <Route path="/cadastro/cliente" element={<ClientSignup />} />
      <Route path="/cadastro/profissional" element={<ProfessionalSignup />} />
      <Route path="/cliente/feed" element={<ClientFeed />} />
      <Route path="/cliente/profissionais/:id" element={<ProfessionalProfile />} />
      <Route path="/cliente/orcamento/:id" element={<QuoteRequest />} />
      <Route path="/profissional/central" element={<ProfessionalCentral />} />
      <Route path="/profissional/perfil" element={<ProfessionalProfileEditor />} />
      <Route path="/profissional/pedidos" element={<RequestsBoard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
