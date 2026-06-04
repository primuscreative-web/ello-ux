import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ClientSignup } from './features/auth/ClientSignup'
import { Login } from './features/auth/Login'
import { ProfessionalSignup } from './features/auth/ProfessionalSignup'
import { RoleChoice } from './features/auth/RoleChoice'
import { ClientFeed } from './features/client/ClientFeed'
import { ClientOrders } from './features/client/ClientOrders'
import { ProfessionalProfile } from './features/client/ProfessionalProfile'
import { QuoteRequest } from './features/client/QuoteRequest'
import { Onboarding } from './features/onboarding/Onboarding'
import { ProfessionalCentral } from './features/professional/ProfessionalCentral'
import { ProfessionalProfileEditor } from './features/professional/ProfessionalProfileEditor'
import { RequestsBoard } from './features/professional/RequestsBoard'
import { Settings } from './features/settings/Settings'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
        key={location.pathname}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/comecar" element={<RoleChoice />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastro/cliente" element={<ClientSignup />} />
          <Route path="/cadastro/profissional" element={<ProfessionalSignup />} />
          <Route path="/cliente/feed" element={<ClientFeed />} />
          <Route path="/cliente/pedidos" element={<ClientOrders />} />
          <Route path="/cliente/profissionais/:id" element={<ProfessionalProfile />} />
          <Route path="/cliente/orcamento/:id" element={<QuoteRequest />} />
          <Route path="/profissional/central" element={<ProfessionalCentral />} />
          <Route path="/profissional/perfil" element={<ProfessionalProfileEditor />} />
          <Route path="/profissional/pedidos" element={<RequestsBoard />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/profissional/configuracoes" element={<Settings />} />
          <Route path="/cliente/configuracoes" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}
