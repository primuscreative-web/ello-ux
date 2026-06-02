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
