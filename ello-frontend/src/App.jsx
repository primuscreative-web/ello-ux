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
